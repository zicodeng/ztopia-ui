import classNames from 'classnames';
import React, { FC, memo, ReactNode } from 'react';
import { Carousel as BaseCarousel } from 'react-responsive-carousel';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Carousel.css';

export interface CarouselSlide {
  imgSrc: string;
  legend?: ReactNode;
}

export interface CarouselProps {
  /**
   * <@default=`true`>
   */
  autoPlay?: boolean;
  /**
   * <@default=`true`>
   */
  infiniteLoop?: boolean;
  /**
   * <@default=`500`>
   */
  height?: number;
  className?: string;
  slides: CarouselSlide[];
}

export const Carousel: FC<CarouselProps> = memo(
  ({ height, className, slides, ...restProps }) => (
    <BaseCarousel
      showThumbs={false}
      showStatus={false}
      className={classNames(className, 'ztopia-carousel')}
      {...restProps}
    >
      {slides.map(({ imgSrc, legend }, i) => (
        <div
          key={i}
          className="ztopia-carousel__slide"
          style={{ height, backgroundImage: `url('${imgSrc}')` }}
        >
          {legend && <div className="ztopia-carousel__legend">{legend}</div>}
        </div>
      ))}
    </BaseCarousel>
  ),
);

Carousel.defaultProps = {
  autoPlay: true,
  infiniteLoop: true,
  height: 500,
};
