import React, { ChangeEvent, memo, useEffect } from 'react';
import classNames from 'classnames';
import MediumEditor, { MediumEditor as IMediumEditor } from 'medium-editor';

import { ImageCaption } from './extensions';

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
  | 'imageCaption'
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
  /**
   * <@default=`'ztopia-inline-text-editor'`>
   */
  id?: string;
  /**
   * Used when instantiating MediemEditor(selector)
   *
   * <@default=`'#ztopia-inline-text-editor'`>
   */
  selector?: string;
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
  toolbarOptions?: ToolbarOption[] | MediumEditor.Button[];
  onChange?: (e: ChangeEvent<HTMLDivElement>, newValue: string) => void;
  onReady?: (editor: Editor) => void;
}

export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const InlineTextEditor = memo<InlineTextEditorProps>(
  ({
    isReadonly = false,
    id = 'ztopia-inline-text-editor',
    selector = '#ztopia-inline-text-editor',
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
      const editor = new MediumEditor(selector, {
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
        extensions: {
          caption: new ImageCaption(),
        },
      });
      if (onReady) onReady(editor);

      editor.subscribe(
        'editableInput',
        (e: ChangeEvent<HTMLDivElement>, editableEl: HTMLElement) => {
          if (onChange) onChange(e, editableEl.innerHTML);
        },
      );

      editor.subscribe('editableKeydownEnter', async (e: any) => {
        // Allow Shift + Enter to continue behaviour
        if (e.shiftKey) return;

        // @ts-ignore
        const currentNode = MediumEditor.selection.getSelectionStart(
          // @ts-ignore
          editor.options.ownerDocument,
        );

        // Discard previous option selection behavior when hit "Enter"
        // for these special nodes. Instead, insert a <p> tag
        if (['FIGCAPTION', 'PRE', 'CODE', 'B'].includes(currentNode.nodeName)) {
          // @ts-ignore
          const pEl = editor.options.ownerDocument.createElement('p');
          pEl.innerHTML = '<br>';
          currentNode.parentElement.insertBefore(pEl, currentNode.nextSibling);

          // Move the cursor into the new paragraph
          // @ts-ignore
          MediumEditor.selection.moveCursor(
            // @ts-ignore
            editor.options.ownerDocument,
            pEl,
          );

          // Not sure why an extra <p> is inserted,
          // so we need to manually clean it up here
          await sleep(0);
          pEl.remove();
        }
      });

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
