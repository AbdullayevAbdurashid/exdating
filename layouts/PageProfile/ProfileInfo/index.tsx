// Import COMPONENTS
import { Flexbox, Text, SLink, IconSocial } from "components";
import { CSSProperties } from "react";
import { format } from "date-fns";

// Import STYLES
import styles from "./ProfileInfo.module.scss";

type Props = {
  className?: string;
  data: UserProfile | UserSelf;
  type?: "desktop" | "mobile" | "semimobile";
  style?: CSSProperties;
};

const ProfileInfo: React.FC<Props> = ({
  className,
  data,
  type = "desktop",
  style,
}) => {
  const classNames = [
    styles.profileInfo,
    styles[`profileInfo_${type}`],
    className,
  ].join(" ");

  return (
    <div className={classNames} style={style}>
      <div className={styles.profileInfo__stat}>
        <Flexbox
          justify="spaceBetween"
          className={styles.profileInfo__statItem}
        >
          <Text size="sm" color="moonlight">
            Feedbacks
          </Text>
          <Text size="md" color="greyDark">
            {data.feedbacks_count}
          </Text>
        </Flexbox>

        <Flexbox
          justify="spaceBetween"
          className={styles.profileInfo__statItem}
        >
          <Text size="sm" color="moonlight">
            Comments
          </Text>
          <Text size="md" color="greyDark">
            {data.comments_count}
          </Text>
        </Flexbox>

        <Flexbox
          justify="spaceBetween"
          className={styles.profileInfo__statItem}
        >
          <Text size="sm" color="moonlight">
            Followers
          </Text>
          <Text size="md" color="greyDark">
            {data.my_subscribers_count}
          </Text>
        </Flexbox>

        <Flexbox
          justify="spaceBetween"
          className={`${styles.profileInfo__statItem} ${styles.profileInfo__statItemLast}`}
        >
          <Text size="sm" color="moonlight">
            Following
          </Text>
          <Text size="md" color="greyDark">
            {data.subscribers_count}
          </Text>
        </Flexbox>

        <Text
          size="sm"
          color="moonlight"
          className={styles.profileInfo__statRegDate}
        >
          <span>Joined in </span>
          <span>{format(new Date(data.created_at), "MMMM y")}</span>
        </Text>
      </div>

      <div className={styles.profileInfo__contacts}>
        <SLink href={`mailto:${data.public_email}`}>
          <Text
            size="sm"
            color="greyDark"
            className={styles.profileInfo__emailText}
          >
            {data.public_email}
          </Text>
        </SLink>
      </div>

      {/* <ul className={styles.profileInfo__socialList}>
        {data.socialLinks?.map((social) => (
          <li key={social.name} className={styles.profileInfo__socialItem}>
            <SLink href={`/profile#${social.name}`}>
              <IconSocial social={social.name} />
            </SLink>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default ProfileInfo;
