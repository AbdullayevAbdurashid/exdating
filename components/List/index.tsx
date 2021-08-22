import { useMemo } from "react";

// Import STYLES
import styles from "./List.module.scss";

type Props = { className?: string; style?: React.CSSProperties; list: List[] };

type List = { id: string; value: string };

const List: React.FC<Props> = ({ className, style, list }) => {
  const classNames = [styles.list, className].join(" ");

  const renderList = useMemo(
    () =>
      list.map((item) => (
        <li key={item.id} className={styles.list__item}>
          {item.value}
        </li>
      )),
    [list]
  );

  return (
    <ul style={style} className={classNames}>
      {renderList}
    </ul>
  );
};

export default List;
