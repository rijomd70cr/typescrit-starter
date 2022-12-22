import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
    auth: boolean;
}

const initialState: CounterState = {
    auth: false,
};

export const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<boolean>) => {
            state.auth = action.payload
        },
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: () => {
    },
});

export const { login } = authSlice.actions;  //export actions
export default authSlice.reducer; //xport reducer
