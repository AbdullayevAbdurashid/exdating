import { useCallback } from "react";

// Import LAYOUTS
import { BoxChatUser } from "layouts";

// Import STYLES
import styles from "./BoxChatUserList.module.scss";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  users?: UserCommon[];
  userChatId?: string | null;
  messages?: {
    id: string;
    conversation: ChatConversation[];
  }[];
  onUserClick?: (id: string) => void;
};

const BoxChatUserList: React.FC<Props> = ({
  className,
  style,
  users,
  userChatId,
  messages,
  onUserClick,
}) => {
  const classNames = [styles.userList, className].join(" ");

  const getChatMessages = useCallback(
    (
      messagesList: {
        id: string;
        conversation: ChatConversation[];
      }[],
      userId: string
    ) => {
      return messagesList.filter((message) => message.id === userId)[0]
        .conversation;
    },
    []
  );

  const getLastMessage = useCallback(
    (userId: string): ChatMessage => {
      const defaultMessage = {
        id: "0",
        self: false,
        text: "",
        time: {
          hour: 10,
          minutes: 24,
        },
      };

      if (messages) {
        const conversation = getChatMessages(messages, userId);

        if (conversation.length > 0) {
          return conversation[0].messages[0];
        }

        return defaultMessage;
      }

      return defaultMessage;
    },
    [messages, getChatMessages]
  );

  const handleUserClick = (id: string) => {
    onUserClick && onUserClick(id);
  };

  return (
    <ul className={classNames} style={style}>
      {users && users.length > 0 ? (
        users.map((user) => (
          <li
            key={user.id}
            className={styles.userList__item}
            onClick={() => handleUserClick(user.id)}
          >
            <BoxChatUser
              isActive={userChatId === user.id}
              user={user}
              isOnline
              message={getLastMessage(user.id)}
            />
          </li>
        ))
      ) : (
        <li className={styles.userList__item}>No contacts</li>
      )}
    </ul>
  );
};

export default BoxChatUserList;
