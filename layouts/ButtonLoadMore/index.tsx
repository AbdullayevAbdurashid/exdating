// Import COMPONENTS
import { Button, Text } from "components";

// Import MEDIA
import CurvedArrowIcon from "../../public/icons/icon-curved-arrow.svg";

// Import STYLES
import styles from "./ButtonLoadMore.module.scss";

type Props = {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

const ButtonLoadMore: React.FC<Props> = ({ className, onClick, disabled }) => {
  const classNames = [styles.button, className].join(" ");

  return (
    <Button
      onClick={onClick}
      className={classNames}
      theme="borderedGradientPrimary"
      disabled={disabled}
    >
      <Text
        className={styles.button__text}
        fontWeight="semibold"
        size="sm"
        color="gradient"
      >
        <CurvedArrowIcon width={14} hight={14} />

        <span>Load more</span>
      </Text>
    </Button>
  );
};

export default ButtonLoadMore;
