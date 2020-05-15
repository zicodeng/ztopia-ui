import React, { FC } from 'react';
import classNames from 'classnames';

import { Loader, LoaderProps } from './';

import './FadingLoader.css';

export const FadingLoader: FC<LoaderProps> = props => (
  <Loader {...props}>
    {({ color, className }) => (
      <div className={classNames(className, 'ztopia-loader--fading')}>
        <div
          className="ztopia-loader--fading__circle"
          style={{ backgroundColor: color }}
        />
        <div
          className="ztopia-loader--fading__circle"
          style={{ backgroundColor: color }}
        />
        <div
          className="ztopia-loader--fading__circle"
          style={{ backgroundColor: color }}
        />
      </div>
    )}
  </Loader>
);
