import { parseCookies } from "nookies";
import { GetServerSidePropsContext } from "next";

// Import UTILS
import { fetcher, helpers } from "utils";

// Import CONSTANTS
import { COMMON } from "const";

const {
  COOKIES: { TOKEN },
} = COMMON;
const { post, get, del, put, URLformatter } = fetcher;

type Filters = {
  page?: number;
  size?: number;
};

export const getTracks = async (
  ctx: GetServerSidePropsContext | null,
  filters?: Filters
) => {
  const cookies = parseCookies(ctx);
  const token = cookies[TOKEN];
  const url = `/tracking${
    filters != null
      ? URLformatter({ page: filters.page, size: filters.size })
      : ""
  }`;
  const response = await get<TrackingResponse>(url, token);

  return response;
};

export const updateTrack = async (data: TrackingUpdateRequest) => {
  const cookies = parseCookies(null);
  const token = cookies[TOKEN];
  const response = await put<SucceedDefaultResponse>(`/tracking`, data, token);

  return response;
};

export const addTrack = async (data: TrackingRequest) => {
  const cookies = parseCookies(null);
  const token = cookies[TOKEN];
  const response = await post<AddTrackingResponse>(`/tracking`, data, token);

  return response;
};

export const deleteTrack = async (trackId: number) => {
  const cookies = parseCookies(null);
  const token = cookies[TOKEN];
  const url = `/tracking/${trackId}`;
  const response = await del(url, token);

  return response;
};
