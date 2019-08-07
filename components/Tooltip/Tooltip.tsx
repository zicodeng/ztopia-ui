import classNames from 'classnames';
import BaseTooltip from 'rc-tooltip';
import React, { FC, memo, ReactNode } from 'react';

import 'rc-tooltip/assets/bootstrap_white.css';
import './Tooltip.css';

export interface TooltipProps {
  /**
   * <@internal>
   */
  visible?: boolean;
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
   * Tooltip content when it is triggered
   */
  overlay: ReactNode;
  /**
   * Element that triggers tooltip
   */
  children: ReactNode;
}

const ARROW_SIZE = 4;

export const Tooltip: FC<TooltipProps> = memo(
  ({ offsetX, offsetY, className, placement, children, ...restProps }) => {
    offsetX = placement!.includes('left')
      ? offsetX! - ARROW_SIZE
      : offsetX! + ARROW_SIZE;
    offsetY = placement!.includes('top')
      ? offsetY! - ARROW_SIZE
      : offsetY! + ARROW_SIZE;
    return (
      <BaseTooltip
        placement={placement}
        overlayClassName={classNames(
          className,
          'ztopia-tooltip',
          `ztopia-tooltip--${placement}`,
        )}
        arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
        align={{
          offset: [offsetX, offsetY],
        }}
        {...restProps}
      >
        {children}
      </BaseTooltip>
    );
  },
);

Tooltip.defaultProps = {
  offsetX: 0,
  offsetY: 0,
  trigger: ['hover'],
  placement: 'top',
};
