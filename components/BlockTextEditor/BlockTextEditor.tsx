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
  className?: string;
  /**
   * <@default=`['bold', 'italic', 'underline', 'separator', 'blockquote', 'list-ol', 'list-ul', 'separator', 'link', 'emoji']`>
   */
  toolbarOptions?: ControlType[];
  onChange?: (newValue: string) => void;
}

export const BlockTextEditor: FC<BlockTextEditorProps> = memo<
  BlockTextEditorProps
>(
  ({
    defaultValue = '',
    className,
    toolbarOptions = [
      'bold',
      'italic',
      'underline',
      'separator',
      'blockquote',
      'list-ol',
      'list-ul',
      'separator',
      'link',
      'emoji',
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
        className={classNames(className, 'ztopia-block-text-editor')}
        controls={toolbarOptions}
        value={editorState}
        onChange={handleChange}
      />
    );
  },
);
