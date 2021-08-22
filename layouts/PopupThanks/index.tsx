// Import COMPONENTS
import { Text, IconSocial, SLink } from "components";

// Import LAYOUTS
import { WrapperPopup } from "layouts";

// Import MEDIA
import Illustartion from "public/images/illustration-thanks-popup.svg";

// Import TEMPS
import { SOCIAL_LINKS_LIST } from "./PopupThanks.temp";

// Import STYLES
import styles from "./PopupThanks.module.scss";
import { useMemo } from "react";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  onClose: () => void;
};

const PopupThanks: React.FC<Props> = ({ className, style, onClose }) => {
  const classNames = [styles.thanks, className].join(" ");

  const renderSocialItems = useMemo(
    () =>
      SOCIAL_LINKS_LIST.map((item) => (
        <li key={item.id} className={styles.thanks__socialsItem}>
          <SLink href={`#${item.type}`}>
            <IconSocial social={item.type} size="lg" />
          </SLink>
        </li>
      )),
    [SOCIAL_LINKS_LIST]
  );

  return (
    <WrapperPopup onClose={onClose} style={style} className={classNames}>
      <div className={styles.thanks__wrapper}>
        <div className={styles.thanks__boxLeft}>
          <Text className={styles.thanks__title} as="h3" color="primary">
            Thank you for using our social network!
          </Text>

          <Text className={styles.thanks__titleSub} color="greyDark">
            Tell about us on social netwokrs
          </Text>

          <ul className={styles.thanks__socials}>{renderSocialItems}</ul>
        </div>

        <div className={styles.thanks__boxRight}>
          <div className={styles.thanks__illustation}>
            <Illustartion />
          </div>
        </div>
      </div>
    </WrapperPopup>
  );
};

export default PopupThanks;
