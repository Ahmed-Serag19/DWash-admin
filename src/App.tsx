import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { useTranslation } from "react-i18next";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { i18n } = useTranslation();

  const direction = i18n.language === "ar" ? "rtl" : "ltr";

  React.useEffect(() => {
    document.documentElement.setAttribute("dir", direction);
  }, [direction]);

  return (
    <div style={{ direction }}>
      <AppRoutes />
    </div>
  );
}

export default App;
