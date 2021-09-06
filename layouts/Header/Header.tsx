import { useRouter } from "next/router";
import Image from "next/image";
import en from '../../locales/en.json';
import ru from '../../locales/ru.json';
// Import COMPONENTS
import {
  Container,
  Flexbox,
  SLink,
  Text,
  Button,
  Burger,
  Dropdown,
  DropmenuBubble,
} from "components";

// Import LAYOUTS
import { PopupNotifications } from "layouts";

// Import HOOKS
import { serviceHooks } from "hooks";

// Import CONTROLLERS
import { context } from "context";
import useHeaderController from "./Header.controller";

// Import MEDIA
import ArrowDownIcon from "public/icons/icon-arrow-down.svg";
import ArrowRightIcon from "public/icons/icon-arrow-right.svg";
import MailIcon from "public/icons/icon-mail.svg";
import MailOutlineIcon from "public/icons/icon-mail-outline.svg";
import BellIcon from "public/icons/icon-bell.svg";
import BellOutlineIcon from "public/icons/icon-bell-outline.svg";
import ManProfileIcon from "public/icons/icon-man-profile.svg";

// Import STYLES
import styles from "./Header.module.scss";

type Props = {
  self?: UserSelf | null;
  className?: string;
  content?: HeaderContent;
};


//List of links in navbat
const linkList: { [key: string]: any } = {
  "en": [
    {
      "id": "1",
      "name": "Home",
      "linkTo": "/"
    },
    {
      "id": "4",
      "name": "All feedbacks",
      "linkTo": "/feedbacks"
    },
    {
      "id": "5",
      "name": "Top Users",
      "linkTo": "/topusers"
    },
    {
      "id": "6",
      "name": "Global Search",
      "linkTo": "/globalsearch"
    },
    {
      "id": "7",
      "name": "Track Accounts",
      "linkTo": "/trackaccounts"
    },
    {
      "id": "8",
      "name": "Contacts",
      "linkTo": "/contacts"
    }

  ],
  "ru": [
    {
      "id": "1",
      "name": "Домой",
      "linkTo": "/"
    },
    {
      "id": "4",
      "name": "Все отзывы",
      "linkTo": "/feedbacks"
    },
    {
      "id": "5",
      "name": "Лучшие пользователи",
      "linkTo": "/topusers"
    },
    {
      "id": "6",
      "name": "Глобальный Поиск",
      "linkTo": "/globalsearch"
    },
    {
      "id": "7",
      "name": "Отслеживание пользователей",
      "linkTo": "/trackaccounts"
    },
    {
      "id": "8",
      "name": "Контакты",
      "linkTo": "/contacts"
    }

  ]
}
const Header: React.FC<Props> = ({ className, self, content }) => {
  const router = useRouter();


  // CONTROLLERS
  const {
    states: { notificationList },
  } = useHeaderController();

  // SERVICES
  const { useHeader } = serviceHooks;
  const {
    theme,
    isSticky,
    onLoginRoute,
    onSignupRoute,
    onProfileRoute,
    displayNoneMediaQuery,
    scrollPadding,
    changePopupState,
  } = useHeader();

  const classNames = [
    styles.header,
    isSticky ? styles.header_sticky : "",
    theme ? styles[`header_theme_${theme}`] : "",
    displayNoneMediaQuery != null
      ? styles[`header_hide_${displayNoneMediaQuery}`]
      : "",
    className,
  ].join(" ");

  // CONTEXTS
  const { useMenuState, useUserContext } = context;
  const { isMenuActive, onChangeMenuState } = useMenuState();
  const { user } = useUserContext();

  const handleToggleNotifications = (state: boolean) => {
    changePopupState(state);
  };

  // Translation

  //Geting locale
  const { locale } = router;

  //Changing language function
  const changeLanguage = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale });
  };

  //Translation function
  const t = locale === 'en' ? en : ru;

  return (

    <div style={{ paddingRight: scrollPadding }
    } className={classNames} >
      <Container>
        <Flexbox
          align="center"
          justify="spaceBetween"
          className={styles.header__content}
        >
          <SLink className={styles.header__logo} sizeless href="/">
            <Image
              src="/images/exdating-logox2.png"
              alt="Exdating logo"
              width={166}
              height={44}
            />
          </SLink>

          <div className={styles.header__navWrapper}>
            <nav className={styles.header__navContainer}>
              <ul className={styles.header__nav}>
                {locale != null ? linkList[locale].map((element: any) => (
                  <li
                    key={element.id}
                    className={`${styles.header__navItem} ${router.pathname === element.linkTo
                      ? styles.header__navItem_active
                      : ""
                      }`}
                  >
                    <SLink href={element.linkTo}>
                      <Text
                        color={
                          router.pathname === element.linkTo
                            ? "orange"
                            : "greyDark"
                        }
                        size="sm"
                        className={styles.header__navItemText}
                      >
                        {element.name}
                      </Text>
                    </SLink>
                  </li>
                )) : null}
              </ul>
            </nav>

            <Flexbox
              justify="spaceBetween"
              align="center"
              className={styles.header__userControls}
            >
              {self != null || user != null ? (
                <>
                  <Button
                    className={`${styles.header__userControlsItem} ${styles.header__btnRounded}`}
                  >
                    <MailIcon
                      viewBox="0 0 17 11"
                      width={20}
                      height={14}
                      className={styles.header__btnRoundedIcon}
                    />

                    <MailOutlineIcon
                      viewBox="0 0 24 16"
                      width={24}
                      height={16}
                      className={styles.header__btnRoundedIcon_mobile}
                    />
                  </Button>

                  <Dropdown
                    initialValue={null}
                    animated
                    className={styles.header__userControlsItem}
                    dropdownClassName={styles.header__notificationsDropdown}
                    onStatusChange={handleToggleNotifications}
                    renderSelect={() => (
                      <Button
                        className={`${styles.header__btnRounded}${notificationList.length > 0
                          ? ` ${styles.header__btnRounded_active}`
                          : ""
                          }`}
                      >
                        <BellIcon
                          viewBox="0 0 10 13"
                          width={16}
                          height={19}
                          className={styles.header__btnRoundedIcon}
                        />

                        <BellOutlineIcon
                          viewBox="0 0 20 23"
                          width={20}
                          height={23}
                          className={styles.header__btnRoundedIconNotifications}
                        />

                        {notificationList.length > 0 && (
                          <span className={styles.header__btnRoundedCounter}>
                            {notificationList.length}
                          </span>
                        )}
                      </Button>
                    )}
                  >
                    {() => (
                      <PopupNotifications
                        className={styles.header__notifications}
                        date={new Date()}
                        notificationList={notificationList}
                      />
                    )}
                  </Dropdown>

                  <Button
                    onClick={onProfileRoute}
                    className={`${styles.header__userControlsItem} ${styles.header__btnRounded}`}
                  >
                    <ManProfileIcon
                      viewBox="0 0 15 19"
                      width={16}
                      height={20}
                      className={styles.header__btnRoundedIconProfile}
                    />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    theme="gradient"
                    className={`${styles.header__signinBtn} ${styles.header__signBtn}`}
                    onClick={onLoginRoute}
                  >
                    <Text
                      className={styles.header__signBtnText}
                      color="white"
                      size="sm"
                      fontWeight="semibold"
                    >
                      {t.header.login}
                    </Text>

                    <ArrowRightIcon width={16} height={8} />
                  </Button>

                  <Button
                    theme="borderedSecondaty"
                    className={`${styles.header__signupBtn} ${styles.header__signBtn}`}
                    onClick={onSignupRoute}
                  >
                    <Text
                      className={`${styles.header__signBtnText} ${styles.header__signupBtnText}`}
                      color="gradient"
                      size="sm"
                      fontWeight="semibold"
                    >
                      {t.header.signUp
                      }                    </Text>

                    <ArrowRightIcon width={16} height={8} />
                  </Button>

                  <Dropdown
                    initialValue={content ? content.languagesList[1] : null}
                    className={styles.header__langBtn}
                    animated
                    renderSelect={({ selectedValue, isActive, isHovered }) => (
                      <Flexbox align="center">
                        <Text
                          color={isActive || isHovered ? "orange" : "grey"}
                          uppercase
                          size="sm"
                          fontWeight="semibold"
                          className={`${styles.header__langText} ${isHovered ? styles.header__langText_hovered : ""
                            } ${isActive ? styles.header__langText_active : ""}`}
                        >
                          {selectedValue ? selectedValue.shortсut : ""}
                        </Text>

                        <ArrowDownIcon width={8} height={9} />
                      </Flexbox>
                    )}
                  >
                    {({ selectedValue, onSelect }) => (
                      <DropmenuBubble>
                        <ul className={styles.header__langDropdown}
                        >
                          {content?.languagesList.map((lang) => (
                            <li
                              className={styles.header__langItem}
                              key={lang.id}
                              onClick={() => { changeLanguage(lang.shortсut); onSelect(lang) }
                              }
                              onKeyPress={() => { }}
                              role="option"
                              aria-selected={false}
                            >
                              <Text
                                className={styles.header__langDropdownText}
                                size="md"
                                color={
                                  selectedValue?.id === lang.id
                                    ? "moonlight"
                                    : "primary"
                                }
                              >
                                {lang.name}
                              </Text>
                            </li>
                          ))}
                        </ul>
                      </DropmenuBubble>
                    )}
                  </Dropdown>
                </>
              )}

              <Burger
                name="header"
                onChange={onChangeMenuState}
                isActive={isMenuActive}
                className={styles.header__burger}
              />
            </Flexbox>
          </div>
        </Flexbox>
      </Container>
    </div >
  );
};

export default Header;
