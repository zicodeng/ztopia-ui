import classNames from 'classnames';
import React, {
  ChangeEvent,
  forwardRef,
  memo,
  useCallback,
  useState,
  ReactNode,
  useMemo,
  isValidElement,
  cloneElement,
  Ref,
} from 'react';

import './Input.css';

export interface InputProps {
  isDisabled?: boolean;
  /**
   * <@default=`'text'`>
   */
  type?: string;
  value?: string;
  defaultValue?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  error?: string;
  className?: string;
  /**
   * <@default=`'rect'`>
   */
  variant?: 'material' | 'rect' | 'pill';
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  ref?: Ref<HTMLInputElement>;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = memo(
  forwardRef<HTMLInputElement, InputProps>(
    (
      {
        isDisabled,
        type,
        value,
        defaultValue,
        name,
        label,
        placeholder,
        error,
        className,
        variant = 'rect',
        prefixIcon,
        suffixIcon,
        onChange,
        ...restProps
      },
      ref,
    ) => {
      const [isActive, setIsActive] = useState(
        Boolean(placeholder || value || defaultValue),
      );

      const handleFocusInput = useCallback(() => {
        setIsActive(true);
      }, []);

      const handleBlurInput = useCallback(() => {
        if (!placeholder && !value && !defaultValue) setIsActive(false);
      }, [placeholder, value, defaultValue]);

      const memoizedPrefixIcon = useMemo(() => {
        const prefixIconClassName = classNames(
          'ztopia-input__prefix-icon',
          `ztopia-input__prefix-icon--${variant}`,
        );
        if (typeof prefixIcon === 'function') {
          const PrefixIcon = prefixIcon;
          return <PrefixIcon className={prefixIconClassName} />;
        }
        if (typeof prefixIcon === 'object' && isValidElement(prefixIcon)) {
          return cloneElement(prefixIcon, {
            className: classNames(
              prefixIcon.props.className,
              prefixIconClassName,
            ),
          });
        }
        return null;
      }, [prefixIcon, variant]);

      const memoizedSuffixIcon = useMemo(() => {
        const suffixIconClassName = classNames(
          'ztopia-input__suffix-icon',
          `ztopia-input__suffix-icon--${variant}`,
        );
        if (typeof suffixIcon === 'function') {
          const SuffixIcon = suffixIcon;
          return <SuffixIcon className={suffixIconClassName} />;
        }
        if (typeof suffixIcon === 'object' && isValidElement(suffixIcon)) {
          return cloneElement(suffixIcon, {
            className: classNames(
              suffixIcon.props.className,
              suffixIconClassName,
            ),
          });
        }
        return null;
      }, [suffixIcon, variant]);

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
              htmlFor={name}
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
          <div className="ztopia-input__input-container">
            {memoizedPrefixIcon && memoizedPrefixIcon}
            <input
              {...restProps}
              autoComplete="on"
              ref={ref}
              name={name}
              disabled={isDisabled}
              type={type}
              value={value}
              defaultValue={defaultValue}
              placeholder={placeholder}
              className={classNames(
                'ztopia-input__input',
                `ztopia-input__input--${variant}`,
                {
                  'has-error': Boolean(error),
                  'has-prefix-icon': Boolean(prefixIcon),
                  'has-suffix-icon': Boolean(suffixIcon),
                },
              )}
              onChange={onChange}
              onFocus={handleFocusInput}
              onBlur={handleBlurInput}
            />
            {variant === 'material' && (
              <div
                className={classNames('ztopia-input__bar', {
                  'has-error': Boolean(error),
                })}
              />
            )}
            {memoizedSuffixIcon && memoizedSuffixIcon}
          </div>
          {error && <span className="ztopia-input__error">{error}</span>}
        </div>
      );
    },
  ),
);
