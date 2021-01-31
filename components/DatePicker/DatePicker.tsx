import React, { memo, ReactNode, useCallback, useEffect, useRef } from 'react';
import BaseDatePicker, { registerLocale } from 'react-datepicker';
import classNames from 'classnames';
import { format, getYear, setYear } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import zhCN from 'date-fns/locale/zh-CN';

import { IconChevronLeft, IconChevronRight } from '../Icons';
import { Input } from '../Input';

import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';

registerLocale('zh-CN', zhCN);
registerLocale('en-US', enUS);

type DatePickerLocale = 'zh-CN' | 'en-US';

export interface HighlightDates {
  [className: string]: Date[];
}

export interface DatePickerProps {
  /**
   * <@default=`false`>
   */
  isYearSelectShown?: boolean;
  /**
   * <@default=`false`>
   *
   * If enabled, format will become a combination of `dateFormat` and `timeFormat`
   */
  isTimeSelectShown?: boolean;
  /**
   * <@default=`30`>
   */
  timeIntervals?: number;
  todayButton?: string;
  /**
   * <@default=`'hh:mm aa'`>
   *
   * Available format tokens: https://date-fns.org/v2.0.0-beta.4/docs/format
   */
  timeFormat?: string;
  /**
   * <@default=`'Time'`>
   */
  timeCaption?: string;
  className?: string;
  maxTime?: Date;
  minTime?: Date;
  locale?: DatePickerLocale;
  /**
   * <@default=`popper`>
   */
  mode?: 'popper' | 'inline';
  /**
   * <@default=`'MM/dd/yyyy'`
   *
   * Available format tokens: https://date-fns.org/v2.0.0-beta.4/docs/format
   */
  dateFormat?: string | string[];
  value?: Date | null;
  maxDate?: Date | null;
  minDate?: Date | null;
  highlightDates?: (HighlightDates | Date)[];
  /**
   * <@default=`<Input />`>
   */
  input?: ReactNode;
  onChange: (newValue: Date | null) => void;
}

const renderCustomHeader = ({
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
  date,
  locale,
  increaseMonth,
  decreaseMonth,
}: {
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
  date: Date;
  locale: string;
  increaseMonth: () => void;
  decreaseMonth: () => void;
  changeYear: (year: number) => void;
  changeMonth: (month: number) => void;
}) => (
  <div className="ztopia-date-picker__header">
    {!prevMonthButtonDisabled && (
      <IconChevronLeft
        size="small"
        className={classNames(
          'ztopia-date-picker__nav',
          'ztopia-date-picker__nav--prev',
        )}
        onClick={decreaseMonth}
      />
    )}
    <span className="ztopia-date-picker__month-title">
      {format(date, 'MMMM yyyy', { locale: locale === 'zh-CN' ? zhCN : enUS })}
    </span>
    {!nextMonthButtonDisabled && (
      <IconChevronRight
        size="small"
        className={classNames(
          'ztopia-date-picker__nav',
          'ztopia-date-picker__nav--next',
        )}
        onClick={increaseMonth}
      />
    )}
  </div>
);

export const DatePicker = memo<DatePickerProps>(
  ({
    isYearSelectShown = false,
    isTimeSelectShown = false,
    timeIntervals = 30,
    todayButton,
    className,
    timeFormat = 'hh:mm aa',
    dateFormat = 'MM/dd/yyyy',
    locale = 'en-US',
    mode = 'popper',
    value,
    input = <Input />,
    onChange,
    ...restProps
  }) => {
    const handleSelectYear = useCallback(
      (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        const selectedYear = parseInt(e.currentTarget.id, 10);
        const newValue = setYear(value || new Date(), selectedYear);
        onChange(newValue);
      },
      [value],
    );

    const handleChangeYear = useCallback((date: Date) => {
      onChange(date);
    }, []);

    return (
      <BaseDatePicker
        {...restProps}
        inline={mode === 'inline'}
        locale={locale}
        fixedHeight={isYearSelectShown || isTimeSelectShown}
        showDisabledMonthNavigation
        disabledKeyboardNavigation
        showTimeSelect={isTimeSelectShown}
        timeIntervals={timeIntervals}
        selected={value}
        customInput={input}
        todayButton={todayButton}
        timeCaption={locale === 'zh-CN' ? '时间' : 'Time'}
        dateFormat={
          isTimeSelectShown ? `${dateFormat} ${timeFormat}` : dateFormat
        }
        popperClassName="ztopia-date-picker__popper"
        calendarClassName={classNames(
          className,
          'ztopia-date-picker',
          `ztopia-date-picker--${mode}`,
        )}
        popperModifiers={{
          offset: {
            enabled: isYearSelectShown,
            offset: '100px, 0px',
          },
        }}
        onChange={onChange}
        onYearChange={handleChangeYear}
        renderCustomHeader={(args) => renderCustomHeader({ ...args, locale })}
        renderDayContents={(day) => (
          <span className="ztopia-date-picker__day-content">{day}</span>
        )}
      >
        {isYearSelectShown && (
          <YearSelect
            hasTodayButton={Boolean(todayButton)}
            value={getYear(value || new Date())}
            locale={locale}
            onChange={handleSelectYear}
          />
        )}
      </BaseDatePicker>
    );
  },
);

interface YearSelectProps {
  hasTodayButton?: boolean;
  value: number;
  locale: DatePickerLocale;
  onChange: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

const MIN_YEAR = 1900;
const TOTAL_YEARS = 201;

const YearSelect = memo<YearSelectProps>(
  ({ hasTodayButton, value, locale, onChange }) => {
    const ref = useRef<HTMLUListElement>(null);

    // Scroll to the current year option if not in view
    useEffect(() => {
      const optionsNode = ref.current;
      if (!optionsNode) return;

      const optionHeight = optionsNode.scrollHeight / TOTAL_YEARS;

      const scrollPos = optionsNode.scrollTop;
      const optionPos = (value - MIN_YEAR) * optionHeight;
      const range = optionHeight * 10;
      const dist = Math.abs(scrollPos - optionPos);

      if (dist > range) {
        optionsNode.scroll({
          top: (value - MIN_YEAR) * optionHeight - 100,
        });
      }
    }, [value]);

    return (
      <div
        className={classNames('ztopia-date-picker__year-container', {
          'has-today-button': hasTodayButton,
        })}
      >
        <div className="ztopia-date-picker__year-caption">
          {locale === 'zh-CN' ? '年' : 'Year'}
        </div>
        <ul ref={ref} className="ztopia-date-picker__year-options">
          {Array.from({ length: TOTAL_YEARS }).map((_, i) => {
            const year = MIN_YEAR + i;
            return (
              <li
                key={year}
                id={year.toString()}
                onClick={onChange}
                className={classNames('ztopia-date-picker__year-option', {
                  'is-selected': value === year,
                })}
              >
                {year}
              </li>
            );
          })}
        </ul>
      </div>
    );
  },
);
