// Import COMPONENTS
import { Flexbox, Text } from "components";

// Import LAYOUTS
import { BoxFollower, WrapperPopup, WrapperScrollbar } from "layouts";

// Import MEDIA
import SearchIcon from "public/icons/icon-search.svg";

// Import STYLES
import styles from "./PopupFollowers.module.scss";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  onClose: () => void;
};

const PopupFollowers: React.FC<Props> = ({ className, style, onClose }) => {
  const classNames = [styles.followers, className].join(" ");

  return (
    <WrapperPopup onClose={onClose} style={style} className={classNames}>
      <Flexbox
        align="center"
        justify="spaceBetween"
        className={styles.followers__title}
      >
        <Text as="h4" color="greyDark" className={styles.followers__titleText}>
          Followers
        </Text>

        <div className={styles.followers__titleFilter}>
          <SearchIcon width={11} height={11} />

          <input
            placeholder="Search"
            type="text"
            className={styles.followers__titleFilterInput}
          />
        </div>
      </Flexbox>

      <div className={styles.followers__content}>
        <WrapperScrollbar className={styles.followers__contentInner}>
          <div className={styles.followers__contentItem}>
            <BoxFollower
              avatarSrc="/avatars/avatar1_84x84.png"
              name="Peter Rollins"
            />
          </div>
          <div className={styles.followers__contentItem}>
            <BoxFollower
              avatarSrc="/avatars/avatar2_84x84.png"
              name="Maria Drake"
            />
          </div>
          <div className={styles.followers__contentItem}>
            <BoxFollower
              avatarSrc="/avatars/avatar3_84x84.png"
              name="Peter Rollins"
            />
          </div>
          <div className={styles.followers__contentItem}>
            <BoxFollower
              avatarSrc="/avatars/avatar4_84x84.png"
              name="Peter Rollins"
            />
          </div>
          <div className={styles.followers__contentItem}>
            <BoxFollower
              avatarSrc="/avatars/avatar5_84x84.png"
              name="John Doe"
            />
          </div>
          <div className={styles.followers__contentItem}>
            <BoxFollower name="John Doe" />
          </div>
          <div className={styles.followers__contentItem}>
            <BoxFollower name="John Doe" />
          </div>
          <div className={styles.followers__contentItem}>
            <BoxFollower name="John Doe" />
          </div>
          <div className={styles.followers__contentItem}>
            <BoxFollower name="John Doe" />
          </div>
          <div className={styles.followers__contentItem}>
            <BoxFollower name="John Doe" />
          </div>
          <div className={styles.followers__contentItem}>
            <BoxFollower name="John Doe" />
          </div>
          <div className={styles.followers__contentItem}>
            <BoxFollower name="John Doe" />
          </div>
          <div className={styles.followers__contentItem}>
            <BoxFollower name="John Doe" />
          </div>
          <div className={styles.followers__contentItem}>
            <BoxFollower name="John Doe" />
          </div>
          <div className={styles.followers__contentItem}>
            <BoxFollower name="John Doe" />
          </div>
          <div className={styles.followers__contentItem}>
            <BoxFollower name="John Doe" />
          </div>
          <div className={styles.followers__contentItem}>
            <BoxFollower name="John Doe" />
          </div>
          <div className={styles.followers__contentItem}>
            <BoxFollower name="John Doe" />
          </div>
          <div className={styles.followers__contentItem}>
            <BoxFollower name="John Doe" />
          </div>
          <div className={styles.followers__contentItem}>
            <BoxFollower name="John Doe" />
          </div>
          <div className={styles.followers__contentItem}>
            <BoxFollower name="John Doe" />
          </div>
          <div className={styles.followers__contentItem}>
            <BoxFollower name="John Doe" />
          </div>
          <div className={styles.followers__contentItem}>
            <BoxFollower name="John Doe" />
          </div>
          <div className={styles.followers__contentItem}>
            <BoxFollower name="John Doe last" />
          </div>
        </WrapperScrollbar>
      </div>
    </WrapperPopup>
  );
};

export default PopupFollowers;
