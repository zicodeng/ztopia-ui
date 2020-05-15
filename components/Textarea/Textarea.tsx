import React, {
  FC,
  DetailedHTMLProps,
  TextareaHTMLAttributes,
  memo,
} from 'react';
import classNames from 'classnames';
import TextareaAutosize from 'react-textarea-autosize';

import './Textarea.css';

export interface InnerTextareaProps {
  minRows?: number;
  maxRows?: number;
  error?: string;
  /**
   * <@internal>
   */
  className?: Pick<TextareaProps, 'className'>;
}

export const InnerTextarea: FC<InnerTextareaProps> = memo(
  ({ error, className, ...restProps }) => (
    <div className={classNames(className, 'ztopia-textarea')}>
      <TextareaAutosize
        className={classNames('ztopia-textarea__input', {
          'has-error': Boolean(error),
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
