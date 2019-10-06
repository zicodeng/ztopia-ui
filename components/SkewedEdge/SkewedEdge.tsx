import React, { FC, CSSProperties, memo } from 'react';
import classNames from 'classnames';

import './SkewedEdge.css';

export interface SkewedEdgeProps {
  className?: string;
  style?: CSSProperties;
  /**
   * <@default=`'left-to-right'`>
   */
  direction?:
    | 'left-to-right'
    | 'right-to-left'
    | 'top-to-bottom'
    | 'bottom-to-top';
}

export const SkewedEdge: FC<SkewedEdgeProps> = memo(
  ({ className, direction = 'left-to-right', ...restProps }) => (
    <div
      className={classNames(
        className,
        'ztopia-skewed-edge',
        `ztopia-skewed-edge--${direction}`,
      )}
      {...restProps}
    />
  ),
);
