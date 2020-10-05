import React, { memo, ReactNode, useCallback } from 'react';
import ReactModal from 'react-modal';
import classNames from 'classnames';

import { IconTimes } from '../Icons';

import './Modal.css';

export interface ModalProps {
  /**
   * <@default=`false`>
   */
  isOpen?: boolean;
  /**
   * <@default=`false`>
   */
  isCloseButtonShown?: boolean;
  /**
   * Specify container in which the Modal should be rendered
   */
  containerId?: string;
  className?: string;
  children?: ReactNode;
  /**
   * <@default=`'medium'`>
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Modal can be closed by pressing ESC key, clicking overlay or close icon
   */
  onRequestClose?: () => void;
}

export const Modal = memo<ModalProps>(
  ({
    isOpen = false,
    isCloseButtonShown = false,
    containerId,
    className,
    children,
    size = 'medium',
    onRequestClose,
  }) => {
    const getParent = useCallback(
      () => document.querySelector(containerId ? `#${containerId}` : 'body'),
      [containerId],
    );

    return (
      <ReactModal
        ariaHideApp={false}
        isOpen={isOpen}
        closeTimeoutMS={200}
        portalClassName={classNames(className, 'ztopia-modal')}
        className={classNames(
          'ztopia-modal__content',
          `ztopia-modal__content--${size}`,
        )}
        overlayClassName={classNames('ztopia-modal__overlay')}
        onRequestClose={onRequestClose}
        parentSelector={getParent}
      >
        {children}
        {isCloseButtonShown && (
          <IconTimes
            isAction
            className="ztopia-modal__close-indicator"
            onClick={onRequestClose}
          />
        )}
      </ReactModal>
    );
  },
);
