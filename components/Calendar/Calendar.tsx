import React, { memo } from 'react';
import { Calendar as BaseCalendar, dateFnsLocalizer } from 'react-big-calendar';
import classNames from 'classnames';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import zhCN from 'date-fns/locale/zh-CN';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

const locales = {
  'en-US': enUS,
  'zh-CN': zhCN,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

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
  /**
   * <@default=`en-US`>
   */
  locale?: 'en-US' | 'zh-CN';
  onSelectSlot?: (slot: Slot) => void;
  onSelectEvent?: (event: Event, e: React.SyntheticEvent<HTMLElement>) => void;
}

export const Calendar = memo<CalendarProps>(
  ({
    isSelectable = false,
    className,
    events = [],
    locale = 'en-US',
    ...restProps
  }) => (
    <BaseCalendar
      {...restProps}
      selectable={isSelectable}
      className={classNames(className, 'ztopia-calendar')}
      events={events}
      localizer={localizer}
      culture={locale}
      messages={
        locale === 'zh-CN'
          ? {
              today: '今天',
              next: '>',
              previous: '<',
              month: '月',
              week: '周',
              day: '日',
              agenda: '议程',
              showMore: count => `查看更多(${count}+)`,
              allDay: '全天',
            }
          : undefined
      }
    />
  ),
);
