import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="grid min-h-screen  grid-rows-[auto_1fr_auto]">
      <Navbar />
      <div>
        <main className="mx-auto max-w-5xl p-5">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
