import { memo, useState, useEffect } from 'react';

export const ProgressDemo = memo(({ children }) => {
  let [value, setValue] = useState(0);
  useEffect(() => {
    let timerId = setInterval(() => {
      setValue(value === 100 ? 0 : ++value);
    }, 100);
    return () => {
      clearInterval(timerId);
      timerId = null;
    };
  }, [value]);
  return children({ value });
});
