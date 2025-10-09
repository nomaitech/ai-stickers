import { domainUrl } from "../../env";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareAuthHeaders } from "../utils";

type GenerationResponse = {
    generated_img_url: string;
}

export const genApi = createApi({
  reducerPath: "genApi",
  baseQuery: fetchBaseQuery({
    baseUrl: domainUrl,
    prepareHeaders: prepareAuthHeaders,
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