import { parseCookies } from "nookies";
import { GetServerSidePropsContext } from "next";

// Import UTILS
import { fetcher, helpers } from "utils";

// Import CONSTANTS
import { COMMON } from "const";

const { put, get, del, post } = fetcher;
const { buildFormData } = helpers;
const {
  COOKIES: { TOKEN },
} = COMMON;

export const createFeedback = async (data: AddFeedbackRequest) => {
  const cookies = parseCookies(null);
  const token = cookies[TOKEN];

  const formData = new FormData();

  buildFormData(formData, data);

  const response = await post<SucceedDefaultResponse>(
    "/feedback",
    formData,
    token,
    { "Content-Type": "multipart/form-data" }
  );

  return response;
};

export const getFeedback = async (
  id: string,
  ctx?: GetServerSidePropsContext
) => {
  const token = parseCookies(ctx)[TOKEN];
  const response = await get<FeedbackResponse>(`/feedback/${id}`, token);

  return response;
};

export const getAllFeedbacks = async () => {
  const response = await get<FeedbacksAllResponse>(`/feedbacks`);

  return response;
};

export const getBestFeedbacks = async () => {
  const response = await get<FeedbackBestResponse>(`/feedback/best`);

  return response;
};

export const likeFeedback = async (id: number) => {
  const cookies = parseCookies(null);
  const token = cookies[TOKEN];
  const response = await get<FeedbackLikeResponse>(
    `/feedback/${id}/like`,
    token
  );

  return response;
};

export const notDecideFeedback = async (id: number) => {
  const cookies = parseCookies(null);
  const token = cookies[TOKEN];
  const response = await get<FeedbackNotDecideResponse>(
    `/feedback/${id}/notDecide`,
    token
  );

  return response;
};

export const dislikeFeedback = async (id: number) => {
  const cookies = parseCookies(null);
  const token = cookies[TOKEN];
  const response = await get<FeedbackDislikeResponse>(
    `/feedback/${id}/dislike`,
    token
  );

  return response;
};
