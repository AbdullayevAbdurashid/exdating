// Import COMPONENTS
import {
  Container,
  Text,
  Button,
  Flexbox,
  BurgerSimple,
  BoxAvatar,
  SLink,
  Dropdown,
  DropmenuBubble,
  PopupSimple,
} from "components";

// Import HOOKS
import { serviceHooks } from "hooks";

// Import CONTEXT
import { context } from "context";

// Import LAYOUTS
import { PopupSupport } from "layouts";

// Import UTILS
import { helpers } from "utils";

// Import MEDIA
import EnglandIcon from "public/icons/countries/england.svg";
import ErrorIcon from "public/icons/icon-error.svg";
import MailIcon from "public/icons/icon-mail.svg";
import { useState } from "react";

// Import STYLES
import styles from "./NavFeedback.module.scss";

type Props = {
  className?: string;
  user: UserBase;
  onShowOriginal: () => void;
  onMessage: () => void;
  selfSubscriptions?: APIResponseWithData<SubscriptionListResponse> | null;
};

const NavFeedback: React.FC<Props> = ({
  className,
  user,
  onShowOriginal,
  onMessage,
  selfSubscriptions,
}) => {
  const classNames = [styles.nav, className].join(" ");

  // SERVICES
  const { useUserSubscriptionService } = serviceHooks;
  const {
    states: { isSubscribed },
    actions: { handleSubscribeToUser },
  } = useUserSubscriptionService(user, selfSubscriptions);

  // CONTEXTS
  const { useUserContext } = context;
  const { user: self } = useUserContext();

  // UTILS
  const { formatUserNames } = helpers;

  // STATES
  const [isSupportPopupActive, setIsSupportPopupActive] = useState(false);

  const handleOpenSupportPopup = () => {
    setIsSupportPopupActive(true);
  };

  const handleCloseSupportPopup = () => {
    setIsSupportPopupActive(false);
  };

  return (
    <div className={classNames}>
      <Container className={styles.nav__container}>
        <Button
          onClick={onShowOriginal}
          className={styles.nav__btnShowOriginal}
          theme="transparent"
        >
          <EnglandIcon width={21} height={21} />{" "}
          <Text
            size="sm"
            color="greyDark"
            className={styles.nav__btnShowOriginalText}
          >
            Show original
          </Text>
        </Button>

        <Flexbox
          justify="spaceBetween"
          align="center"
          className={styles.nav__menu}
        >
          <Flexbox
            className={styles.nav__centerBox}
            justify="spaceBetween"
            align="center"
          >
            <SLink
              className={styles.nav__user}
              href={
                self && self.id === user.id ? "/profile" : `/profile/${user.id}`
              }
            >
              <BoxAvatar
                alt={formatUserNames(user.first_name, user.last_name)}
                src={`${process.env.REMOTE}/${user.avatar_url}`}
                size={21}
              />

              <Text
                color="greyDark"
                fontWeight="semibold"
                size="sm"
                className={styles.nav__userText}
              >
                {formatUserNames(user.first_name, user.last_name)}
              </Text>
            </SLink>

            <Flexbox className={styles.nav__buttonsBox}>
              {(self == null || self.id !== user.id) && (
                <>
                  <Button
                    theme="borderedSecondaty"
                    className={styles.nav__btnMessage}
                    onClick={onMessage}
                  >
                    <Text
                      color="orange"
                      size="sm"
                      fontWeight="semibold"
                      className={styles.nav__btnMessageText}
                    >
                      Send message
                    </Text>

                    <MailIcon width={17} height={11} />
                  </Button>

                  <Button
                    onClick={() => handleSubscribeToUser(user.id)}
                    theme="sunshine"
                    className={styles.nav__btnSubscribe}
                  >
                    <Text
                      color="white"
                      size="sm"
                      fontWeight="semibold"
                      className={styles.nav__btnSubscribeText}
                    >
                      {isSubscribed ? "Unsubscribe" : "+ Subscribe"}
                    </Text>
                    <Text
                      color="white"
                      size="sm"
                      fontWeight="semibold"
                      className={styles.nav__btnSubscribeTextMobile}
                    >
                      +
                    </Text>
                  </Button>
                </>
              )}
            </Flexbox>
          </Flexbox>

          <Dropdown
            initialValue={null}
            renderSelect={() => <BurgerSimple className={styles.nav__burger} />}
          >
            {({ isActive }) =>
              isActive && (
                <DropmenuBubble className={styles.nav__dropmenu}>
                  <Button
                    theme="transparent"
                    className={styles.nav__dropmenuBtn}
                    onClick={handleOpenSupportPopup}
                  >
                    <ErrorIcon width={12} height={11} />

                    <Text
                      className={styles.nav__dropmenuBtnText}
                      size="sm"
                      color="moonlight"
                    >
                      Сomplain
                    </Text>
                  </Button>
                </DropmenuBubble>
              )
            }
          </Dropdown>
        </Flexbox>
      </Container>

      <PopupSimple
        onClose={handleCloseSupportPopup}
        open={isSupportPopupActive}
        modal
      >
        {(close) => <PopupSupport onClose={close} />}
      </PopupSimple>
    </div>
  );
};

export default NavFeedback;
