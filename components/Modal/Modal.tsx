import classNames from 'classnames/bind';
import React, { FC, memo } from 'react';
import ReactModal from 'react-modal';

import { Times } from '../Icons';

import './Modal.css';

interface ModalProps {
  /**
   * <@default=`false`>
   */
  isOpen: boolean;
  className: string;
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
  ({ isOpen, className, size, onRequestClose, children }) => (
    <ReactModal
      ariaHideApp={false}
      isOpen={isOpen}
      bodyOpenClassName="ztopia-modal__body--open"
      portalClassName={classNames(className, 'ztopia-modal')}
      className={classNames(
        'ztopia-modal__content',
        `ztopia-modal__content--${size}`,
        {
          'ztopia-modal__content--open': isOpen,
        },
      )}
      overlayClassName={classNames('ztopia-modal__overlay', {
        'ztopia-modal__overlay--open': isOpen,
      })}
      onRequestClose={onRequestClose}
    >
      {children}
      <Times
        className="ztopia-modal__close-indicator"
        onClick={onRequestClose}
      />
    </ReactModal>
  ),
);

Modal.defaultProps = {
  isOpen: false,
  size: 'medium',
};
