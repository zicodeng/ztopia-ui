import React, {
  cloneElement,
  CSSProperties,
  FC,
  isValidElement,
  memo,
  ReactNode,
  useEffect,
  useMemo,
} from 'react';
import LazyLoad, { forceCheck } from 'react-lazyload';
import ProgressiveImage from 'react-progressive-image';
import classNames from 'classnames';

import { Placeholder, PlaceholderProps } from '../Placeholder';

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
  /**
   * A Ztopia Placeholder either in function form (`Placeholder`) or element form (`<Placeholder />`)
   */
  placeholder?: ReactNode | FC<PlaceholderProps> | null;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
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
    placeholder,
    children,
    ...restProps
  }) => {
    if (variant === 'background' && typeof height !== 'number') {
      throw new Error(
        'Image: prop height must be a number with fixed value in background mode',
      );
    }

    useEffect(() => {
      forceCheck();
    }, []);

    const mask = maskStyle && (
      <div className="ztopia-image__mask" style={maskStyle} />
    );

    const memoizedPlaceholder = useMemo(() => {
      if (!placeholder || typeof placeholder === 'function') {
        return (
          <Placeholder
            variant="image"
            className={className}
            width={width}
            height={
              typeof height === 'number'
                ? height
                : typeof width === 'number'
                ? width / 2
                : 200
            }
          />
        );
      }

      if (typeof placeholder === 'object' && isValidElement(placeholder)) {
        return cloneElement(placeholder, {
          className,
          variant: 'image',
        });
      }

      return null;
    }, [placeholder]);

    const image = (
      <ProgressiveImage delay={delay} src={src} placeholder="">
        {(src, loading) => {
          if (loading) return memoizedPlaceholder;

          if (variant === 'background') {
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
                {...restProps}
              >
                {caption && (
                  <div className="ztopia-image__caption">{caption}</div>
                )}
                {mask}
                {children}
              </div>
            );
          }

          // Normal image
          return (
            <figure
              className={classNames(
                className,
                'ztopia-image',
                'ztopia-image--normal',
                {
                  'is-loading': loading,
                },
              )}
              style={{
                width,
                height,
              }}
              {...restProps}
            >
              <img
                width={width}
                height={height}
                src={src}
                alt={alt}
                className="ztopia-image__img"
              />
              {caption && (
                <figcaption className="ztopia-image__caption">
                  {caption}
                </figcaption>
              )}
              {mask}
              {children}
            </figure>
          );
        }}
      </ProgressiveImage>
    );

    return isLazyLoading ? (
      <LazyLoad
        once
        height={height}
        offset={400}
        placeholder={memoizedPlaceholder}
      >
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
