import classNames from 'classnames';
import React, { FC, memo } from 'react';
import ReactSelect from 'react-select';
import { ActionMeta, ValueType } from 'react-select/src/types';

import './Select.css';

export interface SelectOption {
  value: string;
  label: string;
}

export type SelectValue = ValueType<SelectOption>;

export interface SelectProps {
  /**
   * <@default=`false`>
   *
   * Enable isMulti selection
   */
  isMulti?: boolean;
  /**
   * <@default=`false`>
   *
   */
  isSearchable?: boolean;
  maxMenuHeight?: number;
  label?: string;
  className?: string;
  defaultValue?: SelectValue;
  value?: SelectValue;
  options?: SelectOption[];
  onChange?: (newValue: SelectValue, actionMeta: ActionMeta) => void;
}

export const Select: FC<SelectProps> = memo(
  ({
    isMulti,
    maxMenuHeight,
    label,
    className,
    value,
    options,
    onChange,
    ...restProps
  }) => (
    <div
      className={classNames(className, 'ztopia-select', {
        'is-multi': isMulti,
      })}
    >
      {label && <label className="ztopia-select__label">{label}</label>}
      <ReactSelect
        {...restProps}
        isMulti={isMulti}
        className="ztopia-select__container"
        classNamePrefix="select"
        value={value}
        options={options}
        onChange={onChange}
        maxMenuHeight={maxMenuHeight}
      />
    </div>
  ),
);

Select.defaultProps = {
  isMulti: false,
  isSearchable: false,
};
