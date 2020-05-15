import React, { FC } from 'react';
import StackGrid from 'react-stack-grid';
import classNames from 'classnames';

export interface GridListProps {
  /**
   * <@default=`5`>
   */
  gap?: number;
  columnWidth: string | number;
  className?: string;
}

export const GridList: FC<GridListProps> = ({
  gap = 5,
  columnWidth,
  className,
  children,
}) => (
  <StackGrid
    gutterWidth={gap}
    gutterHeight={gap}
    columnWidth={columnWidth}
    className={classNames('ztopia-grid-list', className)}
  >
    {children}
  </StackGrid>
);
