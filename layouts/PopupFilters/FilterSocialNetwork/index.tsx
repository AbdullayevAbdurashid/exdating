// Import COMPONENTS
import { Button, Flexbox, InputSelect, Text } from "components";

// Import LAYOUTS
import FilterTemplate from "../FilterTemplate";

// Import MEDIA
import SeachIcon from "public/icons/icon-search.svg";

// Import STYLES
import styles from "./FilterSocialNetwork.module.scss";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  register: () => RefReturn;
  onBack: () => void;
  onSave: () => void;
};

const FilterSocialNetwork: React.FC<Props> = ({
  className,
  style,
  register,
  onBack,
  onSave,
}) => {
  const classNames = [styles.snFilter, className].join(" ");

  return (
    <FilterTemplate
      style={style}
      label="Social networks"
      register={register}
      className={classNames}
      onBack={onBack}
      onSave={onSave}
      customInput={() => (
        <div className={styles.snFilter__fields}>
          <Flexbox className={styles.snFilter__fieldsSelectInput}>
            <InputSelect
              name="social"
              register={register}
              className={styles.snFilter__select}
              inputClassName={styles.snFilter__selectInput}
              theme="borderedSplit"
            />

            <div className={styles.snFilter__input}>
              <SeachIcon width={11} height={11} />

              <input
                placeholder="Nickname or URL address"
                type="text"
                className={styles.snFilter__inputField}
              />
            </div>
          </Flexbox>

          <Button
            theme="borderedSecondaty"
            className={styles.snFilter__btnAddSocial}
          >
            <Text
              color="orange"
              size="sm"
              fontWeight="semibold"
              className={styles.snFilter__btnAddSocialText}
            >
              + Add
            </Text>
          </Button>
        </div>
      )}
    >
      Hello FilterSocialNetwork
    </FilterTemplate>
  );
};

export default FilterSocialNetwork;
