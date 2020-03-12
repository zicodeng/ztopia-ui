import React, { FC, useEffect, ChangeEvent, useState, memo } from 'react';
import MediumEditor, { MediumEditor as IMediumEditor } from 'medium-editor';
import classNames from 'classnames';

import 'medium-editor/dist/css/medium-editor.min.css';
import 'medium-editor/dist/css/themes/flat.min.css';
import './InlineTextEditor.css';

export type MediumEditor = IMediumEditor;

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
  onReady?: (editor: IMediumEditor) => void;
}

export const InlineTextEditor: FC<InlineTextEditorProps> = memo(
  ({
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
    const [editor, setEditor] = useState<IMediumEditor | null>(null);

    useEffect(() => {
      const editor = new MediumEditor('#ztopia-inline-text-editor', {
        targetBlank: true,
        autoLink: true,
        buttonLabels: 'fontawesome',
        toolbar: {
          buttons: toolbarOptions,
        },
        placeholder: {
          text: placeholder,
        },
        anchor: {
          linkValidation: true,
        },
      });
      setEditor(editor);
      if (onReady) onReady(editor);

      editor.setContent(defaultValue);

      return () => {
        editor.destroy();
      };
    }, []);

    useEffect(() => {
      if (!editor) return;

      editor.subscribe(
        'editableInput',
        (_e: ChangeEvent<HTMLDivElement>, editable: HTMLElement) => {
          if (onChange) onChange(editable.innerHTML);
        },
      );
    }, [editor, onChange]);

    return (
      <div
        id="ztopia-inline-text-editor"
        className={classNames(className, 'ztopia-inline-text-editor')}
      />
    );
  },
);
