import { useCallback } from "react";

// Import COMPONENTS
import { Button, Flexbox, Text } from "components";

// Import SERVICES
import { serviceHooks } from "hooks";

// Import LAYOUTS
import { Chat, ButtonDropdownSimpleBurger, BoxChatUserList } from "layouts";

// import TEMPLATES
import { BURGER_ITEM_LIST } from "./PageChat.temp";

// Import MEDIA
import CloseIcon from "public/icons/icon-close.svg";

// Import STYLES
import styles from "./PageChat.module.scss";

type Props = {
  className?: string;
  users: UserCommon[];
  messages: ChatMock[];
};

const PageChat: React.FC<Props> = ({ className, users, messages }) => {
  const classNames = [styles.chat, className].join(" ");
  const { useChat } = serviceHooks;
  const {
    isLoading,
    // messages,
    // users,
    selectUserChat,
    userChatId,
    isBlockedMenuActive,
    setIsBlockedMenuActive,
  } = useChat();

  const getUser = useCallback(() => {
    if (users != null && userChatId != null) {
      return users.filter((user) => user.id === userChatId)[0];
    }

    return null;
  }, [users, userChatId]);

  const handleCloseChat = () => {
    selectUserChat(null);
  };

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

  const handleBurgerClick = (id: string) => {
    if (id === "blocked") {
      setIsBlockedMenuActive(true);
    }
  };

  const handleCloseBlockedList = () => {
    setIsBlockedMenuActive(false);
  };

  return (
    <main className={classNames}>
      <div className={styles.chat__container}>
        <div className={styles.chat__sideMenu}>
          <Flexbox
            justify="spaceBetween"
            align="center"
            className={styles.chat__sideMenuHeader}
          >
            <Text
              className={styles.chat__sideMenuHeaderTitle}
              fontWeight="semibold"
              color="greyDark"
            >
              {isBlockedMenuActive ? "Blocked users" : "Messages"}
            </Text>

            <Flexbox>
              <ButtonDropdownSimpleBurger
                width={140}
                itemList={BURGER_ITEM_LIST}
                onOptionClick={handleBurgerClick}
              />

              {isBlockedMenuActive && (
                <Button
                  className={styles.chat__btnCloseBlocked}
                  onClick={handleCloseBlockedList}
                >
                  <CloseIcon />
                </Button>
              )}
            </Flexbox>
          </Flexbox>

          <div className={styles.chat__sideMenuContent}>
            <BoxChatUserList
              users={users}
              userChatId={userChatId}
              messages={messages}
              onUserClick={selectUserChat}
            />

            <BoxChatUserList
              className={`${styles.chat__sideMenuBlockedList} ${
                isBlockedMenuActive
                  ? styles.chat__sideMenuBlockedList_active
                  : ""
              }`}
              users={users}
              messages={messages}
            />
          </div>
        </div>

        <div
          className={`${styles.chat__messages} ${
            userChatId != null ? styles.chat__messages_active : ""
          }`}
        >
          {userChatId == null || messages == null ? (
            <div className={styles.chat__messagesNoChat}>
              <Text color="greyDark" fontWeight="semibold">
                Your messages
              </Text>
              <Text
                color="greyMedium"
                size="sm"
                className={styles.chat__messagesNoChatSubtitle}
              >
                Select dialogue
              </Text>
            </div>
          ) : (
            <Chat
              data={getChatMessages(messages, userChatId)}
              user={getUser()}
              onBackClick={handleCloseChat}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default PageChat;
