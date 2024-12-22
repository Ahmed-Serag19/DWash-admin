import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuSub,
} from "@radix-ui/react-dropdown-menu";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import NavbarLogo from "@/assets/images/navbar-logo.png";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleLogout = () => {
    sessionStorage.removeItem("userInfo");
    toast.success("You have logged out successfully", {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
      className: "bg-blue-950",
    });
    navigate("/login");
  };
  const dropDownClassName =
    "outline-none cursor-pointer rounded-xl transition font-semibold duration-300 hover:bg-slate-200 w-full px-3 my-3 py-2 ";
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="bg-stone-50 text-blue-950 shadow-lg px-6 py-4 flex justify-around items-center max-md:justify-between z-40">
      <NavLink
        to="/"
        className="hover:bg-stone-100 transition duration-300 rounded-2xl p-2"
      >
        <img src={NavbarLogo} alt="Dwash logo icon" className="w-32 " />
      </NavLink>

      {/* Right section: Profile and Logout */}
      <div className="flex items-center gap-4 max-md:hidden">
        <div className="flex gap-5 ">
          {/* Add New Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger
              className={
                "text-blue-950 outline-none font-semibold hover:text-blue-600 transition-colors  flex justify-between items-center gap-3"
              }
            >
              {t("navbar.addNew")}
              <MdKeyboardArrowDown />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-white text-black rounded-xl shadow-lg space-y-3 p-2 mt-4 ">
              <DropdownMenuItem className={dropDownClassName}>
                {t("navbar.serviceProvider")}
              </DropdownMenuItem>
              <DropdownMenuItem className={dropDownClassName}>
                {t("navbar.discount")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Service Providers Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="text-blue-950 outline-none font-semibold hover:text-blue-600 transition-colors flex justify-between items-center gap-3">
              {t("navbar.serviceProviders")}
              <MdKeyboardArrowDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white text-black rounded-lg shadow-lg p-2 mt-4">
              <DropdownMenuItem className={dropDownClassName}>
                {t("navbar.showServiceProviders")}
              </DropdownMenuItem>
              <DropdownMenuItem className={dropDownClassName}>
                {t("navbar.serviceRequests")}
              </DropdownMenuItem>
              <DropdownMenuItem className={dropDownClassName}>
                {t("navbar.personalProfileRequest")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Client Orders Link */}
          <NavLink
            to="/clients-orders"
            className="text-blue-950 outline-none font-semibold cursor-pointer hover:text-blue-600 transition-colors"
          >
            {t("navbar.clientOrders")}
          </NavLink>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="text-blue-950 outline rounded-md px-1 py-0.5 bg-stone-200 hover:bg-stone-100 font-semibold hover:text-blue-600 transition-colors">
            <div className="flex items-center gap-1">
              <FaUserCircle className="w-9 h-9 rounded-full p-0.5" />
              <span className="font-semibold">{t("navbar.admin")}</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-stone-100 text-black rounded-xl shadow-lg px-0.5">
            <DropdownMenuItem className={dropDownClassName}>
              <button
                onClick={handleOpenModal}
                className="flex items-center space-x-2 text-blue-950 font-semibold hover:text-red-500 transition-colors"
              >
                <FaSignOutAlt /> <span>{t("navbar.logout")}</span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center">
          <LanguageSwitcher />
        </div>
      </div>
      <div className="md:hidden flex gap-5 ">
        <DropdownMenu>
          <DropdownMenuTrigger className="text-blue-950 outline-none font-semibold hover:text-blue-600 transition-colors flex justify-between items-center gap-3">
            <div className="flex items-center gap-1">
              <FaUserCircle className="w-9 h-9 rounded-full p-0.5" />
              <span className="font-semibold">{t("navbar.admin")}</span>
            </div>
            <MdKeyboardArrowDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-stone-100 text-black rounded-xl shadow-lg space-y-3 p-2 mt-2">
            {/* Add New Submenu */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger
                className={`${dropDownClassName} flex  gap-2 items-center`}
              >
                <MdKeyboardArrowLeft />

                {t("navbar.addNew")}
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="z-50 me-2 bg-stone-50 px-2 py-1 shadow-lg">
                  <DropdownMenuItem className={dropDownClassName}>
                    {t("navbar.serviceProvider")}
                  </DropdownMenuItem>
                  <DropdownMenuItem className={dropDownClassName}>
                    {t("navbar.discount")}
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            {/* Service Providers Submenu */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger
                className={`${dropDownClassName} flex  gap-2 items-center`}
              >
                <MdKeyboardArrowLeft />
                {t("navbar.serviceProviders")}
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="z-50 me-2 bg-stone-50 px-2 py-1 shadow-lg">
                  <DropdownMenuItem className={dropDownClassName}>
                    {t("navbar.showServiceProviders")}
                  </DropdownMenuItem>
                  <DropdownMenuItem className={dropDownClassName}>
                    {t("navbar.serviceRequests")}
                  </DropdownMenuItem>
                  <DropdownMenuItem className={dropDownClassName}>
                    {t("navbar.personalProfileRequest")}
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            {/* Clients Orders */}
            <DropdownMenuItem className={dropDownClassName}>
              {t("navbar.clientOrders")}
            </DropdownMenuItem>

            {/* Logout */}
            <DropdownMenuItem className={dropDownClassName}>
              <button
                onClick={handleOpenModal}
                className="flex items-center space-x-2 text-blue-950 font-semibold hover:text-red-500 transition-colors"
              >
                <FaSignOutAlt /> <span>{t("navbar.logout")}</span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center">
          <LanguageSwitcher />
        </div>
      </div>
      {/* Modal for Logout Confirmation */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-gray-500  bg-opacity-80 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg text-blue-950 font-semibold">
              {t("navbar.logoutConfirmation")}
            </h3>
            <div className="flex  gap-5 justify-center mt-4">
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-blue-950 text-stone-50 rounded-md hover:bg-blue-800 transition-colors"
              >
                {t("navbar.confirm")}
              </button>
              <button
                onClick={handleCloseModal}
                className="px-6 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition-colors"
              >
                {t("navbar.cancel")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
