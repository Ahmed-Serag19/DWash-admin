import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import Homepage from "@/pages/Homepage/Homepage";
import Login from "@/pages/Login/Login";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
