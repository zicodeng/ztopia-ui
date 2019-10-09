import React, { FC, memo, ReactNode } from 'react';
import classNames from 'classnames';
import Tooltip from 'rc-tooltip';
import camelCase from 'camelcase';

import 'rc-tooltip/assets/bootstrap_white.css';
import './Popper.css';

export interface PopperProps {
  /**
   * <@internal>
   */
  visible?: boolean;
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
  className?: string;
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
  /**
   * Popper content when it is triggered
   */
  overlay: ReactNode;
  /**
   * Element that triggers tooltip
   */
  children: ReactNode;
}

const ARROW_SIZE = 4;

export const Popper: FC<PopperProps> = memo<PopperProps>(
  ({
    isTransitionDisabled = false,
    offsetX = 0,
    offsetY = 0,
    className,
    trigger = ['hover'],
    placement = 'top',
    children,
    ...restProps
  }) => {
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
