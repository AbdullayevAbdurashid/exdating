// Import UTILS
import { fetcher, helpers } from "utils";

const { post } = fetcher;

export const searchGlobal = async () => {
  const response = await post<SearchGlobalResponse>(`/search`, {});

  return response;
};

export const searchByCountry = async () => {
  return null;
};
