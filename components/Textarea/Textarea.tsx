import React, {
  FC,
  DetailedHTMLProps,
  TextareaHTMLAttributes,
  memo,
} from 'react';
import classNames from 'classnames';
import TextareaAutosize from 'react-textarea-autosize';

import './Textarea.css';

export type TextareaProps = InnerTextareaProps &
  DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >;

export const Textarea: FC<TextareaProps> = memo(props => (
  <InnerTextarea {...props} />
));

export interface InnerTextareaProps {
  minRows?: number;
  maxRows?: number;
  /**
   * <@internal>
   */
  className?: Pick<TextareaProps, 'className'>;
}

export const InnerTextarea: FC<InnerTextareaProps> = ({
  className,
  ...restProps
}) => (
  <TextareaAutosize
    className={classNames(className, 'ztopia-textarea')}
    {...restProps}
  />
);
