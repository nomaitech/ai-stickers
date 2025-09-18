import { configureStore } from "@reduxjs/toolkit"
import uiReducer from "./UI/uiSlice"
import authReducer from "./auth/authSlice"
import { authApi } from "./auth/authApi"
import { userApi } from "./userInfo/userApi"

export const store = configureStore({
reducer: {
  ui: uiReducer,
  auth: authReducer,
  [userApi.reducerPath]: userApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
},
  middleware: (getDefault) =>
    getDefault().concat(authApi.middleware, userApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;