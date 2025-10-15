import { domainUrl } from "../../constants/env";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareAuthHeaders } from "./utils";
import { setToken } from "./auth/authSlice";
import { updateCredits, updateEmail } from "./UI/uiSlice";

type UserInfo = {
  email: string;
  credits: number;
}
interface StickerPack {
  id: string;
  name: string;
  createdAt: string;
}

type GenerationResponse = {
    generated_img_url: string;
}

type PaymentStatusResponse = {
  completed_at: string;
  created_at: string;
  session_id: string;
  status: string;
};

interface Sticker {
  id: string;
  generated_img_url: string;
  emoji: string;
}

type RegisterResponse = {
  message: string;
}

type Token = {
  access_token: string;
}

type Credentials = {
  email: string;
  password: string;
}

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({
    baseUrl: domainUrl,
    prepareHeaders: prepareAuthHeaders,
  }),
  tagTypes: ["Sticker", "StickerPack"],
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
        //Fix this, this doublecall is actually correct
      },
    }),
    register: builder.mutation<RegisterResponse, Credentials>({
      query: (newUser) => ({
        url: "/register",
        method: "POST",
        body: newUser,
      }),
    }),
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
    generateSticker: builder.mutation<GenerationResponse, FormData>({
      query: (formData) => ({
        url: "/stickers",
        method: "POST",
        body: formData,
      }),
    }),
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
    modifySticker: builder.mutation<Sticker, { stickerId: string; emoji?: string; packId?: string | null }>({
      query: ({ stickerId, emoji, packId }) => ({
        url: `/stickers/${stickerId}`,
        method: "PATCH",
        body: {
          ...(emoji !== undefined && { emoji }),
          ...(packId !== undefined && { sticker_pack_id: packId }),
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
    addStickerToPack: builder.mutation<void, { packId: string; stickerId: string }>({
      query: ({ packId, stickerId }) => ({
        url: `/sticker-packs/${packId}/stickers`,
        method: "POST",
        body: { stickerId },
      }),
      invalidatesTags: (_result, _error, { packId }) => [
        { type: "StickerPack", id: packId },
      ],
    }),
    removeStickerFromPack: builder.mutation<void, { packId: string; stickerId: string }>({
      query: ({ packId, stickerId }) => ({
        url: `/sticker-packs/${packId}/stickers/${stickerId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { packId, stickerId }) => [
        { type: "Sticker", id: stickerId },
        { type: "StickerPack", id: packId },
      ],
    }),
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

export const {


} = mainApi;
