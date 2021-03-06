import React, { memo } from 'react';
import classNames from 'classnames';

import { FadingLoader } from '../Loaders';

import './WaitingChatBubble.css';

export interface WaitingChatBubbleProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export const WaitingChatBubble = memo<WaitingChatBubbleProps>(
  ({ className, size = 'medium' }) => (
    <div
      className={classNames(
        className,
        'ztopia-waiting-chat-bubble',
        `ztopia-waiting-chat-bubble--${size}`,
      )}
    >
      <FadingLoader color="#bbb" size="large" />
    </div>
  ),
);
