import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";

// Import CONTROLLERS
import usePageProfileController from "./PageProfile.controller";

// Import COMPONENTS
import {
  BoxAvatar,
  BoxSimpleRounded,
  Button,
  Container,
  BoxFeedback,
  Flexbox,
  Text,
  TabsSimple,
  PopupSimple,
} from "components";

// Import LAYOUTS
import { ButtonDropdownSimpleBurger, PopupFollowers } from "layouts";
import ProfileInfo from "./ProfileInfo";

// Import MEDIA
import LocationIcon from "public/icons/icon-nav-pointer.svg";

// Import CONSTANTS
import { COMMON } from "const";

// Import STYLES
import styles from "./PageProfile.module.scss";

type Props = {
  className?: string;
  userData: UserProfile | UserSelf;
  isMyProfile?: boolean;
  selfSubscriptions?: APIResponseWithData<SubscriptionListResponse>;
};

const {
  COOKIES: { TOKEN },
} = COMMON;

const PageProfile: React.FC<Props> = ({
  className,
  userData,
  isMyProfile,
  selfSubscriptions,
}) => {
  const classNames = [
    styles.profile,
    isMyProfile ? styles.profile_self : "",
    className,
  ].join(" ");

  // CONTROLLERS
  const {
    actions: { handleSubscribeToUser },
    states: { isSubscribed },
  } = usePageProfileController(userData, selfSubscriptions, isMyProfile);

  const [isFollowersOpen, setIsFollowersOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    console.log("userData: ", userData);
  }, [userData]);

  const handleRouteEditProfile = () => {
    router.push("/editprofile");
  };

  const handleLogout = () => {
    destroyCookie(null, TOKEN);
    router.push("/login");
  };

  const handleChatLogout = () => {
    if (isMyProfile) {
      handleLogout();
    } else {
      router.push("/chat");
    }
  };

  const handleClickEditSubscribe = () => {
    if (isMyProfile) {
      router.push("/editprofile");
    } else {
      handleSubscribeToUser(userData.id);
      // setIsSubscribedState((prevState) => !prevState);
      // setIsFollowersOpen(true);
    }
  };

  const handleCloseFollowers = () => {
    setIsFollowersOpen(false);
  };

  const handleRouteAddFeedback = () => {
    router.push("/addfeedback");
  };

  return (
    <div className={classNames}>
      {isMyProfile && (
        <Container className={styles.profile__myProfileContainer}>
          <div className={styles.profile__myProfile}>
            <Text
              color="greyDark"
              as="h4"
              className={styles.profile__myProfileTitle}
            >
              Your profile
            </Text>

            <Flexbox
              className={styles.profile__myProfileButtons}
              align="center"
            >
              <Button
                onClick={handleRouteEditProfile}
                theme="gradient"
                className={styles.profile__myProfileBtn}
              >
                <Text
                  color="white"
                  size="sm"
                  fontWeight="semibold"
                  className={styles.profile__myProfileBtnText}
                >
                  Edit Profile
                </Text>
              </Button>

              <Button
                theme="bordered"
                className={styles.profile__myProfileBtn}
                onClick={handleLogout}
              >
                <Text
                  color="orange"
                  size="sm"
                  fontWeight="semibold"
                  className={styles.profile__myProfileBtnText}
                >
                  Log out
                </Text>
              </Button>
            </Flexbox>
          </div>
        </Container>
      )}

      <Container className={styles.profile__container}>
        <div className={styles.profile__info}>
          <BoxSimpleRounded className={styles.profile__infoBox}>
            <Flexbox className={styles.profile__infoGeneral}>
              <BoxAvatar
                alt=""
                src={`${process.env.REMOTE}/${userData.avatar_url}`}
                size={84}
              />

              <div className={styles.profile__infoGeneralTexts}>
                <Text
                  singleLine
                  color="orange"
                  size="sm"
                  className={styles.profile__infoGeneralTag}
                >
                  {userData.login}
                </Text>
                <Text
                  singleLine
                  size="xlg"
                  color="greyDark"
                  fontWeight="bold"
                  className={styles.profile__infoGeneralName}
                >
                  <span>{userData.first_name} </span>
                  <span>{userData.last_name}</span>
                </Text>

                {(userData.country_iso_code || userData.city_iso_code) && (
                  <Text
                    size="sm"
                    color="moonlight"
                    className={styles.profile__infoGeneralLocation}
                  >
                    <LocationIcon width={12} height={12} />
                    <span className={styles.profile__infoGeneralLocationText}>
                      {userData.country_iso_code}, {userData.city_iso_code}
                    </span>
                  </Text>
                )}
              </div>

              {!isMyProfile && (
                <ButtonDropdownSimpleBurger
                  width={116}
                  itemList={[
                    { id: "complain", color: "greyDark", text: "Complain" },
                    { id: "unbanned", color: "orange", text: "Unbanned" },
                  ]}
                  className={styles.profile__infoGeneralBurger}
                />
              )}
            </Flexbox>

            <Text
              color="greyDark"
              size="sm"
              className={styles.profile__infoDescription}
            >
              {userData.about_me}
            </Text>

            <Flexbox
              justify="spaceBetween"
              className={styles.profile__infoBtnBox}
            >
              <Button
                theme="bordered"
                className={styles.profile__infoBtnMessage}
                onClick={handleChatLogout}
              >
                <Text fontWeight="semibold" color="orange" size="sm">
                  {isMyProfile ? "Log out" : "Send message"}
                </Text>
              </Button>

              <Button
                theme="gradient"
                className={styles.profile__infoBtnSubscribe}
                onClick={handleClickEditSubscribe}
              >
                <Text fontWeight="semibold" color="white" size="sm">
                  {isMyProfile
                    ? "Edit profile"
                    : isSubscribed
                    ? "Unsubscribe"
                    : "+ Subscribe"}
                </Text>
              </Button>

              <PopupSimple
                closeOnDocumentClick
                onClose={handleCloseFollowers}
                open={isFollowersOpen}
                className="fullheight"
              >
                {(close) => <PopupFollowers onClose={close} />}
              </PopupSimple>
            </Flexbox>

            <ProfileInfo
              data={userData}
              // className={`${styles.profile__infoBlock} ${
              //   userData.banStatus ? styles.profile__infoBlock_banned : ""
              // }`}
              className={`${styles.profile__infoBlock}`}
            />
          </BoxSimpleRounded>

          {!isMyProfile && (
            <div className={styles.profile__infoControl}>
              <Button
                theme="transparent"
                className={styles.profile__infoControlBtn}
              >
                <Text size="sm" color="moonlight">
                  Complain
                </Text>
              </Button>

              <Text inline color="moonlight" size="sm">
                {" "}
                /{" "}
              </Text>

              <Button
                theme="transparent"
                className={styles.profile__infoControlBtn}
              >
                <Text size="sm" color="moonlight">
                  Banned
                </Text>
              </Button>
            </div>
          )}
        </div>

        <Flexbox
          direction="column"
          // justify={userData.banStatus ? "center" : "start"}
          // align={userData.banStatus ? "center" : "start"}
          className={styles.profile__feedbacks}
        >
          {userData.banStatus ? (
            <>
              <div className={styles.profile__bannedMessage}>
                <Text color="moonlight" size="md" fontWeight="bold">
                  You have added this user to the blacklist
                </Text>
              </div>

              <BoxSimpleRounded className={styles.profile__bannedStats}>
                <ProfileInfo
                  data={userData}
                  className={styles.profile__bannedStatsInfo}
                  type="semimobile"
                />
              </BoxSimpleRounded>
            </>
          ) : (
            <TabsSimple
              className={styles.profile__feedbacksTabs}
              classNameTabsWrapper={styles.profile__feedbacksTabsWrapper}
              renderHeader={({ activeTabIndex }) => (
                <div className={styles.profile__tabsNav}>
                  <div className={styles.profile__tabsNavItem}>
                    <Text
                      color="greyDark"
                      size="md"
                      fontWeight={activeTabIndex === 0 ? "semibold" : undefined}
                      className={`${styles.profile__tabsNavItemText} ${
                        activeTabIndex === 0
                          ? styles.profile__tabsNavItemText_active
                          : ""
                      }`}
                    >
                      Feedbacks
                    </Text>
                  </div>

                  {isMyProfile && (
                    <div className={styles.profile__tabsNavItem}>
                      <Text
                        color="greyDark"
                        size="md"
                        fontWeight={
                          activeTabIndex === 1 ? "semibold" : undefined
                        }
                        className={`${styles.profile__tabsNavItemText} ${
                          activeTabIndex === 1
                            ? styles.profile__tabsNavItemText_active
                            : ""
                        }`}
                      >
                        Drafts
                      </Text>
                    </div>
                  )}

                  <div
                    className={`${styles.profile__tabsNavItem} ${styles.profile__tabsNavItemAbout}`}
                  >
                    <Text
                      color="greyDark"
                      size="md"
                      fontWeight={activeTabIndex === 2 ? "semibold" : undefined}
                      className={`${styles.profile__tabsNavItemText} ${
                        activeTabIndex === 2
                          ? styles.profile__tabsNavItemText_active
                          : ""
                      }`}
                    >
                      About profile
                    </Text>
                  </div>
                </div>
              )}
            >
              {({ activeTabIndex }) => (
                <div className={styles.profile__feedbacksTabsWrapper}>
                  <div
                    className={`${styles.profile__feedbacksList} ${
                      activeTabIndex === 0
                        ? styles.profile__feedbacksList_active
                        : ""
                    }`}
                  >
                    {userData.feedbacks &&
                      (userData.feedbacks.length > 0 ? (
                        userData.feedbacks.map((feedback) => (
                          <BoxFeedback
                            key={feedback.id}
                            content={{ ...feedback, user: userData }}
                            className={styles.profile__feedbacksListItem}
                          />
                        ))
                      ) : (
                        <Flexbox
                          justify="center"
                          align="center"
                          direction="column"
                          className={styles.profile__feedbacksEmpty}
                        >
                          {isMyProfile ? (
                            <>
                              <Text
                                color="moonlight"
                                fontWeight="semibold"
                                center
                                className={styles.profile__feedbacksEmptyText}
                              >
                                You has no feedbacks yet
                              </Text>

                              <Button
                                className={styles.profile__feedbacksEmptyBtn}
                                theme="gradient"
                                onClick={handleRouteAddFeedback}
                              >
                                <Text
                                  color="white"
                                  size="sm"
                                  fontWeight="semibold"
                                  className={styles.mainBFeedbacks__addBtnText}
                                >
                                  + Add your feedback
                                </Text>
                              </Button>
                            </>
                          ) : (
                            <Text
                              color="moonlight"
                              fontWeight="semibold"
                              center
                              className={styles.profile__feedbacksEmptyText}
                            >
                              This user has no feedbacks yet
                            </Text>
                          )}
                        </Flexbox>
                      ))}
                  </div>

                  {/* <div
                      className={`${styles.profile__draftsList} ${
                        activeTabIndex === 1
                          ? styles.profile__draftsList_active
                          : ""
                      }`}
                    >
                      {userData.drafts &&
                        userData.drafts.map((draft) => (
                          <BoxFeedback
                            key={draft.id}
                            content={draft}
                            className={styles.profile__draftsListItem}
                            isDraft
                          />
                        ))}
                    </div> */}

                  <div
                    className={`${styles.profile__draftsList} ${
                      activeTabIndex === 2
                        ? styles.profile__draftsList_active
                        : ""
                    }`}
                  >
                    <ProfileInfo data={userData} type="mobile" />
                  </div>
                </div>
              )}
            </TabsSimple>
          )}
        </Flexbox>
      </Container>
    </div>
  );
};

export default PageProfile;
