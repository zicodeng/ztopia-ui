import React, { memo } from 'react';
import classNames from 'classnames';

import { HeartRegular, HeartSolid } from '../Icons';

import './LikeButton.css';

export interface LikeButton {
  /**
   * <@default=`false`>
   */
  isLiked?: boolean;
  className?: string;
  /**
   * <@default=`medium`>
   */
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

export const LikeButton = memo<LikeButton>(
  ({ isLiked = false, className, size = 'medium', onClick, ...restProps }) => (
    <button
      className={classNames(
        className,
        'ztopia-like-button',
        `ztopia-like-button--${size}`,
        {
          'is-liked': isLiked,
        },
      )}
      onClick={onClick}
      {...restProps}
    >
      <HeartRegular
        size={size}
        className={classNames(
          'ztopia-like-button__heart',
          'ztopia-like-button__heart--regular',
          {
            'is-liked': isLiked,
          },
        )}
      />
      <HeartSolid
        size={size}
        className={classNames(
          'ztopia-like-button__heart',
          'ztopia-like-button__heart--solid',
          {
            'is-liked': isLiked,
          },
        )}
      />
    </button>
  ),
);
