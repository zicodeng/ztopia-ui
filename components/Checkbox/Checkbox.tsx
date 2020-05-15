import React, { ChangeEvent, memo } from 'react';
import classNames from 'classnames';

import { IconCheckmark } from '../Icons';

import './Checkbox.css';

export interface CheckboxProps {
  /**
   * <@default=`false`>
   */
  isChecked?: boolean;
  /**
   * <@default=`false`>
   */
  isBorderRounded?: boolean;
  label?: string;
  /**
   * If provided, clicking label will have the same effect as clicking checkbox
   */
  id?: string;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = memo<CheckboxProps>(
  ({
    isChecked = false,
    isBorderRounded = false,
    label,
    id,
    className,
    size = 'medium',
    onChange,
  }) => (
    <div className={classNames(className, 'ztopia-checkbox')}>
      <div
        className={classNames(
          'ztopia-checkbox__input-container',
          `ztopia-checkbox__input-container--${size}`,
          {
            'is-border-rounded': isBorderRounded,
          },
        )}
      >
        <input
          type="checkbox"
          id={id}
          checked={isChecked}
          onChange={onChange}
          className="ztopia-checkbox__input"
        />
        {isChecked && <IconCheckmark size="small" />}
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
  ),
);
