import React from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

type WaitingEditModalProps = {
  request: any;
  isOpen: boolean;
  onClose: () => void;
};

const WaitingEditModal: React.FC<WaitingEditModalProps> = ({
  isOpen,
  onClose,
  request,
}) => {
  const { t, i18n } = useTranslation();

  if (!isOpen) return null;

  const renderRequestType = () => {
    switch (request.requestDto.requestTypeNameEn) {
      case "EDIT_BRAND":
        return t("editBrand");
      case "ADD_BRAND":
        return t("addBrand");
      default:
        return t("unknownType");
    }
  };

  const renderStatus = () => {
    switch (request.requestDto.statusName) {
      case "WAITING":
        return <span className="text-yellow-600">{t("waiting")}</span>;
      case "ACCEPTED":
        return <span className="text-green-700">{t("accepted")}</span>;
      case "REJECTED":
        return <span className="text-red-500">{t("rejected")}</span>;
      default:
        return <span className="text-gray-700">{t("unknownStatus")}</span>;
    }
  };

  return (
    <div
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg shadow-lg max-w-5xl w-10/12 p-6 overflow-y-auto">
        {/* Modal Header */}
        <header className="border-b pb-4 mb-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-blue-900">{t("details")}</h2>
          <Button variant="ghost" className="text-red-600" onClick={onClose}>
            X
          </Button>
        </header>

        {/* Modal Content */}
        <div className="overflow-x-auto overflow-y-auto max-h-96">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr
                className={`bg-gray-100 ${
                  i18n.language === "ar" ? "text-right" : "text-left"
                }`}
              >
                <th className="border border-gray-300 p-2 ">{t("field")}</th>
                <th className="border border-gray-300 p-2 ">{t("value")}</th>
              </tr>
            </thead>
            <tbody>
              {/* Brand Details */}
              <tr>
                <td className="border border-gray-300 p-2">
                  {t("brandNameAr")}
                </td>
                <td className="border border-gray-300 p-2">
                  {request.brandNameAr || t("unknown")}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">
                  {t("brandNameEn")}
                </td>
                <td className="border border-gray-300 p-2">
                  {request.brandNameEn || t("unknown")}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">
                  {t("descriptionAr")}
                </td>
                <td className="border border-gray-300 p-2">
                  {request.brandDescriptionsAr || t("unknown")}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">
                  {t("descriptionEn")}
                </td>
                <td className="border border-gray-300 p-2">
                  {request.brandDescriptionsEn || t("unknown")}
                </td>
              </tr>

              {/* User Details */}
              <tr>
                <td className="border border-gray-300 p-2">{t("email")}</td>
                <td className="border border-gray-300 p-2">
                  {request.userDto.email || t("unknown")}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">
                  {t("identificationNumber")}
                </td>
                <td className="border border-gray-300 p-2">
                  {request.userDto.identificationNumber || t("unknown")}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">
                  {t("identityTypeAr")}
                </td>
                <td className="border border-gray-300 p-2">
                  {request.userDto.identityTyNameAr || t("unknown")}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">
                  {t("identityTypeEn")}
                </td>
                <td className="border border-gray-300 p-2">
                  {request.userDto.identityTyNameEn || t("unknown")}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">{t("mobile")}</td>
                <td className="border border-gray-300 p-2">
                  {request.userDto.mobile || t("unknown")}
                </td>
              </tr>

              {/* Request Details */}
              <tr>
                <td className="border border-gray-300 p-2">{t("createdOn")}</td>
                <td className="border border-gray-300 p-2">
                  {request.requestDto.createdOn.split("T")[0] || t("unknown")}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">
                  {t("requestType")}
                </td>
                <td className="border border-gray-300 p-2">
                  {renderRequestType()}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">{t("status")}</td>
                <td className="border border-gray-300 p-2">{renderStatus()}</td>
              </tr>

              {/* Wallet Details */}
              {request.brandWalletDto && (
                <>
                  <tr>
                    <td className="border border-gray-300 p-2">{t("iban")}</td>
                    <td className="border border-gray-300 p-2">
                      {request.brandWalletDto.iban || t("unknown")}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">
                      {t("bankAccountNumber")}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {request.brandWalletDto.bankAccountNumber || t("unknown")}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">
                      {t("bankName")}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {request.brandWalletDto.bankName || t("unknown")}
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>

          {/* Brand Logo */}
          {request.brandLogo && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">{t("brandLogo")}</h3>
              <img
                src={request.brandLogo}
                alt={t("brandLogo")}
                className="w-full h-auto rounded-lg border"
              />
            </div>
          )}

          {/* Brand Background Image */}
          {request.brandBackgroundImage && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">
                {t("brandBackgroundImage")}
              </h3>
              <img
                src={request.brandBackgroundImage}
                alt={t("brandBackgroundImage")}
                className="w-full h-auto rounded-lg border"
              />
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <footer className="border-t pt-4 mt-4 flex justify-end">
          <Button variant="outline" className="text-blue-900" onClick={onClose}>
            {t("close")}
          </Button>
        </footer>
      </div>
    </div>
  );
};

export default WaitingEditModal;
