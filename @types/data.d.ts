type Like = {
  like: boolean;
};
type NotDecide = {
  not_decide: boolean;
};
type Dislike = {
  dislike: boolean;
};

interface ECommentBase {
  id: number;
  feedback_id: number;
  // answer_comment_id: null | number;
  feedback: FeedbackForComment;
  text: string;
  created_at: string;
  updated_at: string;
  likes_count: number;
  user_id: number;
  file_url: null | string;
  user: UserBase & {
    public_email: string;
  };
}

interface EComment extends ECommentBase {
  reply: any[];
}

type Image = {
  file: File;
};

type Hashtag = {
  name: string;
};
type HashtagPopular = {
  name: "#LOVE";
  popular: 4;
};

type Social = {
  network: string;
  nickname: string;
  url: string;
};

interface UserBase {
  id: number;
  login: null | string;
  last_name: null | string;
  first_name: null | string;
  avatar_url: null | string;
}

interface UserTop extends UserBase {
  city_iso_code: string | null;
  country_iso_code: string | null;
  country: { isoCode: string; name: string } | null; // ??
  feedbacks_count: number;
  about_me: null | string;
  created_at: string;
  email: string;
  email_verified_at: null | string;
  phone_verified_at: null | string;
  public_email: null | string;
}

type UserProfile = Omit<UserTop, "country"> & {
  avatar: string;
  role_id: null | number;
  settings: null;
  comments_count: number;
  feedbacks: FeedbackBase[];
  my_subscribers_count: number;
  subscribers_count: number;
  // ???
  socialLinks?: [];
  banStatus?: boolean;
};

type UserSelf = Omit<UserTop, "feedbacks_count"> & {
  notifications_count: number;
  subscribers_count: number;
  my_subscribers_count: number;
  notifications: [];
  feedbacks: FeedbackBase[];
  comments_count: number;
  avatar: string;
  email_notification: FakeBoolean;
  network: [];
  phone: null | string;
  phone_notification: FakeBoolean;
  role_id: null | number;
  settings: null; // ???
  subscribers: Omit<UserSubscriber, "user">[];
  banStatus?: boolean; // remove this
  feedbacks_count?: number; // remove this
};

type ImageFeedback = {
  created_at: string;
  id: number;
  toppable_id: number;
  toppable_type: string;
  updated_at: string;
  url: string;
};

interface FeedbackBase {
  id: number;
  city_iso_code: string;
  country_iso_code: string;
  created_at: string;
  updated_at: string;
  description: string;
  preview: string;
  title: string;
  user_id: number;
  // TODO fake image field
  image?: ImageFeedback[] | ImageFeedback;
}

type FeedbackForComment = Omit<
  FeedbackBase,
  | "city_iso_code"
  | "country_iso_code"
  | "created_at"
  | "updated_at"
  | "user_id"
  | "image"
> & { locale: string; locale_def: string };

interface FeedbackSearch extends FeedbackBase {
  comments_count?: number;
  dislikes_count?: number;
  hashtags_count?: number;
  is_anonymous?: FakeBoolean;
  is_draft?: FakeBoolean;
  like?: false;
  likes_count?: number;
  not_decide_count?: number;
  not_decide?: boolean;
  locale?: string;
  locale_def?: string;
  user?: UserBase;
  views_count?: number;
}

interface Feedback extends FeedbackBase {
  country: { isoCode: string; name: string };
  comments: EComment[];
  comments_count: number;
  first_name?: string;
  last_name?: string;
  hashtag: null | string;
  hashtags: Hashtag[];
  is_anonymous: FakeBoolean;
  is_draft: FakeBoolean;
  like?: boolean;
  likes_count: number;
  dislikes_count: number;
  dislike?: boolean;
  not_decide_count: number;
  not_decide?: boolean;
  views_count?: number;
  images: any[];
  networks: Social[];
  user: UserBase;
  locale: string;
  locale_def: string;
}
interface FeedbackBest extends FeedbackBase {
  likes_count: number;
  dislikes_count: number;
  dislike: boolean;
  views_count: number;
  not_decide_count: number;
  not_decide: boolean;
  networks: Social[];
  images: any[];
  comments_count: number;
  hashtags_count: number;
  is_anonymous: FakeBoolean;
  is_draft: FakeBoolean;
  user: UserBase;
}

type Country = {
  code: string;
  code3: string;
  isoCode: string;
  name: string;
  area: number;
  continent: string;
  currency: string;
  fipsCode: string;
  geonamesCode: number;
  landlineFormat: null | string;
  language: string;
  mobileFormat: null | string;
  numericCode: string;
  phonePrefix: string;
  population: number;
  trunkPrefix: null | string;
};
type CountryFormatted = {
  id: string;
  value: string;
};

type City = {
  code: number;
  fipsCode: string;
  geonamesCode: number;
  isoCode: string;
  name: string;
  postCodes: null;
};
type CityFormatted = {
  id: string;
  value: string;
};

type TrackAccount = {
  id: number;
  city_iso_code: null | string;
  country_iso_code: null | string;
  user_id: number;
  network: string;
  nickname: string;
  url: null | string;
  created_at: string;
  updated_at: string;
};

type UserSubscription = {
  id: number;
  created_at: string;
  sub_user: UserTop;
  sub_user_id: number;
  updated_at: string;
  user_id: number;
};

type UserSubscriber = {
  created_at: string;
  id: number;
  sub_user_id: number;
  updated_at: string;
  user: UserTop;
  user_id: number;
};

type RestorePasswordConfirmationCode = {
  token?: string;
};
