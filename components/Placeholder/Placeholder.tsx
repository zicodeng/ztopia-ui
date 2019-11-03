import classNames from 'classnames';
import React, { FC, memo } from 'react';

import { Image } from '../Icons';

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
  /**
   * <@default=`200`>
   */
  width?: number | string;
  /**
   * <@default=`200`>
   */
  height?: number | string;
  /**
   * <@default=`'rect'`>
   */
  shape?: 'rect' | 'circle';
  variant?: 'image' | 'text';
}

export const Placeholder: FC<PlaceholderProps> = memo(
  ({
    rows = 1,
    color = 'grey',
    className,
    width = 200,
    height = 200,
    shape = 'rect',
    variant,
  }) =>
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
              width: `${Math.random() * 80 + 50}%`,
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
      >
        {variant === 'image' && <Image />}
      </div>
    ),
);
