import { useEffect, useState } from "react";

// Import COMPONENTS
import { Text } from "components";

// Import LAYOUTS
import { ButtonDropdownSimpleBurger } from "layouts";

// Import TEMPLATES
import { BURGER_ITEM_LIST } from "./BoxChatMessage.temp";

// Import STYLES
import styles from "./BoxChatMessage.module.scss";

type Props = {
  className?: string;
  text: string;
  isSelf: boolean;
  time: CustomTime;
  isLast?: boolean;
};

const BoxChatMessage: React.FC<Props> = ({
  className,
  text,
  isSelf,
  time,
  isLast,
}) => {
  const classNames = [styles.message, className].join(" ");

  const [isHovered, setIsHovered] = useState(false);

  const handleClickBurgerOption = (option: string) => {
    console.log("handleClickBurgerOption: ", option);
  };

  useEffect(() => {
    if (isLast) {
      console.log("isLast: ", text);
    }
  }, [isLast, text]);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleBlur = () => {
    setIsHovered(false);
  };

  return (
    <div
      onMouseEnter={handleHover}
      onMouseLeave={handleBlur}
      className={classNames}
    >
      <div
        className={`${styles.message__content} ${
          isSelf ? styles.message__content_self : ""
        }`}
      >
        <Text className={styles.message__text} size="sm" color="greyDark">
          {text}
        </Text>

        <ButtonDropdownSimpleBurger
          style={{
            ...(isSelf ? { left: -40 } : { right: -40 }),
            opacity: isHovered ? 1 : 0,
          }}
          className={styles.message__burger}
          align="right"
          itemList={BURGER_ITEM_LIST}
          width={100}
          onOptionClick={handleClickBurgerOption}
        />
      </div>

      <div className={styles.message__date}>
        <Text size="xsm" color="moonlight">
          {time.hour}:{time.minutes}
        </Text>
      </div>
    </div>
  );
};

export default BoxChatMessage;
