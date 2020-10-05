import React, { memo } from 'react';
import Typed from 'react-typed';
import classNames from 'classnames';

export interface TypewriterProps {
  /**
   * <@default=`false`>
   */
  isLooped?: boolean;
  /**
   * <@default=`60`>
   */
  typeSpeed?: number;
  /**
   * <@default=`80`>
   */
  backSpeed?: number;
  backDelay?: number;
  className?: string;
  text?: string[];
}

export const Typewriter = memo<TypewriterProps>(
  ({
    isLooped = false,
    typeSpeed = 60,
    backSpeed = 80,
    className,
    text,
    ...restProps
  }) => (
    <Typed
      loop={isLooped}
      typeSpeed={typeSpeed}
      backSpeed={backSpeed}
      className={classNames('ztopia-typewriter', className)}
      strings={text}
      {...restProps}
    />
  ),
);
