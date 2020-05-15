import React, { FC } from 'react';
import classNames from 'classnames';

import { Loader, LoaderProps } from './';

import './ReverseLoader.css';

export const ReverseLoader: FC<LoaderProps> = props => (
  <Loader {...props}>
    {({ color, className }) => (
      <div
        className={classNames(className, 'ztopia-loader--reverse')}
        style={{
          color,
        }}
      />
    )}
  </Loader>
);
