import classNames from 'classnames';
import React, { FC, memo } from 'react';

import './Button.css';

export interface ButtonProps {
  /**
   * <@default=`false`>
   * Ghost buttons are generally bordered by a very thin line,
   * while the internal section consists of plain text.
   * They most often appear as Call to Action (CTA) buttons and offer a clean look
   */
  isGhost?: boolean;
  className?: string;
  /**
   * <@default=`'rect'`>
   */
  variant?: 'rect' | 'circle' | 'pill' | 'text';
  /**
   * <@default=`'medium'`>
   */
  size?: 'small' | 'medium' | 'large';
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button: FC<ButtonProps> = memo(
  ({ isGhost, className, variant, size, children, ...restProps }) => (
    <button
      className={classNames(
        className,
        'ztopia-button',
        `ztopia-button--${variant}`,
        `ztopia-button--${size}`,
        {
          'is-ghost': isGhost,
        },
      )}
      {...restProps}
    >
      {children}
    </button>
  ),
);

Button.defaultProps = {
  isGhost: false,
  variant: 'rect',
  size: 'medium',
};
