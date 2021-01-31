import { memo, useEffect, useState } from 'react';

export const ProgressDemo = memo(({ children }) => {
  let [percent, setPercent] = useState(0);
  useEffect(() => {
    let timerId = setInterval(() => {
      setPercent(percent > 100 ? 0 : ++percent);
    }, 100);
    return () => {
      clearInterval(timerId);
      timerId = null;
    };
  }, [percent]);
  return children({ percent });
});
