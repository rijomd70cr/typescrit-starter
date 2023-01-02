import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import Module from '../../Modules';
import layoutReducer from '../../Layout/Reducer/LayoutSlice';



let reducer = {};
for (let item in Module) {
  let reducers = Module[item].reducer;
  reducer = {
    ...reducer,
    [item]: reducers
  }
};
if (Object.keys(reducer).length !== 0) {
  reducer = { ...reducer, layout: layoutReducer }
}

export const store = configureStore({
  reducer: reducer
});

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     layout: layoutReducer,
//   },
// });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
