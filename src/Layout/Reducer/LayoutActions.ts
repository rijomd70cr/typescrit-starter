import { RootState, AppThunk } from '../../Services/Store/Store';
import { openSideBar,setSelectedIndex } from './LayoutSlice';



export const getSelectedIndexAction = (state: RootState) => state.layout.selectedIndex;
export const setselectedIndexAction = (index: number): AppThunk =>
    (dispatch, getState) => {
        dispatch(setSelectedIndex(index));
    }


export const getSideBarStatus = (state: RootState) => state.layout.isSideBarOpen;
export const openSideBarAction = (status: Boolean): AppThunk =>
    (dispatch, getState) => {
        dispatch(openSideBar(status));
    }
