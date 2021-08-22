import { useMemo } from "react";

// Import COMPONENTS
import { Dropdown, BurgerSimple, DropmenuBubble, ButtonIcon } from "components";
import type { TextColor } from "components/Text";

// Import STYLES
import styles from "./ButtonDropdownSimpleBurger.module.scss";

type Props = {
  className?: string;
  itemList: {
    id: string;
    text: string;
    icon?: React.ReactNode;
    color?: TextColor;
  }[];
  width: number;
  align?: "left" | "right";
  style?: React.CSSProperties;
  onOptionClick?: (id: string) => void;
};

const ButtonDropdownSimpleBurger: React.FC<Props> = ({
  className,
  itemList,
  width,
  align,
  style,
  onOptionClick,
}) => {
  const classNames = [styles.button, className].join(" ");

  const handleOptionClick = (id: string) => {
    if (onOptionClick) {
      onOptionClick(id);
    }
  };

  const renderButtonList = useMemo(() => {
    return itemList.map((item) => (
      <ButtonIcon
        key={item.id}
        text={item.text}
        textColor={item.color}
        icon={item.icon}
        className={styles.button__button}
        classNameIcon={styles.button__icon}
        hoverEffect="colorAccent"
        onClick={() => handleOptionClick(item.id)}
      />
    ));
  }, [itemList]);

  return (
    <Dropdown
      style={style}
      align={align}
      className={classNames}
      initialValue={null}
      renderSelect={() => <BurgerSimple className={styles.button__burger} />}
    >
      {({ isActive }) =>
        isActive && (
          <DropmenuBubble
            align={align}
            style={{ width }}
            className={styles.button__dropmenu}
          >
            {renderButtonList}
          </DropmenuBubble>
        )
      }
    </Dropdown>
  );
};

export default ButtonDropdownSimpleBurger;
