import React, { useEffect, useState, FC } from 'react';
import uuidv4 from 'uuid/v4';

import './FloatingHearts.css';

const createHearts = () => {
  const offset = Math.floor(Math.random() * 40) + 1;
  const size = Math.floor(Math.random() * 50) + 15;
  const left = Math.floor(Math.random() * 100) + 1;
  const color = Math.floor(Math.random() * 25) + 100;
  const animDuration = Math.floor(Math.random() * 5) + 5;

  const largeHeartId = uuidv4();
  const largeHeart = (
    <div
      key={largeHeartId}
      id={largeHeartId}
      className="heart"
      style={{
        width: size,
        height: size,
        left: `${left}%`,
        backgroundColor: `rgba(255, ${color - 25}, ${color}, 1)`,
        animation: `floating ${animDuration}s ease`,
      }}
    />
  );

  const smallHeartId = uuidv4();
  const smallHeart = (
    <div
      key={smallHeartId}
      id={smallHeartId}
      className="heart"
      style={{
        width: size - 10,
        height: size - 10,
        left: `${left + offset}%`,
        backgroundColor: `rgba(255, ${color - 25}, ${color + 25}, 1)`,
        animation: `floating ${animDuration + 5}s ease`,
      }}
    />
  );

  return [largeHeart, smallHeart];
};

/**
 * An invalid heart is one that floats out of bound
 */
const getInvalidHeartIds = () => {
  const heartNodes = Array.from(
    document.getElementsByClassName('heart'),
  ) as HTMLDivElement[];

  const invalidHeartIds: string[] = [];
  heartNodes.forEach(({ id, offsetTop }) => {
    if (offsetTop <= -100) invalidHeartIds.push(id);
  });

  return invalidHeartIds;
};

export interface FloatingHeartsProps {
  /**
   * Interval for generating new hearts
   *
   * <@default=`1000`>
   */
  interval?: number;
}

export const FloatingHearts: FC<FloatingHeartsProps> = ({
  interval = 1000,
}) => {
  const [hearts, setHearts] = useState<JSX.Element[]>([]);

  useEffect(() => {
    let timerId: NodeJS.Timeout | null = setInterval(() => {
      if (document.hidden) return;

      const invalidHeartIds = getInvalidHeartIds();
      const filteredHearts = hearts.filter(
        ({ props: { id } }) => invalidHeartIds.indexOf(id) === -1,
      );
      setHearts([...filteredHearts, ...createHearts()]);
    }, interval);

    return () => {
      if (!timerId) return;
      clearInterval(timerId);
      timerId = null;
    };
  }, [hearts]);

  return <div className="ztopia-floating-hearts">{hearts}</div>;
};
