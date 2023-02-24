import { getMyAPiUrl } from "../../../Services/Methods/Authmethods";

export const signInUrl: string = getMyAPiUrl() + "/auth/signup";
export const loginUrl: string = getMyAPiUrl() + "/auth/login";
