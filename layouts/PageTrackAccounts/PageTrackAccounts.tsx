import { Settings } from "react-slick";
import dynamic from "next/dynamic";

// Import CONTROLLERS
import useTrackAccountsController from "./PageTrackAccounts.controller";

// Import COMPONENTS
import { Container, Flexbox, Button, Text, PopupSimple } from "components";
import { useMemo } from "react";

// Import LAYOUTS
import { PopupAddTrackAccount } from "layouts";
import BoxTrackAccount from "./BoxTrackAccount";

// Import UTILS
import { helpers } from "utils";

// Import STYLES
import styles from "./PageTrackAccounts.module.scss";

type Props = { className?: string; content: Omit<TrackingResponse, "status"> };

const sliderSettings: Settings = {
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: false,
  arrows: false,
  swipeToSlide: true,
  // centerMode: true,
  // centerPadding: "22%",
  dots: true,
  responsive: [
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 10000, // a unrealistically big number to cover up greatest screen resolution
      settings: "unslick",
    },
  ],
};

const SliderSlick = dynamic(() => import("components/SliderSlick"), {
  ssr: false,
});

const PageTrackAccounts: React.FC<Props> = ({ className, content }) => {
  const classNames = [styles.track, className].join(" ");

  // CONTROLLERS
  const {
    states: { trackAccountsList },
    actions: { handleOnClose, loadMoreBestFeedbacks, handleDeleteTrack },
  } = useTrackAccountsController(content);

  const renderTrackList = useMemo(() => {
    return trackAccountsList.map((track, index) => {
      const trackIndexString = helpers.toDoubleNumberString(index);

      return (
        <li key={track.id} className={styles.track__listItem}>
          <BoxTrackAccount
            className={styles.track__listBox}
            trackIndex={trackIndexString}
            data={track}
            onDelete={handleDeleteTrack}
          />
        </li>
      );
    });
  }, [trackAccountsList]);

  const renderTrackListSlider = useMemo(() => {
    const slides = trackAccountsList.map((track, index) => {
      const trackIndexString = helpers.toDoubleNumberString(index);

      return (
        <BoxTrackAccount
          key={track.id}
          className={`${styles.track__listItem} ${
            index === trackAccountsList.length - 1
              ? styles.track__listItemLast
              : ""
          }`}
          trackIndex={trackIndexString}
          data={track}
          onDelete={handleDeleteTrack}
        />
      );
    });

    slides[slides.length] = <div key="-1" />;

    return slides;
  }, [trackAccountsList]);

  return (
    <div className={classNames}>
      <Container className={styles.track__container}>
        <div className={styles.track__content}>
          <Flexbox
            justify="spaceBetween"
            align="center"
            className={styles.track__titleBlock}
          >
            <Text className={styles.track__title} color="greyDark" as="h3">
              Your track accounts
            </Text>

            <Text
              className={styles.track__title_mobile}
              color="greyDark"
              size="xxlg"
              fontWeight="semibold"
            >
              Track accounts
            </Text>

            <Text className={styles.track__titleSub} color="primary" size="sm">
              Add information about person and we will inform you if a story
              about him appears on our website
            </Text>

            <PopupSimple
              trigger={
                <Button className={styles.track__addBtn} theme="transparent">
                  <Text color="orange" fontWeight="semibold">
                    + Add person
                  </Text>
                </Button>
              }
              modal
            >
              {(close) => (
                <PopupAddTrackAccount onClose={handleOnClose} close={close} />
              )}
            </PopupSimple>
          </Flexbox>

          {trackAccountsList.length > 0 ? (
            <ul className={styles.track__list}>{renderTrackList}</ul>
          ) : (
            <Flexbox
              className={styles.track__empty}
              justify="center"
              align="center"
            >
              <Text
                color="moonlight"
                fontWeight="semibold"
                size="xlg"
                className={styles.track__emptyText}
              >
                There is no track accounts yet
              </Text>
            </Flexbox>
          )}
        </div>
      </Container>

      {trackAccountsList.length > 0 && (
        <SliderSlick settings={sliderSettings} className={styles.track__slider}>
          {renderTrackListSlider}
        </SliderSlick>
      )}
    </div>
  );
};

export default PageTrackAccounts;
