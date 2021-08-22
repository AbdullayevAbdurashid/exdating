// Import COMPONENTS
import {
  BoxAvatar,
  Flexbox,
  Text,
  InputFile,
  Button,
  PopupSimple,
} from "components";

// Import LAYOUTS
import {
  ButtonDropdownSimpleBurger,
  BoxChatMessage,
  WrapperScrollbar,
  PopupDeleteChatConfirmation,
} from "layouts";

// Import TEMPLATES
import { BURGER_ITEM_LIST } from "./Chat.temp";

// Import MEDIA
import ImageIcon from "public/icons/icon-image.svg";
import SmileIcon from "public/icons/icon-smile.svg";
import SendMessageIcon from "public/icons/icon-send-message.svg";
import BackArrowIcon from "public/icons/icon-arrow-right.svg";

// Import STYLES
import styles from "./Chat.module.scss";
import { useState, useRef, useEffect, useMemo } from "react";

type Props = {
  className?: string;
  data: ChatConversation[] | null;
  user: UserCommon | null;
  onBackClick: () => void;
};

const USELESS_KEYS_LIST = [
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
  "End",
  "Home",
  "PageUp",
  "PageDown",
  "Alt",
  "Control",
  "GroupNext",
  "NumLock",
  "CapsLock",
  "ScrollLock",
  "Pause",
  "Meta",
  "ContextMenu",
  "F1",
  "F2",
  "F3",
  "F4",
  "F5",
  "F6",
  "F7",
  "F8",
  "F9",
  "F10",
  "F11",
  "F12",
  // "Enter",
];

const Chat: React.FC<Props> = ({ className, data, user, onBackClick }) => {
  const classNames = [styles.chat, className].join(" ");

  const [textareaHeight, setTextareaHeight] = useState<number>(22);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaHeight === 0) {
      const scrollHeight =
        textareaRef.current!.scrollHeight > 142
          ? 142
          : textareaRef.current!.scrollHeight;
      setTextareaHeight(scrollHeight);
    }
  }, [textareaHeight]);

  const handleChange = () => console.log("handleChange");
  const handleMessageType = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    const { key } = event;

    if (key === "Enter") {
      if (!event.shiftKey) {
        event.preventDefault();
        sendMessage();
      }
    }

    const filteredList = USELESS_KEYS_LIST.filter((item) => item === key);

    if (filteredList.length === 0) {
      setTextareaHeight(0);
    }
  };

  function sendMessage() {
    console.log("SEND MESSAGE!!");
  }

  const renderConversation = useMemo(() => {
    if (data && data.length > 0) {
      return data.map((conversation) => {
        return (
          <div
            key={conversation.date.date.toString()}
            className={styles.chat__messagesBox}
          >
            <div className={styles.chat__messagesDate}>
              <Text
                className={styles.chat__messagesDateText}
                color="moonlight"
                size="xsm"
                fontWeight="semibold"
              >
                {conversation.date.date}.{conversation.date.month}.
                {conversation.date.year}
              </Text>
            </div>

            <ul className={styles.chat__messagesList}>
              {conversation.messages.map((message, index) => (
                <li
                  key={message.id}
                  className={`${styles.chat__messagesItem} ${
                    message.self ? styles.chat__messagesItem_self : ""
                  }`}
                >
                  <BoxChatMessage
                    text={message.text}
                    isSelf={message.self}
                    time={message.time}
                    isLast={index === conversation.messages.length - 1}
                  />
                </li>
              ))}
            </ul>
          </div>
        );
      });
    }

    return (
      <div className={styles.chat__messagesEmpty}>
        <Text color="greyDark" fontWeight="semibold">
          No messages
        </Text>
      </div>
    );
  }, [data]);

  const handleClickMainBurgerOption = (type: string) => {
    if (type === "delete") {
      setConfirmDelete(true);
    }
  };

  const handleCloseChatDeleteConfirmation = () => {
    setConfirmDelete(false);
  };

  const handleConfirmChatDelete = () => {
    console.log("DELETE CHAT!");
    setConfirmDelete(false);
  };

  return (
    <div className={classNames}>
      <Flexbox
        justify="spaceBetween"
        align="center"
        className={styles.chat__header}
      >
        <div className={styles.chat__headerUser}>
          <Button onClick={onBackClick} className={styles.chat__headerBackBtn}>
            <BackArrowIcon />
          </Button>

          <BoxAvatar size={24} src={user == null ? "" : user.avatar} alt="" />

          <Text className={styles.chat__headerUserText} fontWeight="semibold">
            {user != null ? (
              <>
                <span>{user.name.first} </span>
                <span>{user.name.last}</span>
              </>
            ) : (
              <span>Unknown user</span>
            )}
          </Text>
        </div>

        <ButtonDropdownSimpleBurger
          align="right"
          itemList={BURGER_ITEM_LIST}
          width={140}
          onOptionClick={handleClickMainBurgerOption}
        />
      </Flexbox>

      <div className={styles.chat__messages}>
        <div className={styles.chat__messagesWrapper}>
          <WrapperScrollbar className={styles.chat__messagesInner} type="thin">
            {renderConversation}
            <div className={styles.chat__messagesDumb}>&nbsp;</div>
          </WrapperScrollbar>
        </div>
      </div>

      <div className={styles.chat__actions}>
        <InputFile
          onChange={handleChange}
          name="commentfile"
          className={styles.chat__actionsFile}
        >
          <ImageIcon width={21} height={16} />
        </InputFile>

        <textarea
          ref={textareaRef}
          placeholder="Write a message..."
          className={styles.chat__actionsTextarea}
          name="message"
          onKeyDown={handleMessageType}
          style={{ maxHeight: textareaHeight, height: textareaHeight }}
        />

        <Button className={styles.chat__actionsSmiles}>
          <SmileIcon width={20} height={20} />
        </Button>
        <Button
          onClick={sendMessage}
          className={styles.chat__actionsSendMessage}
        >
          <SendMessageIcon width={19} height={17} />
        </Button>
      </div>

      <PopupSimple
        className="popup-fullscreen-mobile"
        open={confirmDelete}
        modal
      >
        {() => (
          <PopupDeleteChatConfirmation
            onCancel={handleCloseChatDeleteConfirmation}
            onConfirm={handleConfirmChatDelete}
          />
        )}
      </PopupSimple>
    </div>
  );
};

export default Chat;
