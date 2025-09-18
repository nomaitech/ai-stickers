import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../Layout";
import Index from "../pages/Index";
import Error from "../pages/Error";
import Dashboard from "../components/Dashboard";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Index /> },
      { path: "/error", element: <Error /> },
      { path: "/dashboard", element: <Dashboard /> },
    ],
  },
]);

const Route = () =>{
  return <RouterProvider router={router} />;
}

export default Route;