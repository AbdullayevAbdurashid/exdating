import { useRouter } from "next/router";

// Import COMPONENTS
import { Text, Button } from "../../../components";

// Import MEDIA
import ArrowLognRightIcon from "../../../public/icons/icon-arrow-longer-right.svg";

// Import STYLES
import styles from "./BlockUnlockBestExdating.module.scss";

type Props = { className?: string };

const BlockUnlockBestExdating: React.FC<Props> = ({ className }) => {
  const classNames = [styles.unlockBestExdating, className].join(" ");

  const router = useRouter();

  const handleRouteToSignup = () => {
    router.push("/signup");
  };

  return (
    <div className={classNames}>
      <Text
        className={styles.unlockBestExdating__title}
        as="h5"
        fontWeight="bold"
        color="white"
      >
        Unlock the best of Exdating
      </Text>

      <ul className={styles.unlockBestExdating__list}>
        <li className={styles.unlockBestExdating__listItem}>
          <Text color="white" size="sm">
            Save your favorite travel ideas and see them on a map
          </Text>
        </li>
        <li className={styles.unlockBestExdating__listItem}>
          <Text color="white" size="sm">
            Get price alerts and deals so you can travel your way
          </Text>
        </li>
        <li className={styles.unlockBestExdating__listItem}>
          <Text color="white" size="sm">
            Ask questions and get answers from travelers like you
          </Text>
        </li>
      </ul>

      <Button
        justify="spaceBetween"
        theme="dark"
        className={styles.unlockBestExdating__btn}
        onClick={handleRouteToSignup}
      >
        <Text
          className={styles.unlockBestExdating__btnText}
          color="gradientAnimated"
          size="sm"
          fontWeight="semibold"
        >
          Sign up
        </Text>

        <span className={styles.unlockBestExdating__btnIconWrapper}>
          <ArrowLognRightIcon width={60} height={8} />
        </span>
      </Button>
    </div>
  );
};

export default BlockUnlockBestExdating;
