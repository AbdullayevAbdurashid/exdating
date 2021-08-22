// Import COMPONENTS
import { BoxAvatar, Text, SLink } from "components";

// Import STYLES
import styles from "./BoxChatUser.module.scss";

type Props = {
  className?: string;
  user: UserCommon;
  isOnline: boolean;
  isActive: boolean;
  message: ChatMessage;
};

const BoxChatUser: React.FC<Props> = ({
  className,
  user,
  isOnline,
  isActive,
  message,
}) => {
  const classNames = [
    styles.chatUser,
    isActive ? styles.chatUser_active : "",
    className,
  ].join(" ");

  return (
    <div className={classNames}>
      <div className={styles.chatUser__container}>
        <div className={styles.chatUser__avatar}>
          <BoxAvatar alt="" src={user.avatar} size={44} />

          {isOnline && <div className={styles.chatUser__avatarStatus} />}
        </div>

        <div className={styles.chatUser__content}>
          <SLink href="#">
            {({ hoverState }) => (
              <Text
                fontWeight="semibold"
                color="primary"
                className={styles.chatUser__contentName}
                underline={hoverState}
              >
                <span>{user.name.first} </span>
                <span>{user.name.last}</span>
              </Text>
            )}
          </SLink>

          <Text
            color={message.self ? "orange" : "moonlight"}
            size="sm"
            className={styles.chatUser__contentMessage}
            singleLine
          >
            {message.text}
          </Text>
        </div>

        <div className={styles.chatUser__date}>
          <Text color="moonlight" size="xsm">
            15.07.20
          </Text>
        </div>
      </div>

      {isActive && <div className={styles.chatUser__activeArrow} />}
    </div>
  );
};

export default BoxChatUser;
