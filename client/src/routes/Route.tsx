import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../Layout";
import Index from "../pages/Index";
import Dashboard from "../components/Dashboard";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Index /> },
      { path: "/dashboard", element: <Dashboard /> },
    ],
  },
]);

const Route = () =>{
  return <RouterProvider router={router} />;
}

export default Route;