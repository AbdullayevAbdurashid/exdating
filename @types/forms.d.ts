/* REAL */
type FeedbackCommentForm = {
  message: string;
};

type LoginForm = {
  email_phone: string;
  password: string;
  remember_me: boolean;
};
type LoginRequestData = {
  enterField: string;
  password: string;
};
type CodeSignUp = {
  code: any;
}
type SignupForm = {
  email_phone: string;
  password: string;
  password_confirmation: string;
  termsconditions: boolean;
};
type SignupRequest = {
  enterField: string;
  password: string;
  password_confirmation: string;
};

type AvatarRequest = {
  file: any;
  type: "avatar";
};

type AddFeedbackFormValues = {
  title: string;
  description: string;
  first_name: string;
  last_name: string;
  city_iso_code: string;
  country_iso_code: string;
  hashtags: string;
  images: File[];
  is_anonymous: boolean;
  terms: boolean;
  is_draft: boolean;
};

/* OLD */

type PhoneConfirmationFormValues = {
  num1: string;
  num2: string;
  num3: string;
  num4: string;
};

type PasswordResetFormValues = {
  email: any;
  password: string;
  repeatpassword: string;
  code: any;
  email: string
};

type LoginSignupFormValues = {
  email_phone: string;
  password: string;
  remember_me: boolean;
  termsconditions: boolean;
  password_confirmation: string;
};

type EditProfileFormValues = {
  first_name: string | null;
  last_name: string | null;
  login: string | null;
  about_me: string | null;
  city_iso_code: string | null;
  country_iso_code: string | null;
  public_email: string | null;
  email_notification: boolean;
  phone_notification: boolean;
  // NOT EXISTED API
  email: string | null;
  social: string;
  socialmobile: string;
  socialnickname: string;
  socialnicknameurl: string;
  socialurl: string;
};

type ChangePasswordFormValues = {
  oldpassword: string;
  newpassword: string;
  repeatpassword: string;
};

type AddTrackAccountFormValues = {
  firstname: string;
  lastname: string;
  country: string;
  city: string;
};

type FeedbacksSearchQueryForm = {
  enterField: string;
  tags: string;
  sorted: SortFilter;
  countries: string[];
};

type CodeConfirmationForm = {
  code: string;
};
