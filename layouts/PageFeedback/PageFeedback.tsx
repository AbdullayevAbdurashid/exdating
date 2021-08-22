import dynamic from "next/dynamic";

// Import COMPONENTS
import {
  Container,
  Flexbox,
  Tag,
  Text,
  Button,
  ItemFeedbackStat,
} from "components";

// Import LAYOUTS
import { BoxTopUsers, BoxBestComments } from "layouts";

import NavFeedback from "./NavFeedback/NavFeedback";
import SectionComments from "./SectionComments/SectionComments";
import AccordionAboutPerson from "./AccordionAboutPerson";

// Import CONTROLLERS
import usePageFeedbackController from "./PageFeedback.controller";

// Import MEDIA
import ArrowDownIcon from "public/icons/icon-arrow-down-small.svg";
import CommentIcon from "public/icons/icon-comment.svg";
import DislikeIcon from "public/icons/icon-dislike.svg";
import LikeIcon from "public/icons/icon-like.svg";
import ShareArrowIcon from "public/icons/icon-share-arrow.svg";
import NotDesideIcon from "public/icons/icon-notdeside.svg";
import ViewIcon from "public/icons/icon-view.svg";

// Import STYLES
import styles from "./PageFeedback.module.scss";

const SOCIAL_LIST: SocialTypes[] = ["facebook", "instagram", "twitter"];

export type PageData = {
  feedback: APISucceedResponseWithData<Omit<FeedbackResponse, "status">>;
  topUsers: UserTop[];
  bestComments: ECommentBase[];
  bestFeedbacks: FeedbackBest[];
  selfSubscriptions?: APIResponseWithData<SubscriptionListResponse> | null;
};

type Props = {
  className?: string;
  self: UserSelf | null;
  data: PageData;
};

const GALLERY_IMAGES: ExImage[] = [
  {
    id: "1",
    original: "/images/image-slide-1.jpg",
  },
  {
    id: "2",
    original: "/images/image-slide-2.jpg",
  },
  {
    id: "3",
    original: "/images/image-slide-3.jpg",
  },
];

const SectionBestFeedbacks = dynamic(
  () => import("layouts/SectionBestFeedbacks"),
  {
    ssr: false,
  }
);
const SliderGallery = dynamic(() => import("components/SliderGallery"), {
  ssr: false,
});

const PageFeedback: React.FC<Props> = ({ className, data, self }) => {
  const classNames = [styles.feedback, className].join(" ");

  // CONTROLLERS
  const {
    actions: {
      showMoreFeedbackDescription,
      handleLikeFeedback,
      handleNotDecideFeedback,
      handleDislikeFeedback,
      handleGoToChat,
      handleShowOriginal,
    },
    form: { register },
    states: { isMore, feedback },
  } = usePageFeedbackController(data);

  if (feedback == null) {
    return null;
  }

  return (
    <main className={classNames}>
      <NavFeedback
        onShowOriginal={handleShowOriginal}
        onMessage={handleGoToChat}
        user={feedback.user}
        selfSubscriptions={data.selfSubscriptions}
      />

      <section className={styles.feedback__sFeedback}>
        <Container className={styles.feedback__sFeedbackTitle}>
          <div className={styles.feedback__contentCenter}>
            <Text
              className={styles.feedback__sFeedbackTitleText}
              as="h4"
              color="greyDark"
            >
              {feedback.title}
            </Text>

            {feedback.hashtags.length > 0 && (
              <Flexbox className={styles.feedback__tagBox}>
                {feedback.hashtags.map((tag) => (
                  <Tag
                    key={tag.name}
                    className={styles.feedback__tagBoxItem}
                    theme="active"
                  >
                    {tag.name}
                  </Tag>
                ))}
              </Flexbox>
            )}
          </div>
        </Container>

        {feedback.images.length > 0 && (
          <SliderGallery
            className={styles.feedback__sFeedbackSlider}
            images={GALLERY_IMAGES}
            slideWidth={637}
            autoplayTimeout={2000}
            pauseOnHover
          />
        )}

        <Container className={styles.feedback__sFeedbackMain}>
          <div
            className={`${styles.feedback__contentSide} ${styles.feedback__contentSideLeft}`}
          >
            <BoxTopUsers
              data={data.topUsers}
              className={styles.feedback__topUsers}
              topUsersCount={7}
            />
          </div>

          <div className={styles.feedback__contentCenter}>
            <div className={styles.feedback__personInfo}>
              <AccordionAboutPerson data={feedback} socialData={SOCIAL_LIST} />
            </div>

            <article
              style={{ maxHeight: isMore ? 10000 : 500 }}
              className={styles.feedback__article}
            >
              {/* <WYSIWYG content={FEEDBACK_CONETNT} /> */}
              {feedback.description}
            </article>

            {!isMore && (
              <Button
                theme="transparent"
                className={styles.feedback__btnReadMore}
                onClick={showMoreFeedbackDescription}
              >
                <Text
                  color="gradientAnimated"
                  size="md"
                  fontWeight="semibold"
                  className={styles.feedback__btnReadMoreText}
                >
                  More
                </Text>

                <ArrowDownIcon width={8} height={12} />
              </Button>
            )}

            <Flexbox
              className={styles.feedback__articleFooter}
              align="center"
              justify="spaceBetween"
            >
              {self && self.id !== feedback.user_id ? (
                <Flexbox
                  className={`${styles.feedback__articleFooterItem} ${styles.feedback__articleFooterActions}`}
                  align="center"
                  justify="spaceBetween"
                >
                  <Button
                    onClick={handleLikeFeedback}
                    className={styles.feedback__btnLike}
                    theme="sunshine"
                  >
                    <LikeIcon width={16} height={14} />{" "}
                    <Text
                      color="white"
                      size="sm"
                      className={styles.feedback__btnLikeText}
                    >
                      {feedback.like ? "Unlike" : "Like"}
                    </Text>
                  </Button>

                  <Button
                    className={styles.feedback__btnNotDecide}
                    theme="grey"
                    onClick={handleNotDecideFeedback}
                  >
                    <NotDesideIcon viewBox="0 0 15 15" width={17} height={17} />
                  </Button>

                  <Button
                    onClick={handleDislikeFeedback}
                    className={styles.feedback__btnDislike}
                    theme="grey"
                  >
                    <DislikeIcon viewBox="0 0 18 15" width={19} height={15} />
                  </Button>
                </Flexbox>
              ) : (
                <div />
              )}

              <Flexbox
                className={`${styles.feedback__articleFooterItem} ${styles.feedback__articleFooterStatMenu}`}
                align="center"
                justify="spaceBetween"
              >
                <ItemFeedbackStat
                  className={styles.feedback__statItemView}
                  text={
                    feedback.views_count != null
                      ? feedback.views_count.toString()
                      : "NA"
                  }
                  color="greyDark"
                  icon={
                    <ViewIcon
                      className={styles.feedback__statItemViewIcon}
                      width={19}
                      height={19}
                    />
                  }
                />

                <Flexbox>
                  <ItemFeedbackStat
                    className={`${styles.feedback__statItem} ${styles.feedback__statItemLike}`}
                    text={
                      feedback.likes_count != null
                        ? feedback.likes_count.toString()
                        : "NA"
                    }
                    color="moonlight"
                    icon={
                      <LikeIcon
                        className={styles.feedback__statItemLikeIcon}
                        width={16}
                        height={14}
                      />
                    }
                    iconType="like"
                  />
                  <ItemFeedbackStat
                    className={styles.feedback__statItem}
                    text={
                      feedback.not_decide_count != null
                        ? feedback.not_decide_count.toString()
                        : "NA"
                    }
                    color="moonlight"
                    icon={<NotDesideIcon width={15} height={15} />}
                    iconType="notdecide"
                  />
                  <ItemFeedbackStat
                    className={`${styles.feedback__statItem} ${styles.feedback__statItemDislike}`}
                    text={
                      feedback.dislikes_count != null
                        ? feedback.dislikes_count.toString()
                        : "NA"
                    }
                    color="moonlight"
                    icon={<DislikeIcon width={20} height={26} />}
                    iconType="dislike"
                  />
                  <ItemFeedbackStat
                    className={styles.feedback__statItem}
                    text={feedback.comments_count.toString()}
                    color="moonlight"
                    icon={<CommentIcon width={14} height={14} />}
                    iconType="comments"
                  />
                  <Button
                    theme="transparent"
                    className={styles.feedback__btnShare}
                  >
                    <ShareArrowIcon width={10} height={7} />
                    <Text
                      className={styles.feedback__btnShareText}
                      color="orange"
                    >
                      Share
                    </Text>
                  </Button>
                </Flexbox>
              </Flexbox>
            </Flexbox>
          </div>

          <div
            className={`${styles.feedback__contentSide} ${styles.feedback__contentSideRight}`}
          >
            <BoxBestComments
              data={data.bestComments}
              className={styles.feedback__bestComments}
            />
          </div>
        </Container>
      </section>

      <SectionComments
        self={self}
        authorId={feedback.user_id}
        feedbackId={feedback.id}
        comments={feedback.comments}
      />

      <SectionBestFeedbacks
        data={data.bestFeedbacks}
        className={styles.feedback__sBestFeedbacks}
      />
    </main>
  );
};

export default PageFeedback;
