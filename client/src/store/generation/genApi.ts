import { domainUrl } from "../../../constants/env";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../index";

type GenerationResponse = {
    image: string;
}

export const genApi = createApi({
  reducerPath: "genApi",
  baseQuery: fetchBaseQuery({
    baseUrl: domainUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.access_token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    generateSticker: builder.mutation<GenerationResponse, FormData>({
      query: (formData) => ({
        url: "/stickers",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useGenerateStickerMutation } = genApi;