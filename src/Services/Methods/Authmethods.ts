import { api_Development } from "../Config/ApiConstants";

export const ACCESS_TOKEN: string = "ACCESS_TOKEN";
export const AUTH_USER: string = "AUTH_USER";

export const getAuthToken = (): string => {
  return localStorage.getItem(ACCESS_TOKEN)
    ? "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    : "";
};

// EG :---------let options = await getRequestHeaders("POST", { title: "Pencil" });------------
export const getRequestHeaders = async (method: string, query: any) => {
  let headers: any = {
    "Content-Type": "application/json",
  };
  if (getAuthToken()) {
    headers["Authorization"] = getAuthToken();
  }
  const requestOptions: any = {
    headers: headers,
    method: method,
  };
  if (method !== "GET") {
    requestOptions["body"] = JSON.stringify(query);
  }
  return requestOptions;
};

export const getMyAPiUrl = (): string => {
  return api_Development;
};
