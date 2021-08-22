// Import COMPONENTS
import { Text } from "components";

// Import STYLES
import styles from "./FieldWithLabel.module.scss";

type Props = {
  className?: string;
  label: React.ReactNode;
};

const FieldWithLabel: React.FC<Props> = ({ className, label, children }) => {
  const classNames = [styles.inputLabel, className].join(" ");

  return (
    <div className={classNames}>
      <Text
        as="label"
        size="sm"
        color="moonlight"
        className={styles.inputLabel__label}
      >
        {label}
      </Text>

      {children}
    </div>
  );
};

export default FieldWithLabel;
