import React, { FC, memo, useEffect, useRef } from 'react';
import { usePrevious } from 'react-use';
import classNames from 'classnames';

import { BaseIconProps,Icon } from './';

import './IconBell.css';

export interface BellProps extends BaseIconProps {
  isAnimated?: boolean;
  count?: number;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const IconBell: FC<BellProps> = memo(
  ({ isAnimated, count, className, onClick, ...restProps }) => {
    const ref = useRef<HTMLDivElement>(null);

    const prevCount = usePrevious(count);

    useEffect(() => {
      const el = ref.current;
      if (!el || !isAnimated) return;

      if (prevCount !== undefined && (count && prevCount < count)) {
        el.classList.remove('is-animated');
        // Triggering reflow
        void el.offsetWidth;
        el.classList.add('is-animated');
      }
    }, [isAnimated, count, prevCount]);

    return (
      <div
        ref={ref}
        className={classNames(className, 'ztopia-icon--bell')}
        onClick={onClick}
      >
        <Icon {...restProps}>
          <svg data-icon="bell" viewBox="0 0 448 512">
            <path
              fill="currentColor"
              d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z"
            ></path>
          </svg>
        </Icon>
        {count ? <div className="ztopia-icon--bell__count">{count}</div> : null}
      </div>
    );
  },
);
