import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserScoreState {
  playNum: number | null;
  correctNum: number | null;
  inCorrectNum: number | null;
}

// スコアの初期値
const initialState: UserScoreState = {
  playNum: null,
  correctNum: null,
  inCorrectNum: null,
};

const userScoreSlice = createSlice({
  name: "userScoreSlice",
  initialState,
  reducers: {
    setUserScore: (state, action: PayloadAction<UserScoreState>) => {
      state.playNum = action.payload.playNum;
      state.correctNum = action.payload.correctNum;
      state.inCorrectNum = action.payload.inCorrectNum;
    },
  },
});

export const { setUserScore } = userScoreSlice.actions;
export const userScoreReducer = userScoreSlice.reducer;
