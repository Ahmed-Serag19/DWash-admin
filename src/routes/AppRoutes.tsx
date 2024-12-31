import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import Homepage from "@/pages/Homepage/Homepage";
import Login from "@/pages/Login/Login";
import ServiceProviders from "@/pages/ServiceProviders/ServiceProviders";
import ServiceProviderForm from "@/pages/ServiceProviderForm/ServiceProviderForm";
import Coupons from "@/pages/Coupons/Coupons";
import ClientsOrders from "@/pages/ClientsOrders/ClientsOrders";
import ServiceRequests from "@/pages/ServiceRequests/ServiceRequests";
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
      {
        path: "/clients-orders",
        element: <ClientsOrders />,
      },
      {
        path: "/service-requests",
        element: <ServiceRequests />,
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
