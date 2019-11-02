import classNames from 'classnames';
import React, { createElement, FC, memo, ReactNode } from 'react';
import { toast, ToastContainer as BaseToastContainer } from 'react-toastify';

import { Times } from '../Icons';

import './Toast.css';

export type ToastId = number | string;

export interface ToastOptions {
  /**
   * <@default=`false`>
   */
  isProgressBarShown?: boolean;
  className?: string;
  /**
   * For multiple container support. If enabled, `makeToast({containerId})` must match `<ToastContainer containerId>`
   */
  containerId?: string;
  /**
   * If not provided, it will be auto generated
   */
  toastId?: ToastId;
  /**
   * <@default=`5000`>
   *
   */
  autoClose?: number | false;
  /**
   * <@default=`'top-right'`>
   */
  placement?:
    | 'top-right'
    | 'top-center'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-center'
    | 'bottom-left';
  /**
   * <@default=`'default'`>
   */
  variant?: 'default' | 'info' | 'success' | 'warning' | 'error';
}

export const ToastContainer: FC<ToastOptions> = memo<ToastOptions>(
  ({
    isProgressBarShown = false,
    className,
    containerId,
    placement = 'top-right',
    ...restProps
  }) => (
    <BaseToastContainer
      {...restProps}
      className={classNames(className, 'ztopia-toast')}
      toastClassName="ztopia-toast__content"
      bodyClassName="ztopia-toast__body"
      progressClassName="ztopia-toast__progress"
      hideProgressBar={!isProgressBarShown}
      containerId={containerId}
      position={placement}
      enableMultiContainer={Boolean(containerId)}
      closeButton={createElement(({ closeToast }) => (
        <Times
          size="small"
          className="ztopia-toast__close-indicator"
          onClick={closeToast}
        />
      ))}
    />
  ),
);

export const makeToast = (
  content: ReactNode,
  options: ToastOptions = {},
): ToastId => {
  const {
    isProgressBarShown = undefined,
    placement = undefined,
    variant = undefined,
    ...restOptions
  } = options;
  return toast(content, {
    hideProgressBar: isProgressBarShown,
    position: placement,
    type: variant,
    ...restOptions,
  });
};

export const updateToast = (toastId: ToastId, options: ToastOptions = {}) => {
  const {
    isProgressBarShown = undefined,
    placement = undefined,
    variant = undefined,
    ...restOptions
  } = options;
  return toast.update(toastId, {
    hideProgressBar: isProgressBarShown,
    position: placement,
    type: variant,
    ...restOptions,
  });
};

export const dismissToast = (toastId: ToastId) => toast.dismiss(toastId);

export const dismissAllToasts = () => toast.dismiss();
