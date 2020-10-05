import React, { cloneElement, memo, ReactNode } from 'react';
import BaseInfiniteScroll from 'react-infinite-scroller';

import { FadingLoader } from '../Loaders';

import './InfiniteScroll.css';

export interface InfiniteScrollProps {
  /**
   * <@default=`false`>
   */
  hasMore?: boolean;
  /**
   * Add scroll listeners to the window, or else,
   * the component's parentNode
   *
   * <@default=`false`>
   */
  isWindowUsed?: boolean;
  /**
   * <@default=`200`>
   */
  offset?: number;
  /**
   * <@default=`'div'`>
   */
  element?: string;
  className?: string;
  /**
   * <@default=`<FadingLoader />`>
   */
  loader?: JSX.Element;
  children?: ReactNode;
  loadMore?: () => void;
}

export const InfiniteScroll = memo<InfiniteScrollProps>(
  ({
    isWindowUsed = false,
    offset = 200,
    loader = <FadingLoader size="small" />,
    ...restProps
  }) => (
    <BaseInfiniteScroll
      initialLoad={false}
      useWindow={isWindowUsed}
      threshold={offset}
      loader={
        loader &&
        cloneElement(loader, {
          key: 'ztopia-infinite-scroll__loader',
          className: 'ztopia-infinite-scroll__loader',
        })
      }
      {...restProps}
    />
  ),
);
