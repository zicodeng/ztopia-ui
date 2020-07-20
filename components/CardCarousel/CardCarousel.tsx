import React, { FC, memo, useEffect, useRef, useState } from 'react';
import { useWindowSize } from 'react-use';
import classNames from 'classnames';

import { IconChevronLeft, IconChevronRight } from '../Icons';

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

const getCardMargin = (i: number, total: number, gap: number): string => {
  if (i === 0) return `0 ${gap}px 0 0`;
  if (i === total - 1) return `0 0 0 ${gap}px`;
  return `0 ${gap}px`;
};

export const CardCarousel: FC<CardCarouselProps> = memo(
  ({ gap = 10, className, cards, ...restProps }) => {
    const [x, setX] = useState(-gap);
    const [width, setWidth] = useState(0);
    const [scrollWidth, setScrollWidth] = useState(0);

    const carouselRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLUListElement>(null);

    const windowSize = useWindowSize();

    const minX = -(scrollWidth - width);
    const step = (scrollWidth / cards.length) * 2 + gap;

    useEffect(() => {
      const carouselNode = carouselRef.current;
      const cardsNode = cardsRef.current;
      if (!carouselNode || !cardsNode) return;

      setWidth(carouselNode.offsetWidth);
      setScrollWidth(cardsNode.scrollWidth);
      if (x < minX) setX(minX);
    }, [cards, windowSize, width]);

    return (
      <div
        ref={carouselRef}
        className={classNames(className, 'ztopia-card-carousel')}
        {...restProps}
      >
        <div
          style={{
            display: x >= -gap ? 'none' : 'flex',
          }}
          className={classNames(
            'ztopia-card-carousel__controller',
            'ztopia-card-carousel__controller--left',
          )}
          onClick={() => {
            const newX = x + step;
            setX(newX > 0 ? 0 : newX);
          }}
        >
          <IconChevronLeft size="small" />
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
          <IconChevronRight size="small" />
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
            {cards.map((card, i) => (
              <li
                key={i}
                className="ztopia-card-carousel__card"
                style={{
                  margin: getCardMargin(i, cards.length, gap),
                }}
              >
                {card}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  },
);
