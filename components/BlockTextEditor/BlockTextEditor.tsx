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

interface MediaUploadParam {
  file: File;
  progress: (progress: number) => void;
  libraryId: string;
  success: (res: {
    url: string;
    meta: {
      id: string;
      title: string;
      alt: string;
      loop: boolean;
      autoPlay: boolean;
      controls: boolean;
      poster: string;
    };
  }) => void;
  error: (err: { msg: string }) => void;
}

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
  onMediaUpload?: (mediaUploadParam: MediaUploadParam) => void;
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
    onMediaUpload,
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
        if (onChange) {
          const newContent = newEditorState.toHTML();
          const isEmpty = newContent === '<p></p>';
          onChange(isEmpty ? '' : newContent);
        }
      },
      [onChange],
    );

    return (
      <BraftEditor
        placeholder={placeholder}
        className={classNames(className, 'ztopia-block-text-editor', {
          'is-height-auto':
            !contentStyle ||
            (!contentStyle.height || contentStyle.height === 'auto'),
        })}
        headings={headings}
        controls={toolbarOptions}
        value={editorState}
        onChange={handleChange}
        imageControls={imageControls}
        imageResizable={false}
        contentStyle={contentStyle}
        media={{
          externals: {},
          accepts: {
            video: false,
            audio: false,
          },
          uploadFn: onMediaUpload,
        }}
      />
    );
  },
);
