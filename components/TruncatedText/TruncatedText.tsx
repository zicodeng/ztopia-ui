import React, {
  cloneElement,
  FC,
  isValidElement,
  ReactNode,
  useCallback,
  useState,
} from 'react';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';
import classNames from 'classnames';

import './TruncatedText.css';

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

export interface TruncatedText {
  /**
   * <@default=`2`>
   */
  maxLine: number;
  /**
   * <@default=`... read more`>
   */
  readMoreIndicator?: ReactNode;
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
  readMoreIndicator = null,
  element = 'p',
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
        readMoreIndicator ? (
          isValidElement(readMoreIndicator) ? (
            cloneElement(readMoreIndicator, {
              // @ts-ignore
              onClick: handleReadMoreIndicatorClick,
              className: classNames(
                // @ts-ignore
                readMoreIndicator.props.className,
                'ztopia-truncated-text__read-more-indicator',
              ),
            })
          ) : (
            <span
              className="ztopia-truncated-text__read-more-indicator"
              onClick={handleReadMoreIndicatorClick}
            >
              {readMoreIndicator}
            </span>
          )
        ) : (
          undefined
        )
      }
      component={element}
    />
  ) : (
    <p className={className}>{children}</p>
  );
};
