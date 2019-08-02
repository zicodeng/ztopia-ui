import classNames from 'classnames';
import React, { ChangeEvent, FC } from 'react';

import './Checkbox.css';

export interface CheckboxProps {
  /**
   * <@default=`false`>
   */
  checked?: boolean;
  label?: string;
  /**
   * If provided, clicking label will have the same effect as clicking checkbox
   */
  id?: string;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: FC<CheckboxProps> = ({
  checked,
  label,
  id,
  className,
  onChange,
}) => {
  return (
    <div className={classNames(className, 'ztopia-checkbox')}>
      <div className={classNames('ztopia-checkbox__input-container')}>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          className="ztopia-checkbox__input"
        />
        {checked && (
          <svg
            className="ztopia-checkbox__checkmark"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
            ></path>
          </svg>
        )}
      </div>
      {label && (
        <label
          htmlFor={id}
          className={classNames('ztopia-checkbox__label', {
            'ztopia-checkbox__label--actionable': Boolean(id),
          })}
        >
          {label}
        </label>
      )}
    </div>
  );
};

Checkbox.defaultProps = {
  checked: false,
};
