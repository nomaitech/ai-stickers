import { createSlice } from "@reduxjs/toolkit";

interface UIState { showRegister: boolean }

const uiSlice = createSlice({
  name: "ui",
  initialState: { showRegister: false } as UIState,
  reducers: {
    openRegister: state => { state.showRegister = true },
    closeRegister: state => { state.showRegister = false },
  },
})

export const { openRegister, closeRegister } = uiSlice.actions;
export default uiSlice.reducer;
