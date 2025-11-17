export type UserInfo = {
    email: string;
    credits: number;
}

export type FormData = {
  email: string;
  password: string;
};

export interface DiscoverStickersResponse {
  id: number;
  generated_img_url: string;
  created_at: string;
}

export interface DiscoverPaginatedResponse {
  items: DiscoverStickersResponse[];
  page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}
export interface StickerPack {
  id: string;
  name: string;
  createdAt: string;
}

export type GenerationResponse = {
  generated_img_url: string;
}

export type PaymentStatusResponse = {
  completed_at: string;
  created_at: string;
  session_id: string;
  status: string;
};

export interface Sticker {
  id: string;
  transcation_id: string;
  created_at: string;
  original_img_url: string;
  generated_img_url: string;
  user_id: string;
  emoji: string;
  prompt?: string;
  sticker_pack_id?: string;
  generation_time?: number;
  telegram_file_unique_id?: string;
  is_public?: boolean;
}

export type RegisterResponse = {
  access_token: string;
  token_type: string;
  user: UserInfo;
}

export type Token = {
  access_token: string;
}

export type Credentials = {
  email: string;
  password: string;
}
