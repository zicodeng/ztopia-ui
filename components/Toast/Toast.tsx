import React, { createElement, FC, memo, ReactNode } from 'react';
import { toast, ToastContainer as BaseToastContainer } from 'react-toastify';

import { Times } from '../Icons';

import 'react-toastify/dist/ReactToastify.css';
import './Toast.css';

export type ToastId = number | string;

export interface ToastOptions {
  /**
   * <@default=`false`>
   */
  isProgressBarHidden: boolean;
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
  type?: 'default' | 'info' | 'success' | 'warning' | 'error';
}

export const ToastContainer: FC<ToastOptions> = memo(
  ({ isProgressBarHidden, containerId, placement, ...restProps }) => (
    <BaseToastContainer
      {...restProps}
      className="ztopia-toast"
      toastClassName="ztopia-toast__content"
      bodyClassName="ztopia-toast__body"
      progressClassName="ztopia-toast__progress"
      hideProgressBar={isProgressBarHidden}
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
  { isProgressBarHidden, placement, ...restOptions }: ToastOptions,
): ToastId =>
  toast(content, {
    hideProgressBar: isProgressBarHidden,
    position: placement,
    ...restOptions,
  });

export const updateToast = (
  toastId: ToastId,
  { isProgressBarHidden, placement, ...restOptions }: ToastOptions,
) =>
  toast.update(toastId, {
    hideProgressBar: isProgressBarHidden,
    position: placement,
    ...restOptions,
  });

export const dismissToast = (toastId: ToastId) => toast.dismiss(toastId);

export const dismissAllToasts = () => toast.dismiss();
