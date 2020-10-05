import React, { memo } from 'react';
import classNames from 'classnames';

import { Loader, LoaderProps } from './';

import './ReverseLoader.css';

export const ReverseLoader = memo<LoaderProps>(props => (
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
));
