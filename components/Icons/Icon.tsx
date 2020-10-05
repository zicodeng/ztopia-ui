import React, {
  cloneElement,
  CSSProperties,
  isValidElement,
  memo,
  ReactNode,
  SVGProps,
} from 'react';
import classNames from 'classnames';

import './Icon.css';

export interface BaseIconProps {
  /**
   * <@default=`false`>
   *
   * Action icon will make cursor pointer type
   */
  isAction?: boolean;
  width?: number;
  height?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  /**
   * <@default=`'medium'`>
   */
  size?: 'small' | 'medium' | 'large';
}

export const InnerIcon = memo<BaseIconProps>(
  ({
    isAction = false,
    width,
    height,
    color,
    className,
    style,
    size = 'medium',
    children,
    ...restProps
  }) =>
    isValidElement(children)
      ? cloneElement(children, {
          'aria-hidden': 'true',
          focusable: 'false',
          role: 'img',
          xmlns: 'http://www.w3.org/2000/svg',
          className: classNames(
            className,
            'ztopia-icon',
            `ztopia-icon--${size}`,
            {
              'is-action': isAction,
            },
          ),
          style: {
            width,
            height,
            color,
            ...style,
          },
          ...restProps,
        })
      : null,
);

export type IconProps = BaseIconProps & SVGProps<SVGSVGElement>;

export const Icon = (props: IconProps) => <InnerIcon {...props} />;
