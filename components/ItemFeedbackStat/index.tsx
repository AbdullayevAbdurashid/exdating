// Import COMPONENTS
import { Flexbox, Text } from "components";
import type { TextColor, TextSizes } from "components/Text";

// Import STYLES
import styles from "./ItemFeedbackStat.module.scss";

type Props = {
  className?: string;
  classNameIcon?: string;
  text: string;
  icon: React.ReactNode;
  color?: TextColor;
  size?: TextSizes;
  iconType?: "like" | "dislike" | "notdecide" | "comments";
};

const ItemFeedbackStat: React.FC<Props> = ({
  className,
  classNameIcon,
  text,
  icon,
  color,
  size,
  iconType,
}) => {
  const classNames = [
    styles.itemStat,
    iconType ? styles.itemStat_position : "",
    className,
  ].join(" ");

  return (
    <Flexbox align="center" className={classNames}>
      <div
        className={`${styles.itemStat__icon} ${
          classNameIcon ? classNameIcon : ""
        } ${iconType ? styles[`itemStat_iconType_${iconType}`] : ""}`}
      >
        {icon}
      </div>

      <Text
        className={styles.itemStat__text}
        size={size ? size : "sm"}
        color={color ? color : "greyLight"}
      >
        {text}
      </Text>
    </Flexbox>
  );
};

export default ItemFeedbackStat;
