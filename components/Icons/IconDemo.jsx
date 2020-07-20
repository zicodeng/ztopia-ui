import { memo, useState } from 'react';

export const IconDemo = memo(({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);
  return children({ isActive, onClick });
});

export const IconBellDemo = memo(({ children }) => {
  const [count, setCount] = useState(0);
  return children({ count, setCount });
});
