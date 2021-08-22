import axios, { AxiosRequestConfig } from "axios";
import { parseCookies } from "nookies";

// Import CONSTANTS
import { COMMON } from "const";

const {
  COOKIES: { TOKEN },
} = COMMON;

const defaultHeader = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const get = <T extends ServerSucceedDefaultResponse>(
  url: string,
  token?: string
) =>
  new Promise<APIResponseWithData<T>>((resolve) => {
    const headers = token
      ? {
          headers: { ...defaultHeader, Authorization: `Bearer ${token}` },
        }
      : { headers: defaultHeader };

    axios
      .get<ServerResponse<T>>(`${process.env.REST_API}${url}`, headers)
      .then((response) => {
        if (response.data.status === true) {
          const { status, ...otherData } = response.data;

          resolve({ status, payload: otherData });
        } else if (response.data.status === false) {
          const { data: errorData } = response;

          resolve(resolveErrorResponse(errorData));
        } else {
          // TODO remove this after api was fixed
          resolve({ status: true, payload: response.data });
        }
      })
      .catch((err) => {
        console.warn("Unhandled server error: ", err.response);
        resolve({ status: false, unhandledError: err });
      });
  });

export const post = <T extends ServerSucceedDefaultResponse>(
  url: string,
  data: any,
  token?: string,
  headers?: any
) =>
  new Promise<APIResponseWithData<T>>((resolve) => {
    const config: AxiosRequestConfig = {
      headers: {
        ...headers,
      },
    };

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    axios
      .post<ServerResponse<T>>(`${process.env.REST_API}${url}`, data, config)
      .then((response) => {
        console.log("POST response: ", response);
        if (response.data.status === true) {
          const { status, ...otherData } = response.data;

          resolve({ status, payload: otherData });
        } else {
          const { data: errorData } = response;

          resolve(resolveErrorResponse(errorData));
        }
      })
      .catch((err) => {
        console.warn("Unhandled server error: ", err);
        resolve({ status: false, unhandledError: err });
      });
  });

export const put = <T extends ServerSucceedDefaultResponse>(
  url: string,
  data: any,
  token?: string
) =>
  new Promise<APIResponseWithData<T>>((resolve) => {
    const headers = token
      ? {
          headers: { ...defaultHeader, Authorization: `Bearer ${token}` },
        }
      : { headers: defaultHeader };

    axios
      .put<ServerDataResponse<T>>(
        `${process.env.REST_API}${url}`,
        data,
        headers
      )
      .then((response) => {
        if (response.data.status === true) {
          resolve({ status: true, payload: response.data.data });
        } else {
          const { data: errorData } = response;

          resolve(resolveErrorResponse(errorData));
        }
      })
      .catch((err) => {
        console.log("PUT error: ", err);
        resolve({ status: false, unhandledError: err });
      });
  });

export const del = (url: string, token?: string) =>
  new Promise<APIResponse>((resolve) => {
    axios
      .delete(
        `${process.env.REST_API}${url}`,
        token
          ? {
              headers: { Authorization: `Bearer ${token}` },
            }
          : undefined
      )
      .then((response) => {
        if (response.data.status === true) {
          const { status } = response.data;

          resolve({ status });
        } else {
          const { data: errorData } = response;

          resolve(resolveErrorResponse(errorData));
        }
      })
      .catch((err) => {
        console.warn("Unhandled server error: ", err);
        resolve({ status: false, unhandledError: err });
      });
  });

export type URLParameters = { size?: number; page?: number };
export const URLformatter = (queries?: URLParameters) => {
  if (queries == null) {
    return "";
  }

  const parameterNameList = Object.keys(queries);
  const formattedURLList: string[] = [];

  parameterNameList.forEach((parameterName, index) => {
    const parameterValue = queries[parameterName as keyof URLParameters];

    if (parameterValue != null) {
      let prefix = "&";

      if (formattedURLList.length === 0) {
        prefix = "?";
      }

      formattedURLList[index] = `${prefix}${parameterName}=${parameterValue}`;
    }
  });

  return formattedURLList.join("");
};

export const getFetcherSWR = <T extends ServerSucceedDefaultResponse>(
  url: string
) => {
  const token = parseCookies(null)[TOKEN];

  // console.log("getFetcherSWR: ", url);

  return get<T>(url, token);
};
export const postFetcherSWR = <T extends ServerSucceedDefaultResponse>(
  url: string,
  data: any
) => {
  const token = parseCookies(null)[TOKEN];

  // console.log("postFetcherSWR: ", data);

  return post<T>(url, data, token);
};

function resolveErrorResponse(error: ServerErrorResponse): APIFailResponse {
  if (error.error) {
    if (typeof error.error.messages === "string") {
      return { status: false, message: error.error.messages };
    }

    let errorMessage = "";
    const { messages } = error.error;
    const errorFieldList = Object.keys(messages);

    errorFieldList.forEach((errorField, index) => {
      if (index !== 0) {
        errorMessage = `${errorMessage}; `;
      }

      errorMessage = `${errorMessage}${errorField}: ${messages[errorField].join(
        ", "
      )}`;
    });

    return { status: false, message: errorMessage };
  }

  return { status: false, message: "Something went wrong" };
}
