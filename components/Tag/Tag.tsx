import { MouseEvent, useCallback } from "react";

// Import STYLES
import styles from "./Tag.module.scss";

type Props = {
  className?: string;
  children: string;
  theme?: "destructible" | "active";
  onClick?: (tagName: string) => void;
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void;
};

const Tag: React.FC<Props> = ({
  className,
  children,
  theme,
  onClick,
  onClose,
}) => {
  const classNames = [
    styles.tag,
    theme ? styles[`tag_theme_${theme}`] : "",
    className,
  ].join(" ");

  const handleOnClick = useCallback(() => {
    if (onClick != null) {
      onClick(children);
    }
  }, [children]);

  return (
    <div
      onClick={handleOnClick}
      role="button"
      tabIndex={0}
      className={classNames}
      onKeyPress={() => null}
    >
      <span className={styles.tag__text}>
        {theme === "destructible" ? "" : ""}
        {children}
      </span>

      {theme === "destructible" && (
        <button onClick={onClose} type="button" className={styles.tag__close}>
          x
        </button>
      )}
    </div>
  );
};

export default Tag;
