import { useMemo } from "react";
import { formatDistance } from "date-fns";

// Import COMPONENTS
import { Text, BoxAvatar, Flexbox } from "components";

// Import LAYOUTS
import { LinkFirebold } from "layouts";

// Import UTILS
import { NotificationEnum } from "utils/enums";

// Import STYLES
import styles from "./BoxNotification.module.scss";

type Props = {
  className?: string;
  data: any; // TODO create tytpe for notifications
  currentDate: Date;
};

const BoxNotification: React.FC<Props> = ({ className, data, currentDate }) => {
  const classNames = [styles.notification, className].join(" ");

  const renderNotificationContent = useMemo(() => {
    switch (data.type) {
      case NotificationEnum.Followed:
        return (
          <>
            <LinkFirebold href={`/profile/${data.user.id}`}>
              {data.user.name.first} {data.user.name.last}
            </LinkFirebold>

            <Text inline> start followed you</Text>
          </>
        );
      case NotificationEnum.FeedbackTrack:
        return (
          <>
            <Text inline>Found a </Text>
            <LinkFirebold href={`/feedback/${data.feedback.id}`}>
              feedback
            </LinkFirebold>
            <Text inline> with a track account </Text>
            <LinkFirebold href={`/profile/${data.user.id}`}>
              {data.user.name.first} {data.user.name.last}
            </LinkFirebold>
          </>
        );
      case NotificationEnum.Liked:
        return (
          <>
            <LinkFirebold href={`/profile/${data.user.id}`}>
              {data.user.name.first} {data.user.name.last}
            </LinkFirebold>

            <Text inline> liked your </Text>

            <LinkFirebold href={`/feedback/${data.feedback.id}`}>
              feedback
            </LinkFirebold>
          </>
        );
      default:
        break;
    }
    return "This is dynamic content";
  }, [data]);

  return (
    <Flexbox className={classNames}>
      <div className={styles.notification__avatar}>
        <BoxAvatar alt="" size={43} src={data.user.avatar} />
      </div>

      <div className={styles.notification__content}>
        <div className={styles.notification__message}>
          {renderNotificationContent}
        </div>

        <div className={styles.notification__date}>
          <Text
            className={styles.notification__dateText}
            color="moonlight"
            size="sm"
          >
            <span>{formatDistance(currentDate, new Date(data.date))} ago</span>
          </Text>
        </div>
      </div>
    </Flexbox>
  );
};

export default BoxNotification;
