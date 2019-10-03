import React, { FC, memo, CSSProperties } from 'react';
import classNames from 'classnames';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';

import 'react-vertical-timeline-component/style.min.css';
import './Timeline.css';

export interface TimelineProps {
  className?: string;
  layout?: '1-column' | '2-columns';
}

export const Timeline: FC<TimelineProps> = memo(
  ({ className, ...restProps }) => (
    <VerticalTimeline
      className={classNames(className, 'ztopia-timeline')}
      {...restProps}
    />
  ),
);

export interface TimelineItemProps {
  date?: string;
  className?: string;
  icon?: JSX.Element;
  iconStyle?: CSSProperties;
  contentStyle?: CSSProperties;
  contentArrowStyle?: CSSProperties;
}

export const TimelineItem: FC<TimelineItemProps> = memo(
  ({ className, ...restProps }) => (
    <VerticalTimelineElement
      className={classNames(className, 'ztopia-timeline__item')}
      {...restProps}
    />
  ),
);
