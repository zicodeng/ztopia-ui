import React, { FC, useEffect, ChangeEvent, memo } from 'react';
import MediumEditor, { MediumEditor as IMediumEditor } from 'medium-editor';
import classNames from 'classnames';

import 'medium-editor/dist/css/medium-editor.min.css';
import 'medium-editor/dist/css/themes/flat.min.css';
import './InlineTextEditor.css';

export type Editor = IMediumEditor;

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
   *  <@default=`'false'`>
   */
  isReadonly?: boolean;
  id?: string;
  /**
   * <@default=`''`>
   */
  defaultValue?: string;
  /**
   * <@default=`'Type your text here...'`>
   */
  placeholder?: string;
  className?: string;
  /**
   * <@default=`['bold', 'italic', 'underline', 'anchor', 'h1', 'h2', 'quote', 'orderedlist', 'unorderedlist']`>
   */
  toolbarOptions?: ToolbarOption[];
  onChange?: (newValue: string) => void;
  onReady?: (editor: Editor) => void;
}

export const InlineTextEditor: FC<InlineTextEditorProps> = memo(
  ({
    isReadonly = false,
    id = 'ztopia-inline-text-editor',
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
      'quote',
      'orderedlist',
      'unorderedlist',
    ],
    onChange,
    onReady,
  }) => {
    useEffect(() => {
      const editor = new MediumEditor(`#${id}`, {
        targetBlank: true,
        autoLink: true,
        disableEditing: isReadonly,
        buttonLabels: 'fontawesome',
        toolbar: isReadonly
          ? false
          : {
              buttons: toolbarOptions,
            },
        placeholder: {
          text: placeholder,
        },
        anchor: {
          linkValidation: true,
          placeholderText: '输入网址链接，如：https://www.wenwentips.com',
        },
      });
      if (onReady) onReady(editor);

      editor.subscribe(
        'editableInput',
        (_e: ChangeEvent<HTMLDivElement>, editable: HTMLElement) => {
          if (onChange) onChange(editable.innerHTML);
        },
      );

      return () => {
        editor.destroy();
      };
    }, [isReadonly]);

    return (
      <div
        id={id}
        className={classNames(className, 'ztopia-inline-text-editor')}
        dangerouslySetInnerHTML={{ __html: defaultValue }}
      />
    );
  },
);
