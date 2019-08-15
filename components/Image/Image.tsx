import classNames from 'classnames';
import React, { CSSProperties, FC, memo, ReactNode } from 'react';
import LazyLoad from 'react-lazyload';
import ProgressiveImage from 'react-progressive-image';

import { Placeholder } from '../Placeholder';

import './Image.css';

export interface ImageProps {
  /**
   * <@default=`true`>
   */
  isLazyLoading?: boolean;
  /**
   * <@default=`0`>
   */
  delay?: number;
  src: string;
  alt?: string;
  className?: string;
  /**
   * <@default=`'100%'`>
   */
  width?: number | string;
  /**
   * <@default=`'auto'`>
   */
  height?: number | string;
  /**
   * Normal image will be rendered as `<img>` element; Background image will be rendered as `<div>` element
   *
   *  <@default=`'normal'`>
   */
  variant?: 'normal' | 'background';
  caption?: ReactNode;
  maskStyle?: CSSProperties | null;
}

export const Image: FC<ImageProps> = memo(
  ({
    isLazyLoading,
    width,
    height,
    delay,
    src,
    alt,
    className,
    variant,
    caption,
    maskStyle,
  }) => {
    if (variant === 'background' && typeof height !== 'number') {
      throw new Error(
        'height must be a number with fixed value in background mode',
      );
    }

    const mask = maskStyle && (
      <div className="ztopia-image__mask" style={maskStyle} />
    );

    const placeholder = (
      <Placeholder
        variant="image"
        className={className}
        width={width!}
        height={height!}
      />
    );

    const image = (
      <ProgressiveImage delay={delay} src={src} placeholder="">
        {(src, loading) => {
          if (variant === 'background') {
            if (loading) return placeholder;
            return (
              <div
                style={{
                  width,
                  height,
                  backgroundImage: `url(${src})`,
                }}
                className={classNames(
                  className,
                  'ztopia-image',
                  'ztopia-image--background',
                )}
              >
                {caption && (
                  <div className="ztopia-image__caption">{caption}</div>
                )}
                {mask}
              </div>
            );
          }
          return (
            <figure
              className={classNames(
                className,
                'ztopia-image',
                'ztopia-image--normal',
                {
                  'ztopia-image--loading': loading,
                },
              )}
              style={{
                width,
                height,
              }}
            >
              <img src={src} alt={alt} />
              {caption && (
                <figcaption className="ztopia-image__caption">
                  {caption}
                </figcaption>
              )}
              {mask}
            </figure>
          );
        }}
      </ProgressiveImage>
    );

    return isLazyLoading ? (
      <LazyLoad height={height} once offset={200} placeholder={placeholder}>
        {image}
      </LazyLoad>
    ) : (
      image
    );
  },
);

Image.defaultProps = {
  isLazyLoading: true,
  delay: 0,
  width: '100%',
  height: 'auto',
  variant: 'normal',
};
