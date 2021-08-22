import React, { useCallback, useEffect, useMemo, useState } from "react";

// Import STYLES
import styles from "./TabsSimple.module.scss";

type FunctionalElement = ({
  activeTabIndex,
}: {
  activeTabIndex: number | null;
}) => React.ReactElement;

type Props = {
  className?: string;
  classNameTabsWrapper?: string;
  renderHeader: FunctionalElement;
  children: FunctionalElement;
  isToggleable?: boolean;
  initialTabIndex?: number;
};

const TabsSimple: React.FC<Props> = ({
  className,
  classNameTabsWrapper,
  renderHeader,
  children,
  isToggleable,
  initialTabIndex,
}) => {
  const classNames = [styles.tabsSimple, className].join(" ");
  const [activeTabIndexState, setActiveTabIndexState] = useState(
    isToggleable ? null : 0
  );

  useEffect(() => {
    if (initialTabIndex != null) {
      setActiveTabIndexState(initialTabIndex);
    }
  }, [initialTabIndex]);

  const handleClick = useCallback(
    (index: number) => {
      if (isToggleable && activeTabIndexState === index) {
        setActiveTabIndexState(null);
      } else {
        setActiveTabIndexState(index);
      }
    },
    [isToggleable, activeTabIndexState]
  );

  const modifyElement = useCallback(
    (
      rootElement: FunctionalElement,
      isConetntElement: boolean,
      newClassName: string,
      functionHandler?: Function
    ) => {
      const singleRootChild = React.Children.only(
        rootElement({ activeTabIndex: activeTabIndexState })
      );

      return React.Children.map(singleRootChild, (child) => {
        const subChildren = child.props.children;

        const modifiedSubChildren = React.Children.map(
          subChildren,
          (subChild, index) => {
            if (subChild != null) {
              return React.cloneElement(subChild, {
                ...subChild.props,
                ...{
                  onClick: functionHandler
                    ? () => functionHandler(index)
                    : undefined,
                  className: `${subChild.props.className} ${newClassName} ${
                    isConetntElement && index === activeTabIndexState
                      ? styles.tabsSimple__contentItem_active
                      : ""
                  }`,
                },
              });
            }

            return null;
          }
        );

        // console.log("modifiedSubChildren: ", modifiedSubChildren);

        return React.cloneElement(child, undefined, modifiedSubChildren);
      });
    },
    [activeTabIndexState]
  );

  const modifyAndRenderHeaderElements = useMemo(
    () =>
      modifyElement(
        renderHeader,
        false,
        styles.tabsSimple__navItem,
        handleClick
      ),
    [modifyElement, renderHeader, handleClick]
  );

  const modifyAndRenderContentElements = useMemo(
    () => modifyElement(children, true, styles.tabsSimple__contentItem),
    [modifyElement, children]
  );

  return (
    <div className={classNames}>
      {modifyAndRenderHeaderElements}

      <div className={classNameTabsWrapper}>
        {modifyAndRenderContentElements}
      </div>
    </div>
  );
};

export default TabsSimple;
