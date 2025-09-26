import { domainUrl } from "../../../constants/env";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { updateCredits, updateEmail } from "../UI/uiSlice";
import { prepareAuthHeaders } from "../utils";

type UserInfo = {
  email: string;
  credits: number;
}

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
          dispatch(updateEmail(result.data.email));
          dispatch(updateCredits(result.data.credits));
        } catch {
          throw new Error("Authentication failed in userApi");
        }
      },
    }),
  }),
});

export const { useGetUserInfoQuery } = userApi;