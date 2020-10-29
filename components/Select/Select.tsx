import React, { CSSProperties, memo, ReactNode, useCallback } from 'react';
import {
  ActionMeta,
  OptionsType,
  OptionTypeBase,
  StylesConfig,
} from 'react-select';
import WindowedSelect from 'react-windowed-select';
import classNames from 'classnames';

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
   * <@default=`false`>
   */
  isDisabled?: boolean;
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
  variant?: 'material' | 'rect';
  defaultValue?: SelectValue;
  value?: SelectValue;
  options?: OptionsType<OptionType>;
  style?: CSSProperties;
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
  onChange?: (newSelectValue: SelectValue, actionMeta: ActionMeta) => void;
}

export const Select = memo<SelectProps>(
  ({
    isMulti = false,
    isSearchable = false,
    isLoading = false,
    isClearable = true,
    isDisabled = false,
    maxMenuHeight = 200,
    maxSelectedOptions,
    label,
    error,
    placeholder = 'Select...',
    className,
    variant = 'rect',
    value,
    style,
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

    const defaultRenderMaxSelectedOptionsReachedMessage = useCallback(
      () =>
        `Cannot select more than ${(value as SelectOption[]).length} options`,
      [value],
    );

    return (
      <div
        className={classNames(
          className,
          'ztopia-select',
          `ztopia-select--${variant}`,
          {
            'is-multi': isMulti,
          },
        )}
        style={style}
      >
        {label && (
          <label
            className={classNames(
              'ztopia-select__label',
              `ztopia-select__label--${variant}`,
            )}
          >
            {label}
          </label>
        )}
        <WindowedSelect
          {...restProps}
          isMulti={isMulti}
          isSearchable={isSearchable}
          isLoading={isLoading}
          isClearable={isClearable}
          isDisabled={isDisabled}
          maxMenuHeight={maxMenuHeight}
          placeholder={placeholder}
          className={classNames(
            'ztopia-select__container',
            `ztopia-select__container--${variant}`,
            {
              'is-multi': isMulti,
              'is-searchable': isSearchable,
              'is-disabled': isDisabled,
              'has-error': Boolean(error),
            },
          )}
          classNamePrefix="select"
          value={value}
          options={isMaxSelectedOptionsReached ? [] : options}
          noOptionsMessage={
            isMaxSelectedOptionsReached
              ? renderMaxSelectedOptionsReachedMessage ||
                defaultRenderMaxSelectedOptionsReachedMessage
              : renderNoOptionMessage
          }
          onChange={onChange}
        />
        {error && <span className="ztopia-select__error">{error}</span>}
      </div>
    );
  },
);
