import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import Homepage from "@/pages/Homepage/Homepage";
import Login from "@/pages/Login/Login";
import ServiceProviders from "@/pages/ServiceProviders/ServiceProviders";
import ServiceProviderForm from "@/pages/ServiceProviderForm/ServiceProviderForm";
import Coupons from "@/pages/Coupons/Coupons";
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
        path: "/service-provider-form",
        element: <ServiceProviderForm />,
      },
      {
        path: "/coupons",
        element: <Coupons />,
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
