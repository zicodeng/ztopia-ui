import React, {
  cloneElement,
  FC,
  isValidElement,
  memo,
  ReactElement,
  ReactNode,
  useMemo,
} from 'react';
import classNames from 'classnames';

import { Button } from '../Button';
import { IconChevronLeft, IconChevronRight } from '../Icons';
import { InfiniteScroll, InfiniteScrollProps } from '../InfiniteScroll';
import { LoaderProps } from '../Loaders';

import './Table.css';

export interface TablePagination {
  currPage: number;
  totalPages: number;
  onClickPrev: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onClickNext: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export interface TableProps extends Omit<InfiniteScrollProps, 'loader'> {
  className?: string;
  /**
   * <@default=`400`>
   */
  maxHeight?: string | number;
  /**
   * <@default=`400`>
   */
  minHeight?: string | number;
  pagination?: TablePagination;
  infiniteScrollLoader?: JSX.Element;
}

export const Table: FC<TableProps> = memo(
  ({
    hasMore = false,
    className,
    maxHeight = 400,
    minHeight = 400,
    pagination,
    infiniteScrollLoader,
    loadMore,
    children,
  }) => (
    <div className={classNames(className, 'ztopia-table')}>
      <div className="ztopia-table__container" style={{ maxHeight, minHeight }}>
        {loadMore ? (
          <InfiniteScroll
            hasMore={hasMore}
            loadMore={loadMore}
            loader={infiniteScrollLoader}
          >
            <table>{children}</table>
          </InfiniteScroll>
        ) : (
          <table>{children}</table>
        )}
      </div>
      {pagination && (
        <div className="ztopia-table__pagination">
          <span className="ztopia-table__pagination-info">
            {pagination.totalPages > 0 ? pagination.currPage : 0} of{' '}
            {pagination.totalPages}
          </span>
          <Button
            variant="icon"
            isDisabled={
              pagination.totalPages === 0 || pagination.currPage === 1
            }
            className={classNames(
              'ztopia-table__pagination-controller',
              'ztopia-table__pagination-controller--prev',
            )}
            onClick={pagination.onClickPrev}
          >
            <IconChevronLeft size="small" />
          </Button>
          <Button
            variant="icon"
            isDisabled={
              pagination.totalPages === 0 ||
              pagination.currPage === pagination.totalPages
            }
            className={classNames(
              'ztopia-table__pagination-controller',
              'ztopia-table__pagination-controller--next',
            )}
            onClick={pagination.onClickNext}
          >
            <IconChevronRight size="small" />
          </Button>
        </div>
      )}
    </div>
  ),
);

export interface TableHeadProps {
  className?: string;
}

export const TableHead: FC<TableHeadProps> = memo(({ className, children }) => {
  const headCells = (children as ReactElement).props.children;
  return (
    <thead className={classNames(className, 'ztopia-table__head')}>
      {React.cloneElement(
        children as ReactElement,
        {},
        <>
          {headCells}
          <TableHeadCell className="ztopia-table__head-cell--placeholder" />
        </>,
      )}
    </thead>
  );
});

export interface TableBodyProps {
  className?: string;
  /**
   * A Ztopia Loader either in function form (`MusicLoader`) or element form (`<MusicLoader />`)
   */
  loader?: ReactNode | FC<LoaderProps> | null;
}

export const TableBody: FC<TableBodyProps> = memo(
  ({ className, loader, children, ...restProps }) => {
    const memoizedLoader = useMemo(() => {
      if (!loader) return null;

      if (typeof loader === 'object' && isValidElement(loader)) {
        return cloneElement(loader, {
          className: classNames(loader.props.className, 'ztopia-table__loader'),
        });
      }

      if (typeof loader === 'function') {
        const Loader = loader;
        return <Loader className="ztopia-table__loader" />;
      }

      return null;
    }, [loader]);

    return (
      <tbody
        className={classNames(className, 'ztopia-table__body')}
        {...restProps}
      >
        {loader ? (
          <tr>
            <td>{memoizedLoader}</td>
          </tr>
        ) : (
          children
        )}
      </tbody>
    );
  },
);

export interface TableRowProps {
  className?: string;
  hoveredContent?: ReactNode;
  hoveredContentWidth?: number;
}

export const TableRow: FC<TableRowProps> = memo(
  ({
    className,
    hoveredContent = null,
    hoveredContentWidth = 100,
    children,
  }) => (
    <tr
      className={classNames(className, 'ztopia-table__row', {
        'is-hoverable': Boolean(hoveredContent),
      })}
    >
      {children}
      {hoveredContent && (
        <td className="ztopia-table__row-hovered-content">
          <div
            style={{
              width: hoveredContentWidth,
            }}
          >
            {hoveredContent}
          </div>
        </td>
      )}
    </tr>
  ),
);

export interface TableHeadCellProps {
  className?: string;
}

export const TableHeadCell: FC<TableHeadCellProps> = memo(
  ({ className, children, ...restProps }) => (
    <th
      className={classNames(className, 'ztopia-table__head-cell')}
      {...restProps}
    >
      <div>{children}</div>
    </th>
  ),
);

export interface TableCellProps {
  width?: number;
  className?: string;
}

export const TableCell: FC<TableCellProps> = memo(
  ({ width, className, ...restProps }) => (
    <td
      {...restProps}
      className={classNames(className, 'ztopia-table__cell')}
      style={{ width, maxWidth: width }}
    />
  ),
);
