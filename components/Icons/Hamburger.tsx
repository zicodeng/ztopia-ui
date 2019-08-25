import classNames from 'classnames';
import React, { FC, memo } from 'react';

import { IconProps } from './';

import './Hamburger.css';

export interface HamburgerProps extends IconProps {
  isActive?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const Hamburger: FC<HamburgerProps> = memo(
  ({
    isActive,
    width,
    height,
    color,
    className,
    size = 'medium',
    ...restProps
  }) => (
    <div
      {...restProps}
      className={classNames(
        className,
        'ztopia-icon--hamburger',
        `ztopia-icon--${size}`,
        {
          'is-active': isActive,
        },
      )}
      style={{ width, height }}
    >
      <div
        className={classNames(
          'ztopia-icon--hamburger__bar',
          'ztopia-icon--hamburger__bar--top',
          {
            'is-active': isActive,
          },
        )}
        style={{
          backgroundColor: color,
        }}
      />
      <div
        className={classNames(
          'ztopia-icon--hamburger__bar',
          'ztopia-icon--hamburger__bar--middle',
          {
            'is-active': isActive,
          },
        )}
        style={{
          backgroundColor: color,
        }}
      />
      <div
        className={classNames(
          'ztopia-icon--hamburger__bar',
          'ztopia-icon--hamburger__bar--bottom',
          {
            'is-active': isActive,
          },
        )}
        style={{
          backgroundColor: color,
        }}
      />
    </div>
  ),
);
