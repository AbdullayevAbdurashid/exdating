import { useMemo } from "react";

// Import COMPONENTS
import { TabsSimple, Button, Text, IconSocial } from "components";

// Import UTILS
import { helpers } from "utils";

// Import MEDIA
import PlusIcon from "public/icons/icon-plus.svg";
import MinusIcon from "public/icons/icon-minus.svg";

// Import STYLES
import styles from "./AccordionAboutPerson.module.scss";

type Props = {
  className?: string;
  data: Feedback;
  socialData?: SocialTypes[];
};

const AccordionAboutPerson: React.FC<Props> = ({
  className,
  data,
  socialData,
}) => {
  const classNames = [styles.apAccordion, className].join(" ");

  // UTILS
  const { formatUserNames } = helpers;

  const renderAboutList = useMemo(() => {
    const AboutItem = (title: string, value: string) => (
      <li className={styles.apAccordion__listItem}>
        <Text
          size="sm"
          color="moonlight"
          className={styles.apAccordion__listItemLabel}
        >
          {title}
        </Text>
        <Text
          fontWeight="semibold"
          size="lg"
          color="greyDark"
          className={styles.apAccordion__listItemText}
        >
          {value}
        </Text>
      </li>
    );

    return (
      <>
        {AboutItem(
          "Name",
          formatUserNames(data.first_name, data.last_name, data.is_anonymous)
        )}
        {AboutItem("Country", data.country.name)}
        {AboutItem("City", "NO API")}
      </>
    );
  }, [data]);

  // const renderSocialItems = useMemo(
  //   () =>
  //     socialData &&
  //     user.socialLinks.map((social) => (
  //       <li className={styles.apAccordion__socialListItem} key={social.linkTo}>
  //         <a href={social.linkTo}>
  //           <IconSocial social={social.name} />
  //         </a>
  //       </li>
  //     )),

  //   [user]
  // );

  return (
    <TabsSimple
      className={classNames}
      renderHeader={({ activeTabIndex }) => (
        <div>
          <Button theme="transparent" className={styles.apAccordion__button}>
            <Text color="orange" size="md" fontWeight="bold">
              Information person
            </Text>
            <Text color="orange" size="md" fontWeight="bold">
              {activeTabIndex === 0 ? (
                <MinusIcon width={14} height={2} />
              ) : (
                <PlusIcon width={15} height={15} />
              )}
            </Text>
          </Button>
        </div>
      )}
      isToggleable
    >
      {({ activeTabIndex }) => (
        <div
          style={{
            display: activeTabIndex === 0 ? "block" : "none",
          }}
        >
          <div className={styles.apAccordion__content}>
            <ul className={styles.apAccordion__list}>{renderAboutList}</ul>

            {socialData && (
              <div className={styles.apAccordion__social}>
                <Text
                  size="sm"
                  color="moonlight"
                  className={styles.apAccordion__listItemLabel}
                >
                  Social Networks
                </Text>

                <ul className={styles.apAccordion__socialList}>
                  {/* {renderSocialItems} */}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </TabsSimple>
  );
};

export default AccordionAboutPerson;
