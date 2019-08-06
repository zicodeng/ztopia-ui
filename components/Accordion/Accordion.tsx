import classNames from 'classnames';
import React, {
  Children,
  cloneElement,
  FC,
  isValidElement,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import './Accordion.css';
export interface AccordionProps {
  /**
   * <@default=`false`>
   */
  allowMultipleExpanded?: boolean;
  className?: string;
  defaultExpandedPanelIds?: string[];
  children: AccordionPanel[];
}

export const Accordion: FC<AccordionProps> = memo(
  ({ allowMultipleExpanded, className, defaultExpandedPanelIds, children }) => {
    const [expandedPanelIds, setExpandedPanelIds] = useState<string[]>(
      defaultExpandedPanelIds || [],
    );

    const handleClickPanelHeader = useCallback(
      (_e: React.MouseEvent<HTMLElement, MouseEvent>, id: string) => {
        const i = expandedPanelIds.indexOf(id);
        if (i === -1) {
          setExpandedPanelIds(
            allowMultipleExpanded ? [...expandedPanelIds, id] : [id],
          );
        } else {
          const newExpandedPanelIds = [...expandedPanelIds];
          newExpandedPanelIds.splice(i, 1);
          setExpandedPanelIds(newExpandedPanelIds);
        }
      },
      [expandedPanelIds],
    );

    return (
      <section className={classNames(className, 'ztopia-accordion')}>
        {Children.map(children, child =>
          isValidElement(child)
            ? cloneElement(child, {
                isExpanded: expandedPanelIds.indexOf(child.props.id) !== -1,
                onClickPanelHeader: handleClickPanelHeader,
              })
            : child,
        )}
      </section>
    );
  },
);

Accordion.defaultProps = {
  allowMultipleExpanded: false,
};

export interface AccordionPanel {
  /**
   * <@internal>
   *
   * Passed by Accordion
   */
  isExpanded: boolean;
  id: string;
  className?: string;
  /**
   * <@internal>
   *
   * Passed by Accordion
   */
  onClickPanelHeader: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string,
  ) => void;
  children: AccordionPanelHeader | AccordionPanelContent;
}

export const AccordionPanel: FC<AccordionPanel> = ({
  isExpanded,
  id,
  className,
  onClickPanelHeader,
  children,
}) => {
  if (!children || !children[0] || !children[1]) {
    throw new Error(
      'AccordionPanel must have exact two children: the first child must be AccordionPanelHeader, and the second child must be AccordionPanelContent',
    );
  }
  const header = children[0];
  const content = children[1];
  return (
    <article
      id={id}
      className={classNames(className, 'ztopia-accordion__panel', {
        'is-expanded': isExpanded,
      })}
    >
      {cloneElement(header, {
        isExpanded,
        id,
        onClickPanelHeader,
      })}
      {cloneElement(content, {
        isExpanded,
      })}
    </article>
  );
};

export interface AccordionPanelHeader {
  /**
   * <@internal>
   *
   * Passed by Accordion
   */
  isExpanded: boolean;
  /**
   * <@internal>
   *
   * Passed by AccordionPanel
   */
  id: string;
  className?: string;
  /**
   * <@internal>
   *
   * Passed by AccordionPanel
   */
  onClickPanelHeader: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string,
  ) => void;
}

export const AccordionPanelHeader: FC<AccordionPanelHeader> = ({
  isExpanded,
  id,
  className,
  onClickPanelHeader,
  children,
}) => (
  <header
    className={classNames(className, 'ztopia-accordion__panel-header', {
      'is-expanded': isExpanded,
    })}
    onClick={e => onClickPanelHeader(e, id)}
  >
    {children}
    <svg
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
      className={classNames('ztopia-accordion__panel-close-icon', {
        'is-expanded': isExpanded,
      })}
    >
      <path
        fill="currentColor"
        d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"
      ></path>
    </svg>
  </header>
);

export interface AccordionPanelContent {
  /**
   * <@internal>
   *
   * Passed by Accordion
   */
  isExpanded: boolean;
  className?: string;
}

export const AccordionPanelContent: FC<AccordionPanelContent> = ({
  isExpanded,
  className,
  ...restProps
}) => {
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }
    setHeight(node.scrollHeight);
  }, [isExpanded]);
  return (
    <div
      {...restProps}
      ref={ref}
      className={classNames(className, 'ztopia-accordion__panel-content', {
        'is-expanded': isExpanded,
      })}
      style={{
        height: isExpanded ? height : 0,
      }}
    />
  );
};
