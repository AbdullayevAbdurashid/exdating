// SERVER ERROR RESPONSES
interface ServerErrorResponse {
  status: false;
  error?: {
    messages:
      | string
      | {
          [key: string]: string[];
        };
  };
}

// SERVER SUCCEED RESPONSES
interface ServerSucceedDefaultResponse {
  status: true;
}
interface ServerSucceedDataResponse<D> extends ServerSucceedDefaultResponse {
  data: D;
}

// SERVER RESPONSES
type ServerDataResponse<D> = ServerSucceedDataResponse<D> | ServerErrorResponse;
type ServerResponse<D> = D | ServerErrorResponse;

// API RESPONSE
interface APISucceedResponseDefault {
  status: true;
}
interface APIErrorResponseDefault {
  status: false;
}
interface APISucceedResponseWithData<T> extends APISucceedResponseDefault {
  payload: T;
}
interface APIErrorResponse extends APIErrorResponseDefault {
  message?: string;
  unhandledError?: Error;
}
type APIFailResponse = APIErrorResponse;
type APIResponse = APISucceedResponseDefault | APIFailResponse;
type APIResponseWithData<T extends ServerSucceedDefaultResponse> =
  | APISucceedResponseWithData<Omit<T, "status">>
  | APIFailResponse;

// RESPONSE
interface ResponseWithData<Data> extends ServerSucceedDefaultResponse {
  data: Data;
}

interface ResponseWithDataList<Data> extends ResponseWithData<Data> {
  current_page: number;
  first_page_url: string;
  from: number;
  next_page_url: null | string;
  path: string;
  per_page: number;
  prev_page_url: null | string;
  to: number;
}
