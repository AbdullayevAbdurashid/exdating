import { useRouter } from "next/router";

// Import COMPONENTS
import { Button, Text } from "components";

// Import LAYOUTS
import { WrapperPopup } from "layouts";

// Import MEDIA
import CheckIcon from "public/icons/icon-check.svg";

// Import STYLES
import styles from "./PopupAccountActivated.module.scss";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  onClose: () => void;
};

const PopupAccountActivated: React.FC<Props> = ({
  className,
  style,
  onClose,
}) => {
  const classNames = [styles.popup, className].join(" ");

  const router = useRouter();

  const handleLoginRoute = () => {
    router.push("/login");
  };

  return (
    <WrapperPopup onClose={onClose} style={style} className={classNames}>
      <div className={styles.popup__title}>
        <div className={styles.popup__titleIcon}>
          <CheckIcon />
        </div>

        <Text as="h3" color="greyDark" className={styles.popup__titleText}>
          Congratulations!
        </Text>
      </div>

      <Text className={styles.popup__description} size="md" color="greyDark">
        Your account has been successfully activated, you can now log in to your
        account
      </Text>

      <Button
        onClick={handleLoginRoute}
        theme="gradient"
        className={styles.popup__btn}
      >
        <Text color="white" size="sm" fontWeight="semibold">
          Log in
        </Text>
      </Button>
    </WrapperPopup>
  );
};

export default PopupAccountActivated;
