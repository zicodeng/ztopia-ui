import classNames from 'classnames';
import { Circle, Line } from 'rc-progress';
import React, { CSSProperties, FC } from 'react';

import './Progress.css';

export interface ProgressProps {
  value?: number;
  /**
   * <@default=`1`>
   */
  strokeWidth?: number;
  /**
   * <@default=`1`>
   */
  trailWidth?: number;
  /**
   * <@default=`'#131518'`>
   */
  strokeColor?: string;
  /**
   * <@default=`'#f2f3f5'`>
   */
  trailColor?: string;
  className?: string;
  /**
   * <@default=`'line'`>
   */
  variant?: 'line' | 'circle';

  style?: CSSProperties;
}

export const Progress: FC<ProgressProps> = ({
  value,
  strokeWidth,
  trailWidth,
  strokeColor,
  trailColor,
  className,
  variant,
  style,
}) => {
  const props = {
    strokeWidth,
    trailWidth,
    strokeColor,
    trailColor,
    style,
    percent: value,
    className: classNames(className, `ztopia-progress--${variant}`),
  };
  return variant === 'line' ? (
    <Line {...props} trailWidth={0} />
  ) : (
    <Circle {...props} />
  );
};

Progress.defaultProps = {
  strokeWidth: 1,
  trailWidth: 1,
  strokeColor: '#131518',
  trailColor: '#f2f3f5',
  variant: 'line',
};
