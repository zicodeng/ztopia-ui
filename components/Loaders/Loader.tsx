import classNames from 'classnames';
import { FC, memo } from 'react';

export interface LoaderProps {
  /**
   * <@default=`'#131518'`>
   */
  color?: string;
  className?: string;
  /**
   * <@default=`'medium'`>
   */
  size?: 'small' | 'medium' | 'large';
  children: (props: { color: string; className: string }) => JSX.Element;
}

export const Loader: FC<LoaderProps> = memo(
  ({ color = '#131518', className, size = 'medium', children }) =>
    children({
      color,
      className: classNames(
        'ztopia-loader',
        `ztopia-loader--${size}`,
        className,
      ),
    }),
);
