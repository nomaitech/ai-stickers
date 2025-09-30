import { domainUrl } from "../../../constants/env";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setToken } from "./authSlice";
import { userApi } from "../userInfo/userApi";

type RegisterResponse = {
  message: string;
  code: number;
}

type Token = {
  access_token: string;
}

type Credentials = {
  email: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${domainUrl}/auth` }),
  endpoints: (builder) => ({
    login: builder.mutation<Token, Credentials>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
          const result = await queryFulfilled;
          dispatch(setToken(result.data.access_token));
          dispatch(userApi.endpoints.getUserInfo.initiate());
      },
    }),
    register: builder.mutation<RegisterResponse, Credentials>({
      query: (newUser) => ({
        url: "/register",
        method: "POST",
        body: newUser,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
