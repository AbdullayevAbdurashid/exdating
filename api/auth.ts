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

// type RestorePasswordRequests = {
//   enterField: any;
// }
// export const sendMail = async (emailPhone: any,) => {
//   const url = "/reset";
//   const requestBodys: RestorePasswordRequests = { enterField: emailPhone };

//   const response = await post(url, { requestBodys });

//   return response;
// };


type restorePass = {
  enterField: string,
  had: string
}
export const restorePass = async (
  enterField: string,
  has: string
) => {
  const response = await get(
    `/forgottenpass?enterField=${enterField}&has=${has}`)
  return response;
};
type RestorePasswordRequest = {
  enterField: string;
  code?: string;
};


export const restorePassword = async (
  enterField: string,
  restoreCode?: any
) => {
  const url = "/reset";
  const requestBody: RestorePasswordRequest = { enterField: enterField };
  if (restoreCode != null) {
    requestBody.code = restoreCode;
  }

  const response = await post<RestorePasswordResponse>(url, requestBody);

  return response;
};





export const resetPassword = async (password: string, token: string) => {
  const url = "/reset";

  const response = await post(url, { password, token });

  return response;
};