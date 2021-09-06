// Import COMPONENTS
import { SLink, Text, Button, Burger, Flexbox } from "components";
import { useState } from "react";
// Import HOOKS
import { serviceHooks } from "hooks";

// Import MEDIA
import ArrowRightIcon from "public/icons/icon-arrow-right.svg";

// Import STYLES
import styles from "./Menu.module.scss";

import { useRouter } from "next/router";
import en from '../../locales/en.json';
import ru from '../../locales/ru.json';

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
type Props = {
  className?: string;
  content?: HeaderContent;
};

const Menu: React.FC<Props> = ({ className, content }) => {
  // SERVICES
  const { useMenu } = serviceHooks;
  const {
    isLanguageMenuActive,
    onCloseLangMenu,
    onOpenLangMenu,
    isMenuActive,
    onLink,
    onSignup,
    onLangChange,
    responsiveMenuClosedPosition,
    onMenuClose,
  } = useMenu();

  const classNames = [
    styles.menu,
    isLanguageMenuActive ? styles.menu_activeSide : "",
    className,
  ].join(" ");
  const [current, setCurrent] = useState("English")

  //Language 
  const router = useRouter();
  //Geting locale
  const { locale } = router;

  //Changing language function
  const changeLanguage = (locale: string, name: string) => {
    router.push(router.pathname, router.asPath, { locale });
    setCurrent(name)
  };

  //Translation function
  const t = locale === 'en' ? en : ru;

  return (
    <div
      style={{
        top: isMenuActive ? 0 : responsiveMenuClosedPosition,
        maxHeight: isMenuActive ? 10000 : 0,
      }}
      className={classNames}
    >
      <Flexbox
        direction="column"
        wrap="nowrap"
        className={styles.menu__container}
      >
        {/* MENU HEADER */}
        <Flexbox justify="spaceBetween" className={styles.menu__header}>
          <Flexbox align="stretch" className={styles.menu__headerBox}>
            {isLanguageMenuActive && (
              <Button
                theme="transparent"
                className={styles.menu__headerBackBtn}
                onClick={onCloseLangMenu}
              >
                <ArrowRightIcon width={16} height={8} />

                <Text size="sm" color="orange">
                  Back
                </Text>
              </Button>
            )}
          </Flexbox>

          <Flexbox align="center" className={styles.menu__headerBox}>
            <Button
              className={styles.menu__headerSignupBtn}
              theme="borderedGradientPrimary"
              onClick={onSignup}
            >
              <Text
                className={styles.menu__headerSignupBtnText}
                color="gradient"
                size="sm"
                fontWeight="semibold"
              >
                {t.header.signUp
                }              </Text>
            </Button>

            <Burger
              name="menu"
              isActive={isMenuActive}
              onChange={onMenuClose}
            />
          </Flexbox>
        </Flexbox>

        {/* MENU CONTENT */}
        <Flexbox className={styles.menu__content}>
          <div className={styles.menu__navWrapper}>
            <ul className={styles.menu__nav}>
              {locale != null ? linkList[locale].map((element: any) => (
                <li key={element.id} className={styles.menu__navItem}>
                  <SLink
                    onClick={(e) => onLink(e, element.linkTo)}
                    href={element.linkTo}
                  >
                    {({ hoverState }) => (
                      <Text
                        className={styles.menu__navItemText}
                        color={hoverState ? "orange" : "primary"}
                        size="sm"
                        hoverTransition
                      >
                        {element.name}
                      </Text>
                    )}
                  </SLink>
                </li>
              )) : null}

              <li
                className={`${styles.menu__navItem} ${styles.menu__navItemLogin}`}
              >
                <SLink href="/login" onClick={(e) => onLink(e, "/login")}>
                  {({ hoverState }) => (
                    <Text
                      className={`${styles.menu__navItemText} ${styles.menu__navItemTextLogin}`}
                      color={hoverState ? "hotpink" : "orange"}
                      size="sm"
                      hoverTransition
                    >
                      {t.header.login
                      }                    </Text>
                  )}
                </SLink>
              </li>
            </ul>

            <div className={styles.menu__language}>
              <Text className={styles.menu__languageText} size="md">
                {t.menu.language}
              </Text>

              <Button
                onClick={onOpenLangMenu}
                className={styles.menu__languageBtn}
                theme="transparent"
              >
                <Text
                  className={styles.menu__languageBtnText}
                  size="md"
                  color="orange"
                >
                  {current}
                </Text>
              </Button>
            </div>
          </div>

          <div className={styles.menu__langWrapper}>
            <ul className={`${styles.menu__nav} ${styles.menu__navLang}`}>
              {content?.languagesList.map((lang) => (
                <li key={lang.id} className={styles.menu__navItem}>
                  <Button
                    theme="transparent"
                    className={styles.menu__navItemBtn}
                    onClick={() => { changeLanguage(lang.shortсut, lang.name); onLangChange(lang) }}
                  >
                    <Text
                      className={styles.menu__navItemText}
                      color="grey"
                      size="sm"
                    >
                      {lang.name}
                    </Text>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </Flexbox>
      </Flexbox>
    </div>
  );
};

export default Menu;
