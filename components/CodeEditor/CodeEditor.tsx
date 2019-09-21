import React, { useCallback, FC, memo } from 'react';
import classNames from 'classnames';
import { Controlled as BaseCodeMirror } from 'react-codemirror2';

// CodeMirror base style
import 'codemirror/lib/codemirror.css';
// CodeMirror themes
import 'codemirror/theme/monokai.css';
// CodeMirror Modes
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/css/css';
// CodeMirror addons
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/fold/xml-fold';

import './CodeEditor.css';

export interface CodeEditorProps {
  /**
   * <@default=`false`>
   */
  isReadonly?: boolean;
  className?: string;
  /**
   * <@default=`jsx`>
   */
  language?: string;
  value: string;
  onChange: (newValue: string) => void;
}

export const CodeEditor: FC<CodeEditorProps> = memo(
  ({ isReadonly = false, className, language = 'jsx', value, onChange }) => {
    /**
     * Remove trailing line after editor is mounted
     */
    const handleEditorDidMount = useCallback(editor => {
      if (!editor) return;
      const lastLine = editor.lastLine();
      const lastLineValue = editor.getLine(lastLine);
      if (!lastLineValue) {
        editor.doc.replaceRange('', { line: lastLine - 1 }, { line: lastLine });
      }
    }, []);

    const handleBeforeChange = useCallback((_editor, _data, value) => {
      onChange(value);
    }, []);

    return (
      <BaseCodeMirror
        value={value}
        className={classNames(className, 'ztopia-code-editor')}
        editorDidMount={handleEditorDidMount}
        onBeforeChange={handleBeforeChange}
        options={{
          tabSize: 2,
          lineNumbers: true,
          lineWrapping: false,
          autoCloseTags: true,
          matchBrackets: true,
          readOnly: isReadonly,
          theme: 'monokai',
          mode: language,
        }}
      />
    );
  },
);
