import React, { FC } from 'react';
import classNames from 'classnames';

import './FloatingBoxes.css';

export interface FloatingBoxesProps {
  className?: string;
}

export const FloatingBoxes: FC<FloatingBoxesProps> = ({ className }) => (
  <section className={classNames(className, 'ztopia-floating-boxes')}>
    <div className="ztopia-floating-boxes__box" />
    <div className="ztopia-floating-boxes__box" />
    <div className="ztopia-floating-boxes__box" />
    <div className="ztopia-floating-boxes__box" />
    <div className="ztopia-floating-boxes__box" />
    <div className="ztopia-floating-boxes__box" />
  </section>
);
