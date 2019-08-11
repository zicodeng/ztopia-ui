import classNames from 'classnames';
import BaseDrawer from 'rc-drawer';
import React, { FC } from 'react';

import 'rc-drawer/assets/index.css';

export interface DrawerProps {
  /**
   * <@default=`false`>
   */
  isOpen?: boolean;
  /**
   * <@default=`'30%'`>
   */
  width?: number | string;
  /**
   * <@default=`'30%'`>
   */
  height?: number | string;
  className?: string;
  /**
   * <@default=`right`>
   */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * Drawer can be closed by pressing ESC key or clicking overlay
   */
  onRequestClose?: () => void;
}

export const Drawer: FC<DrawerProps> = ({
  isOpen = false,
  width,
  height,
  className,
  placement = 'right',
  onRequestClose,
  ...restProps
}) => {
  const isVertical = placement === 'top' || placement === 'bottom';
  const newWidth = width || (isVertical ? '100%' : '30%');
  const newHeight = height || (isVertical ? '30%' : '100%');
  return (
    <BaseDrawer
      {...restProps}
      handler={false}
      open={isOpen}
      width={newWidth}
      height={newHeight}
      className={classNames(className, 'ztopia-drawer')}
      placement={placement}
      onClose={onRequestClose}
    />
  );
};
