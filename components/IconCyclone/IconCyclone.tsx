import React, { FC, memo, cloneElement } from 'react';
import classNames from 'classnames';
import CSSKeyframer from 'css-keyframer';

import './IconCyclone.css';

export interface IconCycloneProps {
  /**
   * <@default=`50`>
   */
  count?: number;
  className?: string;
  /**
   * <@default=`['#ffd700', '#95a9ff', '#db7093', '#fff8dc', '#c2b7fe']`>
   */
  colors?: string[];
  icons?: JSX.Element[];
}

const getRandomNumber = max => Math.floor(Math.random() * max);

const keyframer = new CSSKeyframer();

export const IconCyclone: FC<IconCycloneProps> = memo(
  ({
    count = 50,
    className,
    colors = ['#ffd700', '#95a9ff', '#db7093', '#fff8dc', '#c2b7fe'],
    icons = [
      <i className="fas fa-star" />,
      <i className="fas fa-paper-plane" />,
      <i className="far fa-square" />,
      <i className="fas fa-square" />,
      <i className="fab fa-codepen" />,
    ],
  }) => {
    return (
      <section className={classNames(className, 'ztopia-icon-cyclone')}>
        {Array.from({ length: count }).map((_, i) => {
          const icon = icons[getRandomNumber(icons.length)];
          const rotation = getRandomNumber(360);
          const duration = getRandomNumber(10) + 40;
          const size = getRandomNumber(10);

          keyframer.register(`cyclone-${i}`, [
            { transform: `rotate(${rotation + 0}deg)` },
            { transform: `rotate(${rotation + 360}deg)` },
          ]);

          return (
            <div
              key={i}
              style={{
                animation: `cyclone-${i} ${duration}s linear infinite`,
              }}
            >
              {cloneElement(icon, {
                style: {
                  color: colors[getRandomNumber(colors.length)],
                  margin: `${size}rem`,
                  fontSize: `${size * 0.2}rem`,
                },
                className: classNames(
                  icon.props.className,
                  'ztopia-icon-cyclone__icon',
                ),
              })}
            </div>
          );
        })}
      </section>
    );
  },
);
