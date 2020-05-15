import React, { FC, memo, ReactNode } from 'react';
import classNames from 'classnames';
import uuidv4 from 'uuid/v4';

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

export const FloatingActionButton: FC<FloatingActionButtonProps> = memo(
  ({ offset = 50, className, size = 'medium', actions }) => {
    const id = uuidv4();
    return (
      <div
        id={id}
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
                containerId={id}
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
    );
  },
);
