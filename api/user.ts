import { GetServerSidePropsContext } from "next";
import { parseCookies, destroyCookie } from "nookies";

// Import UTILS
import { fetcher, helpers } from "utils";
import type { URLParameters } from "utils/fetchers";

// Import CONSTANTS
import { COMMON } from "const";

const { put, get, del, post, URLformatter } = fetcher;
const { dataURItoBlob } = helpers;
const {
  COOKIES: { TOKEN },
} = COMMON;

export const changeUserProfile = async (data: EditProfileRequest) => {
  const token = parseCookies(null)[TOKEN];
  const response = await post<APISucceedResponseDefault>("/user", data, token);

  return response;
};

export const setUserAvatar = async (avatarCanvas: HTMLCanvasElement) => {
  const token = parseCookies(null)[TOKEN];
  const formData = new FormData();

  console.log("avatarCanvas: ", avatarCanvas.toDataURL());

  formData.append("type", "avatar");
  formData.append("file", dataURItoBlob(avatarCanvas.toDataURL()));

  const response = await post<AvatarResponse>(
    "/dropzone/storage",
    formData,
    token,
    { "Content-Type": "multipart/form-data" }
  );

  return response;
};

export const getSelf = async (ctx?: GetServerSidePropsContext) => {
  const token = parseCookies(ctx)[TOKEN];

  if (token == null) {
    const response: APIFailResponse = {
      status: false,
      message: "unauthtorized",
    };
    return response;
  }

  const response = await get<SelfResponse>("/user", token);

  return response;
};

export const getUser = async (userId: string) => {
  const response = await get<UserProfileResponse>(`/user/${userId}`);

  return response;
};

export const deleteSelf = async (ctx?: GetServerSidePropsContext) => {
  const token = parseCookies(ctx)[TOKEN];
  const response = await del("/user", token);

  if (response.status) {
    destroyCookie(ctx, TOKEN);
  }

  return response;
};

export const getTopUsers = async (page?: number, size?: number) => {
  const url = `/user/top${URLformatter({ page, size })}`;
  const response = await get<TopUserResponse>(url);

  return response;
};

export const changeUserPassword = async (
  data: ChangePasswordRequest,
  ctx?: GetServerSidePropsContext
) => {
  const url = `/user/password`;
  const token = parseCookies(ctx)[TOKEN];
  const response = await post<SucceedDefaultResponse>(url, data, token);

  return response;
};

export const subscribeToUser = async (
  userId: number,
  ctx?: GetServerSidePropsContext
) => {
  const token = parseCookies(ctx)[TOKEN];
  const url = `/subscribe/${userId}`;
  const response = await get<SucceedDefaultResponse>(url, token);

  return response;
};

export const unsubscribeFromUser = async (
  userId: number,
  ctx?: GetServerSidePropsContext
) => {
  const token = parseCookies(ctx)[TOKEN];
  const url = `/unsubscribe/${userId}`;
  const response = await get<SucceedDefaultResponse>(url, token);

  return response;
};

// TODO Исправить url для getSelfSubscriptions и getSelfSubscribers когда бек поправит
export const getSelfSubscriptions = async (
  ctx?: GetServerSidePropsContext | null,
  queries?: URLParameters
) => {
  const url = `/subscriptions${URLformatter(queries)}`;
  const token = parseCookies(ctx)[TOKEN];

  const response = await get<SubscriptionListResponse>(url, token);

  return response;
};

export const getSelfSubscribers = async (
  ctx?: GetServerSidePropsContext,
  queries?: URLParameters
) => {
  const url = `/subscribers${URLformatter(queries)}`;
  const token = parseCookies(ctx)[TOKEN];
  const response = await get<SubscribersListResponse>(url, token);

  return response;
};
