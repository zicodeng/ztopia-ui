import React, { FC, memo, ReactNode } from 'react';
import { toast, ToastContainer as BaseToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './Toast.css';

export type ToastId = number | string;

export interface ToastOptions {
  /**
   * <@default=`false`>
   */
  hideProgressBar: boolean;
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
  position?:
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

interface CloseButtonProps {
  closeToast?: () => void;
}

const CloseButton: FC<CloseButtonProps> = memo(({ closeToast }) => (
  <svg
    aria-hidden="true"
    focusable="false"
    data-icon="times"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 352 512"
    className="ztopia-toast__close-icon"
    onClick={closeToast}
  >
    <path
      fill="currentColor"
      d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
    ></path>
  </svg>
));

export const ToastContainer: FC<ToastOptions> = memo(
  ({ containerId, ...restProps }) => (
    <BaseToastContainer
      {...restProps}
      className="ztopia-toast"
      toastClassName="ztopia-toast__content"
      bodyClassName="ztopia-toast__body"
      progressClassName="ztopia-toast__progress"
      containerId={containerId}
      enableMultiContainer={Boolean(containerId)}
      closeButton={<CloseButton />}
    />
  ),
);

export const makeToast = (content: ReactNode, options: ToastOptions): ToastId =>
  toast(content, options);

export const updateToast = (toastId: ToastId, options: ToastOptions) =>
  toast.update(toastId, options);

export const dismissToast = (toastId: ToastId) => toast.dismiss(toastId);

export const dismissAllToasts = () => toast.dismiss();
