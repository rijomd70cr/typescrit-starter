
export const ACCESS_TOKEN: string = "ACCESS_TOKEN";
export const AUTH_USER: string = "AUTH_USER";

export const getAuthToken = (): string => {
    return localStorage.getItem(ACCESS_TOKEN) ? 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) : "";
}

