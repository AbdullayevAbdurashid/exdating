// Import COMPONENETS
import { Text, BoxAvatar, Flexbox, Button, SLink } from "components";

// Import UTILS
import { helpers } from "utils";

// Import IMAGES
import StarIcon from "public/icons/icon-star.svg";
import NavPointerIcon from "public/icons/icon-nav-pointer.svg";

// Import STYLES
import styles from "./BoxTopUser.module.scss";
import { useCallback } from "react";

type Props = {
  className?: string;
  user: UserTop;
  stand: number;
  isSelf: boolean;
  type?: "compact" | "normal";
  onSubscribe?: (userId: number) => void;
  subBtnText?: string;
};

const BoxTopUser: React.FC<Props> = ({
  className,
  user,
  stand,
  isSelf,
  type = "compact",
  onSubscribe,
  subBtnText,
}) => {
  const classNames = [
    styles.topUser,
    styles[`topUser_${type}`],
    className,
  ].join(" ");

  // UTILS
  const { formatUserNames, formatLocation } = helpers;

  const handleSubscribe = useCallback(() => {
    if (onSubscribe) {
      onSubscribe(user.id);
    }
  }, [user, onSubscribe]);

  return (
    <div className={classNames}>
      <div
        className={`${styles.topUser__stand} ${
          type === "normal" && stand === 1 ? styles.topUser__stand_colored : ""
        }`}
      >
        {stand === 1 ? (
          <StarIcon width={12} height={12} viewBox="0 0 12 12" />
        ) : (
          <Text
            fontWeight="semibold"
            size="sm"
            color={type === "normal" ? "white" : "greyLight"}
          >
            {stand}
          </Text>
        )}
      </div>

      <Flexbox className={styles.topUser__content}>
        <BoxAvatar
          src={
            user.avatar_url == null
              ? ""
              : `${process.env.REMOTE}/${user.avatar_url}`
          }
          alt=""
          size={type === "normal" ? 84 : 40}
        />

        <Flexbox
          direction="column"
          justify="center"
          className={styles.topUser__contentWritten}
        >
          {type === "normal" ? (
            <SLink href={isSelf ? "/profile" : `/profile/${user.id}`}>
              <Text
                size="xlg"
                fontWeight="bold"
                color="greyDark"
                center
                style={{ width: "100%" }}
                className={styles.topUser__usernameText}
              >
                {formatUserNames(user.first_name, user.last_name)}
              </Text>
            </SLink>
          ) : (
            <Text
              singleLine
              size="sm"
              fontWeight="semibold"
              color="primary"
              style={{ width: "100%" }}
              className={styles.topUser__usernameText}
            >
              {formatUserNames(user.first_name, user.last_name)}
            </Text>
          )}

          {type === "normal" && (
            <div className={styles.topUser__location}>
              <NavPointerIcon width={12} height={12} />

              <Text
                size="sm"
                color="moonlight"
                className={styles.topUser__locationText}
              >
                {formatLocation(
                  user.country != null ? user.country.name : null,
                  user.city_iso_code
                )}
              </Text>
            </div>
          )}

          <Text
            center={type === "normal"}
            className={styles.topUser__feedbacks}
            size="sm"
            color={type === "normal" ? "greyDark" : "greyLight"}
          >
            {`${user.feedbacks_count} feedbacks`}
          </Text>
        </Flexbox>
      </Flexbox>

      {type === "normal" && onSubscribe && (
        <Button
          theme="borderedGradientSecondary"
          className={styles.topUser__subscribeBtn}
          onClick={handleSubscribe}
        >
          <Text
            color="gradientAnimated"
            fontWeight="semibold"
            className={styles.topUser__subscribeBtnText}
          >
            {subBtnText || "Subscribe"}
          </Text>
        </Button>
      )}
    </div>
  );
};

export default BoxTopUser;
