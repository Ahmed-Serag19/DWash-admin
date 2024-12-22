import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="mx-auto max-w-5xl p-5 w-full">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
