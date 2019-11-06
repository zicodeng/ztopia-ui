import React, { FC, memo, useState, useCallback } from 'react';
import BraftEditor from 'braft-editor';

import 'braft-editor/dist/index.css';
import './BlockTextEditor.css';

export interface BlockTextEditorProps {
  /**
   * Default inner HTML string
   *
   * <@default=`''`>
   */
  defaultValue?: string;
  onChange?: (newValue: string) => void;
}

export const BlockTextEditor: FC<BlockTextEditorProps> = memo(
  ({ defaultValue = '', onChange }) => {
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
      <section className="ztopia-block-text-editor">
        <BraftEditor value={editorState} onChange={handleChange} />
      </section>
    );
  },
);
