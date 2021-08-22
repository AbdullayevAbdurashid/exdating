import React from "react";

// Import STYLES
import styles from "./BoxSimpleRounded.module.scss";

type Props = { className?: string; style?: React.CSSProperties };

const BoxSimpleRounded: React.FC<Props> = ({ className, children, style }) => {
  const classNames = [styles.box, className].join(" ");

  return (
    <div style={style} className={classNames}>
      {children}
    </div>
  );
};

export default BoxSimpleRounded;
