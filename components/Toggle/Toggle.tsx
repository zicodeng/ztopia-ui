import React, { ChangeEvent, memo } from 'react';
import BaseToggle, { ToggleIcons } from 'react-toggle';
import classNames from 'classnames';

import './Toggle.css';

export interface ToggleProps {
  /**
   * <@default=`false`>
   */
  isChecked: boolean;
  /**
   * <@default=`false`>
   */
  isDisabled: boolean;
  id: string;
  className: string;
  /**
   * <@default=`'medium'`>
   */
  size: 'small' | 'medium' | 'large';
  /**
   * <@default=`false`>
   */
  icons: boolean | ToggleIcons;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Toggle = memo<ToggleProps>(
  ({
    isChecked = false,
    isDisabled = false,
    id,
    className,
    size = 'medium',
    icons = false,
    onChange,
  }) => (
    <div
      className={classNames(
        className,
        'ztopia-toggle',
        `ztopia-toggle--${size}`,
        {
          'is-checked': isChecked,
          'is-disabled': isDisabled,
        },
      )}
    >
      <BaseToggle
        checked={isChecked}
        disabled={isDisabled}
        id={id}
        onChange={onChange}
        icons={icons}
      />
    </div>
  ),
);
