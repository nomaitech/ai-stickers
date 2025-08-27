// useBanner.ts
import { useContext } from "react";
import { BannerContext } from "./BannerProvider";

export const useBanner = () => {
  const ctx = useContext(BannerContext);
  if (!ctx) throw new Error("useBanner must be used inside BannerProvider");
  return ctx;
};