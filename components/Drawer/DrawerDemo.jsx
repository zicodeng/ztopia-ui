import { memo, useState, useRef } from 'react';

export const DrawerDemo = memo(({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const openDrawer = () => {
    setIsOpen(true);
  };
  const closeDrawer = () => {
    setIsOpen(false);
  };
  return children({ isOpen, openDrawer, closeDrawer, containerRef });
});
