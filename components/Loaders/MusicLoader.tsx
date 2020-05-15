import React, { FC } from 'react';
import classNames from 'classnames';

import { Loader, LoaderProps } from './';

import './MusicLoader.css';

export const MusicLoader: FC<LoaderProps> = props => (
  <Loader {...props}>
    {({ color, className }) => (
      <div className={classNames(className, 'ztopia-loader--music')}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="ztopia-loader--music__beat"
            style={{
              background: color,
            }}
          />
        ))}
      </div>
    )}
  </Loader>
);
