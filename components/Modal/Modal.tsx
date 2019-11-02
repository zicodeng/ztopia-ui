import classNames from 'classnames';
import React, { FC, memo, useCallback } from 'react';
import ReactModal from 'react-modal';

import { Times } from '../Icons';

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
  /**
   * <@default=`'medium'`>
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Modal can be closed by pressing ESC key, clicking overlay or close icon
   */
  onRequestClose?: () => void;
}

export const Modal: FC<ModalProps> = memo(
  ({
    isOpen = false,
    isCloseButtonShown = false,
    containerId,
    className,
    size = 'medium',
    onRequestClose,
    children,
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
          <Times
            className="ztopia-modal__close-indicator"
            onClick={onRequestClose}
          />
        )}
      </ReactModal>
    );
  },
);
