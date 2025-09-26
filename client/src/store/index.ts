import { configureStore } from "@reduxjs/toolkit"
import uiReducer from "./UI/uiSlice"
import authReducer from "./auth/authSlice"
import { authApi } from "./auth/authApi"
import { userApi } from "./userInfo/userApi"
import { genApi } from "./generation/genApi"
import { stickerApi } from "./stickers/stickerApi"

export const store = configureStore({
reducer: {
  ui: uiReducer,
  auth: authReducer,
  [userApi.reducerPath]: userApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [genApi.reducerPath]: genApi.reducer,
  [stickerApi.reducerPath]: stickerApi.reducer
},
  middleware: (getDefault) =>
    getDefault().concat(authApi.middleware, userApi.middleware, genApi.middleware, stickerApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;