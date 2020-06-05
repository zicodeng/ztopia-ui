import React, { cloneElement, FC, memo } from 'react';
import BaseInfiniteScroll from 'react-infinite-scroller';

import { FadingLoader } from '../Loaders';

import './InfiniteScroll.css';

export interface InfiniteScrollProps {
  /**
   * <@default=`false`>
   */
  hasMore?: boolean;
  /**
   * <@default=`200`>
   */
  offset?: boolean;
  /**
   * <@default=`'div'`>
   */
  element?: string;
  className?: string;
  /**
   * <@default=`<FadingLoader />`>
   */
  loader?: JSX.Element;
  loadMore?: () => void;
}

export const InfiniteScroll: FC<InfiniteScrollProps> = memo<
  InfiniteScrollProps
>(({ offset = 200, loader = <FadingLoader size="small" />, ...restProps }) => (
  <BaseInfiniteScroll
    initialLoad={false}
    useWindow={false}
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
));
