import React, { cloneElement, FC, useCallback, useState } from 'react';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';
import classNames from 'classnames';

import './TruncatedText.css';

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

export interface TruncatedTextProps {
  /**
   * <@default=`false`>
   */
  isExpandable?: boolean;
  /**
   * <@default=`2`>
   */
  maxLine?: number;
  /**
   * <@default=`... read more`>
   */
  readMoreIndicator?: JSX.Element | string;
  /**
   * HTML element the truncated text should be rendered as
   *
   * <@default=`'p'`>
   */
  element?: string;
  className?: string;
}

export const TruncatedText: FC<TruncatedTextProps> = ({
  isExpandable = false,
  maxLine = 2,
  readMoreIndicator = '... read more',
  element = 'p',
  className,
  children,
}) => {
  const [isTruncated, setIsTruncated] = useState<boolean>(true);

  const handleReadMoreIndicatorClick = useCallback(() => {
    setIsTruncated(false);
  }, []);

  return isTruncated ? (
    <ResponsiveEllipsis
      className={classNames(className, 'ztopia-truncated-text')}
      text={children}
      maxLine={maxLine}
      ellipsis={
        isExpandable
          ? cloneElement(
              typeof readMoreIndicator === 'string' ? (
                <span>{readMoreIndicator}</span>
              ) : (
                readMoreIndicator
              ),
              {
                onClick: handleReadMoreIndicatorClick,
                className: classNames(
                  (readMoreIndicator as JSX.Element).props &&
                    (readMoreIndicator as JSX.Element).props.className,
                  'ztopia-truncated-text__read-more-indicator',
                ),
              },
            )
          : undefined
      }
      component={element}
    />
  ) : (
    <p className={className}>{children}</p>
  );
};
