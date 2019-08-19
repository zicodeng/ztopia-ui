import classNames from 'classnames';
import React, {
  ChangeEvent,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';

import './Input.css';

export interface InputProps {
  isDisabled?: boolean;
  /**
   * <@default=`'text'`>
   */
  type?: string;
  value?: string;
  label?: string;
  placeholder?: string;
  error?: string;
  className?: string;
  /**
   * <@default=`'rect'`>
   */
  variant?: 'material' | 'rect' | 'pill';
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = memo(
  forwardRef<HTMLInputElement, InputProps>(
    (
      {
        isDisabled,
        type,
        value,
        label,
        placeholder,
        error,
        className,
        variant = 'rect',
        onChange,
        ...restProps
      },
      ref,
    ) => {
      const [isActive, setIsActive] = useState(false);

      useEffect(() => {
        if (placeholder || value) {
          setIsActive(true);
        }
      }, [placeholder, value]);

      const handleFocusInput = useCallback(() => {
        setIsActive(true);
      }, []);

      const handleBlurInput = useCallback(() => {
        if (!value && !placeholder) setIsActive(false);
      }, [value]);

      return (
        <div
          className={classNames(
            className,
            'ztopia-input',
            `ztopia-input--${variant}`,
          )}
        >
          {label && (
            <label
              className={classNames(
                'ztopia-input__label',
                `ztopia-input__label--${variant}`,
                {
                  'is-active': isActive,
                },
              )}
            >
              {label}
            </label>
          )}
          <input
            {...restProps}
            ref={ref}
            disabled={isDisabled}
            type={type}
            value={value}
            placeholder={placeholder}
            className={classNames(
              'ztopia-input__input',
              `ztopia-input__input--${variant}`,
              {
                'has-error': Boolean(error),
              },
            )}
            onChange={onChange}
            onFocus={handleFocusInput}
            onBlur={handleBlurInput}
          />
          {variant === 'material' && (
            <div
              className={classNames('ztopia-input__bar', {
                'is-active': isActive,
                'has-error': Boolean(error),
              })}
            />
          )}
          {error && <span className="ztopia-input__error">{error}</span>}
        </div>
      );
    },
  ),
);
