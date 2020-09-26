import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { DropEvent, useDropzone } from 'react-dropzone';
import classNames from 'classnames';

import { IconCloudUpload, IconTimes } from '../Icons';
import { Image } from '../Image';
import { Progress } from '../Progress';

import './FileUploader.css';

export interface EnhancedFile extends File {
  thumbURL: string;
}

export interface FileUploaderProps {
  /**
   * <@default=`true`>
   */
  isFileRemoveIndicatorShown?: boolean;
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
   * <@default=`10000000 (10MB)`>
   */
  maxSize?: number;
  className?: string;
  /**
   * <@default=``>
   */
  label?: string;
  /**
   * <@default=`'primary'`>
   */
  variant?: 'primary' | 'secondary';
  /**
   * An object that associates file name and its current upload progress percent
   *
   * <@default=`{}`>
   */
  progress?: { [fileName: string]: number };
  /**
   * Can be used to set preview URL for secondary variant FileUploader only
   */
  previewURL?: string;
  /**
   * <@default=`image/*`>
   */
  allowedFileTypes?: string | string[];
  onDropAccepted?: (files: EnhancedFile[], event: DropEvent) => void;
  onDropRejected?: (files: EnhancedFile[], event: DropEvent) => void;
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
    isFileRemoveIndicatorShown = true,
    isMulti = false,
    minSize = 1,
    maxSize = 10000000,
    className,
    label = 'Choose a File or Drag It Here',
    variant = 'primary',
    progress = {},
    previewURL,
    allowedFileTypes = 'image/*',
    ...restProps
  }) => {
    const [dragState, setDragState] = useState<DragState | null>(null);
    const [previewFiles, setPreviewFiles] = useState<EnhancedFile[]>([]);
    const [previewURLs, setPreviewURLs] = useState<string[]>([]);

    // @ts-ignore
    const { getRootProps, getInputProps } = useDropzone({
      multiple: isMulti,
      minSize,
      maxSize,
      accept: allowedFileTypes,
      onDrop: acceptedFiles => {
        setDragState(null);
        const previewURLs: string[] = [];
        const previewFiles = acceptedFiles.map(file => {
          const thumbURL = URL.createObjectURL(file);
          previewURLs.push(thumbURL);
          return Object.assign(file, {
            thumbURL,
          });
        });
        setPreviewFiles(previewFiles);
        setPreviewURLs(previewURLs);
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
        // Make sure to revoke the data URIs to avoid memory leaks
        previewURLs.forEach(url => URL.revokeObjectURL(url));
      },
      [previewURLs],
    );

    const handleClickFileRemoveIndicator = useCallback(
      (fileName: string) => {
        const newPreviewFiles = previewFiles.filter(previewFile => {
          const { name, thumbURL } = previewFile;
          if (name === fileName) {
            URL.revokeObjectURL(thumbURL);
            return false;
          } else return true;
        });
        setPreviewFiles(newPreviewFiles);
      },
      [previewFiles],
    );

    return (
      <section className={classNames(className, 'ztopia-file-uploader')}>
        {!previewFiles.length && (
          <div
            {...getRootProps({
              className: classNames('ztopia-file-uploader__dropzone', {
                [dragState as string]: Boolean(dragState),
              }),
            })}
          >
            <input {...getInputProps()} />
            <IconCloudUpload
              width={50}
              className="ztopia-file-uploader__icon"
            />
            <label className="ztopia-file-uploader__label">{label}</label>
          </div>
        )}
        {variant === 'primary' || isMulti ? (
          <ul className="ztopia-file-uploader__file-previews">
            {previewFiles.map((previewFile, i) => {
              const { thumbURL, name, size } = previewFile;
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
                  {isFileRemoveIndicatorShown && (
                    <IconTimes
                      size="small"
                      className="ztopia-file-uploader__file-remove-indicator"
                      onClick={() => handleClickFileRemoveIndicator(name)}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          // On secondary variant, we allow users to reselect a file by clicking preview
          previewURL && (
            <div
              {...getRootProps({
                className: classNames(
                  'ztopia-file-uploader__reselect-dropzone',
                  {
                    [dragState as string]: Boolean(dragState),
                  },
                ),
              })}
            >
              <Image
                width="100%"
                height={200}
                variant="background"
                src={previewURL}
              />
              <input {...getInputProps()} />
            </div>
          )
        )}
      </section>
    );
  },
);
