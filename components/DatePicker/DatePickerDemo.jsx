import { memo, useState } from 'react';

export const DatePickerDemo = memo(({ children }) => {
  const [value, setValue] = useState(null);
  const onChange = newValue => {
    console.log('DatePicker', 'onChange', { newValue });
    setValue(newValue);
  };
  return children({ value, onChange });
});
