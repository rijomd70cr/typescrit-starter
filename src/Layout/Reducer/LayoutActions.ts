import { RootState, AppThunk } from "../../Services/Store/Store";
import { openSideBar, setSelectedIndex } from "./LayoutSlice";
import { ACCESS_TOKEN, AUTH_USER } from "../../Services/Methods/Authmethods";

export const getSelectedIndexAction = (state: RootState) =>
  state.layout.selectedIndex;
export const setselectedIndexAction =
  (index: number): AppThunk =>
  (dispatch, getState) => {
    dispatch(setSelectedIndex(index));
  };

export const getSideBarStatus = (state: RootState) =>
  state.layout.isSideBarOpen;
export const openSideBarAction =
  (status: Boolean): AppThunk =>
  (dispatch, getState) => {
    dispatch(openSideBar(status));
  };

export const logout = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(AUTH_USER);
};
