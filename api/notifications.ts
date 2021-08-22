import { parseCookies } from "nookies";
import { GetServerSidePropsContext } from "next";

// Import UTILS
import { fetcher } from "utils";

// Import CONSTANTS
import { COMMON } from "const";

const {
  COOKIES: { TOKEN },
} = COMMON;
const { post, get, URLformatter } = fetcher;

type Filters = {
  page?: number;
  size?: number;
};

export const getNotifications = async (
  ctx: GetServerSidePropsContext | null,
  filters?: Filters
): Promise<
  | APIErrorResponse
  | APISucceedResponseWithData<Omit<NotificationsResponse, "status">>
  | { status: false }
> => {
  const token = parseCookies(ctx)[TOKEN];
  const url = `/notifications${
    filters != null
      ? URLformatter({ page: filters.page, size: filters.size })
      : ""
  }`;

  if (token) {
    const response = await get<NotificationsResponse>(url, token);
    return response;
  }

  return { status: false };
};

export const readtNotifications = async (notificationId: number) => {
  const cookies = parseCookies(null);
  const token = cookies[TOKEN];
  const url = `/notification/read`;
  const response = await post(url, { id: notificationId }, token);

  return response;
};
