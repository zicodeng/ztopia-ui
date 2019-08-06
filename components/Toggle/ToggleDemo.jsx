import { memo, useState } from 'react';

export const ToggleDemo = memo(({ children }) => {
  const [isChecked, setIsChecked] = useState(false);
  const onChange = () => setIsChecked(!isChecked);
  return children({ isChecked, onChange });
});
