import { memo, useState } from 'react';

export const RatingDemo = memo(({ children }) => {
  const [value, setValue] = useState(2);
  const onChange = value => {
    console.log('Rating', 'onChange', { value });
    setValue(value);
  };
  return children({ value, onChange });
});
