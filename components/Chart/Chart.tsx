import React, { memo, useMemo } from 'react';
import {
  Area as BaseArea,
  AreaChart,
  Bar as BaseBar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend as BaseLegend,
  Line as BaseLine,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export interface Axis {
  accessor?: string;
  color?: string;
}

export type Accessor =
  | string
  | number
  | ((datum: any) => string | number | [number, number] | null);

export interface Legend {
  /**
   * <@default=`50`>
   */
  height?: number;
  variant?:
    | 'plainline'
    | 'line'
    | 'square'
    | 'rect'
    | 'circle'
    | 'cross'
    | 'diamond'
    | 'star'
    | 'triangle'
    | 'wye';
}

export interface Shape {
  stroke?: string;
  fill?: string;
  accessor: Accessor;
}

/**
 * https://github.com/d3/d3-shape#curves
 */
export type D3Interpolation =
  | 'basis'
  | 'basisClosed'
  | 'basisOpen'
  | 'linear'
  | 'linearClosed'
  | 'natural'
  | 'monotoneX'
  | 'monotoneY'
  | 'monotone'
  | 'step'
  | 'stepBefore'
  | 'stepAfter';

export interface Line extends Shape {
  /**
   * <@default=`'monotone'`>
   */
  variant?: D3Interpolation;
}

export interface Area extends Shape {
  /**
   * <@default=`'monotone'`>
   */
  variant?: D3Interpolation;
}

export interface Bar extends Shape {
  width?: number;
}

export interface ChartProps {
  /**
   * <@default=`800`>
   */
  width?: number;
  /**
   * <@default=`400`>
   */
  height?: number;
  /**
   * Chart skeleton color
   *
   * <@default=`'#cbd0d8'`>
   */
  color?: string;
  data: any[];
  /**
   * <@default=`{}`>
   */
  xAxis?: Axis;
  /**
   * <@default=`{}`>
   */
  yAxis?: Axis;
  legend?: Legend;
  lines?: Line[];
  areas?: Area[];
  bars?: Bar[];
}

export const Chart = memo<ChartProps>(
  ({
    width = 800,
    height = 400,
    color = '#cbd0d8',
    data,
    xAxis = {},
    yAxis = {},
    legend = {},
    lines,
    areas,
    bars,
  }) => {
    const memoizedXAxis = useMemo(() => {
      const { accessor, color = '#131518' } = xAxis;
      return <XAxis dataKey={accessor} stroke={color} />;
    }, [xAxis]);

    const memoizedYAxis = useMemo(() => {
      const { accessor, color = '#131518' } = yAxis;
      return <YAxis dataKey={accessor} stroke={color} />;
    }, [yAxis]);

    const memoizedLegend = useMemo(() => {
      const { variant, height = 50 } = legend;
      return (
        <BaseLegend
          height={height}
          iconType={variant}
          wrapperStyle={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      );
    }, [legend]);

    const memoizedLines = useMemo(
      () =>
        lines &&
        lines.map(
          (
            {
              stroke = '#131518',
              fill = '#ffffff',
              variant = 'monotone',
              accessor,
            },
            i,
          ) => (
            <BaseLine
              key={i}
              stroke={stroke}
              fill={fill}
              type={variant}
              dataKey={accessor}
            />
          ),
        ),
      [lines],
    );

    const memoizedAreas = useMemo(
      () =>
        areas &&
        areas.map(
          (
            {
              stroke = '#131518',
              fill = '#131518',
              variant = 'monotone',
              accessor,
            },
            i,
          ) => (
            <BaseArea
              key={i}
              stroke={stroke}
              fill={fill}
              type={variant}
              dataKey={accessor}
            />
          ),
        ),
      [areas],
    );

    const memoizedBars = useMemo(
      () =>
        bars &&
        bars.map(
          ({ stroke = '#131518', fill = '#131518', accessor, width }, i) => (
            <BaseBar
              key={i}
              stroke={stroke}
              fill={fill}
              dataKey={accessor}
              barSize={width}
            />
          ),
        ),
      [bars],
    );

    // Determine which chart container to use
    let Container = ComposedChart;
    if (lines && !areas && !bars) Container = LineChart;
    if (areas && !lines && !bars) Container = AreaChart;
    if (bars && !lines && !areas) Container = BarChart;

    return (
      <Container width={width} height={height} data={data}>
        <CartesianGrid stroke={color} strokeDasharray="3 3" />
        <Tooltip
          contentStyle={{
            borderColor: color,
          }}
          labelStyle={{ marginBottom: 5 }}
          cursor={{ stroke: color }}
        />
        {memoizedXAxis}
        {memoizedYAxis}
        {memoizedLegend}
        {memoizedLines}
        {memoizedAreas}
        {memoizedBars}
      </Container>
    );
  },
);
