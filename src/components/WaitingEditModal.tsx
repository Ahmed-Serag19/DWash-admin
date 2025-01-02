import React from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

type WaitingEditModalProps = {
  request: any;
  isOpen: boolean;
  onClose: () => void;
  onAccept: (id: number) => Promise<void>;
  onReject: (id: number) => Promise<void>;
};

const WaitingEditModal: React.FC<WaitingEditModalProps> = ({
  isOpen,
  onClose,
  request,
}) => {
  const { t, i18n } = useTranslation();

  if (!isOpen) return null;
  console.log(request.requestDto.requestTypeNameEn);
  console.log(request);
  return (
    <div
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
      className="fixed  inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg shadow-lg max-w-5xl w-10/12 p-6 overflow-y-auto">
        <header className="border-b pb-4 mb-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-blue-900 ">{t("details")}</h2>
          <Button variant="ghost" className="text-red-600" onClick={onClose}>
            X
          </Button>
        </header>

        <div className="space-y-6">
          {/* Header Section */}
          <section className="py-2 border-b">
            <h3 className="text-lg font-semibold pb-2 ">{t("brandDetails")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <strong>{t("brandNameAr")}:</strong> {request.brandNameAr}
              </div>
              <div>
                <strong>{t("brandNameEn")}:</strong> {request.brandNameEn}
              </div>
              <div>
                <strong>{t("descriptionAr")}:</strong>{" "}
                {request.brandDescriptionsAr}
              </div>
              <div>
                <strong>{t("descriptionEn")}:</strong>{" "}
                {request.brandDescriptionsEn}
              </div>
            </div>
          </section>

          {/* User Section */}
          <section className="py-2 border-b">
            <h3 className="text-lg font-semibold  pb-3">{t("submittedBy")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <strong>{t("email")}:</strong> {request.userDto.email}
              </div>
              <div>
                <strong>{t("identificationNumber")}:</strong>{" "}
                <span>{request.userDto.identificationNumber}</span>
              </div>
              <div>
                <strong>{t("identityTypeAr")}:</strong>{" "}
                <span>{request.userDto.identityTyNameEn}</span>
              </div>
              <div>
                <strong>{t("identityTypeEn")}:</strong>{" "}
                <span>{request.userDto.identityTyNameAr}</span>
              </div>
              <div>
                <strong>{t("mobile")}:</strong> {request.userDto.mobile}
              </div>
            </div>
          </section>

          {/* Request Details */}
          <section className="py-2 border-b">
            <h3 className="text-lg font-semibold pb-2">
              {t("requestDetails")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <strong>{t("createdOn")}:</strong>{" "}
                <span>{request.requestDto.createdOn.split("T")[0]}</span>
              </div>
              {request.requestDto.requestTypeNameEn === "EDIT_BRAND" && (
                <div>
                  <strong>{t("requestType")}:</strong>
                  <span>{t("editBrand")}</span>
                </div>
              )}
              {request.requestDto.requestTypeNameEn === "ADD_BRAND" && (
                <div>
                  <strong>{t("requestType")}:</strong>
                  <span>{t("addBrand")}</span>
                </div>
              )}

              <div>
                <strong>{t("status")}:</strong>{" "}
                {request.requestDto.statusName === "WAITING" && (
                  <span className="text-yellow-700">{t("waiting")}</span>
                )}
              </div>
            </div>
          </section>

          {/* Wallet Details */}
          {request.brandWalletDto && (
            <section>
              <h3 className="text-lg font-semibold pb-2">
                {t("walletDetails")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <strong>{t("iban")}:</strong>{" "}
                  <span>{request.brandWalletDto.iban}</span>
                </div>
                <div>
                  <strong>{t("bankAccountNumber")}:</strong>{" "}
                  <span>{request.brandWalletDto.bankAccountNumber}</span>
                </div>
                <div>
                  <strong>{t("bankName")}:</strong>{" "}
                  <span>{request.brandWalletDto.bankName}</span>
                </div>
              </div>
            </section>
          )}

          {/* Brand Logo */}
          {request.brandLogo && (
            <section>
              <h3 className="text-lg font-semibold">{t("brandLogo")}</h3>
              <img
                src={request.brandLogo}
                alt={t("brandLogo")}
                className="w-full h-auto rounded-lg border"
              />
            </section>
          )}

          {/* Brand Background Image */}
          {request.brandBackgroundImage && (
            <section>
              <h3 className="text-lg font-semibold">
                {t("brandBackgroundImage")}
              </h3>
              <img
                src={request.brandBackgroundImage}
                alt={t("brandBackgroundImage")}
                className="w-full h-auto rounded-lg border"
              />
            </section>
          )}
        </div>

        {/* Footer with Accept and Reject */}
        <footer className="border-t pt-4 mt-4 flex justify-between">
          <Button variant="outline" className="text-blue-900" onClick={onClose}>
            {t("close")}
          </Button>
        </footer>
      </div>
    </div>
  );
};

export default WaitingEditModal;
