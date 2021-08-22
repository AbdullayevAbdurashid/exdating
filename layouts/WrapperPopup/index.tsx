// Import COMPONENTS
import { BoxSimpleRounded, Button } from "components";

// Import MEDIA
import CloseIcon from "public/icons/icon-close.svg";

// Import STYLES
import styles from "./WrapperPopup.module.scss";

type Props = {
  className?: string;
  onClose?: () => void;
  style?: React.CSSProperties;
};

const WrapperPopup: React.FC<Props> = ({
  className,
  children,
  onClose,
  style,
}) => {
  const classNames = [styles.wrapperPopup, className].join(" ");

  const handleClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <BoxSimpleRounded style={style} className={classNames}>
      {onClose && (
        <Button
          onClick={handleClick}
          theme="transparent"
          className={styles.wrapperPopup__btnClose}
        >
          <CloseIcon viewBox="0 0 14 14" width={18} height={18} />
        </Button>
      )}
      {children}
    </BoxSimpleRounded>
  );
};

export default WrapperPopup;
