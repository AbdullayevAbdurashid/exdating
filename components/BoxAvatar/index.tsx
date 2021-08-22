// Import STYLES
import styles from "./BoxAvatar.module.scss";

type Props = {
  className?: string;
  src?: string | null;
  alt: string;
  size?: number;
};

const BoxAvatar: React.FC<Props> = ({ className, src, alt, size }) => {
  const classNames = [styles.avatar, className].join(" ");

  return (
    <div style={{ width: size, height: size }} className={classNames}>
      {src && src.length > 0 && <img src={src} alt={alt} />}
    </div>
  );
};

export default BoxAvatar;
