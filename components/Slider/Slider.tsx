import classNames from 'classnames';
import BaseSlider, { Handle, Marks } from 'rc-slider';
import React, { FC, memo } from 'react';

import { Tooltip } from '../Tooltip';

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
  value?: number;
  step?: number;
  className?: string;
  marks?: Marks;
  onChange?: () => void;
}

const handle = props => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      key={index}
      offsetX={-4}
      offsetY={-2}
      placement="top"
      overlay={value}
      visible={dragging}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

export const Slider: FC<SliderProps> = memo(
  ({ isVertical, className, ...restProps }) => {
    return (
      <BaseSlider
        vertical={isVertical}
        className={classNames(className, 'ztopia-slider', {
          'is-vertical': isVertical,
        })}
        handle={handle}
        {...restProps}
      />
    );
  },
);

Slider.defaultProps = {
  isVertical: false,
  min: 0,
  max: 100,
};
