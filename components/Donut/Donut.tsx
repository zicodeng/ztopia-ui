import React, { FC, memo, ReactNode } from 'react';
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
  data: ReadonlyArray<object>;
}

const renderLabel = ({ name }) => name;

export const Donut: FC<DonutProps> = memo(
  ({
    isTooltipShown = true,
    isAnimated = true,
    width = 400,
    height = 400,
    nameAccessor,
    valueAccessor,
    color = '#131518',
    innerRadius = '20%',
    outerRadius = '60%',
    label = renderLabel,
    data,
  }) => (
    <PieChart width={width} height={height}>
      {isTooltipShown && (
        <Tooltip
          contentStyle={{
            borderColor: Array.isArray(color) ? '#131518' : color,
          }}
        />
      )}
      <Pie
        isAnimationActive={isAnimated}
        label={label}
        key={nameAccessor}
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
