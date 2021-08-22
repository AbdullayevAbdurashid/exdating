// Import MEDIA
import QuoteIcon from "public/icons/icon-quote-right.svg";

// Import STYLES
import styles from "./BoxQuote.module.scss";

type Props = { className?: string };

const BoxQuote: React.FC<Props> = ({ className, children }) => {
  const classNames = [styles.quote, className].join(" ");

  return (
    <div className={classNames}>
      <div className={styles.quote__icon}>
        <QuoteIcon width={23} height={17} />
      </div>

      <span className={styles.quote__text}>{children}</span>
    </div>
  );
};

export default BoxQuote;
