import React, { FC } from 'react';
import classNames from 'classnames';

import { Loader, LoaderProps } from './';

import './TwinnerLoader.css';

export const TwinnerLoader: FC<LoaderProps> = props => (
  <Loader {...props}>
    {({ color, className }) => (
      <div
        className={classNames(className, 'ztopia-loader--twinner')}
        style={{
          color,
        }}
      />
    )}
  </Loader>
);
