interface IFieldCommon {
  name: string;
  label: string;
  placeholder?: string;
}

interface IFieldSelectTextarea extends IFieldCommon {
  fieldType: "select" | "textarea";
  type?: undefined;
}
interface IFieldInput extends IFieldCommon {
  fieldType: "input";
  type: "text" | "email" | "password";
}

type Field = IFieldSelectTextarea | IFieldInput;

const PERSONAL_FIELDS: Field[] = [
  { fieldType: "input", type: "text", name: "first_name", label: "First name" },
  { fieldType: "input", type: "text", name: "last_name", label: "Last name" },
  { fieldType: "input", type: "text", name: "login", label: "Login" },
  { fieldType: "input", type: "email", name: "email", label: "Email" },
  {
    fieldType: "select",
    name: "country_iso_code",
    label: "Country",
    placeholder: "Country",
  },
  {
    fieldType: "input",
    type: "text",
    name: "city_iso_code",
    label: "City",
    placeholder: "City",
  },
  { fieldType: "textarea", name: "about_me", label: "About me" },
];

export type ProfileNavIcon = "human" | "share" | "lock" | "bell";

type ProfileNav = {
  label: string;
  icon: ProfileNavIcon;
};

const NAV_LIST: ProfileNav[] = [
  { label: "Personal Information", icon: "human" },
  { label: "Social networks", icon: "share" },
  { label: "Change password", icon: "lock" },
  { label: "Notifications", icon: "bell" },
];

export { PERSONAL_FIELDS, NAV_LIST };
