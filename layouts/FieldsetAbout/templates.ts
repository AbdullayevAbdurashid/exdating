interface IFieldCommon {
  name: string;
  placeholder?: string;
}

interface IFieldSelect extends IFieldCommon {
  fieldType: "select";
  type?: undefined;
}
interface IFieldInput extends IFieldCommon {
  fieldType: "input";
  type: "text" | "email" | "password";
}

export type Field = IFieldSelect | IFieldInput;

const ABOUT_FIELDS: Field[] = [
  {
    fieldType: "input",
    type: "text",
    name: "first_name",
    placeholder: "First name",
  },
  {
    fieldType: "input",
    type: "text",
    name: "last_name",
    placeholder: "Last name",
  },
  { fieldType: "select", name: "country_iso_code", placeholder: "Country" },
  {
    fieldType: "input",
    type: "text",
    name: "city_iso_code",
    placeholder: "City",
  },
];

export { ABOUT_FIELDS };
