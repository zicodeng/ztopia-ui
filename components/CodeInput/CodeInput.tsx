import React, { FC, memo } from 'react';
import ReactCodeInput from 'react-code-input';
import classNames from 'classnames';

import './CodeInput.css';

export interface CodeInputProps {
  /**
   * <@default=`6`>
   */
  totalFields?: number;
  value?: string;
  name?: string;
  className?: string;
  /**
   * <@default=`text`>
   */
  type?: 'text' | 'number' | 'password';
  onChange?: (newValue: string) => void;
}

export const CodeInput: FC<CodeInputProps> = memo(
  ({ totalFields = '6', value, name, className, type = 'text', onChange }) => (
    <ReactCodeInput
      fields={totalFields}
      value={value}
      name={name}
      type={type}
      className={classNames(className, 'ztopia-code-input')}
      onChange={onChange}
    />
  ),
);
