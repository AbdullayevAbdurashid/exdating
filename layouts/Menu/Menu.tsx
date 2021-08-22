// Import COMPONENTS
import { SLink, Text, Button, Burger, Flexbox } from "components";

// Import HOOKS
import { serviceHooks } from "hooks";

// Import MEDIA
import ArrowRightIcon from "public/icons/icon-arrow-right.svg";

// Import STYLES
import styles from "./Menu.module.scss";

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
                Sign up
              </Text>
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
              {content?.linkList.map((element) => (
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
              ))}

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
                      Login in
                    </Text>
                  )}
                </SLink>
              </li>
            </ul>

            <div className={styles.menu__language}>
              <Text className={styles.menu__languageText} size="md">
                Langauge:
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
                  English
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
                    onClick={() => onLangChange(lang)}
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
