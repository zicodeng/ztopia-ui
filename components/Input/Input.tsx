import React, {
  ChangeEvent,
  cloneElement,
  CSSProperties,
  forwardRef,
  isValidElement,
  memo,
  ReactNode,
  Ref,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';

import './Input.css';

export interface InputProps {
  isDisabled?: boolean;
  min?: number;
  max?: number;
  /**
   * <@default=`'text'`>
   */
  type?: string;
  value?: string | number;
  defaultValue?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  error?: string;
  /**
   * If defined, value will be by split and shown as tags on input blur
   */
  delimiter?: string;
  className?: string;
  /**
   * <@default=`'rect'`>
   */
  variant?: 'material' | 'rect' | 'pill';
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  style?: CSSProperties;
  ref?: Ref<HTMLInputElement>;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
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
        delimiter,
        className,
        variant = 'rect',
        prefixIcon,
        suffixIcon,
        style,
        onChange,
        onFocus,
        onBlur,
        ...restProps
      },
      ref,
    ) => {
      const inputRef = useRef<HTMLInputElement>(null);
      const inputContainerRef = useRef<HTMLDivElement>(null);

      const isDefaultActive = Boolean(
        placeholder ||
          typeof value === 'number' ||
          value ||
          typeof defaultValue === 'number' ||
          defaultValue,
      );

      const [isActive, setIsActive] = useState(isDefaultActive);
      const [isInputContainerFocused, setIsInputContainerFocused] = useState(
        false,
      );

      const handleInputContainerClick = useCallback(() => {
        const inputEl = inputRef.current;
        if (inputEl) inputEl.focus();
      }, []);

      const handleInputFocus = useCallback(
        (e) => {
          setIsInputContainerFocused(true);
          setIsActive(true);

          if (onFocus) onFocus(e);
        },
        [onFocus],
      );

      const handleInputBlur = useCallback(
        (e) => {
          setIsInputContainerFocused(false);
          setIsActive(isDefaultActive);

          if (onBlur) onBlur(e);
        },
        [isDefaultActive, onBlur],
      );

      const handleWindowClick = useCallback(
        (e) => {
          if (isDisabled) return;

          const inputContainerEl = inputContainerRef.current;
          const isFocused = Boolean(
            inputContainerEl && inputContainerEl.contains(e.target),
          );

          setIsInputContainerFocused(isFocused);
          setIsActive(isFocused || isDefaultActive);
        },
        [isDefaultActive, isDisabled],
      );

      useEffect(() => {
        window.addEventListener('mousedown', handleWindowClick, false);

        return () => {
          window.removeEventListener('mousedown', handleWindowClick, false);
        };
      }, [handleWindowClick]);

      useEffect(() => {
        setIsActive(isDefaultActive);
      }, [isDefaultActive]);

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
          style={style}
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
          <div
            tabIndex={-1}
            ref={inputContainerRef}
            className={classNames(
              'ztopia-input__input-container',
              `ztopia-input__input-container--${variant}`,
              {
                'has-error': Boolean(error),
                'has-prefix-icon': Boolean(prefixIcon),
                'has-suffix-icon': Boolean(suffixIcon),
                'is-disabled': isDisabled,
                'is-focused': isInputContainerFocused,
              },
            )}
            onClick={handleInputContainerClick}
          >
            {memoizedPrefixIcon && memoizedPrefixIcon}
            {delimiter &&
            value &&
            typeof value === 'string' &&
            !isInputContainerFocused ? (
              <ul className={classNames('ztopia-input__tags')}>
                {value.split(delimiter).map((tag, i) => (
                  <li key={i} className={classNames('ztopia-input__tag')}>
                    {tag}
                  </li>
                ))}
              </ul>
            ) : (
              <input
                {...restProps}
                autoComplete="on"
                ref={inputRef || ref}
                name={name}
                disabled={isDisabled}
                type={type}
                value={value}
                defaultValue={defaultValue}
                placeholder={placeholder}
                className={classNames(
                  'ztopia-input__input',
                  `ztopia-input__input--${variant}`,
                )}
                onChange={onChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />
            )}
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
