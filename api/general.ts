// Import UTILS
import { fetcher } from "utils";

const { put, get } = fetcher;

export const getCountries = async () => {
  const response = await get<CountryResponse>("/country?size=999");

  return response;
};

export const getCities = async (city_iso_code?: string) => {
  const url = `/city?size=999999${
    city_iso_code != null ? `&isoCode=${city_iso_code}` : ""
  }`;

  console.log("getCities URL: ", url);

  const response = await get<CityResponse>(url);

  return response;
};

export const getPopularHashtags = async () => {
  const url = "/hashtags/popular";

  const response = await get<PopularHashtagsResponse>(url);

  return response;
};
