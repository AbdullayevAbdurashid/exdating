import React from "react";

// Import STYLES
import styles from "./Container.module.scss";

type Props = { className?: string };

const Container: React.FC<Props> = ({ className, children }) => {
  const classNames = [styles.container, className].join(" ");

  return <div className={classNames}>{children}</div>;
};

export default Container;
