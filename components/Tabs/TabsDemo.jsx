import { memo, useState } from 'react';

export const TabsDemo = memo(({ children }) => {
  const [value, setValue] = useState('');
  const onChange = (_e, newValue) => {
    console.log('Tabs', 'onChange', { newValue });
    setValue(newValue);
  };
  return children({ value, onChange });
});
