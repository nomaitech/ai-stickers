import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { access_token: localStorage.getItem("token") },
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.access_token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    removeToken: () => {
      localStorage.removeItem("token");
      return { access_token: null };
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;
export default authSlice.reducer;