import { memo, useState } from 'react';

export const DrawerDemo = memo(({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openDrawer = () => {
    setIsOpen(true);
  };
  const closeDrawer = () => {
    setIsOpen(false);
  };
  return children({ isOpen, openDrawer, closeDrawer });
});
