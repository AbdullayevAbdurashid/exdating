import { useMemo } from "react";

// Import COMPONENTS
import {
  Text,
  Flexbox,
  InputSelect,
  Input,
  Button,
  IconSocial,
} from "components";

// Import CONSTANTS
import { COMMON } from "const";

// Import TYPES
import { SelectListData } from "components/InputSelect";

// Import STYLES
import styles from "./FieldsetSocial.module.scss";

type RefReturn =
  | string
  | ((instance: HTMLInputElement | null) => void)
  | React.RefObject<HTMLInputElement>
  | null
  | undefined;
type Props = {
  className?: string;
  style?: React.CSSProperties;
  register: () => RefReturn;
};

const FieldsetSocial: React.FC<Props> = ({ className, style, register }) => {
  const classNames = [styles.fieldset, className].join(" ");

  // CONSTANTS
  const { SOCIAL_NETWORKS } = COMMON;

  const socialList = useMemo((): SelectListData[] => {
    return Object.keys(SOCIAL_NETWORKS).map((social) => {
      const socialName =
        SOCIAL_NETWORKS[social as keyof typeof SOCIAL_NETWORKS];

      return {
        id: social,
        value: socialName,
        element: (
          <Flexbox align="center">
            <IconSocial
              style={{ marginTop: 5, marginBottom: 5 }}
              social={socialName}
              size="sm"
            />
            <Text size="sm" className={styles.fieldset__optionText}>
              {socialName}
            </Text>
          </Flexbox>
        ),
      };
    });
  }, [SOCIAL_NETWORKS]);

  return (
    <fieldset style={style} className={classNames}>
      <Text
        color="greyDark"
        size="md"
        className={styles.fieldset__title}
        fontWeight="semibold"
      >
        Social networks
      </Text>

      <Flexbox align="end" className={styles.fieldset__socialBlock}>
        <div className={styles.fieldset__socialContent}>
          <Flexbox
            className={styles.fieldset__socialRow}
            align="center"
            justify="spaceBetween"
          >
            <InputSelect
              className={styles.fieldset__socialSelect}
              placeholder="Pick social network"
              name="social"
              register={register}
              list={socialList}
            />

            <InputSelect
              className={styles.fieldset__socialSelectMobile}
              register={register}
              name="socialmobile"
              theme="borderedSplit"
            />

            <Flexbox
              className={styles.fieldset__socialNicknameOrAddress}
              align="center"
              justify="spaceBetween"
            >
              <Input
                type="text"
                name="socialnickname"
                register={register}
                placeholder="Enter a nickname"
                className={styles.fieldset__socialNickname}
              />

              <Text
                color="moonlight"
                size="xsm"
                className={styles.fieldset__socialOr}
              >
                or
              </Text>

              <Input
                type="text"
                name="socialurl"
                register={register}
                placeholder="URL Address"
                className={styles.fieldset__socialUrl}
              />
            </Flexbox>

            <Input
              className={styles.fieldset__socialNicknameAddress}
              type="text"
              name="socialnicknameurl"
              register={register}
              placeholder="Nickname or URL address"
            />
          </Flexbox>
        </div>

        <Button
          className={styles.fieldset__btnAddSocial}
          theme="borderedSecondaty"
        >
          <Text
            className={styles.fieldset__btnAddSocialText}
            color="orange"
            size="sm"
            fontWeight="semibold"
          >
            + Add
          </Text>
        </Button>
      </Flexbox>
    </fieldset>
  );
};

export default FieldsetSocial;
