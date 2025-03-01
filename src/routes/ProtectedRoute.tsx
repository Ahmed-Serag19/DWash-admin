import { Navigate, useNavigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import { toast } from "react-toastify"; // Assuming you are using react-toastify for messages
import { useTranslation } from "react-i18next";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();
  const { t } = useTranslation();
  useEffect(() => {
    if (!token) return;

    // Decode the JWT token to get the payload
    const decodedToken = JSON.parse(atob(token.split(".")[1]));

    // Check if the role is ADMIN
    if (decodedToken.role !== "ADMIN") {
      sessionStorage.removeItem("accessToken");
      toast.error("Only Admins allowed on this page.");
      navigate("/login");
      return;
    }

    const logoutTimer = setTimeout(() => {
      sessionStorage.removeItem("accessToken");
      toast.error(t("loginErrorRole"));
      navigate("/login");
    }, 90 * 60 * 1000);

    return () => clearTimeout(logoutTimer);
  }, [token]);

  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
