// Import COMPONENTS
import { DropmenuBubble, Text, Flexbox } from "components";

// Import LAYOUTS
import { BoxNotification, WrapperScrollbar } from "layouts";

// Import MEDIA
import BellIcon from "public/icons/icon-bell.svg";

// Import STYLES
import styles from "./PopupNotifications.module.scss";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  date: Date;
  notificationList: [];
};

const PopupNotifications: React.FC<Props> = ({
  className,
  style,
  date,
  notificationList,
}) => {
  const classNames = [styles.popup, className].join(" ");

  return (
    <DropmenuBubble style={style} className={classNames}>
      {notificationList && notificationList.length > 0 ? (
        <div className={styles.popup__content}>
          <WrapperScrollbar className={styles.popup__contentWrapper}>
            <Text
              color="moonlight"
              size="md"
              className={styles.popup__contentTitle}
            >
              Notifications
            </Text>

            {/* <ul className={styles.popup__contentList}>
              {notificationList.map((notification) => (
                <li key={notification.id} className={styles.popup__contentItem}>
                  <BoxNotification currentDate={date} data={notification} />
                </li>
              ))}
              <li className={styles.popup__contentLast}>
                <Text size="sm" color="moonlight" singleLine>
                  You scrolled to the end
                </Text>
              </li>
            </ul> */}
          </WrapperScrollbar>
        </div>
      ) : (
        <Flexbox
          direction="column"
          justify="center"
          align="center"
          className={styles.popup__contentEmpty}
        >
          <BellIcon viewBox="0 0 10 13" width={21} height={22} />
          <Text
            className={styles.popup__contentEmptyText}
            color="moonlight"
            size="md"
          >
            You have no notifications
          </Text>
        </Flexbox>
      )}
    </DropmenuBubble>
  );
};

export default PopupNotifications;
