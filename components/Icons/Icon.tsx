import classNames from 'classnames';
import React, {
  cloneElement,
  FC,
  isValidElement,
  memo,
  CSSProperties,
  SVGProps,
} from 'react';

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
  /**
   * <@default=`'medium'`>
   */
  size?: 'small' | 'medium' | 'large';
}

export const InnerIcon: FC<BaseIconProps> = memo(
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
