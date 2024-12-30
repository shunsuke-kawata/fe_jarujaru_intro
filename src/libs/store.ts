import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "@/libs/userReducer";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

// Storeの状態を取得する関数
export const selectUser = (state: RootState) => state.user;
