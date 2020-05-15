import React, { CSSProperties, FC, memo } from 'react';
import classNames from 'classnames';
import { Circle, Line } from 'rc-progress';

import 'rc-progress/assets/index.css';
import './Progress.css';

export interface ProgressProps {
  /**
   * Render color from red to green based on percent value
   *
   * <@default=`false`>
   */
  isGradientEnabled?: boolean;
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

const calcGradientColor = percent => {
  let r = 0;
  let g = 0;
  const b = 0;
  if (percent < 50) {
    r = 255;
    g = Math.round(5.1 * percent);
  } else {
    g = 255;
    r = Math.round(510 - 5.1 * percent);
  }
  const h = r * 0x10000 + g * 0x100 + b * 0x1;
  return '#' + ('000000' + h.toString(16)).slice(-6);
};

export const Progress: FC<ProgressProps> = memo(
  ({
    isGradientEnabled = false,
    percent,
    strokeWidth = 1,
    trailWidth = 1,
    strokeColor = '#131518',
    trailColor = '#f2f3f5',
    className,
    variant = 'line',
    style,
  }) => {
    const props = {
      percent,
      strokeWidth,
      trailWidth,
      strokeColor: isGradientEnabled ? calcGradientColor(percent) : strokeColor,
      trailColor,
      style,
      className: classNames(className, `ztopia-progress--${variant}`),
    };
    return variant === 'line' ? <Line {...props} /> : <Circle {...props} />;
  },
);
