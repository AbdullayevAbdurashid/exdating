import dynamic from "next/dynamic";
import en from '../../locales/en.json';
import ru from '../../locales/ru.json';
import { useRouter } from 'next/router';

// Import CONTROLLERS
import usePageMainController from "./PageMain.controller";
//translation


// Import COMPONENTS
import {
  Text,
  SLink,
  Container,
  Button,
  Flexbox,
  BoxFeedback,
  PopupSimple,
} from "components";

// Import LAYOUTS
import BlockUnlockBestExdating from "./BlockUnlockBestExdating";
import {
  ButtonLoadMore,
  BoxTopUsers,
  BoxBestComments,
  PopupThanks,
  PopupAccountActivated,
} from "layouts";

// Import MEDIA
import ArrowLongRightIcon from "public/icons/icon-arrow-long-right.svg";
import ArrowVeryLongRightIcon from "public/icons/icn-arrow-verylong-right.svg";

// Import STYLES
import styles from "./PageMain.module.scss";
import { useEffect, useState } from "react";

const SectionBestFeedbacks = dynamic(
  () => import("layouts/SectionBestFeedbacks"),
  {
    ssr: false,
  }
);

type Props = {
  className?: string;
  data: {
    topusers: UserTop[];
    bestFeedbacks: FeedbackBest[];
    allFeedbacks: APIResponseWithData<FeedbacksAllResponse>;
    commentsBest: ECommentBase[];
  };
};


const PageMain: React.FC<Props> = ({ className, data }) => {
  const classNames = [styles.main, className].join(" ");
  const { bestFeedbacks, allFeedbacks, commentsBest } = data;

  //Language
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : ru;
  // CONTROLLERS
  const {
    actions: { handleRouteAddFeedback, handleLoadMoreAllFeedbacks },
    states: { self, isCanLoadMoreAllFeedbacks, allFeedbackList },
  } = usePageMainController(allFeedbacks);

  // TODO remove in  production
  const [isActivatedPopupState, setIsActivatedPopupState] = useState(false);

  // useEffect(() => {
  //   setIsActivatedPopupState(data.accountActivated);
  // }, [data.accountActivated]);

  useEffect(() => {
    console.log("Main page data: ", data);
  }, [data]);

  return (
    <main className={classNames}>
      <section className={styles.mainWelcome}>
        <Container className={styles.mainWelcome__container}>
          <Text
            size="xmd"
            color="white"
            className={styles.mainWelcome__preheader}
          >
            Read Feedbacks. Write Feedbacks.
          </Text>
          <Text
            className={styles.mainWelcome__title}
            as="h1"
            color="white"
            center
          >
            {t.bannerPage}          </Text>

          <SLink
            className={styles.mainWelcome__addFeedback}
            href={self == null ? "/login" : "/addfeedback"}
          >
            <>
              <Text
                className={styles.mainWelcome__addFeedbackText}
                size="xxlg"
                fontWeight="semibold"
                color="gradientAnimated"
              >
                Add feedback
              </Text>
              <ArrowLongRightIcon
                className={styles.mainWelcome__addFeedbackIcon}
                width={54}
                height={8}
              />
            </>
          </SLink>
        </Container>
      </section>

      <SectionBestFeedbacks
        className={styles.mainBFeedbacks}
        data={bestFeedbacks}
      >
        <Button
          onClick={handleRouteAddFeedback}
          theme="gradient"
          className={styles.mainBFeedbacks__addBtn}
        >
          <Text
            color="white"
            size="sm"
            fontWeight="semibold"
            className={styles.mainBFeedbacks__addBtnText}
          >
            + Add your feedback
          </Text>
        </Button>
      </SectionBestFeedbacks>

      <section className={styles.mainAFeedbacks}>
        <Container>
          <Text color="primary" as="h3">
            All feedbacks
          </Text>

          <Flexbox className={styles.mainAFeedbacks__content}>
            <Flexbox className={styles.mainAFeedbacks__feedbacksWrapper}>
              {allFeedbackList && allFeedbackList.length > 0 ? (
                <Flexbox className={styles.mainAFeedbacks__feedbacks}>
                  {allFeedbackList.map((feedback) => (
                    <BoxFeedback
                      key={feedback.id}
                      content={feedback}
                      className={styles.mainAFeedbacks__feedback}
                    />
                  ))}
                </Flexbox>
              ) : (
                <Flexbox
                  className={styles.mainAFeedbacks__feedbacksNoFeedbacks}
                  align="center"
                  justify="center"
                >
                  <Text size="lg" color="moonlight">
                    No feedbacks found
                  </Text>
                </Flexbox>
              )}

              {isCanLoadMoreAllFeedbacks && (
                <ButtonLoadMore
                  className={styles.mainAFeedbacks__moreBtn}
                  onClick={handleLoadMoreAllFeedbacks}
                />
              )}
            </Flexbox>

            <Flexbox
              direction="column"
              className={styles.mainAFeedbacks__sideContent}
            >
              {self == null && <BlockUnlockBestExdating />}

              <BoxTopUsers
                data={data.topusers}
                className={
                  self != null
                    ? undefined
                    : styles.mainAFeedbacks__sideContentBox
                }
              />

              <BoxBestComments
                className={styles.mainAFeedbacks__sideContentBox}
                data={commentsBest || []}
              />
            </Flexbox>
          </Flexbox>
        </Container>
      </section>

      <section className={styles.mainUpgrade}>
        <Container>
          <div className={styles.mainUpgrade__box}>
            <Text as="h3" color="white" className={styles.mainUpgrade__title}>
              Let&apos;s upgrade the world
            </Text>

            <Text
              className={styles.mainUpgrade__paragraph}
              as="p"
              color="white"
              size="md"
            >
              Exdating is a feedback platform open to everyone. Share your
              experiences to help others make better choices, and help companies
              up their game.
            </Text>
          </div>

          <div
            className={`${styles.mainUpgrade__box} ${styles.mainUpgrade__boxBtnBox}`}
          >
            <SLink
              className={styles.mainUpgrade__boxBtn}
              href={self == null ? "/login" : "/addfeedback"}
            >
              <>
                <Text
                  className={styles.mainUpgrade__boxBtnText}
                  size="xxlg"
                  fontWeight="semibold"
                  color="gradientAnimated"
                >
                  Get started
                </Text>
                <ArrowVeryLongRightIcon
                  className={styles.mainWelcome__addFeedbackIcon}
                  width={88}
                  height={8}
                />
              </>
            </SLink>
          </div>
        </Container>
      </section>

      <PopupSimple
        className="popup-fullscreen-mobile"
        open={isActivatedPopupState}
        modal
      >
        {(close) => <PopupThanks onClose={close} />}
      </PopupSimple>
      {/* {(close) => <PopupAccountActivated onClose={close} />} */}
    </main>
  );
};

export default PageMain;
