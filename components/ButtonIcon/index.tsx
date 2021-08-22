// Import COMPONENTS
import { Button, Text } from "components";

// Import TYPES
import { TextColor } from "components/Text";

// Import STYLES
import styles from "./ButtonIcon.module.scss";

type Props = {
  className?: string;
  classNameIcon?: string;
  text: string;
  icon: React.ReactNode;
  textColor?: TextColor;
  fill?: TextColor;
  hoverEffect?: "colorAccent" | "opacity";
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const ButtonIcon: React.FC<Props> = ({
  className,
  text,
  icon,
  textColor,
  classNameIcon,
  hoverEffect,
  onClick,
}) => {
  const classNames = [
    styles.buttonIcon,
    hoverEffect ? styles[`buttonIcon_hover_${hoverEffect}`] : "",
    className,
  ].join(" ");

  return (
    <Button onClick={onClick} className={classNames}>
      <div
        className={`${styles.buttonIcon__icon} ${
          classNameIcon ? classNameIcon : ""
        }`}
      >
        {icon}
      </div>

      <Text
        className={styles.buttonIcon__text}
        size="sm"
        color={textColor ? textColor : "greyLight"}
      >
        {text}
      </Text>
    </Button>
  );
};

export default ButtonIcon;
