import { RootState, AppThunk } from '../../../Services/Store/Store';
import { login, signIn } from './AuthSlice';


export const loginAction = (status: boolean): AppThunk =>
    (dispatch, getState) => {
        dispatch(login(status));
    }

export const getAuthAction = (state: RootState) => state.auth.auth;


export const signUpAction = (data: Object): AppThunk =>
    (dispatch, getState) => {
        dispatch(signIn(data));
    }
