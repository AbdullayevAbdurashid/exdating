import { useMemo } from "react";
import Slider, { Settings } from "react-slick";

// Import STYLES
import styles from "./SliderSlick.module.scss";

type Props = { className?: string; settings?: Settings };

const SliderSlick: React.FC<Props> = ({ className, settings, children }) => {
  const classNames = [styles.slick, className].join(" ");

  const finalSettings = useMemo(() => {
    const defaultSettings: Settings = {
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      dotsClass: styles.slick__dot,
    };

    return {
      ...defaultSettings,
      ...settings,
    };
  }, [settings]);

  return (
    <Slider {...finalSettings} className={classNames}>
      {children}
    </Slider>
  );
};

export default SliderSlick;
