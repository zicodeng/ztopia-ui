import React, { FC } from 'react';
import classNames from 'classnames';

import './WaitingChatBubble.css';

export interface WaitingChatBubbleProps {
  className?: string;
}

export const WaitingChatBubble: FC<WaitingChatBubbleProps> = ({
  className,
}) => (
  <div className={classNames(className, 'ztopia-waiting-chat-bubble')}>
    <div className="ztopia-waiting-chat-bubble__circle"></div>
    <div className="ztopia-waiting-chat-bubble__circle"></div>
    <div className="ztopia-waiting-chat-bubble__circle"></div>
  </div>
);
