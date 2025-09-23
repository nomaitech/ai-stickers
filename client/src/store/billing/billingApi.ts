import { domainUrl } from "../../../constants/env";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareAuthHeaders } from "../utils";


export const genApi = createApi({
  reducerPath: "genApi",
  baseQuery: fetchBaseQuery({
    baseUrl: domainUrl,
    prepareHeaders: prepareAuthHeaders,
  }),
  endpoints: (builder) => ({
    topUp: builder.mutation<void, void>({
    query: () => ({ url: "/topup", method: "POST" }),
    })
  }),
});

export const { useTopUpMutation } = genApi;