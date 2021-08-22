// Import COMPONENTS
import { Text, Input, Button } from "components";

// Import MEDIA
import ArrowIcon from "public/icons/icon-arrow-right.svg";

// Import STYLES
import styles from "./FilterTemplate.module.scss";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  label?: string;
  renderFilters?: () => React.ReactNode;
  customInput?: () => React.ReactNode;
  input?: {
    name: string;
    placeholder?: string;
  };
  register: () => RefReturn;
  onBack?: () => void;
  onSave?: () => void;
};

const FilterTemplate: React.FC<Props> = ({
  className,
  style,
  label,
  renderFilters,
  register,
  children,
  input,
  onBack,
  onSave,
  customInput,
}) => {
  const classNames = [styles.filter, className].join(" ");

  const handleClickBack = () => {
    onBack && onBack();
  };

  return (
    <div style={style} className={classNames}>
      <div
        className={`${styles.filter__wrapper} ${
          onSave ? styles.filter__wrapper_withSave : ""
        }`}
      >
        <div
          className={`${styles.filter__nav} ${
            onBack ? styles.filter__nav_reverse : ""
          }`}
        >
          <Button className={styles.filter__btnClear}>
            <Text size="sm" color="orange">
              Clear all
            </Text>
          </Button>

          {onBack && (
            <Button
              onClick={handleClickBack}
              className={styles.filter__btnBack}
            >
              <div className={styles.filter__btnBackIcon}>
                <ArrowIcon />
              </div>
              <Text color="orange">Back</Text>
            </Button>
          )}
        </div>

        <Text className={styles.filter__title} as="h4" color="greyDark">
          {label}
        </Text>

        <div className={styles.filter__filters}>
          {renderFilters && renderFilters()}
        </div>

        <div className={styles.filter__input}>
          {!customInput && input && (
            <Input
              className={styles.filter__inputField}
              placeholder={input.placeholder}
              register={register}
              name={input.name}
            />
          )}

          {customInput && customInput()}
        </div>

        <div className={styles.filter__content}>{children}</div>

        {onSave && (
          <div className={styles.filter__save}>
            <Button theme="gradient" className={styles.filter__btnSave}>
              <Text
                className={styles.filter__btnSaveText}
                color="white"
                size="sm"
                fontWeight="semibold"
              >
                Save
              </Text>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterTemplate;
