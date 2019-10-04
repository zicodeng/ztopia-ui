import React, { FC, memo } from 'react';

import './ElasticStroke.css';

export interface ElasticStrokeProps {
  width?: string | number;
  height?: string | number;
  text?: string;
}

export const ElasticStroke: FC<ElasticStrokeProps> = memo(
  ({ width = '100%', height = '100%', text = 'Hello, World!' }) => (
    <svg
      viewBox="0 -75 800 300"
      className="ztopia-elastic-stroke"
      width={width}
      height={height}
    >
      <symbol id="text-symbol">
        <text text-anchor="middle" x="50%" y="35%" className="text">
          {text}
        </text>
      </symbol>
      <g>
        <use xlinkHref="#text-symbol" className="text-copy"></use>
        <use xlinkHref="#text-symbol" className="text-copy"></use>
        <use xlinkHref="#text-symbol" className="text-copy"></use>
        <use xlinkHref="#text-symbol" className="text-copy"></use>
        <use xlinkHref="#text-symbol" className="text-copy"></use>
      </g>
    </svg>
  ),
);
