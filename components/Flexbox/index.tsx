// Import STYLES
import { FC } from "react";
import styles from "./Flexbox.module.scss";

type Props = {
  className?: string;
  justify?: "center" | "start" | "end" | "spaceAround" | "spaceBetween";
  align?: "center" | "end" | "start" | "stretch";
  direction?: "column" | "columnReverse" | "row" | "rowReverse";
  wrap?: "wrap" | "wrapReverse" | "nowrap";
};

const Flexbox: FC<Props> = ({
  className,
  children,
  justify,
  align,
  direction,
  wrap,
}) => {
  const classNames = [
    styles.flexbox,
    justify ? `${styles[`flexbox_justify_${justify}`]}` : "",
    align ? `${styles[`flexbox_align_${align}`]}` : "",
    direction ? `${styles[`flexbox_direction_${direction}`]}` : "",
    wrap ? `${styles[`flexbox_wrap_${wrap}`]}` : "",
    className,
  ].join(" ");

  return <div className={classNames}>{children}</div>;
};

export default Flexbox;
