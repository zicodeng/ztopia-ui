import React, { memo } from 'react';
import classNames from 'classnames';

import { BaseIconProps } from './';

import './IconHamburger.css';

export interface HamburgerProps extends BaseIconProps {
  isActive?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const IconHamburger = memo<HamburgerProps>(
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
