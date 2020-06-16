import React, {
  DetailedHTMLProps,
  FC,
  memo,
  TextareaHTMLAttributes,
} from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import classNames from 'classnames';

import './Textarea.css';

export interface InnerTextareaProps {
  /**
   * <@default=`false`>
   */
  isDisabled?: boolean;
  minRows?: number;
  maxRows?: number;
  label?: string;
  error?: string;
  /**
   * <@internal>
   */
  className?: Pick<TextareaProps, 'className'>;
}

export const InnerTextarea: FC<InnerTextareaProps> = memo(
  ({ isDisabled = false, label, error, className, ...restProps }) => (
    <div className={classNames(className, 'ztopia-textarea')}>
      {label && <span className="ztopia-textarea__label">{label}</span>}
      <TextareaAutosize
        disabled={isDisabled}
        className={classNames('ztopia-textarea__input', {
          'has-error': Boolean(error),
          'is-disabled': isDisabled,
        })}
        {...restProps}
      />
      {error && <span className="ztopia-textarea__error">{error}</span>}
    </div>
  ),
);

export type TextareaProps = InnerTextareaProps &
  DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >;

export const Textarea = (props: TextareaProps) => <InnerTextarea {...props} />;
