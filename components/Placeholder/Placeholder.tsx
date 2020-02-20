import classNames from 'classnames';
import React, { FC, memo } from 'react';

import { Image } from '../Icons';

import './Placeholder.css';

export interface PlaceholderProps {
  /**
   * By default, placeholder is animated with fading effect
   *
   * <@default=`true`>
   */
  isAnimated?: boolean;
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
    isAnimated = true,
    rows = 1,
    color = 'grey',
    className,
    width = 200,
    height = 200,
    shape = 'rect',
    variant,
  }) => {
    const sharedClassNames = classNames(className, 'ztopia-placeholder', {
      'is-animated': isAnimated,
      [`ztopia-placeholder--${variant}`]: variant,
    });
    return variant === 'text' ? (
      <div className={sharedClassNames} style={{ width }}>
        {Array.from({ length: rows }).map((_, i) => (
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
        className={classNames(sharedClassNames, `ztopia-placeholder--${shape}`)}
        style={{
          width,
          height,
          backgroundColor: color,
        }}
      >
        {variant === 'image' && <Image />}
      </div>
    );
  },
);
