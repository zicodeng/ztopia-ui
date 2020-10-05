import React, { cloneElement, memo } from 'react';
import classNames from 'classnames';

import { IconImage } from '../Icons';

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

export const Placeholder = memo<PlaceholderProps>(
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

    const randomWidthPlaceholder = (
      <div
        style={{
          height,
          width: `${Math.random() * 80 + 20}%`,
          backgroundColor: color,
        }}
      />
    );

    return variant === 'text' ? (
      <div className={sharedClassNames} style={{ width }}>
        {rows === 1
          ? randomWidthPlaceholder
          : [
              ...Array.from({ length: rows - 1 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    height,
                    width: '100%',
                    backgroundColor: color,
                  }}
                />
              )),
              cloneElement(randomWidthPlaceholder, {
                key: rows,
              }),
            ]}
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
        {variant === 'image' && <IconImage />}
      </div>
    );
  },
);
