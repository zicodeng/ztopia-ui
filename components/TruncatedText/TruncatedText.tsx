import React, { memo, useCallback, useState } from 'react';
import LinesEllipsis from 'react-lines-ellipsis';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';
import classNames from 'classnames';

import './TruncatedText.css';

const ResponsiveLinesEllipsis = responsiveHOC()(LinesEllipsis);
const ResponsiveHTMLEllipsis = responsiveHOC()(HTMLEllipsis);

export interface TruncatedTextProps {
  /**
   * Use pure CSS for truncation. This has better rendering performance
   * but it is hacky in nature. It does not work with HTML content
   *
   * <@default=`false`>
   */
  isCSSTruncation?: boolean;
  /**
   * <@default=`false`>
   */
  isHTML?: boolean;
  /**
   * <@default=`false`>
   */
  isExpandable?: boolean;
  /**
   * <@default=`2`>
   */
  maxLine?: number;
  /**
   * <@default=`1.2`>
   */
  cssTruncationLineHeight?: number;
  /**
   * <@default=`em`>
   */
  cssTruncationUnit?: 'em' | 'rem';
  /**
   * <@default=`''`>
   */
  ellipsis?: string;
  /**
   * HTML element the truncated text should be rendered as
   *
   * <@default=`'p' for normal text or 'div' for HTML`>
   */
  element?: string;
  className?: string;
  children: string;
}

export const TruncatedText = memo<TruncatedTextProps>(
  ({
    isCSSTruncation = false,
    isHTML = false,
    isExpandable = false,
    maxLine = 2,
    cssTruncationLineHeight = 1.2,
    cssTruncationUnit = 'em',
    ellipsis = '',
    element,
    className,
    children,
  }) => {
    const [isTruncated, setIsTruncated] = useState<boolean>(true);

    const handleClick = useCallback(() => {
      setIsTruncated(false);
    }, []);

    if (isTruncated) {
      const sharedProps: any = {
        maxLine,
        className: classNames(className, 'ztopia-truncated-text', {
          'is-expandable': isExpandable,
        }),
      };
      if (isExpandable) {
        sharedProps.onClick = handleClick;

        const ellipsisClassName = 'ztopia-truncated-text__ellipsis';

        if (!isCSSTruncation) {
          if (isHTML) {
            sharedProps.ellipsisHTML = `... <span class=${ellipsisClassName}>${ellipsis}</span>`;
          } else {
            sharedProps.ellipsis = (
              <>
                ... <span className={ellipsisClassName}>{ellipsis}</span>
              </>
            );
          }
        }
      }

      if (isHTML) {
        return (
          <ResponsiveHTMLEllipsis
            unsafeHTML={children}
            component={element || 'div'}
            {...sharedProps}
          />
        );
      } else {
        if (isCSSTruncation) {
          return (
            <p
              className={classNames(sharedProps.className, 'is-css-truncation')}
              style={{
                lineHeight: cssTruncationLineHeight + cssTruncationUnit,
                maxHeight:
                  maxLine * cssTruncationLineHeight + cssTruncationUnit,
              }}
              onClick={sharedProps.onClick}
            >
              {children}
            </p>
          );
        } else {
          return (
            <ResponsiveLinesEllipsis
              text={children}
              component={element || 'p'}
              {...sharedProps}
            />
          );
        }
      }
    }

    return isHTML ? (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: children }}
      />
    ) : (
      <p className={className}>{children}</p>
    );
  },
);
