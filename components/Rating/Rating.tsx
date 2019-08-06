import classNames from 'classnames';
import React, { FC, memo } from 'react';
import BaseRating from 'react-rating';

import { HeartRegular, HeartSolid, StarRegular, StarSolid } from '../Icons';

export interface RatingProps {
  /**
   * <@default=`false`>
   */
  isReadonly?: boolean;
  /**
   * <@default=`1`>
   */
  fraction?: number;
  /**
   * <@default=`30`>
   *
   * Width of each symbol
   */
  width?: number;
  value?: number;
  /**
   * <@default=`'#ffec40'`>
   *
   * Color of each symbol
   */
  color?: string;
  /**
   * <@default=`'star'`>
   */
  variant?: 'star' | 'heart';
  /**
   * <@default=`'medium'`>
   */
  size?: 'small' | 'medium' | 'large';
  onChange?: (value: number) => void;
}

export const Rating: FC<RatingProps> = memo(
  ({
    isReadonly,
    fraction,
    width,
    value,
    color,
    variant,
    size,
    ...restProps
  }) => {
    const symbolProps = {
      width,
      color,
      size,
    };
    return (
      <BaseRating
        readonly={isReadonly}
        fractions={fraction}
        initialRating={value}
        className="ztopia-rating"
        fullSymbol={
          variant === 'star' ? (
            <StarSolid {...symbolProps} />
          ) : (
            <HeartSolid {...symbolProps} />
          )
        }
        emptySymbol={
          variant === 'star' ? (
            <StarRegular {...symbolProps} />
          ) : (
            <HeartRegular {...symbolProps} />
          )
        }
        {...restProps}
      />
    );
  },
);

Rating.defaultProps = {
  isReadonly: false,
  fraction: 1,
  color: '#ffec40',
  variant: 'star',
  size: 'medium',
};
