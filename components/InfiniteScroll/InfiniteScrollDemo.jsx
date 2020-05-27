import React, { memo, useState } from 'react';
import uuidv4 from 'uuid/v4';

const sleep = milliseconds =>
  new Promise(resolve => setTimeout(resolve, milliseconds));

const createFakeItems = () =>
  Array.from({ length: 20 }).map((_, i) => (
    <div
      key={uuidv4()}
      style={{
        width: '100%',
        height: 20,
        backgroundColor: i % 2 === 0 ? '#5e9cea' : '#eb5757',
        margin: '10px 0',
      }}
    />
  ));

export const InfiniteScrollDemo = memo(({ children }) => {
  const [items, setItems] = useState(createFakeItems());

  const loadMore = async () => {
    console.log('InfiniteScroll', 'loadMore');
    await sleep(5000);
    setItems(prevItems => [...prevItems, ...createFakeItems()]);
  };

  return children({ items, loadMore });
});
