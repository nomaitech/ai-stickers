import { domainUrl } from "../../../constants/env";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../index";

interface StickerPack {
  id: string;
  name: string;
  createdAt: string;
}

interface Sticker {
  id: string;
  image: string;
  emoji: string;
}

export const stickerApi = createApi({
  reducerPath: "stickerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: domainUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.access_token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Sticker", "StickerPack"],
  endpoints: (builder) => ({
    listPacks: builder.query<StickerPack[], void>({
      query: () => ({
        url: "/sticker-packs",
        method: "GET"
      }),
    }),
    listStickersFromPack: builder.query<Sticker[], string>({
      query: (packId) => ({
        url: `/sticker-packs/${packId}/stickers`,
        method: "GET"
      }),
    }),
    renameStickerPack: builder.mutation<StickerPack, { packId: string; name: string }>({
      query: ({ packId, name }) => ({
        url: `/sticker-packs/${packId}`,
        method: "PATCH",
        body: { name },
      }),
      invalidatesTags: (_result, _error, { packId }) => [{ type: "StickerPack", id: packId }],
    }),
    modifySticker: builder.mutation<Sticker, { stickerId: string; emoji?: string; packId?: string }>({
    query: ({ stickerId, emoji, packId }) => ({
        url: `/stickers/${stickerId}`,
        method: "PATCH",
        body: { ...(emoji !== undefined && { emoji }), ...(packId !== undefined && { packId }) },
    }),
    invalidatesTags: (_result, _error, { stickerId, packId }) => [
        { type: "Sticker", id: stickerId },
        ...(packId ? [{ type: "StickerPack" as const, id: packId }] : []),
    ],
    })
  }),
});

export const { 
    useListPacksQuery,
    useListStickersFromPackQuery,
    useLazyListStickersFromPackQuery,
    useRenameStickerPackMutation,
    useModifyStickerMutation
} = stickerApi;