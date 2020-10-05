import React, {
  cloneElement,
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

export const HIDE_ON_CLICK_EXCEPTION = 'hide-on-click-exception';

export interface PopperProps {
  /**
   * <@default=`undefined`>
   */
  isVisible?: boolean;
  /**
   * <@default=`false`>
   */
  isTransitionDisabled?: boolean;
  /**
   * Hide popper when overlay or children is clicked.
   * This behaviour can be overridden by adding custom data attribute:
   * data-ztopia-popper="hide-on-click-exception"
   *
   * <@default=`false`>
   */
  isHiddenOnClick?: boolean;
  /**
   * <@default=`false`>
   */
  isArrowHidden?: boolean;
  /**
   * <@default=`false`>
   */
  isBorderHidden?: boolean;
  /**
   * <@default=`false`>
   */
  isShadowShown?: boolean;
  /**
   * <@default=`4`>
   */
  arrowSize?: number;
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
  children?: ReactNode;
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

export const Popper = memo<PopperProps>(
  ({
    isVisible = undefined,
    isTransitionDisabled = false,
    isHiddenOnClick = false,
    isArrowHidden = false,
    isBorderHidden = false,
    isShadowShown = false,
    arrowSize = 4,
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
    const [localIsVisible, setLocalIsVisible] = useState(false);

    const handleOverlayClick = useCallback(e => {
      const elements = document.querySelectorAll(
        `[data-ztopia-popper="${HIDE_ON_CLICK_EXCEPTION}"]`,
      );

      // Don't hide if elements with exception data attribute are clicked
      for (const el of elements) {
        if (el && el.contains(e.target)) return;
      }

      setLocalIsVisible(false);
    }, []);

    const handleChildrenClick = useCallback(() => {
      setLocalIsVisible(!localIsVisible);
    }, [localIsVisible]);

    const handleWindowClick = useCallback(e => {
      const childrenEl = childrenRef.current;
      const overlayEl = overlayRef.current;

      // Defer to handleOverlayClick and handleChildrenClick to determine visibility
      if (
        (childrenEl && childrenEl.contains(e.target)) ||
        (overlayEl && overlayEl.contains(e.target))
      ) {
        return;
      }

      setLocalIsVisible(false);
    }, []);

    useEffect(() => {
      if (containerId) {
        const el = document.getElementById(containerId);
        setContainerEl(el);
      }
    }, [containerId]);

    useEffect(() => {
      if (isHiddenOnClick) {
        window.addEventListener('mousedown', handleWindowClick, false);
      }

      return () => {
        if (isHiddenOnClick) {
          window.removeEventListener('mousedown', handleWindowClick, false);
        }
      };
    }, [isHiddenOnClick, handleWindowClick]);

    if (placement.startsWith('left')) {
      offsetX -= arrowSize;
    }
    if (placement.startsWith('right')) {
      offsetX += arrowSize;
    }
    if (placement.startsWith('top')) {
      offsetY -= arrowSize;
    }
    if (placement.startsWith('bottom')) {
      offsetY += arrowSize;
    }

    const props = {
      placement: camelCase(placement),
      overlayClassName: classNames(
        className,
        'ztopia-popper',
        `ztopia-popper--${placement}`,
        {
          'is-arrow-hidden': isArrowHidden,
          'is-border-hidden': isBorderHidden,
          'is-shadow-shown': isShadowShown,
        },
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
    if (isHiddenOnClick) props.visible = localIsVisible;
    // @ts-ignore
    if (isVisible !== undefined) props.visible = isVisible;

    return (
      // @ts-ignore
      <Tooltip
        overlay={
          isValidElement && isHiddenOnClick
            ? cloneElement(overlay as ReactElement, {
                ref: overlayRef,
                onClick: handleOverlayClick,
              })
            : overlay
        }
        {...props}
      >
        {isValidElement && isHiddenOnClick
          ? cloneElement(children as ReactElement, {
              ref: childrenRef,
              onClick: handleChildrenClick,
            })
          : children}
      </Tooltip>
    );
  },
);
