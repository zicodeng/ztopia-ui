import classNames from 'classnames';
import React, { FC, memo } from 'react';

import './Placeholder.css';

export interface PlaceholderProps {
  /**
   * <@default=`1`>
   *
   * Require `variant='text'`
   */
  rows?: number;
  /**
   * <@default=`'grey'`>
   */
  color?: string;
  className?: string;
  width: number | string;
  height: number | string;
  /**
   * <@default=`'rect'`>
   */
  shape?: 'rect' | 'circle';
  variant?: 'image' | 'text';
}

export const Placeholder: FC<PlaceholderProps> = memo(
  ({ rows, color, className, width, height, shape, variant }) =>
    variant === 'text' ? (
      <div
        className={classNames(
          className,
          'ztopia-placeholder',
          'ztopia-placeholder--text',
        )}
        style={{ width }}
      >
        {Array.from({ length: rows! }).map((_, i) => (
          <div
            key={i}
            style={{
              height,
              width: `${Math.random() * 100 + 50}%`,
              backgroundColor: color,
            }}
          />
        ))}
      </div>
    ) : (
      <div
        className={classNames(
          className,
          'ztopia-placeholder',
          `ztopia-placeholder--${shape}`,
          `ztopia-placeholder--${variant}`,
        )}
        style={{
          width,
          height,
          backgroundColor: color,
        }}
      ></div>
    ),
);

Placeholder.defaultProps = {
  rows: 1,
  color: 'grey',
  shape: 'rect',
};
