import React, { memo } from 'react';
import classNames from 'classnames';

import './FloatingShapes.css';

export interface FloatingShapesProps {
  className?: string;
  /**
   * <@default=`#46cead`>
   */
  color?: string;
  variant?: 'rect' | 'circle';
}

export const FloatingShapes = memo<FloatingShapesProps>(
  ({ className, color = '#46cead', variant = 'rect' }) => (
    <section className={classNames(className, 'ztopia-floating-boxes')}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="ztopia-floating-boxes__box"
          style={{
            backgroundColor: color,
            borderRadius: variant === 'rect' ? 0 : '50%',
          }}
        />
      ))}
    </section>
  ),
);
