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

export interface CalendarProps extends BaseCalendarProps {
  /**
   * <@default=`en-US`>
   */
  locale?: 'en-US' | 'zh-CN';
}

export const Calendar = memo<CalendarProps>(
  ({ locale = 'en-US', className, events = [], ...restProps }) => (
    <BaseCalendar
      {...restProps}
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
              allDay: '全天',
              noEventsInRange: '无事件',
              showMore: count => `查看更多(${count}+)`,
            }
          : undefined
      }
    />
  ),
);
