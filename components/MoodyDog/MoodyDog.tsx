import React, { FC, memo } from 'react';
import classNames from 'classnames';

import './MoodyDog.css';

export enum Mood {
  Relaxed = 'relaxed',
  Happy = 'happy',
  Sad = 'sad',
}

export interface MoodyDogProps {
  className?: string;
  mood?: Mood;
}

export const MoodyDog: FC<MoodyDogProps> = memo(
  ({ className, mood = 'relaxed' }) => (
    <div className={classNames(className, 'dog', `dog--${mood}`)}>
      <div className="head">
        <div className="ears"></div>
        <div className="face"></div>
        <div className="eyes">
          <div className="teardrop"></div>
        </div>
        <div className="nose"></div>
        <div className="mouth">
          <div className="tongue"></div>
        </div>
        <div className="chin"></div>
      </div>
      <div className="body">
        <div className="tail"></div>
        <div className="legs"></div>
      </div>
    </div>
  ),
);
