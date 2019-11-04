import React, { FC } from 'react';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

export interface TruncatedText {
  /**
   * <@default=`2`>
   */
  maxLine: number;
  /**
   * HTML element the truncated text should be rendered as
   *
   * <@default=`'p'`>
   */
  element?: string;
  className?: string;
}

export const TruncatedText: FC<TruncatedText> = ({
  className,
  maxLine,
  element = 'p',
  children,
}) => (
  <ResponsiveEllipsis
    className={className}
    text={children}
    maxLine={maxLine}
    component={element}
  />
);
