import { useMemo } from "react";

// Import ICONS
import YoutubeIcon from "../../public/icons/social/youtube.svg";
import TwittereIcon from "../../public/icons/social/twitter.svg";
import FacebookIcon from "../../public/icons/social/facebook.svg";
import InstagramIcon from "../../public/icons/social/instagram.svg";
import AppleIcon from "../../public/icons/social/apple.svg";
import GoogleIcon from "../../public/icons/social/google.svg";
import VkIcon from "../../public/icons/social/vk.svg";
import InstagramColoredIcon from "../../public/icons/social/instagram-colored.svg";

// Import STYLES
import styles from "./IconSocial.module.scss";

type Props = {
  className?: string;
  social: SocialTypes | "default";
  size?: "sm" | "md" | "smd" | "lg";
  coloredIcons?: boolean;
  style?: React.CSSProperties;
};

const IconSocial: React.FC<Props> = ({
  className,
  social,
  size,
  coloredIcons,
  style,
}) => {
  const classNames = [
    styles.iconSocial,
    `${styles[`iconSocial_type_${social}`]}`,
    size ? styles[`iconSocial_size_${size}`] : "",
    coloredIcons ? styles.iconSocial_coloredIcons : "",
    className,
  ].join(" ");

  const renderIcon = useMemo(() => {
    switch (social) {
      case "youtube":
        return <YoutubeIcon width={15} height={11} />;
      case "twitter":
        return <TwittereIcon width={13} height={11} />;
      case "facebook":
        return <FacebookIcon width={7} height={13} />;
      case "instagram":
        return coloredIcons ? (
          <InstagramColoredIcon width={14} height={13} />
        ) : (
          <InstagramIcon width={14} height={13} />
        );
      case "apple":
        return <AppleIcon width={11} height={13} />;
      case "google":
        return <GoogleIcon width={11} height={11} />;
      case "vk":
        return <VkIcon width={17} height={10} />;
      default:
        return null;
    }
  }, [social, coloredIcons]);

  return (
    <div style={style} className={classNames}>
      {renderIcon}
    </div>
  );
};

export default IconSocial;
