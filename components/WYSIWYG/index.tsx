/* eslint react/no-danger: "off" */
// Import STYLES
import styles from "./WYSIWYG.module.scss";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  content: string;
};

const WYSIWYG: React.FC<Props> = ({ className, style, content }) => {
  const classNames = [styles.wysiwyg, className].join(" ");

  return (
    <div
      style={style}
      className={classNames}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default WYSIWYG;
