import classNames from 'classnames/bind';
import React, { FC, memo } from 'react';
import ReactModal from 'react-modal';

import './Modal.css';

interface ModalProps {
  /**
   * <@default=`false`>
   */
  isOpen: boolean;
  /**
   * <@default=`'medium'`>
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Modal can be closed via pressing ESC key, clicking overlay or close icon
   */
  onRequestClose?: () => void;
}

export const Modal: FC<ModalProps> = memo(
  ({ isOpen, size, onRequestClose, children }) => (
    <ReactModal
      ariaHideApp={false}
      isOpen={isOpen}
      bodyOpenClassName="ztopia-modal__body--open"
      portalClassName="ztopia-modal"
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
      <svg
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 352 512"
        className="ztopia-modal__close-icon"
        onClick={onRequestClose}
      >
        <path
          fill="currentColor"
          d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
        ></path>
      </svg>
      {children}
    </ReactModal>
  ),
);

Modal.defaultProps = {
  isOpen: false,
  size: 'medium',
};
