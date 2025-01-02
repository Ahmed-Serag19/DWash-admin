import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import Homepage from "@/pages/Homepage/Homepage";
import Login from "@/pages/Login/Login";
import ServiceProviders from "@/pages/ServiceProviders/ServiceProviders";
import ServiceProviderForm from "@/pages/ServiceProviderForm/ServiceProviderForm";
import Coupons from "@/pages/Coupons/Coupons";
import ClientsOrders from "@/pages/ClientsOrders/ClientsOrders";
import ServiceRequests from "@/pages/ServiceRequests/ServiceRequests";
import EditProfileRequests from "@/pages/EditProfileRequest/EditProfileRequests";
import ProtectedRoute from "@/routes/ProtectedRoute";
import ChangePassword from "@/pages/ChangePassword/ChangePassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Homepage /> },
      { path: "/service-providers", element: <ServiceProviders /> },
      { path: "/service-provider-form", element: <ServiceProviderForm /> },
      { path: "/coupons", element: <Coupons /> },
      { path: "/clients-orders", element: <ClientsOrders /> },
      { path: "/service-requests", element: <ServiceRequests /> },
      { path: "/edit-profile-requests", element: <EditProfileRequests /> },
      { path: "/change-password", element: <ChangePassword /> },
    ],
  },
  { path: "/login", element: <Login /> },
]);

const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;
