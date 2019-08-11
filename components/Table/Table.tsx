import classNames from 'classnames/bind';
import React, { FC, memo, ReactElement } from 'react';

import { ChevronLeft, ChevronRight } from '../Icons';
import { MusicLoader } from '../Loaders';

import './Table.css';

export interface TablePagination {
  currPage: number;
  totalPages: number;
  onClickPrev: (e: React.MouseEvent<SVGElement, MouseEvent>) => void;
  onClickNext: (e: React.MouseEvent<SVGElement, MouseEvent>) => void;
}

export interface TableProps {
  /**
   * <@default=`400`>
   */
  height?: string | number;
  pagination?: TablePagination;
}

export const Table: FC<TableProps> = memo(
  ({ height = 400, pagination, children }) => (
    <div className="ztopia-table">
      <div className="ztopia-table__container" style={{ height }}>
        <table>{children}</table>
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
  ),
);

export const TableHead: FC = memo(({ children }) => {
  const headCells = (children as ReactElement).props.children;
  return (
    <thead className="ztopia-table__head">
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
  isLoading?: boolean;
}

export const TableBody: FC<TableBodyProps> = memo(
  ({ isLoading = false, children, ...restProps }) => (
    <tbody className="ztopia-table__body" {...restProps}>
      {isLoading ? (
        <tr>
          <td>
            <MusicLoader className="ztopia-table__loader" />
          </td>
        </tr>
      ) : (
        children
      )}
    </tbody>
  ),
);

export interface TableRow {
  hoveredContent?: JSX.Element;
  hoveredContentWidth?: number;
}

export const TableRow: FC<TableRow> = memo(
  ({ hoveredContent = null, hoveredContentWidth = 100, children }) => (
    <tr
      className={classNames('ztopia-table__row', {
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
  maxWidth?: number;
  className?: string;
}

export const TableCell: FC<TableCellProps> = memo(
  ({ maxWidth = 100, className, ...restProps }) => (
    <td
      {...restProps}
      className={classNames(className, 'ztopia-table__cell')}
      style={{ maxWidth }}
    />
  ),
);
