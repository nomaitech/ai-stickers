import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../Layout";
import LandingPage from "../pages/LandingPage";
import ErrorPage from "../pages/ErrorPage";
import Dashboard from "../pages/Dashboard";
import TopupResult from "../pages/TopupResult";
import LoginPrompt from "@/components/LoginPrompt";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/error", element: <ErrorPage /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/payments/success", element: <TopupResult /> },
      { path: "/payments/cancelled", element: <TopupResult /> },
      { path: "/LoginPrompt", element: <LoginPrompt /> },
    ],
  },
]);

const Route = () =>{
  return <RouterProvider router={router} />;
}

export default Route;