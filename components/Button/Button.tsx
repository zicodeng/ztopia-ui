import React, {
  cloneElement,
  CSSProperties,
  FC,
  isValidElement,
  memo,
  ReactNode,
  useMemo,
} from 'react';
import classNames from 'classnames';

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
  className?: string;
  /**
   * <@default=`{}`>
   */
  style?: CSSProperties;
  children?: ReactNode;
  /**
   * <@default=`'button'`>
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * <@default=`'rect'`>
   */
  variant?: 'rect' | 'circle' | 'pill' | 'text' | 'icon';
  /**
   * <@default=`'medium'`>
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * <@default=`button`>
   */
  element?: 'button' | 'span';
  /**
   * A Ztopia Loader either in function form (`MusicLoader`) or element form (`<MusicLoader />`)
   *
   * <@default=`null`>
   */
  loader?: ReactNode | FC<LoaderProps>;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button = memo<ButtonProps>(
  ({
    isGhost = false,
    isDisabled = false,
    isLoading = false,
    className,
    style = {},
    children,
    type = 'button',
    variant = 'rect',
    size = 'medium',
    element = 'button',
    loader,
    onClick,
    ...restProps
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

    const sharedClassNames = classNames(
      className,
      'ztopia-button',
      `ztopia-button--${variant}`,
      `ztopia-button--${size}`,
      {
        'is-ghost': isGhost,
        'is-loading': isLoading,
      },
    );

    if (element === 'span') {
      return (
        <span style={style} className={sharedClassNames} {...restProps}>
          {children}
        </span>
      );
    }

    return (
      <button
        disabled={isDisabled}
        type={type}
        style={style}
        className={sharedClassNames}
        onClick={isLoading ? undefined : onClick}
        {...restProps}
      >
        {children}
        {isLoading && memoizedLoader}
      </button>
    );
  },
);
