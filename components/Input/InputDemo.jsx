import { memo, useState } from 'react';

export const InputDemo = memo(({ children }) => {
  const [value, setValue] = useState('');
  const onChange = e => setValue(e.currentTarget.value);
  return children({ value, onChange });
});