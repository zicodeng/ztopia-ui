import classNames from 'classnames';
import React, { FC, memo, ReactNode } from 'react';
import {
  ActionMeta,
  ValueType,
  OptionsType,
  OptionTypeBase,
  StylesConfig,
} from 'react-select';
import WindowedSelect from 'react-windowed-select';

import './Select.css';

export type SelectOption = { label: ReactNode; value: string };

export type SelectValue = ValueType<SelectOption>;

export interface SelectProps<OptionType extends OptionTypeBase = SelectOption> {
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
  /**
   * <@default=`200`>
   */
  maxMenuHeight?: number;
  name?: string;
  label?: string;
  /**
   * <@default=`'Select...'`>
   */
  placeholder?: string;
  /**
   * <@default=`'No options'`>
   */
  noOptionsMessage?: string;
  className?: string;
  defaultValue?: SelectValue;
  value?: ValueType<OptionType>;
  options?: OptionsType<OptionType>;
  styles?: StylesConfig;
  onChange?: (newValue: SelectValue, actionMeta: ActionMeta) => void;
}

export const Select: FC<SelectProps> = memo(
  ({
    isMulti = false,
    isSearchable = false,
    isLoading = false,
    isClearable = true,
    maxMenuHeight = 200,
    label,
    placeholder = 'Select...',
    noOptionsMessage = 'No options',
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
      <WindowedSelect
        {...restProps}
        isMulti={isMulti}
        isSearchable={isSearchable}
        isLoading={isLoading}
        isClearable={isClearable}
        placeholder={placeholder}
        noOptionsMessage={noOptionsMessage}
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
