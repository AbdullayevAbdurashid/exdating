// Import COMPONENTS
import { SLink } from "components";

// Import STYLES
import styles from "./LinkFirebold.module.scss";

type Props = {
  className?: string;
  href: string;
};

const LinkFirebold: React.FC<Props> = ({ className, href, children }) => {
  const classNames = [styles.link, className].join(" ");

  return (
    <SLink className={classNames} href={href}>
      {children}
    </SLink>
  );
};

export default LinkFirebold;
