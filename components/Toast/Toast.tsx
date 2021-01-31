import React, { createElement, memo, ReactNode } from 'react';
import { toast, ToastContainer as BaseToastContainer } from 'react-toastify';
import classNames from 'classnames';

import { IconTimes } from '../Icons';

import './Toast.css';

export type ToastId = number | string;

export interface ToastOptions {
  /**
   * <@default=`false`>
   */
  isProgressBarShown?: boolean;
  /**
   * <@default=`false`>
   */
  isCloseButtonShown?: boolean;
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

export const ToastContainer = memo<ToastOptions>(
  ({
    isProgressBarShown = false,
    isCloseButtonShown = false,
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
      closeButton={
        isCloseButtonShown &&
        createElement(({ closeToast }) => (
          <IconTimes
            size="small"
            className="ztopia-toast__close-indicator"
            onClick={closeToast}
          />
        ))
      }
    />
  ),
);

export const makeToast = (
  content: ReactNode,
  options: ToastOptions = {},
): ToastId => {
  const {
    isProgressBarShown = false,
    placement = 'top-right',
    variant = 'default',
    ...restOptions
  } = options;
  return toast(content, {
    hideProgressBar: !isProgressBarShown,
    position: placement,
    type: variant,
    ...restOptions,
  });
};

export const updateToast = (
  toastId: ToastId,
  options: ToastOptions = {},
): void => {
  const {
    isProgressBarShown = false,
    placement = 'top-right',
    variant = 'default',
    ...restOptions
  } = options;
  return toast.update(toastId, {
    hideProgressBar: isProgressBarShown,
    position: placement,
    type: variant,
    ...restOptions,
  });
};

export const dismissToast = (toastId: ToastId): void => toast.dismiss(toastId);

export const dismissAllToasts = (): void => toast.dismiss();
