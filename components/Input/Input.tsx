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
  value?: string;
  label?: string;
  placeholder?: string;
  error?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<InputProps> = memo(
  ({ value, label, placeholder, error, onChange }) => {
    const [active, setActive] = useState(false);

    useEffect(() => {
      if (placeholder) {
        setActive(true);
      }
    }, [placeholder]);

    const handleFocusInput = useCallback(() => {
      setActive(true);
    }, []);

    const handleBlurInput = useCallback(() => {
      if (!value && !placeholder) {
        setActive(false);
      }
    }, [value]);

    return (
      <div className="ztopia-input">
        <label
          className={classNames('ztopia-input__label', {
            'ztopia-input__label--active': active,
          })}
        >
          {label}
        </label>
        <input
          value={value}
          placeholder={placeholder}
          className={classNames('ztopia-input__input')}
          onChange={onChange}
          onFocus={handleFocusInput}
          onBlur={handleBlurInput}
        />
        <div
          className={classNames('ztopia-input__bar', {
            'ztopia-input__bar--active': active,
            'ztopia-input__bar--invalid': Boolean(error),
          })}
        />
        {error && <span className="ztopia-input__error">{error}</span>}
      </div>
    );
  },
);

Input.defaultProps = {};
