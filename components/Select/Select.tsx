import classNames from 'classnames';
import React, { FC, memo } from 'react';
import ReactSelect from 'react-select';
import { ActionMeta, ValueType } from 'react-select/src/types';

import './Select.css';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  /**
   * <@default=`false`>
   *
   * Enable multi selection
   */
  multi?: boolean;
  /**
   * <@default=`false`>
   *
   */
  searchable?: boolean;
  maxMenuHeight?: number;
  label?: string;
  className?: string;
  value?: ValueType<SelectOption>;
  options?: SelectOption[];
  onChange?: (value: ValueType<SelectOption>, actionMeta: ActionMeta) => void;
}

export const Select: FC<SelectProps> = memo(
  ({
    multi,
    searchable,
    maxMenuHeight,
    label,
    className,
    value,
    options,
    onChange,
  }) => (
    <div className={classNames(className, 'ztopia-select')}>
      {label && <label className="ztopia-select__label">{label}</label>}
      <ReactSelect
        isMulti={multi}
        isSearchable={searchable}
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
  multi: false,
  searchable: false,
};
