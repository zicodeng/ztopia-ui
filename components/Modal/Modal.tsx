import classNames from 'classnames';
import React, { FC, memo } from 'react';
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
  isCloseIconShown?: boolean;
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
  ({ isOpen, isCloseIconShown, className, size, onRequestClose, children }) => (
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
    >
      {children}
      {isCloseIconShown && (
        <Times
          className="ztopia-modal__close-indicator"
          onClick={onRequestClose}
        />
      )}
    </ReactModal>
  ),
);

Modal.defaultProps = {
  isOpen: false,
  isCloseIconShown: false,
  size: 'medium',
};
