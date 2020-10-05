import React, { memo, ReactNode } from 'react';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';

export interface DonutProps {
  /**
   * <@default=`true`>
   */
  isTooltipShown?: boolean;
  /**
   * <@default=`true`>
   */
  isAnimated?: boolean;
  /**
   * <@default=`400`>
   */
  width?: number;
  /**
   * <@default=`400`>
   */
  height?: number;
  nameAccessor: string;
  valueAccessor: string;
  /**
   * Value unit, e.g. %
   */
  unit?: string;
  /**
   * The x-coordinate of center
   *
   * <@default=`50%`>
   */
  cx?: number | string;
  /**
   * The y-coordinate of center
   *
   * <@default=`50%`>
   */
  cy?: number | string;
  /**
   * <@default=`'#131518'`>
   */
  color?: string | string[];
  /**
   * <@default=`'20%'`>
   */
  innerRadius?: number | string;
  /**
   * <@default=`'60%'`>
   */
  outerRadius?: number | string;
  /**
   * <@default=`function renderLabel`>
   */
  label?: boolean | ((sliceInfo: any) => ReactNode | JSX.Element);
  /**
   * <@default=`true`>
   */
  labelLine?: boolean | ((sliceInfo: any) => ReactNode | JSX.Element);
  data: ReadonlyArray<object>;
}

const renderLabel = ({ name }) => name;

export const Donut = memo<DonutProps>(
  ({
    isTooltipShown = true,
    isAnimated = true,
    width = 400,
    height = 400,
    nameAccessor,
    valueAccessor,
    unit,
    cx = '50%',
    cy = '50%',
    color = '#131518',
    innerRadius = '20%',
    outerRadius = '60%',
    label = renderLabel,
    labelLine = true,
    data,
  }) => (
    <PieChart width={width} height={height}>
      {isTooltipShown && (
        <Tooltip
          contentStyle={{
            zIndex: 9999,
            borderColor: Array.isArray(color) ? '#131518' : color,
            backgroundColor: '#fff',
          }}
          formatter={value => `${value}${unit || ''}`}
        />
      )}
      <Pie
        cx={cx}
        cy={cy}
        isAnimationActive={isAnimated}
        label={label}
        labelLine={labelLine}
        nameKey={nameAccessor}
        dataKey={valueAccessor}
        fill={Array.isArray(color) ? null : color}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        data={data}
      >
        {Array.isArray(color) &&
          data.map((_, i) => <Cell key={i} fill={color[i] || '#131518'} />)}
      </Pie>
    </PieChart>
  ),
);
