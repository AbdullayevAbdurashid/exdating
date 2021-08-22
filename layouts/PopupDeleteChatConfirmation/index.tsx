// Import COMPONENTS
import { on } from "cluster";
import { Text, Button, Flexbox } from "components";

// Import LAYOUTS
import { WrapperPopup } from "layouts";

// Import MEDIA
import Illustartion from "public/images/illustration-thanks-popup.svg";

// Import STYLES
import styles from "./PopupDeleteChatConfirmation.module.scss";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  onCancel: () => void;
  onConfirm: () => void;
};

const PopupDeleteChatConfirmation: React.FC<Props> = ({
  className,
  style,
  onCancel,
  onConfirm,
}) => {
  const classNames = [styles.confirmation, className].join(" ");

  return (
    <WrapperPopup style={style} className={classNames}>
      <div className={styles.confirmation__wrapper}>
        <div className={styles.confirmation__box}>
          <Text
            className={styles.confirmation__label}
            size="xlg"
            color="greyDark"
            fontWeight="semibold"
          >
            Sure you want to delete the chat?
          </Text>
        </div>

        <Flexbox justify="spaceBetween" className={styles.confirmation__box}>
          <Button
            onClick={onCancel}
            theme="grey"
            className={styles.confirmation__btnCancel}
          >
            <Text size="sm" fontWeight="semibold" color="gradientAnimated">
              Cancel
            </Text>
          </Button>

          <Button
            onClick={onConfirm}
            className={styles.confirmation__btnContinue}
            theme="gradient"
          >
            <Text
              size="sm"
              fontWeight="semibold"
              className={styles.confirmation__btnContinueText}
              color="white"
            >
              Continue
            </Text>
          </Button>
        </Flexbox>
      </div>
    </WrapperPopup>
  );
};

export default PopupDeleteChatConfirmation;
