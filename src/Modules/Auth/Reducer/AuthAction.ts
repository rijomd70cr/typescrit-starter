import { RootState, AppThunk } from '../../../Services/Store/Store';
import { login, signIn } from './AuthSlice';
import { ACCESS_TOKEN, AUTH_USER } from "../../../Services/Methods/Authmethods";

export const loginAction =
  (data: { access_token: string; user: object }, auth: boolean): AppThunk =>
  (dispatch, getState) => {
    dispatch(login(auth));
    localStorage.setItem(AUTH_USER, JSON.stringify(data.user));
    localStorage.setItem(ACCESS_TOKEN, data.access_token);
  };
export const getAuthAction = (state: RootState) => state.auth.auth;


export const signUpAction = (data: Object): AppThunk =>
    (dispatch, getState) => {
        dispatch(signIn(data));
    }
