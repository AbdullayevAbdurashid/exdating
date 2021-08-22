// Import COMPONENTS
import { BoxAvatar, Flexbox, Text } from "components";

// Import MEDIA
import ArrowIcon from "public/icons/icon-arrow-right.svg";
import AnonymousIcon from "public/icons/icon-anonymous.svg";

// Import STYLES
import styles from "./TooltipAnonymous.module.scss";

type Props = { className?: string };

const TooltipAnonymous: React.FC<Props> = ({ className }) => {
  const classNames = [styles.tooltip, className].join(" ");

  return (
    <div className={classNames}>
      <Flexbox align="center">
        <BoxAvatar alt="" src="" />

        <div className={styles.tooltip__iconArrow}>
          <ArrowIcon width={16} height={8} />
        </div>

        <Flexbox
          justify="center"
          align="center"
          className={styles.tooltip__iconAnonymous}
        >
          <AnonymousIcon width={20} height={20} />
        </Flexbox>
      </Flexbox>

      <Text
        className={styles.tooltip__title}
        color="white"
        singleLine
        fontWeight="semibold"
      >
        What is it?
      </Text>

      <Text size="sm" className={styles.tooltip__description}>
        You remain anonymous, no one will know that you published this post
      </Text>
    </div>
  );
};

export default TooltipAnonymous;
