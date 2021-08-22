import React, { Fragment, useEffect, useMemo } from "react";
import BounceLoader from "react-spinners/BounceLoader";

// Import API
import { TABS } from "api/comments";

// Import CONTROLLERS
import useBestCommentsController from "./BoxBestComments.controller";

// Import COMPONENTS
import { Text, Tabs, SLink, Flexbox } from "components";

// Import TEMPLATES
import { TAB_DATA } from "./BoxBestComments.templates";

// Import MEDIA
import ArrowMediumRightIcon from "public/icons/icon-arrow-medium-right.svg";

// Import TYPES

// Import STYLES
import styles from "./BoxBestComments.module.scss";

type Props = {
  className?: string;
  data: ECommentBase[];
  maxComments?: number;
};

const BoxBestComments: React.FC<Props> = ({
  className,
  data,
  maxComments = 3,
}) => {
  const classNames = [styles.bestComments, className].join(" ");

  // CONTROLLERS
  const {
    actions: { changeTab },
    states: { tabType, bestCommentsTabs, isFetching },
  } = useBestCommentsController(data, maxComments);

  const handleChangeTab = (value: { id: TABS; name: React.ReactNode }) => {
    changeTab(value.id);
  };

  return (
    <div className={classNames}>
      <Text
        className={styles.bestComments__title}
        size="lg"
        fontWeight="bold"
        color="primary"
      >
        Best comments
      </Text>

      <Tabs
        className={styles.bestComments__tabs}
        content={TAB_DATA}
        onChange={handleChangeTab}
      >
        {bestCommentsTabs.map((commentTab) => (
          <Fragment key={commentTab.name}>
            {commentTab.comments.length === 0 && isFetching ? (
              <Flexbox
                justify="center"
                align="center"
                className={styles.bestComments__noDataWrapper}
              >
                <BounceLoader size={40} color="#ff6647" />
              </Flexbox>
            ) : commentTab.comments.length === 0 ? (
              <Flexbox
                justify="center"
                align="center"
                className={styles.bestComments__noDataWrapper}
              >
                <Text color="moonlight" size="md">
                  No comments
                </Text>
              </Flexbox>
            ) : (
              commentTab.comments.map((comment) => (
                <div key={comment.id} className={styles.bestComments__comment}>
                  <Text
                    className={styles.bestComments__commentHeading}
                    size="sm"
                    fontWeight="semibold"
                    color="primary"
                    singleLine
                  >
                    {comment.feedback.title}
                  </Text>

                  <Text
                    className={styles.bestComments__commentText}
                    size="sm"
                    color="greyLight"
                  >
                    {comment.text}
                  </Text>

                  <SLink
                    className={styles.bestComments__moreLink}
                    href={`/feedback/${comment.feedback_id}`}
                    iconTransition
                  >
                    {({ hoverState }) => (
                      <>
                        <Text
                          color={hoverState ? "hotpink" : "orange"}
                          hoverTransition
                          className={styles.bestComments__moreLinkText}
                        >
                          Read more
                        </Text>

                        <ArrowMediumRightIcon width={43} height={8} />
                      </>
                    )}
                  </SLink>
                </div>
              ))
            )}
          </Fragment>
        ))}
      </Tabs>
    </div>
  );
};

export default BoxBestComments;
