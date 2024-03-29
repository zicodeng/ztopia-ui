import React, { cloneElement, memo, ReactElement,ReactNode } from 'react';
import classNames from 'classnames';

import { Popper, PopperProps } from '../Popper';

import './FloatingActionButton.css';

export interface Action {
  icon: ReactNode;
  desc: string;
  onClick?: () => void;
}

export interface FloatingActionButtonProps {
  offset?: number;
  className?: string;
  popperProps?: Omit<PopperProps, 'overlay'>;
  icon?: ReactElement;
  size?: 'small' | 'medium' | 'large';
  actions: Action[];
}

export const FloatingActionButton = memo<FloatingActionButtonProps>(
  ({ offset = 50, className, popperProps, icon, size = 'medium', actions }) => (
    <div
      className={classNames(className, 'ztopia-fab', `ztopia-fab--${size}`, {
        'is-default-icon-shown': !icon,
      })}
      style={{
        right: offset,
        bottom: offset,
      }}
    >
      <ul
        className={classNames(
          'ztopia-fab__actions',
          `ztopia-fab__actions--${size}`,
        )}
      >
        {actions.map(({ icon, desc, onClick }, i) => (
          <li key={i} className="ztopia-fab__action" onClick={onClick}>
            <Popper
              offsetX={-5}
              placement="left"
              overlay={<span>{desc}</span>}
              {...popperProps}
            >
              <div
                className={classNames(
                  'ztopia-fab__action-content',
                  `ztopia-fab__action-content--${size}`,
                )}
              >
                {icon}
              </div>
            </Popper>
          </li>
        ))}
      </ul>
      {icon &&
        cloneElement(icon, {
          className: classNames(icon.props.className, 'ztopia-fab__icon'),
        })}
    </div>
  ),
);
