import { domainUrl } from "../../../constants/env";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareAuthHeaders } from "../utils";

export type PaymentStatusResponse = {
  completed_at: string;
  created_at: string;
  session_id: string;
  status: string;
};

export const billingApi = createApi({
  reducerPath: "billingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: domainUrl,
    prepareHeaders: prepareAuthHeaders,
  }),
  endpoints: (builder) => ({
    getPaymentSession: builder.mutation<{ checkout_url: string }, void>({
      query: () => ({
        url: "/payments",
        method: "POST",
        body: { price: "price_1RtrY9AttlqijaIVwcdBO5M5" },
      }),
    }),
    getPaymentStatus: builder.query<PaymentStatusResponse, string>({
      query: (session_id) => ({
        url: `/payment-status/${session_id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPaymentSessionMutation, useGetPaymentStatusQuery } =
  billingApi;
