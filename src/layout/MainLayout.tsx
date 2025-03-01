import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      {/* Navbar */}
      <Navbar />
      {/* Main Content */}
      <main className="mx-auto sm:max-w-7xl p-2 sm:p-4 w-full flex items-center justify-center overflow-y-auto">
        <Outlet />
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
