// Import COMPONENTS
import { Text } from "components";
import Button, { ButtonProps } from "components/Button";

// Import STYLES
import styles from "./ButtonGradient.module.scss";

const ButtonGradient: React.FC<ButtonProps> = ({
  children,
  className,
  ...buttonProps
}) => {
  const classNames = [styles.buttonGradient, className].join(" ");

  return (
    <Button theme="gradient" className={classNames} {...buttonProps}>
      <Text
        className={styles.buttonGradient__text}
        color="white"
        size="sm"
        fontWeight="semibold"
      >
        {children}
      </Text>
    </Button>
  );
};

export default ButtonGradient;
