// Import COMPONENTS
import { BoxSimpleRounded, SLink, Text } from "components";

// Import UTILS
import { helpers } from "utils";

// Import MEDIA
import QuoteIcon from "public/icons/icon-quote-right.svg";
import ArrowIcon from "public/icons/icon-arrow-right-small.svg";

// Import STYLES
import styles from "./BoxComment.module.scss";

type Props = { className?: string; data: ECommentBase };

const BoxComment: React.FC<Props> = ({ className, data }) => {
  const classNames = [styles.commentBox, className].join(" ");

  return (
    <BoxSimpleRounded className={classNames}>
      <div className={styles.commentBox__top}>
        <div className={styles.commentBox__quoteIcon}>
          <QuoteIcon width={23} height={17} />
        </div>

        <Text
          className={styles.commentBox__comment}
          color="greyDark"
          fontWeight="semibold"
        >
          {helpers.lessString(data.text, 114)}
        </Text>
      </div>

      <SLink
        className={styles.commentBox__link}
        href={`/feedback/${data.feedback_id}`}
      >
        <Text
          className={styles.commentBox__linkText}
          color="orange"
          size="sm"
          italic
        >
          {data.feedback.title}
        </Text>

        <ArrowIcon width={28} height={8} />
      </SLink>
    </BoxSimpleRounded>
  );
};

export default BoxComment;
