import { memo, useState } from 'react';

export const CheckboxDemo = memo(({ children }) => {
  const [checked, setChecked] = useState(false);
  const onChange = () => setChecked(!checked);
  return children({ checked, onChange });
});
