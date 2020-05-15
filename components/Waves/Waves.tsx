import React, { FC, memo } from 'react';
import classNames from 'classnames';

import './Waves.css';

export interface WaveProps {
  className?: string;
  /**
   * Hex color
   *
   * <@default=`'#131518'`>
   */
  color?: string;
}

const convertHexToRGBA = (hex, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};

export const Waves: FC<WaveProps> = memo(({ className, color = '#131518' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 24 150 28"
    preserveAspectRatio="none"
    shapeRendering="auto"
    className={classNames(className, 'waves')}
  >
    <defs>
      <path
        id="wave"
        d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
      />
    </defs>
    <g className="parallax">
      <use xlinkHref="#wave" x="48" y="0" fill={convertHexToRGBA(color, 0.7)} />
      <use xlinkHref="#wave" x="48" y="3" fill={convertHexToRGBA(color, 0.5)} />
      <use xlinkHref="#wave" x="48" y="5" fill={convertHexToRGBA(color, 0.3)} />
      <use xlinkHref="#wave" x="48" y="7" fill={color} />
    </g>
  </svg>
));
