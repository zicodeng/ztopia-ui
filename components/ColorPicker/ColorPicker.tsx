import React, { FC, useState, useCallback, memo } from 'react';
import {
  ChromePicker,
  ChromePickerProps,
  ColorResult,
  Color,
  RGBColor,
} from 'react-color';

import { Popper, PopperProps } from '../Popper';

import './ColorPicker.css';

const getBackgroundColor = (color: Color): string => {
  if (typeof color === 'string') return color;
  const { r, g, b, a } = color as RGBColor;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

export interface ColorPickerProps extends ChromePickerProps {
  /**
   * <@default=`false`>
   */
  isTriggerShown?: boolean;
  /**
   * <@default=`'#000000'`>
   */
  color?: Color;
  popperProps?: PopperProps;
}

export const ColorPicker: FC<ColorPickerProps> = memo(
  ({
    isTriggerShown = false,
    color = '#000000',
    onChange,
    popperProps,
    ...restProps
  }) => {
    const [triggerColor, setTriggerColor] = useState<Color>(color);
    const handleChange = useCallback(
      (newColor: ColorResult) => {
        setTriggerColor(newColor.rgb);
        if (onChange) onChange(newColor);
      },
      [onChange],
    );
    return isTriggerShown ? (
      <Popper
        {...popperProps}
        className="ztopia-color-picker"
        trigger={['click']}
        overlay={
          <ChromePicker
            color={triggerColor}
            onChangeComplete={handleChange}
            {...restProps}
          />
        }
      >
        <div
          className="ztopia-color-picker__trigger"
          style={{
            backgroundColor: getBackgroundColor(triggerColor),
          }}
        />
      </Popper>
    ) : (
      <div className="ztopia-color-picker">
        <ChromePicker color={color} onChange={onChange} {...restProps} />
      </div>
    );
  },
);
