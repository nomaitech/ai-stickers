import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../Layout";
import LandingPage from "@/pages/LandingPage";
import Generator from "@/pages/Generator";
import Billing from "@/pages/Billing";
import MyStickers from "@/pages/MyStickers";
import Explore from "@/pages/Explore";
import TopupResult from "@/pages/TopUpResult";

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
    ],
  },
]);

const Route = () =>{
  return <RouterProvider router={router} />;
}

export default Route;