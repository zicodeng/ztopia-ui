import React, { CSSProperties, memo, ReactNode } from 'react';
import { Carousel } from 'react-responsive-carousel';
import classNames from 'classnames';

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
  isAutoPlay?: boolean;
  /**
   * <@default=`true`>
   */
  isInfiniteLoop?: boolean;
  /**
   * <@default=`500`>
   */
  height?: number;
  /**
   * <@default=`0`>
   */
  imageBlur?: number;
  className?: string;
  imageMaskStyle?: CSSProperties | null;
  slides: ImageCarouselSlide[];
}

export const ImageCarousel = memo<ImageCarouselProps>(
  ({
    isAutoPlay = true,
    isInfiniteLoop = true,
    height = 500,
    imageBlur = 0,
    className,
    imageMaskStyle,
    slides,
    ...restProps
  }) => (
    <Carousel
      showThumbs={false}
      showStatus={false}
      stopOnHover={true}
      interval={5000}
      autoPlay={isAutoPlay}
      infiniteLoop={isInfiniteLoop}
      className={classNames(className, 'ztopia-image-carousel')}
      {...restProps}
    >
      {slides.map(({ src, caption }, i) => (
        <Image
          key={i}
          delay={500}
          height={height}
          blur={imageBlur}
          variant="background"
          src={src}
          caption={caption}
          maskStyle={imageMaskStyle}
        />
      ))}
    </Carousel>
  ),
);
