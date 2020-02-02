import React, { FC, memo, ReactNode, useState, useEffect } from 'react';
import classNames from 'classnames';
import Tooltip from 'rc-tooltip';
import camelCase from 'camelcase';

import 'rc-tooltip/assets/bootstrap_white.css';
import './Popper.css';

export interface PopperProps {
  /**
   * <@default=`false`>
   */
  isVisible?: boolean;
  /**
   * <@default=`false`>
   */
  isTransitionDisabled?: boolean;
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
    isVisible,
    isTransitionDisabled = false,
    offsetX = 0,
    offsetY = 0,
    containerId,
    className,
    children,
    trigger = ['hover'],
    placement = 'top',
    ...restProps
  }) => {
    const [containerEl, setContainerEl] = useState<HTMLElement | null>(null);

    useEffect(() => {
      if (containerId) {
        const el = document.getElementById(containerId);
        setContainerEl(el);
      }
    }, [containerId]);

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

    return (
      <Tooltip
        visible={isVisible}
        placement={camelCase(placement)}
        overlayClassName={classNames(
          className,
          'ztopia-popper',
          `ztopia-popper--${placement}`,
        )}
        arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
        align={{
          offset: [offsetX, offsetY],
        }}
        trigger={trigger}
        getTooltipContainer={containerEl ? () => containerEl : undefined}
        // @ts-ignore
        transitionName={
          isTransitionDisabled
            ? null
            : {
                enter: 'enter',
                enterActive: 'enter-active',
                leave: 'leave',
                leaveActive: 'leave-active',
                appear: 'appear',
                appearActive: 'appear-active',
              }
        }
        {...restProps}
      >
        {children}
      </Tooltip>
    );
  },
);
