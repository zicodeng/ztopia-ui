import classNames from 'classnames';
import { cloneElement, FC, isValidElement, memo } from 'react';

import './Icon.css';

export interface IconProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
  /**
   * <@default=`'medium'`>
   */
  size?: 'small' | 'medium' | 'large';
}

export interface SVGProps extends IconProps {
  onClick?: (e: React.MouseEvent<SVGElement, MouseEvent>) => void;
}

export const Icon: FC<SVGProps> = memo(
  ({ width, height, color, className, size, children, onClick }) =>
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
