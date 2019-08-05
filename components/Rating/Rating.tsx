import React, { FC, memo } from 'react';
import BaseRating from 'react-rating';

export interface RatingProps {
  /**
   * <@default=`false`>
   */
  readonly?: boolean;
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
  onChange?: (value: number) => void;
}

export const Rating: FC<RatingProps> = memo(
  ({ fraction, width, value, color, variant, ...restProps }) => (
    <BaseRating
      fractions={fraction}
      initialRating={value}
      className="ztopia-rating"
      fullSymbol={
        variant === 'star' ? (
          <svg
            aria-hidden="true"
            focusable="false"
            data-icon="star"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            className="ztopia-rating__symbol ztopia-rating__symbol--full"
            width={width}
            color={color}
          >
            <path
              fill="currentColor"
              d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
            ></path>
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            focusable="false"
            data-icon="heart"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width={width}
            color={color}
          >
            <path
              fill="currentColor"
              d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
            ></path>
          </svg>
        )
      }
      emptySymbol={
        variant === 'star' ? (
          <svg
            aria-hidden="true"
            focusable="false"
            data-icon="star"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            className="ztopia-rating__symbol ztopia-rating__symbol--empty"
            width={width}
            color={color}
          >
            <path
              fill="currentColor"
              d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"
            ></path>
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            focusable="false"
            data-icon="heart"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width={width}
            color={color}
          >
            <path
              fill="currentColor"
              d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"
            ></path>
          </svg>
        )
      }
      {...restProps}
    />
  ),
);

Rating.defaultProps = {
  readonly: false,
  fraction: 1,
  width: 30,
  color: '#ffec40',
  variant: 'star',
};
