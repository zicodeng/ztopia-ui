import classNames from 'classnames';
import Tooltip from 'rc-tooltip';
import React, { FC, memo, ReactNode } from 'react';

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
    | 'topLeft'
    | 'topRight'
    | 'right'
    | 'rightTop'
    | 'rightBottom'
    | 'bottom'
    | 'bottomLeft'
    | 'bottomRight'
    | 'left'
    | 'leftTop'
    | 'leftBottom';
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

export const Popper: FC<PopperProps> = memo(
  ({
    isTransitionDisabled,
    offsetX,
    offsetY,
    className,
    placement,
    children,
    ...restProps
  }) => {
    offsetX = placement!.includes('left')
      ? offsetX! - ARROW_SIZE
      : offsetX! + ARROW_SIZE;
    offsetY = placement!.includes('top')
      ? offsetY! - ARROW_SIZE
      : offsetY! + ARROW_SIZE;
    return (
      <Tooltip
        placement={placement}
        overlayClassName={classNames(
          className,
          'ztopia-popper',
          `ztopia-popper--${placement}`,
        )}
        arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
        align={{
          offset: [offsetX, offsetY],
        }}
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

Popper.defaultProps = {
  isTransitionDisabled: false,
  offsetX: 0,
  offsetY: 0,
  trigger: ['hover'],
  placement: 'top',
};
