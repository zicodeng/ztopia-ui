import React, {
  cloneElement,
  FC,
  isValidElement,
  memo,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import camelCase from 'camelcase';
import classNames from 'classnames';
import Tooltip from 'rc-tooltip';

import 'rc-tooltip/assets/bootstrap_white.css';
import './Popper.css';

export interface PopperProps {
  /**
   * <@default=`false`>
   */
  isTransitionDisabled?: boolean;
  /**
   * Hide popper when overlay is clicked
   *
   * <@default=`false`>
   */
  isHiddenOnOverlayClick?: boolean;
  /**
   * <@default=`0`>
   */
  offsetX?: number;
  /**
   * <@default=`0`>
   */
  offsetY?: number;
  /**
   * Specify container in which the Drawer should be rendered
   */
  containerId?: string;
  className?: string;
  /**
   * Popper content when it is triggered
   */
  overlay: ReactNode;
  /**
   * Element that triggers tooltip
   */
  children: ReactNode;
  /**
   * <@default=`'hover'`>
   */
  trigger?: ('hover' | 'click' | 'focus')[];
  /**
   * <@default=`'top'`>
   */
  placement?:
    | 'top'
    | 'top-left'
    | 'top-right'
    | 'right'
    | 'right-top'
    | 'right-bottom'
    | 'bottom'
    | 'bottom-left'
    | 'bottom-right'
    | 'left'
    | 'left-top'
    | 'left-bottom';
}

const ARROW_SIZE = 4;

export const Popper: FC<PopperProps> = memo<PopperProps>(
  ({
    isTransitionDisabled = false,
    isHiddenOnOverlayClick = false,
    offsetX = 0,
    offsetY = 0,
    containerId,
    className,
    children,
    trigger = ['hover'],
    placement = 'top',
    overlay,
    ...restProps
  }) => {
    const childrenRef = useRef<HTMLElement>(null);
    const overlayRef = useRef<HTMLElement>(null);

    const [containerEl, setContainerEl] = useState<HTMLElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    const handleOverlayClick = useCallback(() => {
      setIsVisible(false);
    }, []);

    const handleChildrenClick = useCallback(() => {
      setIsVisible(!isVisible);
    }, [isVisible]);

    const handleWindowClick = useCallback(e => {
      const childrenEl = childrenRef.current;
      const overlayEl = overlayRef.current;

      if (
        (childrenEl && childrenEl.contains(e.target)) ||
        (overlayEl && overlayEl.contains(e.target))
      ) {
        return;
      }

      setIsVisible(false);
    }, []);

    useEffect(() => {
      if (containerId) {
        const el = document.getElementById(containerId);
        setContainerEl(el);
      }
    }, [containerId]);

    useEffect(() => {
      if (isHiddenOnOverlayClick) {
        window.addEventListener('mousedown', handleWindowClick, false);
      }

      return () => {
        if (isHiddenOnOverlayClick) {
          window.removeEventListener('mousedown', handleWindowClick, false);
        }
      };
    }, [isHiddenOnOverlayClick, handleWindowClick]);

    if (placement.startsWith('left')) {
      offsetX -= ARROW_SIZE;
    }
    if (placement.startsWith('right')) {
      offsetX += ARROW_SIZE;
    }
    if (placement.startsWith('top')) {
      offsetY -= ARROW_SIZE;
    }
    if (placement.startsWith('bottom')) {
      offsetY += ARROW_SIZE;
    }

    const props = {
      placement: camelCase(placement),
      overlayClassName: classNames(
        className,
        'ztopia-popper',
        `ztopia-popper--${placement}`,
      ),
      arrowContent: <div className="rc-tooltip-arrow-inner"></div>,
      align: {
        offset: [offsetX, offsetY],
      },
      trigger,
      getTooltipContainer: containerEl ? () => containerEl : undefined,
      transitionName: isTransitionDisabled
        ? null
        : {
            enter: 'enter',
            enterActive: 'enter-active',
            leave: 'leave',
            leaveActive: 'leave-active',
            appear: 'appear',
            appearActive: 'appear-active',
          },
      ...restProps,
    };

    // @ts-ignore
    if (isHiddenOnOverlayClick) props.visible = isVisible;

    return (
      // @ts-ignore
      <Tooltip
        overlay={
          isValidElement && isHiddenOnOverlayClick
            ? cloneElement(overlay as ReactElement, {
                ref: overlayRef,
                onClick: handleOverlayClick,
              })
            : overlay
        }
        {...props}
      >
        {isValidElement && isHiddenOnOverlayClick
          ? cloneElement(children as ReactElement, {
              ref: childrenRef,
              onClick: handleChildrenClick,
            })
          : children}
      </Tooltip>
    );
  },
);
