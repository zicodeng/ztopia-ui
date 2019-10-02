import React, { FC, useEffect, useState, ReactNode } from 'react';
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
   * <@default=`'30%'`>
   */
  width?: number | string;
  /**
   * <@default=`'30%'`>
   */
  height?: number | string;
  className?: string;
  /**
   * <@default=`right`>
   */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * Drawer can be closed by pressing ESC key or clicking overlay
   */
  onRequestClose?: () => void;
}

export const Drawer: FC<DrawerProps> = ({
  isOpen = false,
  isPagePushable = false,
  isContentDestoryDelayed = true,
  width,
  height,
  className,
  placement = 'right',
  onRequestClose,
  children,
  ...restProps
}) => {
  const [memoizedChildren, setMemoizedChildren] = useState<ReactNode>(null);

  const isVertical = placement === 'top' || placement === 'bottom';
  const newWidth = width || (isVertical ? '100%' : '30%');
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
      handler={false}
      level={isPagePushable ? undefined : null}
      open={isOpen}
      width={newWidth}
      height={newHeight}
      className={classNames(className, 'ztopia-drawer')}
      placement={placement}
      onClose={onRequestClose}
    >
      {isContentDestoryDelayed ? memoizedChildren : children}
    </BaseDrawer>
  );
};
