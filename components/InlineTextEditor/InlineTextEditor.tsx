import React, { FC, useEffect, ChangeEvent } from 'react';
import MediumEditor from 'medium-editor';
import classNames from 'classnames';

import 'medium-editor/dist/css/medium-editor.min.css';
import 'medium-editor/dist/css/themes/flat.min.css';
import './InlineTextEditor.css';

export type ToolbarOption =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strikethrough'
  | 'subscript'
  | 'superscript'
  | 'anchor'
  | 'image'
  | 'quote'
  | 'pre'
  | 'orderedlist'
  | 'unorderedlist'
  | 'indent'
  | 'outdent'
  | 'justifyLeft'
  | 'justifyCenter'
  | 'justifyRight'
  | 'justifyFull'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'removeFormat'
  | 'html';

export interface InlineTextEditorProps {
  /**
   * Default inner HTML string
   *
   * <@default=`''`>
   */
  defaultValue?: string;
  /**
   * <@default=`'Type your text here...'`>
   */
  placeholder?: string;
  className?: string;
  /**
   * <@default=`['bold', 'italic', 'underline', 'anchor', 'h1', 'h2', 'h3', 'quote', 'orderedlist', 'unorderedlist']`>
   */
  toolbarOptions?: ToolbarOption[];
  onChange?: (newValue: string) => void;
}

export const InlineTextEditor: FC<InlineTextEditorProps> = ({
  defaultValue = '',
  placeholder = 'Type your text here...',
  className,
  toolbarOptions = [
    'bold',
    'italic',
    'underline',
    'anchor',
    'h1',
    'h2',
    'h3',
    'quote',
    'orderedlist',
    'unorderedlist',
    'pre',
  ],
  onChange,
}) => {
  useEffect(() => {
    const editor = new MediumEditor('#ztopia-inline-text-editor', {
      buttonLabels: 'fontawesome',
      toolbar: {
        buttons: toolbarOptions,
      },
      placeholder: {
        text: placeholder,
      },
    });

    editor.subscribe('editableInput', function(
      _e: ChangeEvent<HTMLDivElement>,
      editable: HTMLDivElement,
    ) {
      if (onChange) onChange(editable.innerHTML);
    });

    return () => {
      editor.destroy();
    };
  }, []);

  return (
    <div
      id="ztopia-inline-text-editor"
      className={classNames(className, 'ztopia-inline-text-editor')}
      dangerouslySetInnerHTML={{ __html: defaultValue }}
    />
  );
};
