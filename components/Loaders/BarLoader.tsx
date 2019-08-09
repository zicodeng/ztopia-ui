import classNames from 'classnames';
import React, { FC } from 'react';

import { Loader, LoaderProps } from '.';

import './BarLoader.css';

export const BarLoader: FC<LoaderProps> = props => (
  <Loader {...props}>
    {({ color, className }) => (
      <div className={classNames(className, 'ztopia-loader--line')}>
        <div
          className="ztopia-loader--line__bar"
          style={{
            background: color,
          }}
        />
      </div>
    )}
  </Loader>
);
