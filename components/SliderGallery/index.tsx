import { useState, useRef, useEffect, useLayoutEffect, useMemo } from "react";
import { useSwipeable, EventData } from "react-swipeable";

// Import HOOKS
import { commonHooks } from "hooks";

// Import UTILS
import { helpers } from "utils";

// Import MEDIA
import PrevArrowIcon from "public/icons/icon-slider-prev-arrow.svg";
import NextArrowIcon from "public/icons/icon-slider-next-arrow.svg";

// Import STYLES
import styles from "./SliderGallery.module.scss";

type Props = {
  className?: string;
  slideWidth: number;
  autoplayTimeout?: number;
  pauseOnHover?: boolean;
  images: ExImage[];
};

const SliderGallery: React.FC<Props> = ({
  className,
  slideWidth,
  autoplayTimeout,
  pauseOnHover,
  images,
}) => {
  const classNames = [styles.slider, className].join(" ");
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [sliderWidthState, setSliderWidthState] = useState<number | null>(null);
  const [isInfinityLoop, setIsInfinityLoop] = useState(false);
  const [isTransitionActive, setIsTransitionActive] = useState(false);
  const [dragPositionXState, setDragPositionXState] = useState<null | number>(
    null
  );
  const [isSliderHoverState, setIsSliderHoverState] = useState(false);
  const [isAutoplayActive, setIsAutoplayActive] = useState(false);

  const { useInterval, useMedia } = commonHooks;
  const { debounce } = helpers;

  const slideMediaWidth = useMedia(
    [
      "(max-width: 374px)",
      "(max-width: 479px)",
      "(max-width: 575px)",
      "(max-width: 767px)",
      "(max-width: 991px)",
    ],
    [300, 320, 400, 500, 700],
    slideWidth
  );

  const swipeHandlers = useSwipeable({
    onSwiped: onSwipedHandler,
    onSwiping: onSwipingHandler,
    onSwipedLeft: handleNavNext,
    onSwipedRight: handleNavPrev,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const rootRef = useRef<HTMLDivElement>(null);

  useInterval(
    function autoplayHandler() {
      handleNavNext();
    },
    isAutoplayActive &&
      autoplayTimeout != null &&
      !isTransitionActive &&
      !isSliderHoverState
      ? autoplayTimeout
      : null
  );

  useEffect(
    function setInitialAutoplayState() {
      if (images.length > 2) {
        setIsAutoplayActive(true);
      }
    },
    [images]
  );

  useLayoutEffect(() => {
    if (isInfinityLoop) {
      if (activeSlideIndex === images.length) {
        setActiveSlideIndex(0);
      }

      if (activeSlideIndex === -1) {
        setActiveSlideIndex(images.length - 1);
      }
    }
  }, [isInfinityLoop, activeSlideIndex, images]);

  useEffect(() => {
    if (
      isInfinityLoop &&
      (activeSlideIndex === 0 || activeSlideIndex === images.length - 1)
    ) {
      setIsInfinityLoop(false);
    }
  }, [activeSlideIndex, isInfinityLoop]);

  useEffect(() => {
    function setSliderWidth() {
      setSliderWidthState(rootRef.current!.clientWidth);
    }

    const debouncedFunction = debounce(setSliderWidth, 200);

    setSliderWidth();
    window.addEventListener("resize", debouncedFunction);

    return function cleanListeners() {
      window.removeEventListener("resize", debouncedFunction);
    };
  }, []);

  function onSwipedHandler() {
    setDragPositionXState(null);
  }
  function onSwipingHandler(event: EventData) {
    setDragPositionXState(event.deltaX);
  }

  function handleNavPrev() {
    setIsTransitionActive(true);
    setActiveSlideIndex((prevState) => prevState - 1);
  }
  function handleNavNext() {
    setIsTransitionActive(true);
    setActiveSlideIndex((prevState) => prevState + 1);
  }

  const handleEndTransition = (
    event: React.TransitionEvent<HTMLUListElement>
  ) => {
    if (
      event.propertyName === "transform" &&
      event.target === event.currentTarget
    ) {
      if (activeSlideIndex === images.length || activeSlideIndex === -1) {
        setIsInfinityLoop(true);
      }

      setIsTransitionActive(false);
    }
  };

  function handleSliderHoverOn() {
    setIsSliderHoverState(!!pauseOnHover);
  }

  function handleSliderHoverOut() {
    setIsSliderHoverState(false);
  }

  const getSliderCenterPosition = useMemo(() => {
    if (sliderWidthState != null) {
      if (images.length === 1) {
        return (sliderWidthState - slideMediaWidth) / 2;
      }

      if (images.length === 2) {
        return -slideMediaWidth + (sliderWidthState - slideMediaWidth) / 2;
      }

      return -slideMediaWidth * 2 + (sliderWidthState - slideMediaWidth) / 2;
    }

    return 0;
  }, [images, sliderWidthState, slideMediaWidth]);

  return (
    <div
      onMouseEnter={handleSliderHoverOn}
      onMouseLeave={handleSliderHoverOut}
      ref={rootRef}
      className={classNames}
    >
      <ul
        style={{
          transform: `translateX(${
            -1 * activeSlideIndex * slideMediaWidth -
            (dragPositionXState != null ? dragPositionXState : 0)
          }px)`,
          marginLeft: getSliderCenterPosition,
        }}
        className={`${styles.slider__track} ${
          isInfinityLoop ? "" : styles.slider__track_withTransition
        }`}
        onTransitionEnd={handleEndTransition}
        {...swipeHandlers}
      >
        {/* HEAD IMAGES */}
        {images.length > 2 && (
          <li
            className={`${styles.slider__slide} ${
              activeSlideIndex === -2 ? styles.slider__slide_active : ""
            }`}
            style={{
              width: slideMediaWidth,
            }}
          >
            <div
              className={styles.slider__slideItem}
              style={{
                backgroundImage: `url(${images[images.length - 2].original}`,
              }}
            />
          </li>
        )}
        {images.length > 1 && (
          <li
            className={`${styles.slider__slide} ${
              activeSlideIndex === -1 ? styles.slider__slide_active : ""
            }`}
            style={{
              width: slideMediaWidth,
            }}
          >
            <div
              className={styles.slider__slideItem}
              style={{
                backgroundImage: `url(${images[images.length - 1].original}`,
              }}
            />
          </li>
        )}

        {/* CORE IMAGES */}
        {images.map((image, index) => (
          <li
            key={image.original}
            className={`${styles.slider__slide} ${
              index === activeSlideIndex ? styles.slider__slide_active : ""
            }`}
            style={{
              width: slideMediaWidth,
            }}
          >
            <div
              className={styles.slider__slideItem}
              style={{
                backgroundImage: `url(${image.original})`,
              }}
            />
          </li>
        ))}

        {/* TAIL IMAGES */}
        {images.length > 1 && (
          <li
            className={`${styles.slider__slide} ${
              images.length === activeSlideIndex
                ? styles.slider__slide_active
                : ""
            }`}
            style={{
              width: slideMediaWidth,
            }}
          >
            <div
              className={styles.slider__slideItem}
              style={{
                backgroundImage: `url(${images[0].original}`,
              }}
            />
          </li>
        )}
        {images.length > 2 && (
          <li
            className={`${styles.slider__slide} `}
            style={{
              width: slideMediaWidth,
            }}
          >
            <div
              className={styles.slider__slideItem}
              style={{
                backgroundImage: `url(${images[1].original})`,
              }}
            />
          </li>
        )}
      </ul>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={handleNavPrev}
            className={`${styles.slider__navItem} ${styles.slider__navPrev}`}
            disabled={isTransitionActive}
          >
            <PrevArrowIcon width={29} height={27} />
          </button>
          <button
            type="button"
            onClick={handleNavNext}
            className={`${styles.slider__navItem} ${styles.slider__navNext}`}
            disabled={isTransitionActive}
          >
            <NextArrowIcon width={29} height={27} />
          </button>
        </>
      )}
    </div>
  );
};

export default SliderGallery;
