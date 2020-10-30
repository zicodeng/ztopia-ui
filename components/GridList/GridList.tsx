import React, { memo, ReactNode } from 'react';
import StackGrid from 'react-stack-grid';
import classNames from 'classnames';

import './GridList.css';

export interface GridListProps {
  /**
   * <@default=`5`>
   */
  gap?: number;
  /**
   * <@default=`'ul'`>
   */
  element?: string;
  /**
   * <@default=`'li'`>
   */
  itemElement?: string;
  className?: string;
  children?: ReactNode;
  /**
   * <@default=`200`>
   */
  columnWidth?: string | number;
}

export const GridList = memo<GridListProps>(
  ({
    gap = 5,
    element = 'ul',
    itemElement = 'li',
    className,
    children,
    columnWidth = 200,
  }) => (
    <StackGrid
      gutterWidth={gap}
      gutterHeight={gap}
      component={element}
      itemComponent={itemElement}
      columnWidth={columnWidth}
      className={classNames('ztopia-grid-list', className)}
    >
      {children}
    </StackGrid>
  ),
);
