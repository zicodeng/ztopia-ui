import React, { memo, FC, useState, useEffect } from 'react';
import { useDropzone, DropEvent } from 'react-dropzone';
import classNames from 'classnames';

import { CloudUpload } from '../Icons';
import { Image } from '../Image';

import './FileUploader.css';

interface PreviewFile extends File {
  thumbURL: string;
}

export interface FileUploaderProps {
  /**
   * Allow multiple files
   *
   * <@default=`false`>
   */
  isMulti?: boolean;
  /**
   * <@default=`1`>
   */
  minSize?: number;
  /**
   * <@default=`10000`>
   */
  maxSize?: number;
  className?: string;
  /**
   * <@default=`image/*`>
   */
  allowedFileTypes?: string | string[];
  onDropAccepted?<T extends File>(files: T[], event: DropEvent): void;
  onDropRejected?<T extends File>(files: T[], event: DropEvent): void;
}

enum DragState {
  Enter = 'drag-enter',
  Over = 'drag-over',
  Leave = 'drag-leave',
}

export const FileUploader: FC<FileUploaderProps> = memo(
  ({
    isMulti = false,
    minSize,
    maxSize,
    className,
    allowedFileTypes = 'image/*',
    ...restProps
  }) => {
    const [dragState, setDragState] = useState<DragState | null>(null);
    const [previewFiles, setPreviewFiles] = useState<PreviewFile[]>([]);

    const { getRootProps, getInputProps } = useDropzone({
      multiple: isMulti,
      minSize,
      maxSize,
      accept: allowedFileTypes,
      onDrop: acceptedFiles => {
        setDragState(null);
        setPreviewFiles(
          acceptedFiles.map(file =>
            Object.assign(file, {
              thumbURL: URL.createObjectURL(file),
            }),
          ),
        );
      },
      onDragEnter: () => {
        setDragState(DragState.Enter);
      },
      onDragOver: () => {
        setDragState(DragState.Over);
      },
      onDragLeave: () => {
        setDragState(DragState.Leave);
      },
      ...restProps,
    });

    useEffect(
      () => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        previewFiles.forEach(previewFile =>
          URL.revokeObjectURL(previewFile.thumbURL),
        );
      },
      [previewFiles],
    );

    return (
      <section className={classNames(className, 'ztopia-file-uploader')}>
        <div
          {...getRootProps({
            className: classNames('ztopia-file-uploader__dropzone', {
              [dragState!]: Boolean(dragState),
            }),
          })}
        >
          <input {...getInputProps()} />
          <CloudUpload width={50} className="ztopia-file-uploader__icon" />
          <p className="ztopia-file-uploader__title">
            Choose a File or Drag It Here
          </p>
        </div>
        <ul className="ztopia-file-uploader__file-previews">
          {previewFiles.map(({ thumbURL, name }, i) => {
            return (
              <li key={i} className="ztopia-file-uploader__file-preview">
                <Image
                  width={100}
                  height={100}
                  src={thumbURL}
                  variant="background"
                  className="ztopia-file-uploader__file-thumb"
                />
                <span className="ztopia-file-uploader__file-name">{name}</span>
              </li>
            );
          })}
        </ul>
      </section>
    );
  },
);
