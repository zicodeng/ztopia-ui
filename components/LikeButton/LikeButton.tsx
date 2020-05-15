import React, { memo, useMemo } from 'react';
import classNames from 'classnames';

import {
  IconHeartRegular,
  IconHeartSolid,
  IconThumbsUpRegular,
  IconThumbsUpSolid,
} from '../Icons';

import './LikeButton.css';

export interface LikeButtonProps {
  /**
   * <@default=`false`>
   */
  isLiked?: boolean;
  className?: string;
  /**
   * <@default=`medium`>
   */
  size?: 'small' | 'medium' | 'large';
  variant?: 'heart' | 'thumbs-up';
  onClick?: () => void;
}

export const LikeButton = memo<LikeButtonProps>(
  ({
    isLiked = false,
    className,
    size = 'medium',
    variant = 'heart',
    onClick,
    ...restProps
  }) => {
    const icon = useMemo(() => {
      if (variant === 'heart') {
        return (
          <>
            <IconHeartRegular
              size={size}
              className={classNames(
                'ztopia-like-button__heart',
                'ztopia-like-button__heart--regular',
                {
                  'is-liked': isLiked,
                },
              )}
            />
            <IconHeartSolid
              size={size}
              className={classNames(
                'ztopia-like-button__heart',
                'ztopia-like-button__heart--solid',
                {
                  'is-liked': isLiked,
                },
              )}
            />
          </>
        );
      } else if (variant === 'thumbs-up') {
        const sharedClassNames = classNames('ztopia-like-button__thumbs-up');
        if (isLiked)
          return <IconThumbsUpSolid size={size} className={sharedClassNames} />;
        else
          return (
            <IconThumbsUpRegular size={size} className={sharedClassNames} />
          );
      }

      return null;
    }, [size, isLiked]);

    return (
      <button
        className={classNames(
          className,
          'ztopia-like-button',
          `ztopia-like-button--${size}`,
          `ztopia-like-button--${variant}`,
          {
            'is-liked': isLiked,
          },
        )}
        onClick={onClick}
        {...restProps}
      >
        {icon}
      </button>
    );
  },
);
