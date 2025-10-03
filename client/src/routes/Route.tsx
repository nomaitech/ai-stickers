import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../Layout";
import Index from "../pages/Index";
import ErrorPage from "../pages/ErrorPage";
import Dashboard from "../pages/Dashboard";
import TopupResult from "../pages/TopupResult";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Index /> },
      { path: "/error", element: <ErrorPage /> },
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