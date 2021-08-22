import { useCallback, useEffect, useMemo, useState } from "react";
import Slider, { Settings } from "react-slick";

// Import CONTEXTS
import { context } from "context";

// Import COMPONENTS
import { Text, SLink } from "components";

// Import layouts
import { BoxTopUser } from "layouts";

// Import HOOKS
import { commonHooks } from "hooks";

// Import UTILS
import { helpers } from "utils";

// Import MEDIA
import ArrowMediumRightIcon from "public/icons/icon-arrow-medium-right.svg";

// Import STYLES
import styles from "./BoxTopUsers.module.scss";

type Props = { className?: string; data: UserTop[]; topUsersCount?: number };

const BoxTopUsers: React.FC<Props> = ({
  className,
  data,
  topUsersCount = 5,
}) => {
  const classNames = [styles.topUsers, className].join(" ");

  // CONTEXTS
  const { useUserContext } = context;
  const {
    user: self,
    actions: { checkSelf },
  } = useUserContext();

  // HOOKS
  const { useDimension } = commonHooks;
  const { width } = useDimension();

  // HELPERS
  const { debounce, formatUserNames } = helpers;

  // STATES
  const [isSlideBumbActive, setIsSlideBumbActive] = useState<boolean>(false);

  const setDumbSlideActive = useCallback(
    debounce(() => {
      console.log("Active!");
      setIsSlideBumbActive(true);
    }, 300),
    []
  );
  const setDumbSlideDisabled = useCallback(
    debounce(() => {
      setIsSlideBumbActive(false);
    }, 300),
    []
  );

  useEffect(() => {
    if (width) {
      if (width <= 400) {
        setDumbSlideActive();
      } else {
        setDumbSlideDisabled();
      }
    }
  }, [width, helpers.debounce]);

  const sliderSettings: Settings = {
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  const renderUserList = useMemo(() => {
    const dataLength =
      topUsersCount <= data.length ? topUsersCount : data.length;

    return data.slice(0, dataLength).map((user, index) => (
      <li className={styles.topUsers__userItem} key={user.id}>
        <SLink href={checkSelf(user.id) ? "/profile" : `/profile/${user.id}`}>
          <BoxTopUser
            user={user}
            stand={index + 1}
            isSelf={self != null && user.id === self.id}
          />
        </SLink>
      </li>
    ));
  }, [data, topUsersCount, checkSelf]);

  const renderUserListSlider = useMemo(() => {
    return data.slice(0, 5).map((user, index) => (
      <SLink key={user.id} href={`/profile/${user.id}`}>
        <BoxTopUser
          user={user}
          stand={index + 1}
          isSelf={self != null && user.id === self.id}
        />
      </SLink>
    ));
  }, [data]);

  return (
    <div className={classNames}>
      <Text
        className={styles.topUsers__heading}
        size="lg"
        fontWeight="bold"
        color="primary"
      >
        Top user of Exdating
      </Text>

      <ul className={styles.topUsers__userList}>{renderUserList}</ul>

      {width && width < 992 && (
        <Slider {...sliderSettings} className={styles.topUsers__slider}>
          {renderUserListSlider}

          {isSlideBumbActive && <div className={styles.topUsers__slideDumb} />}
        </Slider>
      )}

      <SLink
        iconTransition
        className={styles.topUsers__moreLink}
        href="/topusers"
      >
        {({ hoverState }) => (
          <>
            <Text
              fontWeight="semibold"
              color={hoverState ? "hotpink" : "orange"}
              size="sm"
              hoverTransition
            >
              More
            </Text>

            <ArrowMediumRightIcon width={43} height={8} />
          </>
        )}
      </SLink>
    </div>
  );
};

export default BoxTopUsers;
