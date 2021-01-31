import React, {
  Children,
  cloneElement,
  createElement,
  isValidElement,
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';

import { IconChevronDown } from '../Icons';

import './Accordion.css';

export interface AccordionProps {
  /**
   * <@default=`false`>
   *
   * If enabled, multiple panels can be expanded at once
   */
  isMulti?: boolean;
  className?: string;
  /**
   * <@default=`section`>
   */
  component?: string;
  expandedPanelId?: string;
  children?: ReactNode;
  defaultExpandedPanelIds?: string[];
}

export const Accordion = memo<AccordionProps>(
  ({
    isMulti = false,
    className,
    component = 'section',
    expandedPanelId,
    children,
    defaultExpandedPanelIds = [],
  }) => {
    const [expandedPanelIds, setExpandedPanelIds] = useState<string[]>(
      expandedPanelId ? [expandedPanelId] : defaultExpandedPanelIds,
    );

    useEffect(() => {
      if (expandedPanelId) setExpandedPanelIds([expandedPanelId]);
      else setExpandedPanelIds(defaultExpandedPanelIds);
    }, [expandedPanelId]);

    const handleClickPanelHeader = useCallback(
      (_e: React.MouseEvent<HTMLElement, MouseEvent>, id: string) => {
        const i = expandedPanelIds.indexOf(id);
        if (i === -1) {
          setExpandedPanelIds(isMulti ? [...expandedPanelIds, id] : [id]);
        } else {
          const newExpandedPanelIds = [...expandedPanelIds];
          newExpandedPanelIds.splice(i, 1);
          setExpandedPanelIds(newExpandedPanelIds);
        }
      },
      [expandedPanelIds],
    );

    return createElement(
      component,
      { className: classNames(className, 'ztopia-accordion') },
      Children.map(children, (child) =>
        isValidElement(child)
          ? cloneElement(child, {
              isExpanded: expandedPanelIds.indexOf(child.props.id) !== -1,
              onClickPanelHeader: handleClickPanelHeader,
            })
          : child,
      ),
    );
  },
);

export interface AccordionPanel {
  /**
   * Passed by Accordion
   *
   * <@internal>
   */
  isExpanded?: boolean;
  id: string;
  className?: string;
  /**
   * <@default=`article`>
   */
  component?: string;
  children?: ReactNode;
  /**
   * Passed by Accordion
   *
   * <@internal>
   */
  onClickPanelHeader?: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string,
  ) => void;
}

export const AccordionPanel = memo<AccordionPanel>(
  ({
    isExpanded,
    id,
    className,
    component = 'article',
    children,
    onClickPanelHeader,
  }) => {
    if (!children || !children[0] || !children[1]) {
      throw new Error(
        'AccordionPanel: must have exact two children. The first child must be AccordionPanelHeader, and the second child must be AccordionPanelContent',
      );
    }
    const header = children[0];
    const content = children[1];
    return createElement(
      component,
      {
        id,
        className: classNames(className, 'ztopia-accordion__panel', {
          'is-expanded': isExpanded,
        }),
      },
      <>
        {cloneElement(header, {
          isExpanded,
          id,
          onClickPanelHeader,
        })}
        {cloneElement(content, {
          isExpanded,
        })}
      </>,
    );
  },
);

export interface AccordionPanelHeader {
  /**
   * Passed by Accordion
   *
   * <@internal>
   */
  isExpanded?: boolean;
  /**
   * Passed by AccordionPanel
   *
   * <@internal>
   */
  id?: string;
  className?: string;
  /**
   * <@default=`header`>
   */
  component?: string;
  children?: ReactNode;
  /**
   * Passed by AccordionPanel
   *
   * <@internal>
   */
  onClickPanelHeader?: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string,
  ) => void;
}

export const AccordionPanelHeader = memo<AccordionPanelHeader>(
  ({
    isExpanded,
    id,
    className,
    component = 'header',
    onClickPanelHeader,
    children,
  }) =>
    createElement(
      component,
      {
        className: classNames(className, 'ztopia-accordion__panel-header', {
          'is-expanded': isExpanded,
        }),
        onClick: (e) => onClickPanelHeader!(e, id!),
      },
      <>
        {children}
        <IconChevronDown
          className={classNames('ztopia-accordion__panel-indicator', {
            'is-expanded': isExpanded,
          })}
        />
      </>,
    ),
);

export interface AccordionPanelContent {
  /**
   * Passed by Accordion
   *
   * <@internal>
   */
  isExpanded?: boolean;
  className?: string;
  /**
   * <@default=`div`>
   */
  component?: string;
  children?: ReactNode;
}

export const AccordionPanelContent = memo<AccordionPanelContent>(
  ({ isExpanded, className, component = 'div', ...restProps }) => {
    const ref = useRef<HTMLDivElement>(null);

    const [height, setHeight] = useState(0);

    useEffect(() => {
      const node = ref.current;
      if (!node) {
        return;
      }
      setHeight(node.scrollHeight);
    }, [isExpanded]);

    return createElement(component, {
      ...restProps,
      ref,
      className: classNames(className, 'ztopia-accordion__panel-content', {
        'is-expanded': isExpanded,
      }),
      style: { height: isExpanded ? height : 0 },
    });
  },
);
