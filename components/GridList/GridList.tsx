import React, { memo, ReactNode } from 'react';
import StackGrid from 'react-stack-grid';
import classNames from 'classnames';

export interface GridListProps {
  /**
   * <@default=`5`>
   */
  gap?: number;
  className?: string;
  children?: ReactNode;
  columnWidth: string | number;
}

export const GridList = memo<GridListProps>(
  ({ gap = 5, className, children, columnWidth }) => (
    <StackGrid
      gutterWidth={gap}
      gutterHeight={gap}
      columnWidth={columnWidth}
      className={classNames('ztopia-grid-list', className)}
    >
      {children}
    </StackGrid>
  ),
);
