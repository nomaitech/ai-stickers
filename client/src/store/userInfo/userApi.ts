import { domainUrl } from "../../env";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { updateUserInfo } from "../UI/uiSlice";
import { prepareAuthHeaders } from "../utils";
import type { UserInfo } from "../../types";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: domainUrl,
    prepareHeaders: prepareAuthHeaders,
  }),
  endpoints: (builder) => ({
    getUserInfo: builder.query<UserInfo, void>({
      query: () => "/user-info",
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(updateUserInfo(result.data));  
        } catch {
          throw new Error("Authentication failed in userApi");
        }
      },
    }),
  }),
});

export const { useGetUserInfoQuery } = userApi;