import { Navigate } from "react-router-dom";

import { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = sessionStorage.getItem("accessToken");

  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
