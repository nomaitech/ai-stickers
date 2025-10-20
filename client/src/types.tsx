export type UserInfo = {
    email: string;
    credits: number;
}

export type FormData = {
  email: string;
  password: string;
};

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
  generated_img_url: string;
  emoji: string;
}

export type RegisterResponse = {
  message: string;
}

export type Token = {
  access_token: string;
}

export type Credentials = {
  email: string;
  password: string;
}
