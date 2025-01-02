import React from "react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { ModalProps } from "@/interfaces/interfaces";

const CardModal: React.FC<ModalProps> = ({
  isOpen,
  titleKey,
  descriptionKey,
  onConfirm,
  onCancel,
}) => {
  const { t, i18n } = useTranslation();

  const greenButton =
    titleKey === "activateUserTitle" || titleKey === "confirmAcceptTitle";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
        <h2 className="text-lg font-bold text-blue-950 mb-3">{t(titleKey)}</h2>
        <p className="text-gray-700 mb-5">{t(descriptionKey)}</p>
        <div
          className={`flex ${
            i18n.language === "en" ? "justify-end" : "justify-start"
          } gap-3`}
        >
          {i18n.language === "ar" && (
            <Button
              variant="outline"
              onClick={onConfirm}
              className={greenButton ? "text-green-500" : "text-red-500"}
            >
              {t("confirmButton")}
            </Button>
          )}
          <Button variant="outline" onClick={onCancel}>
            {t("cancelButton")}
          </Button>
          {i18n.language === "en" && (
            <Button
              variant="outline"
              onClick={onConfirm}
              className={greenButton ? "text-green-500" : "text-red-500"}
            >
              {t("confirmButton")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardModal;
