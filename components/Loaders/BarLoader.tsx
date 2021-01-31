import React, { memo } from 'react';
import classNames from 'classnames';

import { Loader, LoaderProps } from './';

import './BarLoader.css';

export const BarLoader = memo<LoaderProps>((props) => (
  <Loader {...props}>
    {({ color, className }) => (
      <div className={classNames(className, 'ztopia-loader--bar')}>
        <div
          className="ztopia-loader--bar__indicator"
          style={{
            background: color,
          }}
        />
      </div>
    )}
  </Loader>
));
