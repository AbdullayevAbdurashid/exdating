import { useRouter } from "next/router";

// Import COMPONENTS
import { Button, Flexbox, Text } from "components";

// Import STYLES
import styles from "./PageNotAvailable.module.scss";

type Props = { className?: string };

const PageNotAvailable: React.FC<Props> = ({ className }) => {
  const classNames = [styles.notAvailable, className].join(" ");

  const router = useRouter();

  const handleRegister = () => {
    router.push("/signup");
  };

  return (
    <Flexbox justify="center" align="center" className={classNames}>
      <Flexbox direction="column" className={styles.notAvailable__content}>
        <Text as="h3" color="greyDark" className={styles.notAvailable__title}>
          This section is available only to registered users
        </Text>

        <Button
          theme="gradient"
          onClick={handleRegister}
          className={styles.notAvailable__btn}
        >
          <Text
            color="white"
            size="sm"
            className={styles.notAvailable__btnText}
          >
            Register now
          </Text>
        </Button>
      </Flexbox>
    </Flexbox>
  );
};

export default PageNotAvailable;
