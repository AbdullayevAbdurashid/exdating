import { object, string, boolean } from "yup";

const loginSchema = object().shape({
  email_phone: string().required(),
  password: string().required(),
  remember_me: boolean(),
});

const signupSchema = object().shape({
  email_phone: string().required(),
  password: string().min(8).required(),
  password_confirmation: string()
    .required()
    .test("match", "Passwords do not match", function cb(password) {
      return password === this.parent.password;
    }),
  termsconditions: boolean().test(
    "isChecked",
    "Must Accept Terms and Conditions",
    function cb(checkState) {
      return checkState === true;
    }
  ),
});

const forgotPassword = object().shape({
  email: string().required().email(),

});
const resetPassword = object().shape({
  password: string().required(),
  repeatpassword: string()
    .required()
    .test("match", "Passwords do not match", function cb(password) {
      return password === this.parent.password;
    }),
});
const changePasswordSchema = object().shape({
  oldpassword: string().required(),
  newpassword: string().required(),
  repeatpassword: string()
    .required()
    .test("match", "Passwords do not match", function cb(password) {
      return password === this.parent.newpassword;
    }),
});

const createNewFeedbackSchema = object().shape({
  title: string().required(),
  is_draft: boolean(),
  country_iso_code: string().when("is_draft", {
    is: true,
    then: string(),
    otherwise: string().required(),
  }),
  city_iso_code: string().when("is_draft", {
    is: true,
    then: string(),
    otherwise: string().required(),
  }),
  terms: boolean().when("is_draft", {
    is: true,
    then: boolean(),
    otherwise: boolean().oneOf([true], "Field must be checked"),
  }),
});

const codeConfirmSchema = object().shape({
  code: string().required().min(4).max(4),
});

const valdationSchemas = {
  loginSchema,
  signupSchema,
  forgotPassword,
  resetPassword,
  changePasswordSchema,
  createNewFeedbackSchema,
  codeConfirmSchema,
};

export default valdationSchemas;
