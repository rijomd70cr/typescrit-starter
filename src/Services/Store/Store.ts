import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import logger from "redux-logger";

import Module from "../../Modules";
import layoutReducer from "../../Layout/Reducer/LayoutSlice";

// Adding reducers of each modules
let reducer = {};
for (let item in Module) {
  let reducers = Module[item].reducer;
  reducer = {
    ...reducer,
    [item]: reducers,
  };
}
if (Object.keys(reducer).length !== 0) {
  reducer = { ...reducer, layout: layoutReducer };
}

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
