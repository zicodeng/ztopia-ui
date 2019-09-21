import { memo, useState } from 'react';

export const RatingDemo = memo(({ children }) => {
  const [value, setValue] = useState(2);
  const onChange = newValue => {
    console.log('Rating', 'onChange', { newValue });
    setValue(newValue);
  };
  return children({ value, onChange });
});
