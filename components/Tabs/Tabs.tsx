import React, {
  Children,
  cloneElement,
  CSSProperties,
  isValidElement,
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import useComponentSize, { ComponentSize } from '@rehooks/component-size';
import classNames from 'classnames';
import { isEmpty, isNil } from 'lodash-es';

import './Tabs.css';

export interface TabProps {
  id: string;
  className?: string;
  children?: ReactNode;
  /**
   * <@internal>
   */
  isSelected?: boolean;
  /**
   * <@internal>
   */
  isVertical?: boolean;
  /**
   * <@internal>
   */
  idx?: number;
  /**
   * <@internal>
   */
  gap?: number;
  /**
   * <@internal>
   *
   * Called when Tab is rendered at the first time
   */
  onRender?: (id: string, size: ComponentSize) => void;
}

export const Tab = memo<TabProps>(
  ({
    id,
    className,
    children, // Internal props
    isSelected,
    isVertical,
    idx,
    gap,
    onRender,
    ...restProps
  }) => {
    const ref = useRef(null);
    const size = useComponentSize(ref);

    useEffect(() => {
      onRender!(id, size);
    }, [size]);

    const style: CSSProperties = {};
    if (idx !== 0) {
      if (isVertical) style.marginTop = gap;
      else style.marginLeft = gap;
    }

    return (
      <li
        ref={ref}
        id={id}
        className={classNames(className, 'ztopia-tabs__item', {
          'is-selected': isSelected,
          'is-vertical': isVertical,
        })}
        style={style}
        {...restProps}
      >
        {children}
      </li>
    );
  },
);

export interface TabsProps {
  /**
   * <@default=`false`>
   */
  isVertical?: boolean;
  /**
   * <@default=`20`>
   */
  gap?: number;
  className?: string;
  children?: ReactNode;
  /**
   * Selected tab Id
   */
  value?: string | null;
  /**
   * <@default=`'left or bottom'`>
   *
   * If `isVertical={true}`, the default indicator placement is `left`, otherwise, the default is `bottom`
   */
  indicatorPlacement?: 'left' | 'right' | 'top' | 'bottom';
  /**
   * Called when the tab changes
   */
  onChange?: (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    newValue: string,
  ) => void;
}

const MIN_TAB_SIZE = {
  width: 2,
  height: 2,
};

export const Tabs = memo<TabsProps>(
  ({
    isVertical = false,
    gap = 20,
    value,
    className,
    children,
    indicatorPlacement,
    onChange,
  }) => {
    indicatorPlacement = indicatorPlacement || (isVertical ? 'left' : 'bottom');
    let indicatorPosition: number | string = 0;
    if (isVertical) {
      if (indicatorPlacement === 'left') indicatorPosition = 0;
      if (indicatorPlacement === 'right') indicatorPosition = '100%';
    } else {
      if (indicatorPlacement === 'top') indicatorPosition = 0;
      if (indicatorPlacement === 'bottom') indicatorPosition = '100%';
    }

    const [tabSizes, setTabSizes] = useState<{
      [id: string]: ComponentSize | null;
    }>({});

    const tabIds = useMemo<string[]>(
      () =>
        Children.map(children, (child) =>
          isValidElement(child) ? child.props.id : null,
        ) || [],
      [children],
    );

    const indicatorStyle = useMemo(() => {
      // Don't show active tab if value is undefined or null
      if (isNil(value)) return;

      // Default to the first tab if value is empty
      if (isEmpty(value)) {
        const firstTabId = tabIds[0];
        const { width, height } = tabSizes[firstTabId] || MIN_TAB_SIZE;

        return {
          width: isVertical ? MIN_TAB_SIZE.width : width,
          height: isVertical ? height : MIN_TAB_SIZE.height,
          left: isVertical ? indicatorPosition : 0,
          top: isVertical ? 0 : indicatorPosition,
        };
      }

      // Calculate position
      const selectedTabId = tabIds.indexOf(value);
      const position = [...tabIds].slice(0, selectedTabId).reduce(
        (acc, tabId) => {
          const { width, height } = tabSizes[tabId] || MIN_TAB_SIZE;
          return {
            left: isVertical ? acc.left : ((acc.left as number) += width + gap),
            top: isVertical ? ((acc.top as number) += height + gap) : acc.top,
          };
        },
        {
          left: isVertical ? indicatorPosition : 0,
          top: isVertical ? 0 : indicatorPosition,
        },
      );

      // Calculate size
      const { width, height } = tabSizes[value] || MIN_TAB_SIZE;

      return {
        ...position,
        width: isVertical ? MIN_TAB_SIZE.width : width,
        height: isVertical ? height : MIN_TAB_SIZE.height,
      };
    }, [isVertical, value, tabSizes, tabIds]);

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
        if (onChange) onChange(e, newValue);
      },
      [onChange],
    );

    return (
      <div className={classNames(className, 'ztopia-tabs')}>
        <ul
          className={classNames('ztopia-tabs__items', {
            'is-vertical': isVertical,
          })}
        >
          {Children.map(children, (child, i) =>
            isValidElement(child)
              ? cloneElement(child, {
                  isSelected:
                    !isNil(value) &&
                    child.props.id ===
                      (value || (i === 0 ? child.props.id : '')),
                  isVertical,
                  idx: i,
                  gap,
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
