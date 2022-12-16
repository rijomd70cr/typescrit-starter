
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
    isSideBarOpen: Boolean;
    selectedIndex: number;
}
const initialState: CounterState = {
    isSideBarOpen: false,
    selectedIndex: 0
};
export const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        openSideBar: (state, action: PayloadAction<Boolean>) => {
            state.isSideBarOpen = action.payload;
        },
        setSelectedIndex: (state, action: PayloadAction<number>) => {
            state.selectedIndex = action.payload;
        }
    },
});

export const { openSideBar, setSelectedIndex } = layoutSlice.actions;
export default layoutSlice.reducer; 
