// import COMPONENTS
import { BoxAvatar, Button, Flexbox, Text } from "components";

// Import STYLES
import styles from "./BoxFollower.module.scss";

type Props = {
  className?: string;
  avatarSrc?: string;
  name: string;
};

const BoxFollower: React.FC<Props> = ({ className, avatarSrc, name }) => {
  const classNames = [styles.follower, className].join(" ");

  return (
    <Flexbox
      align="center"
      direction="column"
      justify="spaceBetween"
      className={classNames}
    >
      <Flexbox
        align="center"
        direction="column"
        justify="center"
        className={styles.follower__contentTop}
      >
        <BoxAvatar
          className={styles.follower__avatar}
          size={84}
          alt=""
          src={avatarSrc}
        />

        <Text className={styles.follower__name} color="greyDark" size="sm">
          {name}
        </Text>
      </Flexbox>

      <Button className={styles.follower__btnSubscribe} theme="bordered">
        <Text
          color="orange"
          size="sm"
          className={styles.follower__btnSubscribeText}
        >
          + Subscribe
        </Text>
      </Button>
    </Flexbox>
  );
};

export default BoxFollower;
