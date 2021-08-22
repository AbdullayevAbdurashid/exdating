import { useEffect } from "react";
import dynamic from "next/dynamic";

// import COMPONENTS
import { Container, Text } from "components";

// Import LAYOUT
import { ButtonLoadMore, BoxComment } from "layouts";

// Import CONTROLLERS
import useLastCommentsPageController from "./PageLastComments.controller";

// Import STYLES
import styles from "./PageLastComments.module.scss";

type Props = {
  className?: string;
  data: {
    comments: APIResponseWithData<BestCommentsResponse>;
    bestFeedbacks: FeedbackBest[];
  };
};

const SectionBestFeedbacks = dynamic(
  () => import("layouts/SectionBestFeedbacks"),
  {
    ssr: false,
  }
);

const PageLastComments: React.FC<Props> = ({ className, data }) => {
  const classNames = [styles.lastComments, className].join(" ");
  const { bestFeedbacks, comments } = data;

  // CONTROLLERS
  const {
    actions: { handleLoadMoreLastComments },
    states: { lastCommentsData, isCanLoadMoreLastComments },
  } = useLastCommentsPageController(comments);

  useEffect(() => {
    console.log("Last comments: ", comments);
  }, [comments]);

  return (
    <div className={classNames}>
      <section className={styles.lastComments__section}>
        <Container>
          <Text
            className={styles.lastComments__title}
            center
            color="greyDark"
            as="h3"
          >
            Last comments
          </Text>

          {lastCommentsData != null && (
            <ul className={styles.lastComments__comments}>
              {lastCommentsData.map((lastCommentsList) =>
                lastCommentsList.status
                  ? lastCommentsList.payload.data.map((lastComment) => (
                      <li
                        key={lastComment.id}
                        className={styles.lastComments__commentsItem}
                      >
                        <BoxComment data={lastComment} />
                      </li>
                    ))
                  : null
              )}
            </ul>
          )}

          {isCanLoadMoreLastComments && (
            <ButtonLoadMore
              className={styles.lastComments__moreBtn}
              onClick={handleLoadMoreLastComments}
            />
          )}
        </Container>
      </section>

      <SectionBestFeedbacks
        className={styles.lastComments__bestFeedbacks}
        data={bestFeedbacks}
      />
    </div>
  );
};

export default PageLastComments;
