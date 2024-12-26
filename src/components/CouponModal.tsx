import React from "react";
import { CouponModalProps } from "@/interfaces/interfaces";
import { useTranslation } from "react-i18next";

const CouponModal: React.FC<CouponModalProps> = ({
  isOpen,
  title,
  children,
  onClose,
}) => {
  const { i18n } = useTranslation();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg max-w-lg py-4 px-6 relative w-11/12">
        <button
          className={`absolute top-2 ${
            i18n.language === "ar" ? "left-3" : "right-3"
          } text-gray-600 hover:text-red-500 transition duration-300 font-bold text-xl`}
          onClick={onClose}
        >
          X
        </button>
        <h2 className="text-xl font-bold text-blue-900 my-4 text-center">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
};

export default CouponModal;
