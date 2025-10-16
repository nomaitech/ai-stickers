import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../Layout";
import LandingPage from "../pages/LandingPage";
import ErrorPage from "../pages/ErrorPage";
import Dashboard from "../pages/Dashboard";
import TopupResult from "../pages/TopupResult";
import GetCreditsModal from "../components/GetCreditsModal";
import Generator from "../pages/Generator";
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/generator", element: <Generator />},
      { path: "/error", element: <ErrorPage /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/payments/success", element: <TopupResult /> },
      { path: "/payments/cancelled", element: <TopupResult /> },
      { path: "/testing", element: <GetCreditsModal /> },
    ],
  },
]);

const Route = () =>{
  return <RouterProvider router={router} />;
}

export default Route;