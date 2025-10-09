import { createSlice } from "@reduxjs/toolkit";
import type { UserInfo } from "../../types";

type UIState = {
  showRegister: boolean;
  userInfo: UserInfo | undefined;
};

const uiSlice = createSlice({
  name: "ui",
  initialState: { showRegister: false } as UIState,
  reducers: {
    openRegister: (state) => {
      state.showRegister = true;
    },
    closeRegister: (state) => {
      state.showRegister = false;
    },
    updateUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    resetUserInfo: (state) => {
      state.userInfo = undefined;
    },
  },
});

export const { openRegister, closeRegister, updateUserInfo, resetUserInfo } =
  uiSlice.actions;
export default uiSlice.reducer;
