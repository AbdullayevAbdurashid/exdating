import { useEffect, useState } from "react";
import BounceLoader from "react-spinners/BounceLoader";

// Import CONTROLLERS
import useSectionCommentsController from "./SectionComments.controller";

// Import COMPONENTS
import {
  BoxAvatar,
  Container,
  Flexbox,
  Text,
  Textarea,
  BoxComment,
  Button,
  InputFile,
} from "components";
import { FieldElement } from "react-hook-form";

// Import MEDIA
import ArrowDownIcon from "public/icons/icon-arrow-down.svg";
import SmileIcon from "public/icons/icon-smile.svg";
import ImageIcon from "public/icons/icon-image.svg";
import SendMessageIcon from "public/icons/icon-send-message.svg";

// Import STYLES
import styles from "./SectionComments.module.scss";

type Props = {
  className?: string;
  authorId: number;
  feedbackId: number;
  self: UserSelf | null;
  comments: EComment[];
};

const SectionComments: React.FC<Props> = ({
  className,
  authorId,
  feedbackId,
  comments,
  self,
}) => {
  const classNames = [styles.comments, className].join(" ");

  // CONTROLLERS
  const {
    states: { commentsList, isCanLoadMore },
    form: { register, handleSubmit },
    actions: { handleSendComment },
  } = useSectionCommentsController(feedbackId, comments);

  const isLoading = false;

  const handleChange = () => console.log("handleChange");

  const handleLoadReplies = (repliesIdList: UserComment[]) => {
    // console.log("repliesIdList: ", repliesIdList);
  };

  return (
    <section className={classNames}>
      <Container className={styles.comments__container}>
        <form
          onSubmit={handleSubmit(handleSendComment)}
          className={styles.comments__content}
        >
          <Text size="xlg" color="greyDark" fontWeight="semibold">
            {commentsList.length} comments
          </Text>

          <Flexbox align="center" className={styles.comments__message}>
            <BoxAvatar
              alt=""
              src=""
              size={41}
              className={styles.comments__messageAvatar}
            />

            <Textarea
              fieldClassName={styles.comments__messageTextareaField}
              className={styles.comments__messageTextarea}
              name="message"
              register={register}
              minRows={1}
              placeholder="Your comment"
            >
              <Flexbox
                align="center"
                className={styles.comments__messageTextareaButtons}
              >
                <Button className={styles.comments__messageTextareaButtonsItem}>
                  <SmileIcon width={20} height={20} />
                </Button>

                <InputFile
                  onChange={handleChange}
                  name="commentfile"
                  className={styles.comments__messageTextareaButtonsItem}
                >
                  <ImageIcon width={21} height={16} />
                </InputFile>

                <Button
                  type="submit"
                  className={styles.comments__messageTextareaButtonsItem}
                >
                  <SendMessageIcon width={19} height={17} />
                </Button>
              </Flexbox>
            </Textarea>
          </Flexbox>

          <div className={styles.comments__comments}>
            {isLoading ? (
              <Flexbox justify="center" align="center">
                <BounceLoader size={60} color="#ff6647" />
              </Flexbox>
            ) : commentsList.length > 0 ? (
              commentsList.map((comment) => (
                <BoxComment
                  key={comment.id}
                  className={styles.comments__commentsItem}
                  data={comment}
                  isAuthor={authorId === comment.user.id}
                  isSelf={self != null && self.id === comment.user.id}
                  onReplyToggle={handleLoadReplies}
                >
                  {/* {comment.reply.length > 0
                    ? comment.reply.map((subcomment) => (
                        <BoxComment
                          className={styles.comments__commentsItem}
                          key={subcomment.id}
                          data={subcomment}
                          isAuthor={authorId === subcomment.user.id}
                        />
                      ))
                    : undefined} */}
                </BoxComment>
              ))
            ) : (
              <Flexbox justify="center">
                <Text color="moonlight">There is no comments yet</Text>
              </Flexbox>
            )}
          </div>

          {isCanLoadMore && (
            <Button
              theme="borderedSecondaty"
              className={styles.comments__btnShowMore}
            >
              <Text
                fontWeight="semibold"
                size="sm"
                color="orange"
                className={styles.comments__btnShowMoreText}
              >
                Show more 47
              </Text>

              <ArrowDownIcon width={8} height={9} />
            </Button>
          )}
        </form>
      </Container>
    </section>
  );
};

export default SectionComments;
