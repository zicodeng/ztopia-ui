import classNames from 'classnames';
import { format, getYear, setYear } from 'date-fns';
import React, {
  FC,
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import BaseDatePicker from 'react-datepicker';

import { ChevronLeft, ChevronRight } from '../Icons';
import { Input } from '../Input';

import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';

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
  todayButton?: 'string';
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
  maxTime?: Date;
  minTime?: Date;
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

export const DatePicker: FC<DatePickerProps> = ({
  isYearSelectShown,
  isTimeSelectShown,
  todayButton,
  timeFormat,
  dateFormat,
  value,
  input,
  onChange,
  ...restProps
}) => {
  let changeYear: ((year: number) => void) | null = null;
  const year = getYear(value || new Date());

  useEffect(() => {
    if (changeYear) changeYear(year);
  }, [year]);

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
      fixedHeight={isYearSelectShown || isTimeSelectShown}
      showDisabledMonthNavigation
      disabledKeyboardNavigation
      showTimeSelect={isTimeSelectShown}
      selected={value}
      customInput={input}
      todayButton={todayButton}
      dateFormat={
        isTimeSelectShown ? `${dateFormat} ${timeFormat}` : dateFormat
      }
      popperClassName="ztopia-date-picker"
      calendarClassName="ztopia-date-picker__calendar"
      popperModifiers={{
        offset: {
          enabled: isYearSelectShown,
          offset: '100px, 0px',
        },
      }}
      onChange={onChange}
      onYearChange={handleChangeYear}
      renderCustomHeader={args => {
        changeYear = args.changeYear;
        return renderCustomHeader(args);
      }}
      renderDayContents={day => (
        <span className="ztopia-date-picker__day-content">{day}</span>
      )}
    >
      {isYearSelectShown && (
        <YearSelect
          hasTodayButton={Boolean(todayButton)}
          value={year}
          onChange={handleSelectYear}
        />
      )}
    </BaseDatePicker>
  );
};

DatePicker.defaultProps = {
  isYearSelectShown: false,
  isTimeSelectShown: false,
  timeIntervals: 30,
  timeFormat: 'hh:mm aa',
  dateFormat: 'MM/dd/yyyy',
  input: <Input />,
};

const renderCustomHeader = ({
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
  date,
  increaseMonth,
  decreaseMonth,
}: {
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
  date: Date;
  increaseMonth: () => void;
  decreaseMonth: () => void;
  changeYear: (year: number) => void;
  changeMonth: (month: number) => void;
}) => (
  <div className="ztopia-date-picker__header">
    {!prevMonthButtonDisabled && (
      <ChevronLeft
        size="small"
        className={classNames(
          'ztopia-date-picker__nav',
          'ztopia-date-picker__nav--prev',
        )}
        onClick={decreaseMonth}
      />
    )}
    <span className="ztopia-date-picker__month-title">
      {format(date, 'MMMM yyyy')}
    </span>
    {!nextMonthButtonDisabled && (
      <ChevronRight
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

interface YearSelectProps {
  hasTodayButton?: boolean;
  value: number;
  onChange: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

const MIN_YEAR = 1900;
const TOTAL_YEARS = 201;

const YearSelect: FC<YearSelectProps> = memo(
  ({ hasTodayButton, value, onChange }) => {
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
        <div className="ztopia-date-picker__year-caption">Year</div>
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
