import { useCallback, useEffect, useState } from "react";


import { useRouter } from "next/router";
import en from '../../locales/en.json';
import ru from '../../locales/ru.json';
// Import COMPONENTS
import {
  Container,
  Text,
  SLink,
  IconSocial,
  Flexbox,
  Button,
} from "components";

// Import HOOKS
import { commonHooks, serviceHooks } from "hooks";

// Import ICONS
import RusoLogo from "public/logotype-ruso.svg";

// Import STYLES
import styles from "./Footer.module.scss";
//Language

type locale = string

const groupedLinksList: { [key: string]: any } =
{
  "ru": [
    {
      "groupName": "Сообщество",
      "linkList": [
        { "id": "1", "name": "Зарегистрироваться", "linkTo": "/signin" },
        { "id": "2", "name": "Авторизоваться", "linkTo": "/login" },
        { "id": "3", "name": "О нас", "linkTo": "/about" },
        { "id": "4", "name": "Контакты", "linkTo": "/contacts" }
      ]
    },
    {
      "groupName": "Пользователи",
      "linkList": [
        { "id": "5", "name": "Лучший пользователи", "linkTo": "/topusers" },
        { "id": "6", "name": "Последние пользователи", "linkTo": "#userslast" },
        { "id": "7", "name": "Последние комментарии", "linkTo": "/lastcomments" },
        { "id": "8", "name": "Все отзывы", "linkTo": "/feedbacks" }
      ]
    },
    {
      "groupName": "Навигация",
      "linkList": [
        { "id": "10", "name": "Социальный Глобальный", "linkTo": "#socialglobal" },
        { "id": "11", "name": "Поиск трека", "linkTo": "#searchtrack" },
        { "id": "12", "name": "Учетные записи", "linkTo": "#accounts" }
      ]
    }
  ],



  "en": [
    {
      "groupName": "Community",
      "linkList": [
        { "id": "1", "name": "Sign Up", "linkTo": "/signin" },
        { "id": "2", "name": "Log In", "linkTo": "/login" },
        { "id": "3", "name": "About", "linkTo": "/about" },
        { "id": "4", "name": "Contacts", "linkTo": "/contacts" }
      ]
    },
    {
      "groupName": "Users",
      "linkList": [
        { "id": "5", "name": "Top User New", "linkTo": "/topusers" },
        { "id": "6", "name": "Users Last", "linkTo": "#userslast" },
        { "id": "7", "name": "Last Comments", "linkTo": "/lastcomments" },
        { "id": "8", "name": "All Feedbacks", "linkTo": "/feedbacks" }
      ]
    },
    {
      "groupName": "Navigation",
      "linkList": [
        { "id": "10", "name": "Social Global", "linkTo": "#socialglobal" },
        { "id": "11", "name": "Search Track", "linkTo": "#searchtrack" },
        { "id": "12", "name": "Accounts", "linkTo": "#accounts" }
      ],
    }
  ],


}




type Props = { className?: string; content?: FooterContent };
const Footer: React.FC<Props> = ({ className, content }) => {
  const {
    isActive,
    isAlternativeColor,
    displayNoneMediaQuery,
  } = serviceHooks.useFooter();

  const classNames = [
    styles.footer,
    isAlternativeColor ? styles.footer_alternative : "",
    displayNoneMediaQuery != null
      ? styles[`footer_hide_${displayNoneMediaQuery}`]
      : "",
    className,
  ].join(" ");
  const [accordionToggleState, setAccordionToggleState] = useState<
    Array<boolean>
  >([false, false, false]);

  const windowDimension = commonHooks.useDimension();

  useEffect(() => {
    if (windowDimension.width != null) {
      if (windowDimension.width > 575) {
        setAccordionToggleState([true, true, true]);
      } else {
        setAccordionToggleState([false, false, false]);
      }
    }
  }, [windowDimension]);

  const handleToggleAccordion = useCallback(
    (navIndex: number) => {
      if (windowDimension.width != null && windowDimension.width <= 575) {
        setAccordionToggleState((prevState) =>
          prevState.map((state, index) => (index === navIndex ? !state : false))
        );
      }
    },
    [windowDimension]
  );

  if (!isActive) {
    return null;
  }
  const router = useRouter();
  const { locale } = router;

  return (
    <footer className={classNames}>
      <Container className={styles.footer__container}>
        <div className={styles.footer__nav}>
          {locale != null ? groupedLinksList[locale].map((nav: any, navIndex: any) => (
            <div key={nav.groupName} className={styles.footer__navItem}>
              <Button
                className={`${styles.footer__navTitleBtn} ${accordionToggleState[navIndex]
                  ? styles.footer__navTitleBtn_hovered
                  : ""
                  }`}
                onClick={() => handleToggleAccordion(navIndex)}
              >
                <Text
                  className={styles.footer__navTitle}
                  size="lg"
                  color="grey"
                  fontWeight="semibold"
                >
                  {nav.groupName}
                </Text>
              </Button>

              <ul
                style={{ maxHeight: accordionToggleState[navIndex] ? 200 : 0 }}
                className={styles.footer__navList}
              >
                {nav.linkList.map((link: any) => (
                  <li key={link.id} className={styles.footer__navListItem}>
                    <SLink href={link.linkTo}>
                      {({ hoverState }) => (
                        <Text
                          size="sm"
                          color={hoverState ? "primary" : "greyLight"}
                          className={styles.footer__navListItemText}
                        >
                          {link.name}
                        </Text>
                      )}
                    </SLink>
                  </li>
                ))}
              </ul>
            </div>
          )) : null}
        </div>

        <div className={styles.footer__rightBox}>
          <div className={styles.footer__socialBox}>
            <Text
              className={styles.footer__socialTitle}
              size="lg"
              color="grey"
              fontWeight="semibold"
            >
              Social Networks
            </Text>

            <ul className={styles.footer__socialList}>
              {content?.socialList.map((social) => (
                <li key={social.name} className={styles.footer__socialItem}>
                  <SLink href={social.linkTo}>
                    <IconSocial social={social.name} />
                  </SLink>
                </li>
              ))}
            </ul>
          </div>

          <Flexbox direction="column" className={styles.footer__infoBox}>
            <div className={styles.footer__infoLinksBox}>
              <SLink className={styles.footer__infoLink} href="/#privacypolicy">
                <Text size="sm" color="greyLight">
                  Privacy Policy
                </Text>
              </SLink>

              <SLink
                className={styles.footer__infoLink}
                href="/#termsandconditions"
              >
                <Text size="sm" color="greyLight">
                  Terms &amp; Conditions
                </Text>
              </SLink>
            </div>

            <div className={styles.footer__copyright}>
              <Text size="sm" color="greyLight">
                &copy; 2020 Exdating, Inc. All rights reserved.
              </Text>
            </div>
          </Flexbox>
        </div>
      </Container>

      <div className={styles.footer__creators}>
        <Text size="sm" color="greyDark" inline>
          Made in —
        </Text>

        <SLink href="/#ruso" className={styles.footer__creatorsLink}>
          <RusoLogo width={41} heigth={9} />
        </SLink>
      </div>
    </footer>
  );
};

export default Footer;
