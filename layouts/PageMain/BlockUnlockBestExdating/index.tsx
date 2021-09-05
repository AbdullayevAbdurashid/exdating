import { useRouter } from "next/router";

//Language
import en from '../../../locales/en.json';
import ru from '../../../locales/ru.json';
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
  //Language
  const { locale } = router;
  const t = locale === 'en' ? en : ru;
  return (
    <div className={classNames}>
      <Text
        className={styles.unlockBestExdating__title}
        as="h5"
        fontWeight="bold"
        color="white"
      >
        {t.unlock.intro
        }      </Text>

      <ul className={styles.unlockBestExdating__list}>
        <li className={styles.unlockBestExdating__listItem}>
          <Text color="white" size="sm">
            {t.unlock.point1
            }          </Text>
        </li>
        <li className={styles.unlockBestExdating__listItem}>
          <Text color="white" size="sm">
            {t.unlock.point2
            }
          </Text>
        </li>
        <li className={styles.unlockBestExdating__listItem}>
          <Text color="white" size="sm">
            {t.unlock.point3
            }
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
          {t.header.signUp
          }        </Text>

        <span className={styles.unlockBestExdating__btnIconWrapper}>
          <ArrowLognRightIcon width={60} height={8} />
        </span>
      </Button>
    </div>
  );
};

export default BlockUnlockBestExdating;
