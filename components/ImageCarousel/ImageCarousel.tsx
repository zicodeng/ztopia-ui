import classNames from 'classnames';
import React, { FC, memo, ReactNode } from 'react';
import { Carousel } from 'react-responsive-carousel';

import { Image } from '../Image';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './ImageCarousel.css';

export interface ImageCarouselSlide {
  src: string;
  caption?: ReactNode;
}

export interface ImageCarouselProps {
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
  slides: ImageCarouselSlide[];
}

export const ImageCarousel: FC<ImageCarouselProps> = memo(
  ({ height, className, slides, ...restProps }) => (
    <Carousel
      showThumbs={false}
      showStatus={false}
      className={classNames(className, 'ztopia-image-carousel')}
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
    </Carousel>
  ),
);

ImageCarousel.defaultProps = {
  autoPlay: true,
  infiniteLoop: true,
  height: 500,
};
