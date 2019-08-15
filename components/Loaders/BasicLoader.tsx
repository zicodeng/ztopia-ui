import classNames from 'classnames';
import React, { FC, useMemo } from 'react';

import { Loader, LoaderProps } from '.';

import './BasicLoader.css';

export const BasicLoader: FC<LoaderProps> = props => (
  <Loader {...props}>
    {({ color, className }) => {
      const { r, g, b } = useMemo(() => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
        return result
          ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
            }
          : { r: 0, g: 0, b: 0 };
      }, [color]);
      return (
        <div
          className={classNames(className, 'ztopia-loader--basic')}
          style={{
            borderColor: `rgba(${r}, ${g}, ${b}, 0.2)`,
            borderTopColor: color,
          }}
        />
      );
    }}
  </Loader>
);
