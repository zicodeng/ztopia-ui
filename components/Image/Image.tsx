import classNames from 'classnames';
import React, { FC, memo } from 'react';
import LazyLoad from 'react-lazyload';
import ProgressiveImage from 'react-progressive-image';

import { Placeholder } from '../Placeholder';

import './Image.css';

export interface ImageProps {
  /**
   * <@default=`false`>
   *
   * Render as a background image with `<div>` tag
   */
  background?: boolean;
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
}

export const Image: FC<ImageProps> = memo(
  ({ background, width, height, delay, src, alt, className }) => {
    if (background && typeof height !== 'number') {
      throw new Error(
        'height must be a number with fixed value in background mode',
      );
    }
    return (
      <LazyLoad>
        <ProgressiveImage delay={delay} src={src} placeholder="">
          {(src, loading) => {
            if (background) {
              if (loading) {
                return <Placeholder width={width!} height={height!} />;
              }
              return (
                <div
                  style={{
                    width,
                    height,
                    backgroundImage: `url(${src})`,
                  }}
                  className={classNames(className, 'ztopia-image--background')}
                />
              );
            }
            return (
              <img
                style={{
                  width,
                  height,
                }}
                src={src}
                alt={alt}
                className={classNames(className, 'ztopia-image', {
                  'ztopia-image--loading': loading,
                })}
              />
            );
          }}
        </ProgressiveImage>
      </LazyLoad>
    );
  },
);

Image.defaultProps = {
  background: false,
  delay: 0,
  width: '100%',
  height: 'auto',
};
