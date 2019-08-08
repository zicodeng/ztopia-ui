import classNames from 'classnames';
import moment from 'moment';
import React, { FC } from 'react';
import { Calendar as BaseCalendar, momentLocalizer } from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

const localizer = momentLocalizer(moment);

export interface Event {
  allDay?: boolean;
  title?: string;
  start?: Date;
  end?: Date;
  resource?: any;
}

export interface Slot {
  start: string | Date;
  end: string | Date;
  slots: Date[] | string[];
  action: 'select' | 'click' | 'doubleClick';
}

export interface CalendarProps {
  /**
   * <@default=`false`>
   */
  isSelectable?: boolean;
  className?: string;
  events?: Event[];
  onSelectSlot?: (slot: Slot) => void;
  onSelectEvent?: (event: Event, e: React.SyntheticEvent<HTMLElement>) => void;
}

export const Calendar: FC<CalendarProps> = ({
  isSelectable,
  className,
  ...restProps
}) => (
  <BaseCalendar
    {...restProps}
    selectable={isSelectable}
    className={classNames(className, 'ztopia-calendar')}
    localizer={localizer}
  />
);

Calendar.defaultProps = {
  isSelectable: false,
};
