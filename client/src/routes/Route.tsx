import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../Layout";
import LandingPage from "@/pages/LandingPage";
import Generator from "@/pages/Generator";
import Billing from "@/pages/Billing";
import MyStickers from "@/pages/MyStickers";
import Explore from "@/pages/Explore";
import TopupResult from "@/pages/TopUpResult";
import Team from "@/pages/Team";
import TelegramStickers from "@/pages/TelegramStickers";
import EditPack from "@/pages/EditPack";
import CreatePack from "@/pages/CreatePack";
import AddStickersToPack from "@/pages/AddStickersToPack";
import RemoveStickersFromPack from "@/pages/RemoveStickersFromPack";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/generate-sticker", element: <Generator />},
      { path: "/billing", element: <Billing /> },
      { path: "/my-stickers", element: <MyStickers /> },
      { path: "/explore", element: <Explore /> },
      { path: "/payments/success", element: <TopupResult /> },
      { path: "/payments/cancelled", element: <TopupResult /> },
      { path: "/about", element: <Team /> },
      { path: "/telegram-stickers", element: <TelegramStickers /> },
      { path: "/edit-stickerpack/:stickerPackId", element: <EditPack /> },
      { path: "/create-pack", element: <CreatePack /> },
      { path: "/add-to-pack/:stickerPackId", element: <AddStickersToPack /> },
      { path: "/remove-from-pack/:stickerPackId", element: <RemoveStickersFromPack /> },
    ],
  },
]);

const Route = () =>{
  return <RouterProvider router={router} />;
}

export default Route;