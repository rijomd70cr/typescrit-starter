import { RootState, AppThunk } from '../../../Services/Store/Store';
import { login } from './AuthSlice';


export const loginAction = (status: boolean): AppThunk =>
    (dispatch, getState) => {
        dispatch(login(status));
    }

export const getAuthAction = (state: RootState) => state.auth.auth;
