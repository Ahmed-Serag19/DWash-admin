import React from "react";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const ServiceModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  const { i18n, t } = useTranslation();
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white  md:min-w-[500px] lg:min-w-[700px] relative rounded-lg shadow-lg max-w-lg w-full">
        <div className="p-4 border-b ">
          <h2 className="text-lg font-bold">{title}</h2>
          <button
            className={`absolute ${
              i18n.language === "ar" ? "left-3 top-3" : "right-3 top-3"
            } text-red-500 hover:text-red-700 text-2xl`}
            onClick={onClose}
            aria-label="Close Modal"
            aria-labelledby="close-modal"
          >
            ×
          </button>
        </div>
        <div className="p-4 ">{children}</div>
        <div className="p-4 border-t flex justify-end">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded transition duration-300 hover:bg-gray-700"
            onClick={onClose}
          >
            {t("close")}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ServiceModal;
