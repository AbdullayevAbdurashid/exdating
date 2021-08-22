// TAGS
type Tag = {
  id: string;
  tag: string;
};
// BASIC TYPES
type ExImage = {
  id: string;
  original: string;
};
type CustomTime = {
  hour: number;
  minutes: number;
};
type CustomDate = {
  year: number;
  month: number;
  date: number;
};
type FullDate = CustomDate & CustomTime;

type NavLink = { id: string; name: string; linkTo: string };
type Language = { id: string; name: string; shortсut: string };
type SocialLink = { name: SocialTypes; linkTo: string };
type CommentPreview = {
  id: string;
  comment: string;
  feedback: {
    id: number;
    title: string;
  };
};

type UserComment = {
  id: string;
  message: string;
  user: UserCommon & {
    message: string;
  };
  reply: Array<UserComment>;
};

type FeedbackMock = any;

// CHAT TYPES
type UserCommon = {
  id: string;
  avatar: string;
  name: {
    first: string;
    last: string;
  };
  email: string;
  location: { country: string; city: string };
  createDate: string;
  description: string;
  tag: string;
  banStatus: boolean;
  stats: {
    feedbacks: number;
    comments: number;
    followers: number;
    following: number;
  };
  socialLinks: { name: string; linkTo: string; nickname: string }[];
  feedbacks: FeedbackMock[];
  drafts?: FeedbackMock[];
};

type ChatMock = { id: string; conversation: ChatConversation[] };

type ChatConversation = { date: CustomDate; messages: ChatMessage[] };
type ChatMessage = {
  id: string;
  self: boolean;
  time: CustomTime;
  text: string;
};

type GroupedLink = { groupName: string; linkList: NavLink[] };
type HeaderContent = {
  linkList: NavLink[];
  languagesList: Language[];
};
type FooterContent = {
  groupedLinksList: GroupedLink[];
  socialList: SocialLink[];
};
type CommonContent = {
  header: HeaderContent;
  footer: FooterContent;
};
