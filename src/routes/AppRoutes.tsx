import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import Homepage from "@/pages/Homepage/Homepage";
import Login from "@/pages/Login/Login";
import ServiceProviders from "@/pages/ServiceProviders/ServiceProviders";
import ServiceProviderForm from "@/pages/ServiceProviderForm/ServiceProviderForm";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/service-providers",
        element: <ServiceProviders />,
      },
      {
        path: "/add-service-provider",
        element: <ServiceProviderForm />,
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
