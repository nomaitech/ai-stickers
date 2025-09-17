import { configureStore } from "@reduxjs/toolkit"
import uiReducer from "./UI/uiSlice"
import { authApi } from "./auth/authApi"

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(authApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;