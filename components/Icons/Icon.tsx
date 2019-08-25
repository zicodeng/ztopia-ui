import classNames from 'classnames';
import { cloneElement, FC, isValidElement, memo } from 'react';

import './Icon.css';

export interface IconProps {
  /**
   * Some special icons have active state
   */
  isActive?: boolean;
  width?: number;
  height?: number;
  /**
   * <@default=`'currentColor'`>
   */
  color?: string;
  className?: string;
  /**
   * <@default=`'medium'`>
   */
  size?: 'small' | 'medium' | 'large';
  onClick?: (
    e: React.MouseEvent<SVGElement | HTMLDivElement, MouseEvent>,
  ) => void;
}

export const Icon: FC<IconProps> = memo(
  ({
    isActive,
    width,
    height,
    color = 'currentColor',
    className,
    size,
    children,
    onClick,
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
              'is-active': isActive,
            },
          ),
          style: {
            width,
            height,
            color,
          },
          onClick,
        })
      : null,
);

Icon.defaultProps = {
  size: 'medium',
};
