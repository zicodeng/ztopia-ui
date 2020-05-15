import React, { FC } from 'react';

import './Sunrise.css';

export interface SunriseProps {
  width?: string | number;
  height?: string | number;
}

export const Sunrise: FC<SunriseProps> = ({ width = 400, height = 300 }) => (
  <svg
    viewBox="-200 -175 400 300"
    className="ztopia-sunrise"
    width={width}
    height={height}
  >
    <defs>
      <line id="ray" x1="-5" x2="5"></line>
      <clipPath id="cp">
        <rect x="-200" y="-150" width="400" height="150"></rect>
      </clipPath>
    </defs>
    <line id="line" x1="-76" x2="76"></line>
    <g id="sun" clipPath="url(#cp)">
      <g id="mover">
        <circle id="main" r="50"></circle>
        <g id="eyes">
          <circle r="3" cx="-13"></circle>
          <circle r="3" cx="13"></circle>
        </g>
        <g id="rays">
          <use xlinkHref="#ray" transform="rotate(315) translate(70)"></use>
          <use xlinkHref="#ray" transform="rotate(270) translate(70)"></use>
          <use xlinkHref="#ray" transform="rotate(225) translate(70)"></use>
          <use xlinkHref="#ray" transform="rotate(180) translate(70)"></use>
          <use xlinkHref="#ray" transform="rotate(135) translate(70)"></use>
          <use xlinkHref="#ray" transform="rotate(90) translate(70)"></use>
          <use xlinkHref="#ray" transform="rotate(45) translate(70)"></use>
          <use xlinkHref="#ray" transform="rotate(0) translate(70)"></use>
        </g>
      </g>
    </g>
  </svg>
);
