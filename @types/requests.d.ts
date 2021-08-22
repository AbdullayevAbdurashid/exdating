type CommentRequest = {
  feedback_id: number;
  text: string;
};

type ChangePasswordRequest = {
  password: string;
  newPassword: string;
};

type AddFeedbackRequest = {
  title: string;
  description: string;
  preview: string;
  country_iso_code: string;
  city_iso_code: string;
  hashtags?: Hashtag[];
  images?: { file: File }[];
  social_networks?: { network: string; nickname: string; url: string }[];
  is_draft: FakeBoolean;
  is_anonymous: FakeBoolean;
};

type TrackingRequest = {
  city_iso_code?: string;
  country_iso_code?: string;
  network: string;
  nickname: string;
  url?: string;
};
type TrackingUpdateRequest = {
  id: number;
  city_iso_code?: string;
  country_iso_code?: string;
  network?: string;
  nickname?: string;
  url?: string;
};

type EditProfileRequest = {
  last_name?: string | null;
  first_name?: string | null;
  login?: string | null;
  about_me?: string | null;
  public_email?: string | null;
  email_notification?: FakeBoolean;
  phone_notification?: FakeBoolean;
};
