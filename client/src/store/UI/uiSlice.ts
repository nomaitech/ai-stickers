import { createSlice } from "@reduxjs/toolkit";

interface UIState { showRegister: boolean, credits: number | null, email: string }

const uiSlice = createSlice({
  name: "ui",
  initialState: { showRegister: false, credits: null } as UIState,
  reducers: {
    openRegister: state => { state.showRegister = true },
    closeRegister: state => { state.showRegister = false },
    updateCredits: (state, action) => {
      state.credits = action.payload
    },
    updateEmail: (state, action) => { state.email = action.payload },
  },
})

export const { openRegister, closeRegister, updateCredits, updateEmail } = uiSlice.actions;
export default uiSlice.reducer;
