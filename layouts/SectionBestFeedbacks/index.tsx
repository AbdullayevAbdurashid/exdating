import { useRef, useState } from "react";
import Slider, { Settings } from "react-slick";

// Import HOOKS
import { commonHooks } from "hooks";

// Import COMPONENTS
import { Container, Flexbox, Text, Button, BoxFeedback } from "components";

// Import MEDIA
import NextArrowIcon from "public/icons/icon-slider-next-arrow.svg";
import PrevArrowIcon from "public/icons/icon-slider-prev-arrow.svg";

// Import STYLES
import styles from "./SectionBestFeedbacks.module.scss";
//Import Language 
import en from '../../locales/en.json';
import ru from '../../locales/ru.json';
import { useRouter } from 'next/router';


type Props = { className?: string; data: FeedbackBest[] };

const SectionBestFeedbacks: React.FC<Props> = ({
  className,
  data,
  children,
}) => {
  const classNames = [styles.bestFeedbacks, className].join(" ");

  const [slideIndexState, setSlideIndexState] = useState<number>(0);

  const slickSlider = useRef<Slider>(null);

  const slidesToShow = commonHooks.useMedia(
    ["(max-width: 685px)", "(max-width: 991px)", "(max-width: 1199px)"],
    [2, 3, 4],
    5
  );

  const sliderSettings: Settings = {
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    infinite: false,
    arrows: false,
    beforeChange: (current, next) => setSlideIndexState(next),
    // responsive: [
    //   {
    //     breakpoint: 1454,
    //     settings: {
    //       slidesToShow: 4,
    //     },
    //   },
    //   {
    //     breakpoint: 1199,
    //     settings: {
    //       slidesToShow: 3,
    //     },
    //   },
    // ],
  };

  const handleNextSlide = () => {
    slickSlider.current!.slickNext();
  };

  const handlePrevSlide = () => {
    slickSlider.current!.slickPrev();
  };

  //Geting locale
  const router = useRouter();
  const { locale } = router;
  //Translation function
  const t = locale === 'en' ? en : ru;
  return (
    <section className={classNames}>
      <Container>
        <Flexbox
          align="center"
          justify="spaceBetween"
          className={styles.bestFeedbacks__header}
        >
          <Text color="primary" as="h3">
            {t.feebacks.best}
          </Text>
          {data.length > 0 && (
            <div className={styles.bestFeedbacks__headerNav}>
              <Button
                style={{ opacity: slideIndexState === 0 ? "0.6" : "1" }}
                onClick={handlePrevSlide}
                theme="transparent"
                className={styles.bestFeedbacks__headerNavItem}
              >
                <PrevArrowIcon width={30} height={26} />
              </Button>

              <Button
                style={{
                  opacity:
                    slideIndexState ===
                      (data ? data.length : 0) + 1 - slidesToShow
                      ? "0.6"
                      : "1",
                }}
                onClick={handleNextSlide}
                theme="transparent"
                className={styles.bestFeedbacks__headerNavItem}
              >
                <NextArrowIcon width={30} height={26} />
              </Button>
            </div>
          )}
        </Flexbox>

        {data.length > 0 ? (
          <div className={styles.bestFeedbacks__feedbacks}>
            <Slider ref={slickSlider} {...sliderSettings}>
              {data.length > 0 &&
                data.map((feedback) => (
                  <BoxFeedback
                    key={feedback.id}
                    compactMode
                    className={styles.bestFeedbacks__feedbackSlide}
                    avatarSize={34}
                    content={feedback}
                  />
                ))}
              <div className={styles.bestFeedbacks__feedbackSlideDumb} />
            </Slider>
          </div>
        ) : (
          <Flexbox
            justify="center"
            align="center"
            className={styles.bestFeedbacks__feedbacksNoFeedback}
          >
            <Text color="moonlight" size="lg">
              {t.feebacks.noFound}            </Text>
          </Flexbox>
        )}

        {children}
      </Container>
    </section>
  );
};

export default SectionBestFeedbacks;
