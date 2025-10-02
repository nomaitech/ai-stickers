import { domainUrl } from "../../../constants/env";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareAuthHeaders } from "../utils";

interface StickerPack {
  id: string;
  name: string;
  createdAt: string;
}

interface Sticker {
  id: string;
  generated_img_url: string;
  emoji: string;
}

export const stickerApi = createApi({
  reducerPath: "stickerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: domainUrl,
    prepareHeaders: prepareAuthHeaders,
  }),
  tagTypes: ["Sticker", "StickerPack"],
  endpoints: (builder) => ({
    getStickers: builder.query<Sticker[], void>({
      query: () => "/stickers",
      providesTags: (result) =>
        result ? [
              ...result.map(({ id }) => ({ type: "Sticker" as const, id })),
              { type: "Sticker", id: "LIST" },
            ] : [
              { type: "Sticker", id: "LIST" }],
    }),
    createSticker: builder.mutation<Sticker, { original_image: File; emoji?: string; prompt?: string }>({
      query: ({ original_image, emoji, prompt }) => {
        const formData = new FormData();
        formData.append("original_image", original_image);
        if (emoji !== undefined) formData.append("emoji", emoji);
        if (prompt !== undefined) formData.append("prompt", prompt);
        return {
          url: "/stickers",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: [{ type: "Sticker", id: "LIST" }],
    }),
    modifySticker: builder.mutation< Sticker, { stickerId: string; emoji?: string; packId?: string | null }>({
      query: ({ stickerId, emoji, packId }) => ({
        url: `/stickers/${stickerId}`,
        method: "PATCH",
        body: {
          ...(emoji !== undefined && { emoji }),
          ...(packId !== undefined && { sticker_pack_id:packId }),
        },
      }),
      invalidatesTags: (_result, _error, { stickerId, packId }) => [
        { type: "Sticker", id: stickerId },
        { type: "Sticker", id: "LIST" }, 
        ...(packId ? [{ type: "StickerPack" as const, id: packId }] : []),
      ],
    }),
    deleteSticker: builder.mutation<void, string>({
      query: (stickerId) => ({
        url: `/stickers/${stickerId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, stickerId) => [
        { type: "Sticker", id: stickerId },
      ],
    }),
    listPacks: builder.query<StickerPack[], void>({
      query: () => ({
        url: "/sticker-packs",
        method: "GET",
      }),
        providesTags: (result) =>
    result
      ? [
          ...result.map(({ id }) => ({ type: "StickerPack" as const, id })),
          { type: "StickerPack", id: "LIST" },
        ]
      : [{ type: "StickerPack", id: "LIST" }],
    }),
    createPack: builder.mutation<StickerPack, { name: string }>({
      query: ({ name }) => ({
        url: "/sticker-packs",
        method: "POST",
        body: new URLSearchParams({ name }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
      }),
      invalidatesTags: [{ type: "StickerPack", id: "LIST" }],
    }),
    getPack: builder.query<StickerPack, string>({
      query: (packId) => ({
        url: `/sticker-packs/${packId}`,
        method: "GET",
      }),
    }),
    renameStickerPack: builder.mutation<StickerPack, { packId: string; name: string }>({
      query: ({ packId, name }) => ({
        url: `/sticker-packs/${packId}`,
        method: "PATCH",
        body: { name },
      }),
      invalidatesTags: (_result, _error, { packId }) => [
        { type: "StickerPack", id: packId },
      ],
    }),
    deletePack: builder.mutation<void, string>({
      query: (packId) => ({
        url: `/sticker-packs/${packId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, packId) => [
        { type: "StickerPack", id: packId },
      ],
    }),
    listStickersFromPack: builder.query<Sticker[], string>({
      query: (packId) => ({
        url: `/sticker-packs/${packId}/stickers`,
        method: "GET",
      }),
    }),
    addStickerToPack: builder.mutation<void, { packId: string; stickerId: string } >({
      query: ({ packId, stickerId }) => ({
        url: `/sticker-packs/${packId}/stickers`,
        method: "POST",
        body: { stickerId },
      }),
      invalidatesTags: (_result, _error, { packId }) => [
        { type: "StickerPack", id: packId },
      ],
    }),
    removeStickerFromPack: builder.mutation< void, { packId: string; stickerId: string }>({
      query: ({ packId, stickerId }) => ({
        url: `/sticker-packs/${packId}/stickers/${stickerId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { packId, stickerId }) => [
        { type: "Sticker", id: stickerId },
        { type: "StickerPack", id: packId },
      ],
    }),
  }),
});

export const {
  useListPacksQuery,
  useListStickersFromPackQuery,
  useLazyListStickersFromPackQuery,
  useRenameStickerPackMutation,
  useModifyStickerMutation,
  useGetStickersQuery,
  useCreatePackMutation,
} = stickerApi;
