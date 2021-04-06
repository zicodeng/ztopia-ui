import React, { memo, ReactNode } from 'react';
import classNames from 'classnames';

import { Popper } from '../Popper';

import './FloatingActionButton.css';

export interface Action {
  icon: ReactNode;
  desc: string;
  onClick?: () => void;
}

export interface FloatingActionButtonProps {
  offset?: number;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  actions: Action[];
}

const ID = 'ztopia-fab';

export const FloatingActionButton = memo<FloatingActionButtonProps>(
  ({ offset = 50, className, size = 'medium', actions }) => (
    <div
      id={ID}
      className={classNames(className, 'ztopia-fab', `ztopia-fab--${size}`)}
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
              containerId={ID}
              offsetX={-5}
              placement="left"
              overlay={<span>{desc}</span>}
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
    </div>
  ),
);
