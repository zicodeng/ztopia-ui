import classNames from 'classnames';
import React, { FC, memo, ReactNode } from 'react';
import { Carousel as BaseCarousel } from 'react-responsive-carousel';

import { Image } from '../Image';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Carousel.css';

export interface CarouselSlide {
  src: string;
  caption?: ReactNode;
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
      {slides.map(({ src, caption }, i) => (
        <Image
          background
          key={i}
          delay={500}
          height={height}
          src={src}
          caption={caption}
        />
      ))}
    </BaseCarousel>
  ),
);

Carousel.defaultProps = {
  autoPlay: true,
  infiniteLoop: true,
  height: 500,
};
