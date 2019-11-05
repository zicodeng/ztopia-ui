import { memo, useState } from 'react';

export const MoodyDogDemo = memo(({ children }) => {
  const [mood, setMood] = useState('relaxed');
  return children({ mood, setMood });
});
