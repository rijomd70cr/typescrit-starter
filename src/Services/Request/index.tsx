import { api_Development } from "../Config/ApiConstants";
import { getAuthToken } from "../Methods/Authmethods";
import axios from "axios";

// **********************************************************************************
// USE useFetchWithAbort FROM HOOKS IN SERVICE INSTEAD OF THIS
// **********************************************************************************
interface Params {
  headers: any;
  method: string;
}
export const requestMethod = async (
  url: string,
  data: any,
  method: string
): Promise<any> => {
  let baseUrl: string = `${api_Development}/${url}`;
  let headers: any = {
    "Content-Type": "application/json",
  };
  if (getAuthToken()) {
    headers["Authorization"] = getAuthToken();
  }

  const requestOptions: Params = {
    headers: headers,
    method: method,
  };
  return await axios({
    ...requestOptions,
    url: baseUrl,
    data,
  })
    .then((response: any) => {
      return {
        status: response.status,
        data: response.data,
      };
    })
    .catch((error: any) => {
      console.error(error);
      return {
        status: error.status,
        data: error.response,
      };
    });
};

// **********************************************************************************
// USE useFetchWithAbort FROM HOOKS IN SERVICE INSTEAD OF THIS
// **********************************************************************************
