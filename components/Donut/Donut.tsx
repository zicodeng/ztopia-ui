import React, { FC, memo } from 'react';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';

export interface DonutProps {
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
  data: ReadonlyArray<object>;
}

export const Donut: FC<DonutProps> = memo(
  ({
    width = 400,
    height = 400,
    nameAccessor,
    valueAccessor,
    color = '#131518',
    innerRadius = '20%',
    outerRadius = '60%',
    data,
  }) => {
    return (
      <PieChart width={width} height={height}>
        <Tooltip
          contentStyle={{
            borderColor: Array.isArray(color) ? '#131518' : color,
          }}
        />
        <Pie
          label
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
    );
  },
);
