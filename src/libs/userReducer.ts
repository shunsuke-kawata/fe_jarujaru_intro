import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface LoginUserState {
  userId: string;
  username: string;
}

//ユーザ情報の初期値
const initialState: LoginUserState = {
  userId: "",
  username: "",
};

const loginedUserSlice = createSlice({
  name: "userSlice",
  initialState,

  //渡ってきたアクションを元にStoreの状態を変更する
  reducers: {
    setLoginedUser: (state, action: PayloadAction<LoginUserState>) => {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
    },
  },
});

export const { setLoginedUser } = loginedUserSlice.actions;
export const userReducer = loginedUserSlice.reducer;
