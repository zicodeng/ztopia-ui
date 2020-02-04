import React, { FC, useEffect, CSSProperties, memo } from 'react';
import Danmu from 'danmu.js';
import classNames from 'classnames';

import './BulletScreen.css';

const CONTAINER_ID = 'ztopia-bullet-screen';

export interface BulletScreenComment {
  id: number;
  // Must be greater than 5000
  duration: number;
  startTime: number;
  text: string;
  style?: CSSProperties;
}

export interface BulletScreenProps {
  className?: string;
  comments: BulletScreenComment[];
}

export const BulletScreen: FC<BulletScreenProps> = memo(
  ({ className, comments }) => {
    useEffect(() => {
      const danmu = new Danmu({
        container: document.getElementById(CONTAINER_ID),
        comments: comments.map(({ text, startTime, ...rest }) => ({
          start: startTime,
          txt: text,
          ...rest,
        })),
      });
      danmu.play();
    }, []);
    return (
      <section
        id={CONTAINER_ID}
        className={classNames(className, CONTAINER_ID)}
      ></section>
    );
  },
);
