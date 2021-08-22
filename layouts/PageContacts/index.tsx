// Import COMPONENTS
import { Flexbox, IconSocial, SLink, Text } from "components";

// Import STYLES
import styles from "./PageContacts.module.scss";

type Props = { className?: string };

const PageContacts: React.FC<Props> = ({ className }) => {
  const classNames = [styles.contacts, className].join(" ");

  return (
    <Flexbox justify="center" align="center" className={classNames}>
      <Flexbox
        direction="column"
        wrap="nowrap"
        className={styles.contacts__content}
      >
        <Text as="h3" color="greyDark" className={styles.contacts__title}>
          Contacts
        </Text>

        <div className={styles.contacts__contacts}>
          <SLink href="tel:+13022461037">
            {({ hoverState }) => (
              <Text underline={hoverState} size="xlg" color="greyDark">
                +1 302-246-1037
              </Text>
            )}
          </SLink>

          <Text
            size="xlg"
            color="moonlight"
            inline
            className={styles.contacts__contactsSlash}
          >
            {" "}
            /{" "}
          </Text>

          <SLink
            href="mailto:exdating@gmail.com"
            className={styles.contacts__contactsEmail}
          >
            {({ hoverState }) => (
              <Text size="xlg" color="orange" underline={hoverState}>
                exdating@gmail.com
              </Text>
            )}
          </SLink>
        </div>

        <Flexbox className={styles.contacts__socials}>
          <SLink href="#youtube" className={styles.contacts__socialsItem}>
            <IconSocial social="youtube" size="md" />
          </SLink>
          <SLink href="#twitter" className={styles.contacts__socialsItem}>
            <IconSocial social="twitter" size="md" />
          </SLink>
          <SLink href="#google" className={styles.contacts__socialsItem}>
            <IconSocial social="google" size="md" />
          </SLink>
          <SLink href="#facebook" className={styles.contacts__socialsItem}>
            <IconSocial social="facebook" size="md" />
          </SLink>
          <SLink href="#vk" className={styles.contacts__socialsItem}>
            <IconSocial social="vk" size="md" />
          </SLink>
        </Flexbox>
      </Flexbox>
    </Flexbox>
  );
};

export default PageContacts;
