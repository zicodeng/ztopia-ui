import classNames from 'classnames';
import React, { ChangeEvent, FC } from 'react';

import { Checkmark } from '../Icons';

import './Checkbox.css';

export interface CheckboxProps {
  /**
   * <@default=`false`>
   */
  isChecked?: boolean;
  label?: string;
  /**
   * If provided, clicking label will have the same effect as clicking checkbox
   */
  id?: string;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: FC<CheckboxProps> = ({
  isChecked,
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
          checked={isChecked}
          onChange={onChange}
          className="ztopia-checkbox__input"
        />
        {isChecked && <Checkmark size="small" />}
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
  isChecked: false,
};
