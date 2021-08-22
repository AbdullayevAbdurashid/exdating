// Import STYLES
import styles from "./BurgerSimple.module.scss";

type Props = { className?: string; style?: React.CSSProperties };

const BurgerSimple: React.FC<Props> = ({ className, style }) => {
  const classNames = [styles.burger, className].join(" ");

  return (
    <div style={style} className={classNames}>
      <span className={styles.burger__dots}>
        <span className={styles.burger__dot} />
      </span>
    </div>
  );
};

export default BurgerSimple;
