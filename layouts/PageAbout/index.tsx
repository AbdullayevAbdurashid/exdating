// Import COMPONENTS
import { BoxQuote, Container, Text, List } from "components";

// Import TEMPLATES
import { ABOUT_LIST } from "./PageAbout.temp";

// Import STYLES
import styles from "./PageAbout.module.scss";

type Props = { className?: string; style?: React.CSSProperties };

const PageAbout: React.FC<Props> = ({ className, style }) => {
  const classNames = [styles.about, className].join(" ");

  return (
    <div style={style} className={classNames}>
      <Container className={styles.about__container}>
        <Text as="h3" color="greyDark" className={styles.about__title}>
          About us
        </Text>

        <div className={styles.about__content}>
          <Text
            color="greyDark"
            size="md"
            className={`${styles.about__paragraph} ${styles.about__text}`}
          >
            Breeding a brand by analyzing the results of an advertising campaign
            is quite doable. Behavioral targeting, of course, methodically
            stabilizes sociometric rankings. The structure of the market does
            not turn the style of management very well. A promotion campaign
            induces a marketing tool. Basically, an ad campaign gracefully skews
            CTR. Image advertising, therefore, gracefully inhibits convergent
            rebranding.
          </Text>

          <Text
            color="greyDark"
            size="md"
            className={`${styles.about__paragraph} ${styles.about__text}`}
          >
            It is interesting to note that the retroconversion of the national
            heritage is stabilizing the media mix given the result of previous
            media campaigns. Media communication, without changing the concept
            outlined above, is not obvious to everyone. The management style
            produces media weight while optimizing budgets. Buying and selling
            attracts the creation of a committed customer. According to leading
            marketers, an analysis of foreign experience specifies a business
            plan, taking into account the results of previous media campaigns.
          </Text>

          <List list={ABOUT_LIST} className={styles.about__list} />

          <Text
            color="greyDark"
            size="md"
            className={`${styles.about__paragraph} ${styles.about__text}`}
          >
            Media communication, without changing the concept outlined above, is
            not obvious to everyone. The management style produces media weight
            while optimizing budgets. Buying and selling attracts the creation
            of a committed customer. According to leading marketers, an analysis
            of foreign experience specifies a business plan, taking into account
            the results of previous media campaigns.
          </Text>

          <BoxQuote className={styles.about__paragraph}>
            <Text size="sm" color="greyLight" italic>
              The interaction of the corporation and the client, according to F.
              Kotler, weakly distorts the social industry standard. Expertise of
              the completed project, according to F. Kotler, is ambiguous.
              Community stimulation allows for the tactical principle of
              perception.
            </Text>
          </BoxQuote>

          <Text
            color="greyDark"
            size="md"
            className={`${styles.about__paragraph} ${styles.about__text}`}
          >
            According to leading marketers, an analysis of foreign experience
            specifies a business plan, taking into account the results of
            previous media campaigns.
          </Text>
        </div>
      </Container>
    </div>
  );
};

export default PageAbout;
