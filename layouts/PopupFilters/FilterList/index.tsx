import { useMemo } from "react";

// Import LAYOUTS
import { WrapperScrollbar } from "layouts";

// Import STYLES
import styles from "./FilterList.module.scss";

export type List = {
  element: React.ReactElement;
  value: { id: string; name: string };
};

type Props = { className?: string; style?: React.CSSProperties; list: List[] };

const FilterList: React.FC<Props> = ({ className, style, list }) => {
  const classNames = [styles.filterList, className].join(" ");

  const renderItems = useMemo(() => {
    return list.map((item) => (
      <li key={item.value.id} className={styles.filterList__item}>
        {item.element}
      </li>
    ));
  }, [list]);

  return (
    <WrapperScrollbar style={style} className={classNames}>
      <ul style={style} className={styles.filterList__list}>
        {renderItems}
      </ul>
    </WrapperScrollbar>
  );
};

export default FilterList;
