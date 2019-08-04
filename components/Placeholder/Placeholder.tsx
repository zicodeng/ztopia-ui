import classNames from 'classnames';
import React, { FC, memo } from 'react';

import './Placeholder.css';

export interface PlaceholderProps {
  /**
   * <@default=`'grey'`>
   */
  color?: string;
  width: number | string;
  height: number | string;
  /**
   * <@default=`'rect'`>
   */
  variant?: 'rect' | 'circle';
}

export const Placeholder: FC<PlaceholderProps> = memo(
  ({ color, width, height, variant }) => (
    <div
      className={classNames(
        'ztopia-placeholder',
        `ztopia-placeholder--${variant}`,
      )}
      style={{
        width,
        height,
        backgroundColor: color,
      }}
    />
  ),
);

Placeholder.defaultProps = {
  color: 'grey',
  variant: 'rect',
};
