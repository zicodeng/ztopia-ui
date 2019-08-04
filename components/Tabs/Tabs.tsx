import useComponentSize, { ComponentSize } from '@rehooks/component-size';
import classNames from 'classnames';
import React, {
  Children,
  cloneElement,
  FC,
  isValidElement,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import './Tabs.css';

export interface TabProps {
  id: string;
  className?: string;
  /**
   * <@internal>
   *
   * Called when Tab is rendered at the first time
   */
  onRender: (id: string, size: ComponentSize) => void;
}

export const Tab: FC<TabProps> = memo(
  ({ id, className, children, onRender, ...restProps }) => {
    const ref = useRef(null);
    const size = useComponentSize(ref);

    useEffect(() => {
      onRender(id, size);
    }, [size]);

    return (
      <li
        ref={ref}
        id={id}
        className={classNames(className, 'ztopia-tabs__item')}
        {...restProps}
      >
        {children}
      </li>
    );
  },
);

export interface TabsProps {
  /**
   * Selected tab Id
   */
  value?: string;
  className?: string;
  /**
   * Called when the tab changes
   */
  onChange?: (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    newValue: string,
  ) => void;
}

export const Tabs: FC<TabsProps> = memo(
  ({ value, className, children, onChange }) => {
    const [tabSizes, setTabSizes] = useState<{
      [id: string]: ComponentSize | null;
    }>({});

    const tabIds = useMemo<string[]>(
      () =>
        Children.map(children, child =>
          isValidElement(child) ? child.props.id : null,
        ),
      [children],
    );

    const indicatorStyle = useMemo(() => {
      // Default to the first tab
      if (!value) {
        const firstTabId = tabIds[0];
        const firstTabSize = tabSizes[firstTabId];
        return {
          width: firstTabSize ? firstTabSize.width : 0,
          left: 0,
        };
      }

      // Calculate position
      const selectedTabId = tabIds.indexOf(value);
      const pos = [...tabIds].slice(0, selectedTabId).reduce(
        (acc, tabId) => {
          const { width } = tabSizes[tabId] || { width: 0 };
          return {
            width,
            left: acc.left + width,
          };
        },
        {
          left: 0,
        },
      );

      // Calculate size
      const { width } = tabSizes[value] || { width: 0 };

      return {
        ...pos,
        width,
      };
    }, [value, tabSizes, tabIds]);

    const handleRenderTab = useCallback(
      (id: string, size: ComponentSize) => {
        setTabSizes({
          ...tabSizes,
          [id]: size,
        });
      },
      [tabSizes],
    );

    const handleClickTab = useCallback(
      (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        const newValue = e.currentTarget.id;
        if (onChange) { onChange(e, newValue); }
      },
      [onChange],
    );

    return (
      <div className={classNames(className, 'ztopia-tabs')}>
        <ul className={classNames('ztopia-tabs__items')}>
          {Children.map(children, child =>
            isValidElement(child)
              ? cloneElement(child, {
                  onClick: handleClickTab,
                  onRender: handleRenderTab,
                })
              : child,
          )}
        </ul>
        <div className="ztopia-tabs__indicator" style={indicatorStyle} />
      </div>
    );
  },
);
