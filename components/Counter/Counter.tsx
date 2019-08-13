import classNames from 'classnames';
import React, {
  CSSProperties,
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useCountUp } from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';

export interface CounterProps {
  /**
   * <@default=`false`>
   *
   * If enabled, Counter will reset and re-animate on visibility change
   */
  isResetEnabled?: boolean;
  start?: number;
  end?: number;
  delay?: number;
  duration?: number;
  separator?: string;
  prefix?: string;
  suffix?: string;
  className?: string;
  style?: CSSProperties;
}

export const Counter: FC<CounterProps> = ({
  isResetEnabled = false,
  className,
  style,
  children,
  ...restProps
}) => {
  const { countUp, start, reset } = useCountUp({
    ...restProps,
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isResetEnabled) return;
    if (isVisible) {
      start();
    } else {
      reset();
    }
  }, [isVisible]);

  const handleChange = useCallback(
    (isVisible: boolean) => {
      if (isResetEnabled) setIsVisible(isVisible);
    },
    [isResetEnabled],
  );

  return (
    <VisibilitySensor onChange={handleChange}>
      <span className={classNames('ztopia-counter', className)} style={style}>
        {countUp}
      </span>
    </VisibilitySensor>
  );
};
