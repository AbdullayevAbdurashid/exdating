// import COMPONENTS
import { Container, Button, Text } from "components";

// Import MEDIA
import ArrowIcon from "public/icons/icon-arrow-right.svg";

// Import STYLES
import styles from "./WrapperAuth.module.scss";

type Props = { className?: string; onBack: () => void };

const WrapperAuth: React.FC<Props> = ({ className, onBack, children }) => {
  const classNames = [styles.authWrapper, className].join(" ");

  return (
    <div className={classNames}>
      <Container className={styles.authWrapper__container}>
        <div className={styles.authWrapper__mainContent}>
          {children}

          <div className={styles.authWrapper__boxBtn}>
            <Button
              onClick={onBack}
              className={styles.authWrapper__boxBtnBack}
              theme="transparent"
            >
              <ArrowIcon width={16} height={7} />

              <Text color="orange" size="xsm">
                Back
              </Text>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default WrapperAuth;
