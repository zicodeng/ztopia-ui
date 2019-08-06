import classNames from 'classnames';
import React, {
  ChangeEvent,
  FC,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';

import './Input.css';

export interface InputProps {
  /**
   * <@default=`'text'`>
   */
  type?: string;
  value?: string;
  label?: string;
  placeholder?: string;
  error?: string;
  /**
   * <@default=`'rect'`>
   */
  variant?: 'material' | 'rect' | 'pill';
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<InputProps> = memo(
  ({ type, value, label, placeholder, error, variant, onChange }) => {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
      if (placeholder) {
        setIsActive(true);
      }
    }, [placeholder]);

    const handleFocusInput = useCallback(() => {
      setIsActive(true);
    }, []);

    const handleBlurInput = useCallback(() => {
      if (!value && !placeholder) {
        setIsActive(false);
      }
    }, [value]);

    return (
      <div className={classNames('ztopia-input', `ztopia-input--${variant}`)}>
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
);

Input.defaultProps = {
  variant: 'rect',
};
