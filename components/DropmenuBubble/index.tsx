// Import STYLES
import styles from "./DropmenuBubble.module.scss";

type Props = {
  className?: string;
  align?: "left" | "right";
  style?: React.CSSProperties;
};

const DropmenuBubble: React.FC<Props> = ({
  className,
  children,
  align = "right",
  style,
}) => {
  const classNames = [
    styles.dropmenuBubble,
    styles[`dropmenuBubble_align_${align}`],
    className,
  ].join(" ");

  return (
    <div style={style} className={classNames}>
      {children}
    </div>
  );
};

export default DropmenuBubble;
