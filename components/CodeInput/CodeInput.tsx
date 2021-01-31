import React, { memo } from 'react';
import ReactCodeInput from 'react-code-input';
import classNames from 'classnames';

import './CodeInput.css';

export interface CodeInputProps {
  /**
   * <@default=`6`>
   */
  totalFields?: number;
  value?: string;
  name: string;
  className?: string;
  /**
   * <@default=`text`>
   */
  type?: 'text' | 'number' | 'password';
  /**
   * <@default=`numeric`>
   */
  inputMode?:
    | 'verbatim'
    | 'latin'
    | 'latin-name'
    | 'latin-prose'
    | 'full-width-latin'
    | 'kana'
    | 'kana-name'
    | 'katakana'
    | 'numeric'
    | 'tel'
    | 'email'
    | 'url';
  onChange?: (newValue: string) => void;
}

export const CodeInput = memo<CodeInputProps>(
  ({
    totalFields = 6,
    value,
    name,
    className,
    type = 'text',
    inputMode = 'numeric',
    onChange,
  }) => (
    <ReactCodeInput
      fields={totalFields}
      value={value}
      name={name}
      type={type}
      inputMode={inputMode}
      className={classNames(className, 'ztopia-code-input')}
      onChange={onChange}
    />
  ),
);
