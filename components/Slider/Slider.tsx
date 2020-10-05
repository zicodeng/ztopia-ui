import React, { memo } from 'react';
import classNames from 'classnames';
import BasicSlider, { Handle, HandleProps, Marks, Range } from 'rc-slider';

import { Popper } from '../Popper';

import 'rc-slider/assets/index.css';
import './Slider.css';

export interface SliderProps {
  /**
   * <@default=`false`>
   */
  isVertical?: boolean;
  /**
   * <@default=`0`>
   */
  min?: number;
  /**
   * <@default=`100`>
   */
  max?: number;
  /**
   * The value of a basic slider is a single number.
   * The value of a range slider is an array of numbers
   *
   * <@default=`0`>
   */
  value?: number | number[];
  step?: number;
  className?: string;
  marks?: Marks;
  variant?: 'basic' | 'range';
  onChange?: (value: number | number[]) => void;
  renderHandle?: (props: any) => JSX.Element;
}

const defaultRenderHandle = props => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Popper
      key={index}
      isTransitionDisabled
      offsetY={-2}
      placement="top"
      overlay={value}
      isVisible={dragging}
    >
      <Handle value={value} {...restProps} />
    </Popper>
  );
};

export const SliderHandle = memo<HandleProps>(props => <Handle {...props} />);

export const Slider = memo<SliderProps>(
  ({
    isVertical = false,
    min = 0,
    max = 100,
    value = 0,
    className,
    variant = 'basic',
    renderHandle = defaultRenderHandle,
    ...restProps
  }) => {
    const sliderProps = {
      vertical: isVertical,
      min,
      max,
      className: classNames(className, 'ztopia-slider', {
        'is-vertical': isVertical,
      }),
      handle: renderHandle,
      ...restProps,
    };

    if (variant === 'basic') {
      if (value && typeof value !== 'number')
        throw new Error(
          'Slider: prop value of a basic slider must be a number',
        );
      return <BasicSlider value={value} {...sliderProps} />;
    }

    if (variant === 'range') {
      if (value && !Array.isArray(value))
        throw new Error(
          'Slider: prop value of a range slider must be an array of numbers',
        );
      return (
        <Range allowCross={false} value={value as number[]} {...sliderProps} />
      );
    }

    throw new Error(`Slider: unknown variant ${variant}`);
  },
);
