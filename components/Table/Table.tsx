import classNames from 'classnames';
import React, {
  cloneElement,
  FC,
  isValidElement,
  memo,
  ReactElement,
  ReactNode,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import { throttle } from 'lodash-es';

import { ChevronLeft, ChevronRight } from '../Icons';
import { LoaderProps } from '../Loaders';

import './Table.css';

export interface TablePagination {
  currPage: number;
  totalPages: number;
  onClickPrev: (e: React.MouseEvent<SVGElement, MouseEvent>) => void;
  onClickNext: (e: React.MouseEvent<SVGElement, MouseEvent>) => void;
}

export interface TableProps {
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
  /**
   * Displayed when table has been scrolled to bottom
   */
  bottomElement?: ReactNode;
  /**
   * Called when table has been scrolled to bottom, commonly used for loading more data
   */
  onScrollBottom?: () => void;
}

export const Table: FC<TableProps> = memo(
  ({
    className,
    maxHeight = 400,
    minHeight = 400,
    pagination,
    bottomElement,
    onScrollBottom,
    children,
  }) => {
    const tableContainerRef = useRef<HTMLDivElement>(null);

    const handleScroll = useCallback(() => {
      const element = tableContainerRef.current;
      if (
        element &&
        element.scrollHeight - element.scrollTop === element.clientHeight &&
        onScrollBottom
      ) {
        onScrollBottom();
      }
    }, [tableContainerRef]);

    return (
      <div className={classNames(className, 'ztopia-table')}>
        <div
          ref={tableContainerRef}
          className="ztopia-table__container"
          style={{ maxHeight, minHeight }}
          onScroll={throttle(handleScroll, 500)}
        >
          <table>{children}</table>
          {bottomElement && (
            <div className={classNames('ztopia-table__bottom-element')}>
              {bottomElement}
            </div>
          )}
        </div>
        {pagination && (
          <div className="ztopia-table__pagination">
            <span className="ztopia-table__pagination-info">
              {pagination.currPage} of {pagination.totalPages}
            </span>
            <ChevronLeft
              size="small"
              className={classNames(
                'ztopia-table__pagination-controller',
                'ztopia-table__pagination-controller--prev',
                {
                  'is-disabled': pagination.currPage === 1,
                },
              )}
              onClick={pagination.onClickPrev}
            />
            <ChevronRight
              size="small"
              className={classNames(
                'ztopia-table__pagination-controller',
                'ztopia-table__pagination-controller--next',
                {
                  'is-disabled': pagination.currPage === pagination.totalPages,
                },
              )}
              onClick={pagination.onClickNext}
            />
          </div>
        )}
      </div>
    );
  },
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
  hoveredContent?: JSX.Element;
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
