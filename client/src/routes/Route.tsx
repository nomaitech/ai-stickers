import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../Layout";
import LandingPage from "../pages/LandingPage";
import Dashboard from "../pages/Dashboard";
import TopupResult from "../pages/TopupResult";
import Generator from "../pages/Generator";
import Billing from "../pages/Billing";
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/generate-sticker", element: <Generator />},
      { path: "/billing", element: <Billing /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/payments/success", element: <TopupResult /> },
      { path: "/payments/cancelled", element: <TopupResult /> },
    ],
  },
]);

const Route = () =>{
  return <RouterProvider router={router} />;
}

export default Route;