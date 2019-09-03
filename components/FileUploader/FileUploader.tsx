import React, { memo, FC, useState, useEffect } from 'react';
import { useDropzone, DropEvent } from 'react-dropzone';
import classNames from 'classnames';

import { CloudUpload } from '../Icons';
import { Image } from '../Image';
import { Progress } from '../Progress';

import './FileUploader.css';

interface EnhancedFile extends File {
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
   * An object that associates file name and its current upload progress percent
   *
   * <@default=`{}`>
   */
  progress: { [fileName: string]: number };
  /**
   * <@default=`image/*`>
   */
  allowedFileTypes?: string | string[];
  onDropAccepted?: <EnhancedFile>(
    files: EnhancedFile[],
    event: DropEvent,
  ) => void;
  onDropRejected?: <EnhancedFile>(
    files: EnhancedFile[],
    event: DropEvent,
  ) => void;
}

enum DragState {
  Enter = 'drag-enter',
  Over = 'drag-over',
  Leave = 'drag-leave',
}

const convertBytesToSize = (bytes: number) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return 'N/A';
  const i = Math.floor(Math.log(Math.abs(bytes)) / Math.log(1024));
  if (i === 0) return `${bytes} ${sizes[i]}`;
  return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
};

export const FileUploader: FC<FileUploaderProps> = memo(
  ({
    isMulti = false,
    minSize,
    maxSize,
    className,
    progress = {},
    allowedFileTypes = 'image/*',
    ...restProps
  }) => {
    const [dragState, setDragState] = useState<DragState | null>(null);
    const [previewFiles, setPreviewFiles] = useState<EnhancedFile[]>([]);

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
          {previewFiles.map(({ thumbURL, name, size }, i) => {
            return (
              <li key={i} className="ztopia-file-uploader__file-preview">
                <Image
                  width={50}
                  height={50}
                  src={thumbURL}
                  variant="background"
                  className="ztopia-file-uploader__file-thumb"
                />
                <div className="ztopia-file-uploader__upload-info">
                  <div className="ztopia-file-uploader__file-meta">
                    <span className="ztopia-file-uploader__file-name">
                      {name}
                    </span>
                    <span className="ztopia-file-uploader__file-size">
                      {convertBytesToSize(size)}
                    </span>
                  </div>
                  <Progress
                    percent={progress[name] || 0}
                    strokeColor="#62ddbd"
                    className="ztopia-file-uploader__progress"
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    );
  },
);
