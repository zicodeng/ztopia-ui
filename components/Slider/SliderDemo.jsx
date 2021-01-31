import { memo, useState } from 'react';

export const BasicSliderDemo = memo(({ children }) => {
  const [value, setValue] = useState(0);
  const onChange = (value) => {
    console.log('Slider', 'onChange', { value });
    setValue(value);
  };
  return children({ value, onChange });
});

export const RangeSliderDemo = memo(({ children }) => {
  const [value, setValue] = useState([0, 50, 100]);
  const onChange = (value) => {
    console.log('Slider', 'onChange', { value });
    setValue(value);
  };
  return children({ value, onChange });
});
