import { memo, useState } from 'react';

export const InputDemo = memo(({ defaultValue = 'hello', children }) => {
  const [value, setValue] = useState(defaultValue);
  const onChange = e => setValue(e.currentTarget.value);
  return children({ value, onChange });
});
