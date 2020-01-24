import classNames from 'classnames';
import React, { FC, useMemo } from 'react';
import hexRgb from 'hex-rgb';

import { Loader, LoaderProps } from '.';

import './BasicLoader.css';

export const BasicLoader: FC<LoaderProps> = props => (
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
);
