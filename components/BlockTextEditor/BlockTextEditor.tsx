import React, {
  CSSProperties,
  FC,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import BraftEditor, { ControlType } from 'braft-editor';
import classNames from 'classnames';

import 'braft-editor/dist/index.css';
import './BlockTextEditor.css';

export type BlockTextEditorState = {
  toHTML(option?: Record<string, any>): string;
  toText(): string;
  isEmpty(): boolean;
};

type Heading =
  | 'header-one'
  | 'header-two'
  | 'header-three'
  | 'header-four'
  | 'header-five'
  | 'header-six'
  | 'unstyled';

type ImageControl =
  | 'float-left'
  | 'float-right'
  | 'align-left'
  | 'align-center'
  | 'align-right'
  | 'link'
  | 'size'
  | 'remove';

export interface BlockTextEditorProps {
  /**
   * Default inner HTML string
   *
   * <@default=`''`>
   */
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  contentStyle?: CSSProperties;
  /**
   * <@default=`['headings', 'separator', 'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator', 'list-ol', 'list-ul', 'blockquote', 'separator', 'link', 'separator', 'emoji', 'remove-styles', 'separator', 'fullscreen']`>
   */
  toolbarOptions?: ControlType[];
  headings?: Heading[];
  /**
   * <@default=`['align-left', 'align-center', 'align-right', 'remove']`>
   */
  imageControls?: ImageControl[];
  onChange?: (newValue: string) => void;
  onReady?: (editorState: BlockTextEditorState) => void;
}

export const BlockTextEditor: FC<BlockTextEditorProps> = memo<
  BlockTextEditorProps
>(
  ({
    defaultValue = '',
    placeholder,
    className,
    contentStyle,
    headings = [
      'header-one',
      'header-two',
      'header-three',
      'header-four',
      'header-five',
      'header-six',
    ],
    imageControls = ['align-left', 'align-center', 'align-right', 'remove'],
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
    onReady,
  }) => {
    const [editorState, setEditorState] = useState<BlockTextEditorState>(
      BraftEditor.createEditorState(defaultValue),
    );

    useEffect(() => {
      if (onReady) onReady(editorState);
    }, [editorState, onReady]);

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
        headings={headings}
        controls={toolbarOptions}
        value={editorState}
        onChange={handleChange}
        imageControls={imageControls}
        imageResizable={false}
        contentStyle={contentStyle}
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
