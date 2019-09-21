import { memo, useState } from 'react';

export const options = [
  {
    label: 'Apple',
    value: 'apple',
  },
  {
    label: 'Banana',
    value: 'banana',
  },
  {
    label: 'Avocado',
    value: 'avocado',
  },
  {
    label: 'Pineapple',
    value: 'pineapple',
  },
  {
    label: 'Blackberries',
    value: 'blackberries',
  },
  {
    label: 'Durian',
    value: 'durian',
  },
  {
    label: 'Cherries',
    value: 'cherries',
  },
  {
    label: 'Grapes',
    value: 'grapes',
  },
];

export const SelectDemo = memo(({ children }) => {
  const [value, setValue] = useState(null);
  const onChange = (newValue, actionMeta) => {
    console.log({ newValue, actionMeta });
    setValue(newValue);
  };
  return children({ value, onChange });
});
