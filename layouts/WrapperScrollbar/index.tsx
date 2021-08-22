import React from "react";

// Import STYLES
import styles from "./WrapperScrollbar.module.scss";

type Props = { className?: string; type?: "thin"; style?: React.CSSProperties };

const WrapperScrollbar: React.FC<Props> = ({
  className,
  children,
  type,
  style,
}) => {
  const classNames = [
    styles.wrapper,
    type ? styles[`wrapper_type_${type}`] : "",
    className,
  ].join(" ");

  return (
    <div style={style} className={classNames}>
      {children}
    </div>
  );
};

export default WrapperScrollbar;
