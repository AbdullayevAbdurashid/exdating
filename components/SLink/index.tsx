import { useState } from "react";
import Link, { LinkProps } from "next/link";

// Import STYLES
import styles from "./SLink.module.scss";

type FunctionalChildren = (param: { hoverState: boolean }) => React.ReactNode;

type Props = {
  className?: string;
  sizeless?: boolean;
  children: FunctionalChildren | React.ReactNode;
  iconTransition?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

const isFunction = (arg: Function | React.ReactNode): arg is Function =>
  typeof arg === "function";

const SLink: React.FC<LinkProps & Props> = ({
  href,
  className,
  sizeless,
  children,
  iconTransition,
  onClick,
  ...otherProps
}) => {
  const classNames = [
    styles.link,
    `${sizeless ? styles.link_sizeless : ""}`,
    `${iconTransition ? styles.link_iconTransition : ""}`,
    className,
  ].join(" ");

  const [hoverState, setHoverState] = useState<boolean>(false);

  const handleHoverOn = () => {
    setHoverState(true);
  };
  const handleHoverOut = () => {
    setHoverState(false);
  };

  return (
    <Link href={href} passHref {...otherProps}>
      <a
        onMouseEnter={handleHoverOn}
        onMouseLeave={handleHoverOut}
        tabIndex={0}
        role="link"
        className={classNames}
        onClick={onClick}
        onKeyPress={() => {}}
      >
        {isFunction(children) ? children({ hoverState }) : children}
      </a>
    </Link>
  );
};

export default SLink;
