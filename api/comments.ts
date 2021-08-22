import { parseCookies } from "nookies";

// Import UTILS
import { fetcher } from "utils";

// Import CONSTANTS
import { COMMON } from "const";

const { put, get, del, post } = fetcher;
const {
  COOKIES: { TOKEN },
} = COMMON;

export const setFeedbackComment = async (commentData: CommentRequest) => {
  const token = parseCookies(null)[TOKEN];

  const response = await post<SucceedDefaultResponse>(
    "/comment",
    commentData,
    token
  );

  return response;
};

export enum TABS {
  LAST = "l",
  DAY = "d",
  WEEK = "w",
  MONTH = "m",
}

export function setBestCommentsURL(type?: TABS | null) {
  const defaultUrl = "/comment/best";

  switch (type) {
    case TABS.DAY:
    case TABS.WEEK:
    case TABS.MONTH:
    case TABS.LAST:
      return `${defaultUrl}?type=${type}`;
    default:
      return defaultUrl;
  }
}

export const getbestComments = async (type?: TABS | null, size?: number) => {
  let url = setBestCommentsURL(type);

  if (size != null) {
    const prefix = type != null ? "&" : "?";
    url = `${url}${prefix}size=${size}`;
  }

  const response = await get<BestCommentsResponse>(url);

  return response;
};
