import React, { memo, useState } from 'react';

export const ModalDemo = memo(({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  return children({ isOpen, openModal, closeModal });
});

export const Trigger = props => (
  <div
    style={{
      width: 150,
      height: 150,
      backgroundColor: 'yellow',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    }}
    {...props}
  />
);
