import { memo } from 'react';
import classNames from 'classnames';

import './Loader.css';

export interface LoaderProps {
  /**
   * <@default=`false`>
   */
  isCentered?: boolean;
  /**
   * <@default=`'#131518'`>
   */
  color?: string;
  className?: string;
  /**
   * <@default=`'medium'`>
   */
  size?: 'small' | 'medium' | 'large';
  children?: (props: { color: string; className: string }) => JSX.Element;
}

export const Loader = memo<LoaderProps>(
  ({
    isCentered = false,
    color = '#131518',
    className,
    size = 'medium',
    children,
  }) =>
    children
      ? children({
          color,
          className: classNames(
            'ztopia-loader',
            `ztopia-loader--${size}`,
            className,
            {
              'is-centered': isCentered,
            },
          ),
        })
      : null,
);
