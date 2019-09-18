import React, { useState } from 'react';
import faker from 'faker';

import { Input } from '../Input';

const ITEMS = Array.from({ length: 20 }).map((_, i) => {
  const name = faker.name.findName();
  return (
    <li
      key={name}
      style={{
        width: 200,
        height: 200 + Math.random() * 100,
        backgroundColor: faker.commerce.color(),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid black',
      }}
    >
      {name}
    </li>
  );
});

export const GridListDemo = ({ children }) => {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState(ITEMS);
  const handleChange = e => {
    const value = e.currentTarget.value;
    setQuery(value);
    setItems(
      value
        ? ITEMS.filter(item =>
            item.props.children.toLowerCase().includes(value.toLowerCase()),
          )
        : ITEMS,
    );
  };
  return (
    <div>
      <Input
        placeholder="Search by item name"
        value={query}
        onChange={handleChange}
      />
      {children({ items })}
    </div>
  );
};
