import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  createRef,
} from "react";

// Import COMPONENTS
import { Text } from "components";

// Import UTILS
import { helpers } from "utils";

// Import HOOKS
import { commonHooks } from "../../hooks";

// Import STYLES
import styles from "./Tabs.module.scss";

type TabsDataProp<N> = {
  id: N;
  name: React.ReactNode;
};
export type TabsContentProp<N> = { name: string; data: TabsDataProp<N>[] };

type Props<C> = {
  className?: string;
  onChange?: (value: TabsDataProp<C>) => void;
  content: TabsContentProp<C>;
  children: React.ReactNode;
};

const Tabs = <Content extends string>({
  className,
  content,
  onChange,
  children,
}: Props<Content>) => {
  const classNames = [styles.tabs, className].join(" ");

  const { width } = commonHooks.useDimension();

  const [activeTabState, setActiveTabState] = useState<number>(0);
  const [
    activeTabStylesState,
    setActiveTabStylesState,
  ] = useState<null | Array<{
    width: number;
    left: number;
  }>>(null);

  // const linkLabelRefList: Array<RefObject<
  //   HTMLLabelElement
  // >> = content.data.map(() => useRef<HTMLLabelElement>(null));
  const linkLabelRefList = useRef<React.RefObject<HTMLLabelElement>[]>(
    content.data.map(() => createRef())
  );

  const calculateTabStyles = useCallback(
    helpers.debounce(() => {
      setActiveTabStylesState(
        linkLabelRefList.current.map((ref) => ({
          width: ref.current ? ref.current.clientWidth : 0,
          left: ref.current ? ref.current.offsetLeft : 0,
        }))
      );
    }),
    [helpers.debounce]
  );

  useEffect(() => {
    calculateTabStyles();
  }, [width, calculateTabStyles]);

  const handleClick = (index: number): void => {
    setActiveTabState(index);

    if (onChange) {
      onChange(content.data[index]);
    }
  };

  return (
    <div className={classNames}>
      {content.data.map((tab, index) => (
        <input
          key={tab.id}
          type="radio"
          name={`tab-${content.name}`}
          id={`tab${content.name}${tab.id}`}
          onClick={() => handleClick(index)}
        />
      ))}

      <ul className={styles.tabs__links}>
        {content.data.map((tab, index) => (
          <li key={tab.id} className={styles.tabs__linkItem}>
            <label
              ref={linkLabelRefList.current[index]}
              className={styles.tabs__link}
              htmlFor={`tab${content.name}${tab.id}`}
            >
              <Text
                className={styles.tabs__linkText}
                uppercase
                fontWeight={activeTabState === index ? "semibold" : undefined}
                color={activeTabState === index ? "orange" : "primary"}
                size="xsm"
              >
                {tab.name}
              </Text>
            </label>
          </li>
        ))}
        <li
          style={{
            width:
              activeTabStylesState != null
                ? activeTabStylesState[activeTabState].width
                : 0,
            left:
              activeTabStylesState != null
                ? activeTabStylesState[activeTabState].left
                : 0,
          }}
          className={styles.tabs__activeLine}
        />
      </ul>

      <div className={styles.tabs__content}>
        {React.Children.map(children, (child, index) => (
          <div
            style={{ display: activeTabState === index ? "block" : "none" }}
            className={styles.tabs__contentTab}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
