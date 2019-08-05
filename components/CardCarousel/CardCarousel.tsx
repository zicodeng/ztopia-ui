import useWindowSize from '@rehooks/window-size';
import classNames from 'classnames';
import React, { FC, memo, useEffect, useRef, useState } from 'react';

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
      if (!carouselNode || !cardsNode) { return; }
      setWidth(carouselNode.offsetWidth);
      setScrollWidth(cardsNode.scrollWidth);
      if (x < minX) { setX(minX); }
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
          <svg
            aria-hidden="true"
            focusable="false"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            className="ztopia-card-carousel__controller-icon"
          >
            <path
              fill="currentColor"
              d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"
            ></path>
          </svg>
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
          <svg
            aria-hidden="true"
            focusable="false"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            className="ztopia-card-carousel__controller-icon"
          >
            <path
              fill="currentColor"
              d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
            ></path>
          </svg>
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
