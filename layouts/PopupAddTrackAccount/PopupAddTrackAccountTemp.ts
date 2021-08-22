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
    name: "firstname",
    placeholder: "First name",
  },
  {
    fieldType: "input",
    type: "text",
    name: "lastname",
    placeholder: "Last name",
  },
  { fieldType: "select", name: "country", placeholder: "Country" },
  { fieldType: "input", type: "text", name: "city", placeholder: "City" },
];

export { ABOUT_FIELDS };
