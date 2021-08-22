// USER
type SUSerRolesTypes = "authenticated" | "public";
type SUserRoles = {
  id: number;
  name: string;
  description: string;
  type: SUSerRolesTypes;
};
interface SUser {
  blocked: null | boolean;
  confirmed: boolean;
  created_at: string;
  email: string;
  id: number;
  phone: null | string;
  updated_at: string;
  username: string;
  role: SUserRoles;
}
interface DUserCommon {
  id: string;
  first_name: string | null;
  last_name: string | null;
  description: string | null;
  avatar: string | null;
  social_networks: SocialNetworks[];
  country: {
    id: string;
    name: string;
    iso2: string;
  };
  city: {
    id: string;
    name: string;
    country_id: string;
  };
}
interface DUserEmail extends DUserCommon {
  email: string;
  phone?: string;
}
interface DUserPhone extends DUserCommon {
  email?: string;
  phone: string;
}
type DUser = DUserEmail | DUserPhone;

// SOCIAL NETWORKS
type SocialTypes =
  | "youtube"
  | "twitter"
  | "facebook"
  | "instagram"
  | "apple"
  | "vk"
  | "google";
type SocialNetworks = {
  id: string;
  type: SocialTypes;
  link: string;
};

// COMMENTS
type DComment = {
  id: string;
  text: string;
  date_created: Date;
  user_id: DUser;
  reply_to: null | { id: string };
  replies: DComment[];
};

// FEEDBACK
interface DFeedback {
  id: string;
  status: DPublishStatus;
  a_users: DUser[];
  created_at: Date;
  updated_at: Date;
  title: string;
  content: string;
  images: Image[];
  tags: {
    tags_id: Tag;
  }[];
  translations: string[];
  comments: Comment[];
}

// RESPONSE
type SAuthResponse = {
  jwt: string;
  user: SUser;
};

interface StrapiErrorBadRequest extends StrapiResponse {
  status: 400;
  data: {
    error: string;
    statusCode: 400;
    message: { messages: StrapiErrorMessages }[];
    data: { messages: StrapiErrorMessages }[];
  };
}
interface StrapiErrorUnauthorized extends StrapiResponse {
  status: 401;
  data: {
    error: string;
    statusCode: 401;
    message: string;
  };
}

type StrapiErrorResponse = StrapiErrorBadRequest | StrapiErrorUnauthorized;

// REQUEST
type RegistrationRequest = {
  username: string;
  email?: string;
  password: string;
  phone?: string;
};

type AuthRequest = {
  identifier: string;
  password: string;
};
