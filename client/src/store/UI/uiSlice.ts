import { createSlice } from "@reduxjs/toolkit";
import type { UserInfo } from "../../types";

type UIState = {
  showAuth: boolean;
  authOption: "Login" | "Sign Up";
  userInfo: UserInfo | undefined;
};

const uiSlice = createSlice({
  name: "ui",
  initialState: { showAuth: false, authOption: "Login" } as UIState,
  reducers: {
    openAuth: (state) => {
      state.showAuth = true;
    },
    closeAuth: (state) => {
      state.showAuth = false;
    },
    authLogin: (state) => {
      state.authOption = "Login";
    },
    authRegister: (state) => {
      state.authOption = "Sign Up";
    },
    updateUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    resetUserInfo: (state) => {
      state.userInfo = undefined;
    },
  },
});

export const { openAuth, closeAuth, updateUserInfo, resetUserInfo, authLogin, authRegister } =
  uiSlice.actions;
export default uiSlice.reducer;
