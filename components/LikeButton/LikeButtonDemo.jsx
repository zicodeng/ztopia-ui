import { memo, useState } from 'react';

export const LikeButtonDemo = memo(({ children }) => {
  const [isLiked, setIsLiked] = useState(false);
  const onClick = () => setIsLiked(!isLiked);
  return children({ isLiked, onClick });
});
