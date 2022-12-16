import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import Module from '../../Modules';
import authReducer from '../../Modules/Auth/Reducer/AuthSlice';
import layoutReducer from '../../Layout/Reducer/LayoutSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    layout: layoutReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
