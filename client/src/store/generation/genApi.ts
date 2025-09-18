import { domainUrl } from "../../../constants/env";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface GenerationResponse {
    url: string
}

export const genApi = createApi({
  reducerPath: "genApi",
  baseQuery: fetchBaseQuery({ baseUrl: domainUrl }),
  endpoints: (builder) => ({
    generateSticker: builder.mutation<GenerationResponse, FormData>({
        query: (formData) => ({
            url: "stickers",
            method: "POST",
            body: formData
        })
    })
  }),
})

export const { useGenerateStickerMutation } = genApi;