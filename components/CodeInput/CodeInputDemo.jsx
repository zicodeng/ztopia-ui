import { memo, useState } from 'react';

export const CodeInputDemo = memo(({ children }) => {
  const [value, setValue] = useState('');
  const onChange = (newValue) => {
    console.log('CodeInput', 'onChange', { newValue });
    setValue(newValue);
  };
  return children({ value, onChange });
});
