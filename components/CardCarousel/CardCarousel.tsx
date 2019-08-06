import useWindowSize from '@rehooks/window-size';
import classNames from 'classnames';
import React, { FC, memo, useEffect, useRef, useState } from 'react';

import { ChevronLeft, ChevronRight } from '../Icons';

import './CardCarousel.css';

interface CardCarouselProps {
  /**
   * <@default=`10`>
   *
   * Spacing between cards
   */
  gap?: number;
  className?: string;
  cards: JSX.Element[];
}

export const CardCarousel: FC<CardCarouselProps> = memo(
  ({ gap, className, cards, ...restProps }) => {
    const [x, setX] = useState(-gap!);
    const [width, setWidth] = useState(0);
    const [scrollWidth, setScrollWidth] = useState(0);

    const carouselRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLUListElement>(null);

    const windowSize = useWindowSize();

    const minX = -(scrollWidth - width);
    const step = (scrollWidth / cards.length) * 2;

    useEffect(() => {
      const carouselNode = carouselRef.current;
      const cardsNode = cardsRef.current;
      if (!carouselNode || !cardsNode) {
        return;
      }
      setWidth(carouselNode.offsetWidth);
      setScrollWidth(cardsNode.scrollWidth);
      if (x < minX) {
        setX(minX);
      }
    }, [windowSize, width]);

    return (
      <div
        ref={carouselRef}
        className={classNames(className, 'ztopia-card-carousel')}
        {...restProps}
      >
        <div
          style={{
            display: x >= -gap! ? 'none' : 'flex',
          }}
          className={classNames(
            'ztopia-card-carousel__controller',
            'ztopia-card-carousel__controller--left',
          )}
          onClick={() => {
            const newX = x + step;
            setX(newX > 0 ? -gap! : newX);
          }}
        >
          <ChevronLeft size="small" />
        </div>
        <div
          style={{
            display: x <= minX ? 'none' : 'flex',
          }}
          className={classNames(
            'ztopia-card-carousel__controller',
            'ztopia-card-carousel__controller--right',
          )}
          onClick={() => {
            const newX = x - step;
            setX(newX < minX ? minX : newX);
          }}
        >
          <ChevronRight size="small" />
        </div>
        <div className="ztopia-card-carousel__container">
          <ul
            ref={cardsRef}
            className="ztopia-card-carousel__cards"
            style={{
              transform: `translateX(${x}px)`,
              padding: 0,
              margin: 0,
            }}
          >
            {cards.map((item, i) => (
              <li
                key={i}
                style={{
                  margin: `0 ${gap}px`,
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  },
);

CardCarousel.defaultProps = {
  gap: 10,
};
