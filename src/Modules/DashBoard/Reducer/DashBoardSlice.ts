import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
    Data: Array<object>;
}

const initialState: CounterState = {
    Data: [],
};

export const dashBoardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        list: (state, action: PayloadAction<Object>) => {
        },
    },
    extraReducers: () => {
    },
});

export const { list } = dashBoardSlice.actions;  //export actions
export default dashBoardSlice.reducer; //xport reducer
