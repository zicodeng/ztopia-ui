import { memo, useState } from 'react';

export const CounterDemo = memo(({ children }) => {
  const [end, setEnd] = useState(1000);
  const updateEnd = () => setEnd(end + 1000);
  return children({ end, updateEnd });
});
