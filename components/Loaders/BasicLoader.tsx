import React, { memo, useMemo } from 'react';
import classNames from 'classnames';
import hexRgb from 'hex-rgb';

import { Loader, LoaderProps } from './';

import './BasicLoader.css';

export const BasicLoader = memo<LoaderProps>(props => (
  <Loader {...props}>
    {({ color, className }) => {
      const { red, green, blue } = useMemo(() => hexRgb(color), [color]);
      return (
        <div
          className={classNames(className, 'ztopia-loader--basic')}
          style={{
            borderColor: `rgba(${red}, ${green}, ${blue}, 0.2)`,
            borderTopColor: color,
          }}
        />
      );
    }}
  </Loader>
));
