import classNames from 'classnames';
import React, { FC, memo, ReactNode } from 'react';
import {
  ActionMeta,
  OptionsType,
  OptionTypeBase,
  StylesConfig,
} from 'react-select';
import WindowedSelect from 'react-windowed-select';

import './Select.css';

export type SelectOption = { label: ReactNode; value: string };

export type SelectValue = SelectOption | SelectOption[] | null;

export interface SelectProps<OptionType extends OptionTypeBase = SelectOption> {
  /**
   * Enable isMulti selection
   *
   * <@default=`false`>
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
  /**
   * <@default=`undefined`>
   */
  maxSelectedOptions?: number;
  name?: string;
  label?: string;
  error?: string;
  /**
   * <@default=`'Select...'`>
   */
  placeholder?: string;
  className?: string;
  defaultValue?: SelectValue;
  value?: SelectValue;
  options?: OptionsType<OptionType>;
  styles?: StylesConfig;
  /**
   * <@default=`() => 'No options'`>
   */
  renderNoOptionMessage?: (obj: { inputValue: string }) => ReactNode;
  /**
   * <@default=`() => 'Cannot select more than N options'`>
   */
  renderMaxSelectedOptionsReachedMessage?: (obj: {
    inputValue: string;
  }) => ReactNode;
  onChange?: (newValue: SelectValue, actionMeta: ActionMeta) => void;
}

export const Select: FC<SelectProps> = memo(
  ({
    isMulti = false,
    isSearchable = false,
    isLoading = false,
    isClearable = true,
    maxMenuHeight = 200,
    maxSelectedOptions,
    label,
    error,
    placeholder = 'Select...',
    className,
    value,
    options,
    renderNoOptionMessage = () => 'No option',
    renderMaxSelectedOptionsReachedMessage,
    onChange,
    ...restProps
  }) => {
    const isMaxSelectedOptionsReached = Boolean(
      isMulti &&
        value &&
        Array.isArray(value) &&
        maxSelectedOptions &&
        value.length >= maxSelectedOptions,
    );

    if (isMaxSelectedOptionsReached) {
      renderMaxSelectedOptionsReachedMessage = () =>
        `Cannot select more than ${(value as SelectOption[]).length} options`;
    }

    return (
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
          maxMenuHeight={maxMenuHeight}
          placeholder={placeholder}
          className={classNames('ztopia-select__container', {
            'is-multi': isMulti,
            'is-searchable': isSearchable,
            'has-error': Boolean(error),
          })}
          classNamePrefix="select"
          value={value}
          options={isMaxSelectedOptionsReached ? [] : options}
          noOptionsMessage={
            renderMaxSelectedOptionsReachedMessage || renderNoOptionMessage
          }
          onChange={onChange}
        />
        {error && <span className="ztopia-select__error">{error}</span>}
      </div>
    );
  },
);
