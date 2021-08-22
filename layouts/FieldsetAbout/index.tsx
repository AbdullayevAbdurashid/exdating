import { useCallback } from "react";
import { ValidationRule, FieldElement } from "react-hook-form";

// Import COMPONENTS
import { Text, InputSelect, Input, InputWithOptions } from "components";

// Import CONTEXTS
import { context } from "context";

// Import TEMPLATES
import { ABOUT_FIELDS, Field } from "./templates";

// Import STYLES
import styles from "./FieldsetAbout.module.scss";

type Props = {
  className?: string;
  register: ReactHookFormRegister;
  setValue: (
    name: any,
    value: unknown,
    config?:
      | Partial<{
          shouldValidate: boolean;
          shouldDirty: boolean;
        }>
      | undefined
  ) => void;
};

const FieldsetAbout: React.FC<Props> = ({ className, register, setValue }) => {
  const classNames = [styles.fieldset, className].join(" ");

  // CONTEXTS
  const { useGeneralContext } = context;
  const {
    countries,
    cities,
    actions: { selectCountryId },
  } = useGeneralContext();

  const renderField = useCallback(
    (field: Field) => (
      <li key={field.name} className={styles.fieldset__item}>
        {field.fieldType === "select" ? (
          <InputSelect
            placeholder={field.placeholder}
            name={field.name}
            key={field.name}
            register={register}
            setValue={setValue}
            list={field.name === "country_iso_code" ? countries : undefined}
            onOptionChange={(value: string) => {
              if (field.name === "country_iso_code") {
                selectCountryId(value);
              }
            }}
          />
        ) : field.name === "city_iso_code" ? (
          <InputWithOptions
            key={field.name}
            name={field.name}
            register={register}
            placeholder={field.placeholder}
            options={cities}
            setValue={setValue}
          />
        ) : (
          <Input
            key={field.name}
            name={field.name}
            register={register}
            placeholder={field.placeholder}
          />
        )}
      </li>
    ),
    [register, countries, cities]
  );

  return (
    <fieldset className={classNames}>
      <Text
        color="greyDark"
        size="md"
        className={styles.fieldset__title}
        fontWeight="semibold"
      >
        About person
      </Text>

      <ul className={styles.fieldset__row}>
        {ABOUT_FIELDS.map((field) => renderField(field))}
      </ul>
    </fieldset>
  );
};

export default FieldsetAbout;
