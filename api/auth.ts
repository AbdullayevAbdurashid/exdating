// Import UTILS
import { fetcher } from "utils";

const { put, get, post } = fetcher;

export const login = async (data: LoginRequestData) => {
  const response = await post<AuthResponse>("/auth", data);

  return response;
};

export const signup = async (data: SignupRequest) => {
  const response = await post<SignupResponse>("/registration", data);

  return response;
};

export const verify = async (enterField: string, has: string) => {
  const response = await get(
    `/verification?enterField=${enterField}&has=${has}`
  );

  return response;
};

type RestorePasswordRequest = {
  enterField: string;
  code?: string;
};

type restorePass = {
  enterField: string,
  had: string
}
export const restorePassword = async (
  emailPhone: string,
  restoreCode?: string
) => {
  const url = "/reset";
  const requestBody: RestorePasswordRequest = { enterField: emailPhone };

  if (restoreCode != null) {
    requestBody.code = restoreCode;
  }

  const response = await post<RestorePasswordResponse>(url, requestBody);

  return response;
};
export const restorePass = async (
  enterField: string,
  has: string
) => {
  const response = await get(
    `/forgottenpass?enterField=${enterField}&has=${has}`)
  return response;
};
export const resetPassword = async (code: any, password: string, enterField: any) => {
  const url = "/reset";

  const response = await post(url, { code, password, enterField });

  return response;
};
// /?enterField=marvel20182019@gmail.com&has=4702