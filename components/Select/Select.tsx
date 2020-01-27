import classNames from 'classnames';
import React, { FC, memo, ReactNode } from 'react';
import ReactSelect, { ActionMeta, ValueType } from 'react-select';

import './Select.css';

export interface SelectOption {
  value: string;
  label: ReactNode;
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
  /**
   * <@default=`false`>
   */
  isLoading?: boolean;
  /**
   * <@default=`true`>
   */
  isClearable?: boolean;
  maxMenuHeight?: number;
  name?: string;
  label?: string;
  /**
   * <@default=`'Select...'`>
   */
  placeholder?: string;
  className?: string;
  defaultValue?: SelectValue;
  value?: SelectValue;
  options?: SelectOption[];
  onChange?: (newValue: SelectValue, actionMeta: ActionMeta) => void;
}

export const Select: FC<SelectProps> = memo(
  ({
    isMulti = false,
    isSearchable = false,
    isLoading = false,
    isClearable = true,
    maxMenuHeight,
    label,
    placeholder = 'Select...',
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
        isSearchable={isSearchable}
        isLoading={isLoading}
        isClearable={isClearable}
        placeholder={placeholder}
        className={classNames('ztopia-select__container', {
          'is-multi': isMulti,
          'is-searchable': isSearchable,
        })}
        classNamePrefix="select"
        value={value}
        options={options}
        onChange={onChange}
        maxMenuHeight={maxMenuHeight}
      />
    </div>
  ),
);
