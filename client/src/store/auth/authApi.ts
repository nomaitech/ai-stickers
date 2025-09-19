import { domainUrl } from "../../../constants/env";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setToken } from "./authSlice";
import { userApi } from "../userInfo/userApi";

interface RegisterResponse {
  message: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${domainUrl}/auth` }),
  endpoints: (builder) => ({
    login: builder.mutation<
      { token: string },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
          const result = await queryFulfilled;
          dispatch(setToken(result.data.token));
          dispatch(userApi.endpoints.getUserInfo.initiate());
      },
    }),
    register: builder.mutation<
      RegisterResponse,
      { email: string; password: string }
    >({
      query: (newUser) => ({
        url: "/register",
        method: "POST",
        body: newUser,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
