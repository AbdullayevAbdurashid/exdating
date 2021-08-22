import React, { useCallback, useMemo, useState } from "react";

// Import COMPONENTS
import { BoxAvatar, Flexbox, SLink, Text, Button } from "components";

// Import UTILS
import { helpers } from "utils";

// Import MEDIA
import LikeIcon from "public/icons/icon-like.svg";
import ChevronDownIcon from "public/icons/icon-chevron-down-custom.svg";

// Import STYLES
import styles from "./BoxComment.module.scss";

type Props = {
  className?: string;
  isAuthor?: boolean;
  isSelf?: boolean;
  data: EComment;
  onReplyToggle?: (replyIdList: UserComment[]) => void;
};

const BoxComment: React.FC<Props> = ({
  className,
  isAuthor,
  isSelf,
  children,
  data,
  onReplyToggle,
}) => {
  const classNames = [styles.comment, className].join(" ");

  const [isReplyActive, setIsReplyActive] = useState(false);

  // UTILS
  const { formatUserNames } = helpers;

  const toggleShowReply = useCallback((idList: UserComment[]) => {
    if (onReplyToggle) {
      onReplyToggle(idList);
    }
    setIsReplyActive((prevState) => !prevState);
  }, []);

  const renderReply = useMemo(
    () =>
      React.Children.map(children, (child, index) => (
        <div
          style={{ animationDelay: `${0.1 * index}s` }}
          className={styles.comment__replyItem}
        >
          {child}
        </div>
      )),
    [children]
  );

  return (
    <Flexbox className={classNames}>
      <BoxAvatar size={41} alt="" src="" className={styles.comment__avatar} />

      <div className={styles.comment__content}>
        <SLink
          href={isSelf ? "/profile" : `/profile/${data.user.id}`}
          className={`${styles.comment__author} ${
            isAuthor ? styles.comment__author_master : ""
          }`}
        >
          <Text
            size="lg"
            color="greyDark"
            fontWeight="semibold"
            className={styles.comment__authorText}
          >
            {formatUserNames(data.user.first_name, data.user.last_name)}
          </Text>
        </SLink>

        <div className={styles.comment__message}>
          <Text
            color="moonlight"
            size="sm"
            className={styles.comment__messageText}
          >
            {data.text}
          </Text>
        </div>

        <Flexbox align="center" className={styles.comment__footer}>
          <Button
            className={`${styles.comment__btnLike} ${styles.comment__footerItem}`}
          >
            <LikeIcon width={16} height={14} />
          </Button>

          {/* {data.reply.length > 0 && (
            <Button
              onClick={() => toggleShowReply(data.reply)}
              className={`${styles.comment__btnShowReply} ${
                styles.comment__footerItem
              } ${isReplyActive ? styles.comment__btnShowReply_active : ""}`}
            >
              <Text
                size="sm"
                color="greyDark"
                className={styles.comment__btnShowReplyText}
              >
                {data.reply.length} reply
              </Text>
              <ChevronDownIcon width={7} height={4} />
            </Button>
          )} */}

          <Button
            theme="transparent"
            className={`${styles.comment__btnReply} ${styles.comment__footerItem}`}
          >
            <Text className={styles.comment__btnReplyText} color="orange">
              Reply
            </Text>
          </Button>
        </Flexbox>

        {children && (
          <div
            className={`${styles.comment__reply} ${
              isReplyActive ? styles.comment__reply_active : ""
            }`}
          >
            {renderReply}
          </div>
        )}
      </div>
    </Flexbox>
  );
};

export default BoxComment;
