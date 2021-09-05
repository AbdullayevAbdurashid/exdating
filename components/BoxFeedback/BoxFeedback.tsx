import { useMemo } from "react";
//Import Language 
import en from '../../locales/en.json';
import ru from '../../locales/ru.json';
import { useRouter } from 'next/router';

// import COMPONENTS
import { SLink, ButtonIcon, Text, BoxAvatar, Button } from "components";

// Import CONTEXT
import { context } from "context";

// Import UTILS
import { helpers } from "utils";

// Import STYLES
import styles from "./BoxFeedback.module.scss";

// Import ICONS
import CommentIcon from "public/icons/icon-comment.svg";
import DislikeIcon from "public/icons/icon-dislike.svg";
import LikeIcon from "public/icons/icon-like.svg";
import NotDesideIcon from "public/icons/icon-notdeside.svg";
import ArrowMediumRightIcon from "public/icons/icon-arrow-medium-right.svg";

type Props = {
  className?: string;
  compactMode?: boolean;
  avatarSize?: number;
  content: FeedbackBest | FeedbackSearch;
  isDraft?: boolean;
};

const BoxFeedback: React.FC<Props> = ({
  className,
  compactMode,
  avatarSize,
  content,
  isDraft,
}) => {
  const classNames = [
    styles.feedbackBox,
    compactMode ? styles.feedbackBox_compactMode : "",
    className,
  ].join(" ");
  const { user_id } = content;


  // CONTEXTS
  const { useUserContext } = context;
  const {
    actions: { checkSelf },
  } = useUserContext();

  // UTILS
  const { lessString, formatUserNames } = helpers;

  const handleEditFeedback = () => {
    router.push("/addfeedback");
  };

  const getProfileLink = useMemo(() => {
    if (checkSelf(user_id)) {
      return "/profile";
    }

    return `/profile/${user_id}`;
  }, [user_id]);


  const router = useRouter();
  const { locale } = router;
  //Translation function
  const t = locale === 'en' ? en : ru;
  return (
    <article className={classNames}>
      <div className={styles.feedbackBox__header}>
        <div
          className={`${styles.feedbackBox__headerImg} ${content.image == null ||
            (Array.isArray(content.image) && content.image.length === 0)
            ? styles.feedbackBox__headerImg_default
            : ""
            }`}
        >
          {content.image != null && (
            <img
              src={
                Array.isArray(content.image)
                  ? `${process.env.REMOTE}/${content.image[0].url}`
                  : `${process.env.REMOTE}/${content.image.url}`
              }
              alt=""
            />
          )}
        </div>
        <div className={styles.feedbackBox__headerAvatar}>
          <BoxAvatar
            src={
              content.user && content.user.avatar_url
                ? `${process.env.REMOTE}/${content.user.avatar_url}`
                : ""
            }
            alt={
              content.user && content.user.first_name
                ? content.user.first_name
                : ""
            }
          />
        </div>
      </div>

      <div className={styles.feedbackBox__body}>
        <div className={styles.feedbackBox__bodyWrapper}>
          <Text className={styles.feedbackBox__bodyAuthor}>
            {content.is_anonymous ? (
              <Text color="greyMedium" fontWeight="semibold">{`${lessString(
                formatUserNames(
                  content.user ? content.user.first_name : null,
                  content.user ? content.user.last_name : null,
                  content.is_anonymous
                ),
                compactMode ? 44 : 50
              )}`}</Text>
            ) : (
              <SLink href={getProfileLink}>
                {({ hoverState }) => (
                  <Text
                    className={styles.feedbackBox__bodyAuthorText}
                    inline
                    size={compactMode ? "md" : "xlg"}
                    color="orange"
                    fontWeight="semibold"
                    underline={hoverState}
                  >
                    {`${lessString(
                      formatUserNames(
                        content.user ? content.user.first_name : null,
                        content.user ? content.user.last_name : null,
                        content.is_anonymous
                      ),
                      compactMode ? 44 : 50
                    )}`}
                  </Text>
                )}
              </SLink>
            )}

            <Text
              className={styles.feedbackBox__bodyAuthorFeedback}
              size={compactMode ? "md" : "xlg"}
              inline
              color="greyLight"
            >
              {" "}
              {t.feebacks.def}{" "}
            </Text>

            <SLink href={`/feedback/${content.id}`}>
              {({ hoverState }) => (
                <Text
                  className={styles.feedbackBox__bodyTitle}
                  as={compactMode ? "p" : "h6"}
                  size={compactMode ? "md" : undefined}
                  color="primary"
                  fontWeight="semibold"
                  underline={hoverState}
                  inline
                >
                  {`${lessString(content.title, compactMode ? 52 : 88)}`}
                </Text>
              )}
            </SLink>
          </Text>

          <Text
            className={styles.feedbackBox__bodyDescription}
            as="p"
            color={compactMode ? "primary" : "greyLight"}
            size="sm"
          >
            {content.preview}
          </Text>

          <div className={styles.feedbackBox__bodyAvatar}>
            <BoxAvatar
              size={avatarSize != null ? avatarSize : 45}
              src={
                content.user && content.user.avatar_url
                  ? `${process.env.REMOTE}/${content.user.avatar_url}`
                  : ""
              }
              alt={
                content.user && content.user.first_name
                  ? content.user.first_name
                  : ""
              }
            />
          </div>
        </div>
      </div>

      <div className={styles.feedbackBox__footer}>
        <div className={styles.feedbackBox__footerWrapper}>
          {isDraft ? (
            <>
              <div className={styles.feedbackBox__footerCreateDate}>
                <Text size="sm" color="greyDark">
                  {content.created_at}
                </Text>
              </div>

              <Button
                className={styles.feedbackBox__footerEditBtn}
                theme="bordered"
                onClick={handleEditFeedback}
              >
                <Text
                  className={styles.feedbackBox__footerEditBtnText}
                  fontWeight="semibold"
                  color="orange"
                  size="sm"
                >
                  {t.feebacks.edit}
                </Text>
              </Button>
            </>
          ) : (
            <>
              <div className={styles.feedbackBox__footerInfo}>
                <ButtonIcon
                  className={styles.feedbackBox__footerInfoItem}
                  classNameIcon={styles.feedbackBox__footerInfoLikeIcon}
                  text={
                    content.likes_count != null
                      ? content.likes_count.toString()
                      : "NA"
                  }
                  textColor="orange"
                  icon={<LikeIcon width={16} height={14} />}
                  hoverEffect="opacity"
                />
                {!compactMode && (
                  <>
                    <ButtonIcon
                      className={styles.feedbackBox__footerInfoItem}
                      classNameIcon={
                        styles.feedbackBox__footerInfoNotdecideIcon
                      }
                      text={
                        content.not_decide_count != null
                          ? content.not_decide_count.toString()
                          : "NA"
                      }
                      icon={<NotDesideIcon width={15} height={15} />}
                      hoverEffect="colorAccent"
                    />
                    <ButtonIcon
                      className={`${styles.feedbackBox__footerInfoItem} ${styles.feedbackBox__footerInfoDislike}`}
                      classNameIcon={styles.feedbackBox__footerInfoDislikeIcon}
                      text={
                        content.dislikes_count != null
                          ? content.dislikes_count.toString()
                          : "NA"
                      }
                      icon={<DislikeIcon width={18} height={15} />}
                      hoverEffect="colorAccent"
                    />
                  </>
                )}
                <ButtonIcon
                  className={styles.feedbackBox__footerInfoItem}
                  classNameIcon={styles.feedbackBox__footerInfoCommentIcon}
                  text={
                    content.comments_count != null
                      ? content.comments_count.toString()
                      : "NA"
                  }
                  icon={<CommentIcon width={14} height={14} />}
                  hoverEffect="colorAccent"
                />
              </div>

              <SLink
                href={`/feedback/${content.id}`}
                iconTransition
                className={styles.feedbackBox__footerOpenLink}
              >
                <ArrowMediumRightIcon width={43} height={8} />
              </SLink>
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default BoxFeedback;
