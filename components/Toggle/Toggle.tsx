import classNames from 'classnames';
import React, { ChangeEvent, FC, memo } from 'react';
import BaseToggle, { ToggleIcons } from 'react-toggle';

import './Toggle.css';

export interface ToggleProps {
  /**
   * <@default=`false`>
   */
  checked: boolean;
  /**
   * <@default=`false`>
   */
  disabled: boolean;
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

export const Toggle: FC<ToggleProps> = memo(
  ({ checked, disabled, id, className, size, icons, onChange }) => {
    return (
      <div
        className={classNames(
          className,
          'ztopia-toggle',
          `ztopia-toggle--${size}`,
          {
            'ztopia-toggle--checked': checked,
            'ztopia-toggle--disabled': disabled,
          },
        )}
      >
        <BaseToggle
          checked={checked}
          disabled={disabled}
          id={id}
          onChange={onChange}
          icons={icons}
        />
      </div>
    );
  },
);

Toggle.defaultProps = {
  checked: false,
  disabled: false,
  size: 'medium',
  icons: false,
};
