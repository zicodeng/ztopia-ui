import React, { FC } from 'react';
import classNames from 'classnames';

import './FloatingBoxes.css';

export interface FloatingBoxesProps {
  className?: string;
  /**
   * <@default=`#46cead`>
   */
  color?: string;
}

export const FloatingBoxes: FC<FloatingBoxesProps> = ({
  className,
  color = '#46cead',
}) => (
  <section className={classNames(className, 'ztopia-floating-boxes')}>
    {Array.from({ length: 6 }).map((_, i) => (
      <div
        key={i}
        className="ztopia-floating-boxes__box"
        style={{
          backgroundColor: color,
        }}
      />
    ))}
  </section>
);
