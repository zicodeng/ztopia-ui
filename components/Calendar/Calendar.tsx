import React, { memo } from 'react';
import {
  Calendar as BaseCalendar,
  CalendarProps as BaseCalendarProps,
  dateFnsLocalizer,
} from 'react-big-calendar';
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

export interface CalendarProps extends Omit<BaseCalendarProps, 'localizer'> {
  /**
   * <@default=`false`>
   */
  isSelectable?: boolean;
  /**
   * <@default=`en-US`>
   */
  locale?: 'en-US' | 'zh-CN';
}

export const Calendar = memo<CalendarProps>(
  ({
    isSelectable = false,
    locale = 'en-US',
    className,
    events = [],
    ...restProps
  }) => (
    <BaseCalendar
      {...restProps}
      selectable={isSelectable}
      culture={locale}
      className={classNames(className, 'ztopia-calendar')}
      events={events}
      localizer={localizer}
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
              allDay: '全天',
              noEventsInRange: '暂无事件',
              date: '日期',
              time: '时间',
              event: '事件',
              showMore: count => `查看更多(${count}+)`,
            }
          : undefined
      }
    />
  ),
);
