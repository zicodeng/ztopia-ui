import React, {
  CSSProperties,
  memo,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';
import BaseDrawer from 'rc-drawer';

import 'rc-drawer/assets/index.css';
import './Drawer.css';

export interface DrawerProps {
  /**
   * <@default=`false`>
   */
  isOpen?: boolean;
  /**
   * <@default=`false`>
   */
  isPagePushable?: boolean;
  /**
   * Delay destorying drawer content so that we won't see it get destroyed immediately
   * before drawer close animation completes
   *
   * <@default=`true`>
   */
  isContentDestoryDelayed?: boolean;
  /**
   * <@default=`true`>
   *
   * If false, mask is completely hidden, disallowing any user interaction (users cannot close drawer via clicking mask)
   */
  isMaskShown?: boolean;
  /**
   * Specify container in which the Drawer should be rendered
   */
  containerId?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  /**
   * <@default=`'100%' or 400`>
   */
  width?: number | string;
  /**
   * <@default=`'30%' or '100%'`>
   */
  height?: number | string;
  handler?: JSX.Element | null;
  /**
   * <@default=`right`>
   */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * Drawer can be closed by pressing ESC key or clicking overlay
   */
  onRequestClose?: () => void;
}

export const Drawer = memo<DrawerProps>(
  ({
    isOpen = false,
    isPagePushable = false,
    isContentDestoryDelayed = true,
    isMaskShown = true,
    containerId,
    className,
    children,
    width,
    height,
    placement = 'right',
    handler,
    onRequestClose,
    ...restProps
  }) => {
    const [memoizedChildren, setMemoizedChildren] = useState<ReactNode>(null);

    const isVertical = placement === 'top' || placement === 'bottom';
    const newWidth = width || (isVertical ? '100%' : 400);
    const newHeight = height || (isVertical ? '30%' : '100%');

    // Delay destorying tmpItem so that we won't see drawer content gets destroyed immediately
    // before drawer close animation completes
    useEffect(() => {
      if (!isContentDestoryDelayed) return;

      let timerId: NodeJS.Timeout | null = null;
      if (isOpen) {
        setMemoizedChildren(children);
      } else if (memoizedChildren) {
        timerId = setTimeout(() => {
          setMemoizedChildren(null);
        }, 500);
      }
      return () => {
        if (timerId) {
          clearTimeout(timerId);
          timerId = null;
        }
      };
    }, [isOpen, isContentDestoryDelayed, children, memoizedChildren]);

    return (
      <BaseDrawer
        {...restProps}
        handler={handler ? handler : false}
        level={isPagePushable ? undefined : null}
        open={isOpen}
        showMask={isMaskShown}
        maskClosable={isMaskShown}
        width={newWidth}
        height={newHeight}
        className={classNames(className, 'ztopia-drawer')}
        placement={placement}
        getContainer={containerId ? `#${containerId}` : 'body'}
        onClose={onRequestClose}
      >
        {isContentDestoryDelayed ? memoizedChildren : children}
      </BaseDrawer>
    );
  },
);
