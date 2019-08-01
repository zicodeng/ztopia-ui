import React, { FC, memo } from 'react';

interface CardProps {
  title: string;
}

export const Card: FC<CardProps> = memo(({ title }) => {
  return <div>{title}</div>;
});
