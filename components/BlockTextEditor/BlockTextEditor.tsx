import React, { FC, memo, useCallback, useState } from 'react';
import BraftEditor, { ControlType } from 'braft-editor';
import classNames from 'classnames';

import 'braft-editor/dist/index.css';
import './BlockTextEditor.css';

export interface BlockTextEditorProps {
  /**
   * Default inner HTML string
   *
   * <@default=`''`>
   */
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  /**
   * Height of the content editing area, excluding toolbar
   *
   * <@default=`'100%'`>
   */
  contentHeight?: string | number;
  /**
   * <@default=`['headings', 'separator', 'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator', 'list-ol', 'list-ul', 'blockquote', 'separator', 'link', 'separator', 'emoji', 'remove-styles', 'separator', 'fullscreen']`>
   */
  toolbarOptions?: ControlType[];
  onChange?: (newValue: string) => void;
}

export const BlockTextEditor: FC<BlockTextEditorProps> = memo<
  BlockTextEditorProps
>(
  ({
    defaultValue = '',
    placeholder,
    className,
    contentHeight = '100%',
    toolbarOptions = [
      'headings',
      'separator',
      'text-color',
      'bold',
      'italic',
      'underline',
      'strike-through',
      'separator',
      'list-ol',
      'list-ul',
      'blockquote',
      'separator',
      'link',
      'media',
      'separator',
      'emoji',
      'remove-styles',
      'separator',
      'fullscreen',
    ],
    onChange,
  }) => {
    const [editorState, setEditorState] = useState(
      BraftEditor.createEditorState(defaultValue),
    );

    const handleChange = useCallback(
      newEditorState => {
        setEditorState(newEditorState);
        if (onChange) onChange(newEditorState.toHTML());
      },
      [onChange],
    );

    return (
      <BraftEditor
        placeholder={placeholder}
        className={classNames(className, 'ztopia-block-text-editor')}
        controls={toolbarOptions}
        value={editorState}
        onChange={handleChange}
        imageControls={['align-left', 'align-center', 'align-right', 'remove']}
        imageResizable={false}
        contentStyle={{
          height: contentHeight,
        }}
        media={{
          accepts: {
            video: false,
            audio: false,
          },
        }}
      />
    );
  },
);
