import { configureStore } from "@reduxjs/toolkit"
import uiReducer from "./UI/uiSlice"
import authReducer from "./auth/authSlice"
import { mainApi } from "./mainApi"

export const store = configureStore({
reducer: {
  ui: uiReducer,
  auth: authReducer,
  [mainApi.reducerPath]: mainApi.reducer,
},
  middleware: (getDefault) =>
    getDefault().concat(mainApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;