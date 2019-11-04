import React, { FC, memo } from 'react';
import classNames from 'classnames';

import { HeartRegular, HeartSolid } from '../Icons';

import './LikeButton.css';

export interface LikeButton {
  /**
   * <@default=`false`>
   */
  isLiked?: boolean;
  className?: string;
  onClick?: () => void;
}

export const LikeButton: FC<LikeButton> = memo(
  ({ isLiked = false, className, onClick }) => (
    <button
      className={classNames(className, 'ztopia-like-button', {
        'is-liked': isLiked,
      })}
      onClick={onClick}
    >
      <HeartRegular
        size="large"
        className={classNames(
          'ztopia-like-button__heart',
          'ztopia-like-button__heart--regular',
          {
            'is-liked': isLiked,
          },
        )}
      />
      <HeartSolid
        size="large"
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
