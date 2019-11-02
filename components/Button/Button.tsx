import classNames from 'classnames';
import React, {
  cloneElement,
  FC,
  isValidElement,
  memo,
  ReactNode,
  useMemo,
} from 'react';

import { BasicLoader, LoaderProps } from '../Loaders';

import './Button.css';

export interface ButtonProps {
  /**
   * Ghost buttons are generally bordered by a very thin line,
   * while the internal section consists of plain text.
   * They most often appear as Call to Action (CTA) buttons and offer a clean look
   *
   * <@default=`false`>
   */
  isGhost?: boolean;
  /**
   * <@default=`false`>
   */
  isDisabled?: boolean;
  /**
   * <@default=`false`>
   */
  isLoading?: boolean;
  /**
   * <@default=`'button'`>
   */
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  /**
   * <@default=`'rect'`>
   */
  variant?: 'rect' | 'circle' | 'pill' | 'text' | 'icon';
  /**
   * <@default=`'medium'`>
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * A Ztopia Loader either in function form (`MusicLoader`) or element form (`<MusicLoader />`)
   *
   * <@default=`null`>
   */
  loader?: ReactNode | FC<LoaderProps>;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button: FC<ButtonProps> = memo<ButtonProps>(
  ({
    isGhost = false,
    isDisabled = false,
    isLoading = false,
    type = 'button',
    className,
    variant = 'rect',
    size = 'medium',
    loader,
    children,
    onClick,
  }) => {
    const memoizedLoader = useMemo(() => {
      if (typeof loader === 'object' && isValidElement(loader)) {
        return cloneElement(loader, { isCentered: true });
      }

      if (typeof loader === 'function') {
        const Loader = loader;
        return <Loader isCentered />;
      }

      return <BasicLoader isCentered size="small" color="#ffffff" />;
    }, [loader]);

    return (
      <button
        disabled={isDisabled}
        type={type}
        className={classNames(
          className,
          'ztopia-button',
          `ztopia-button--${variant}`,
          `ztopia-button--${size}`,
          {
            'is-ghost': isGhost,
            'is-loading': isLoading,
          },
        )}
        onClick={isLoading ? undefined : onClick}
      >
        {children}
        {isLoading && memoizedLoader}
      </button>
    );
  },
);
