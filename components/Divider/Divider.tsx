import React, { CSSProperties, memo } from 'react';
import classNames from 'classnames';

export interface DividerProps {
  /**
   * <@default=`false`>
   */
  isFaded?: boolean;
  /**
   * <@default=`false`>
   */
  isVertical?: boolean;
  className?: string;
  /**
   * <@default=`100%`>
   */
  width?: string | number;
  /**
   * <@default=`1`>
   */
  height?: string | number;
  /**
   * <@default=`#131518`>
   */
  color?: string;
  style?: CSSProperties;
}

export const Divider = memo<DividerProps>(
  ({
    isFaded = false,
    isVertical = false,
    className,
    width = '100%',
    height = 1,
    color = '#131518',
    style,
  }) => (
    <div
      className={classNames(className, 'ztopia-divider')}
      style={{
        ...style,
        width,
        height,
        background: isFaded
          ? `linear-gradient(${
              isVertical ? 0 : 90
            }deg, transparent, ${color} 50%, transparent 100%)`
          : color,
      }}
    />
  ),
);
