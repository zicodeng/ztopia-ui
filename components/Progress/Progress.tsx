import classNames from 'classnames';
import { Circle, Line } from 'rc-progress';
import React, { CSSProperties, FC } from 'react';

import 'rc-progress/assets/index.css';
import './Progress.css';

export interface ProgressProps {
  /**
   * Value must be in range of 0 to 100
   */
  percent?: number;
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
  percent,
  strokeWidth,
  trailWidth,
  strokeColor,
  trailColor,
  className,
  variant,
  style,
}) => {
  const props = {
    percent,
    strokeWidth,
    trailWidth,
    strokeColor,
    trailColor,
    style,
    className: classNames(className, `ztopia-progress--${variant}`),
  };
  return variant === 'line' ? <Line {...props} /> : <Circle {...props} />;
};

Progress.defaultProps = {
  strokeWidth: 1,
  trailWidth: 1,
  strokeColor: '#131518',
  trailColor: '#f2f3f5',
  variant: 'line',
};
