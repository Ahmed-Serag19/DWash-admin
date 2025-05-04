import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ServiceModal from "@/components/ServiceModal";
import CardModal from "@/components/CardModal";
import { useTranslation } from "react-i18next";
import { ServiceRequest } from "@/interfaces/interfaces";

interface WaitingServiceCardProps {
  request: ServiceRequest;
  onAccept: (id: number) => Promise<void>;
  onReject: (id: number) => Promise<void>;
  onViewDetails: (request: ServiceRequest) => void;
}

const WaitingServiceCard: React.FC<WaitingServiceCardProps> = ({
  request,
  onAccept,
  onReject,
}) => {
  const { t, i18n } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState<
    "accept" | "reject" | null
  >(null);

  const brandName =
    i18n.language === "ar"
      ? request.brandNameAr || t("unknown")
      : request.brandNameEn || t("unknown");

  const serviceName =
    i18n.language === "ar"
      ? request.servicesNameAr || t("unknownService")
      : request.servicesNameEn || t("unknownService");

  const servicePrice = request.servicesPrice
    ? `${request.servicesPrice} SAR`
    : t("unknownPrice");

  const toggleDetailsModal = () => setIsModalOpen(!isModalOpen);

  const handleConfirm = async () => {
    if (confirmationAction === "accept") {
      await onAccept(request.request.id);
    } else if (confirmationAction === "reject") {
      await onReject(request.request.id);
    }
    setIsConfirmationOpen(false);
    setConfirmationAction(null);
  };

  const openConfirmationModal = (action: "accept" | "reject") => {
    setConfirmationAction(action);
    setIsConfirmationOpen(true);
  };

  return (
    <>
      <Card
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
        className="shadow-md min-w-[330px] sm:min-w-[270px] md:min-w-[330px]"
      >
        <CardHeader className="bg-blue-100 rounded-md">
          <CardTitle className="text-blue-900 text-xl font-bold text-center py-2">
            {serviceName}
          </CardTitle>
          <CardDescription className="text-stone-900 flex items-center justify-between gap-5 text-md font-semibold">
            <span>{t("brand")}:</span> <span>{brandName}</span>
          </CardDescription>
          <CardDescription className="text-stone-900 flex items-center justify-between gap-5 text-md font-semibold">
            <span>{t("requestNumber")}:</span> <span>{request.request.id}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 px-2 sm:px-5 mt-5 mb-2">
          <div className="flex justify-between">
            <span className="font-medium">{t("requestDate")}:</span>
            <span>
              {request.request.createdOn?.split("T")[0] || t("unknownDate")}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{t("price")}:</span>
            <span>{servicePrice}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{t("status")}:</span>
            {request.request.status === 100 && <span>{t("waiting")}</span>}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-center gap-2">
          <Button
            className="bg-green-600 text-white hover:bg-green-500 transition duration-300"
            onClick={() => openConfirmationModal("accept")}
          >
            {t("accept")}
          </Button>
          <Button
            className="bg-red-600 text-white hover:bg-red-500 transition duration-300"
            onClick={() => openConfirmationModal("reject")}
          >
            {t("reject")}
          </Button>
          <Button
            className="bg-blue-600 text-white hover:bg-blue-500 transition duration-300"
            onClick={toggleDetailsModal}
          >
            {t("details")}
          </Button>
        </CardFooter>
      </Card>

      <ServiceModal
        isOpen={isModalOpen}
        onClose={toggleDetailsModal}
        title={t("details")}
      >
        <div className="overflow-auto py-5 max-h-[80vh]">
          <table className="w-full table-fixed border-collapse border border-gray-300">
            <tbody>
              {/* General Information */}
              <tr className="bg-gray-100">
                <th className="p-2 text-left border border-gray-300">
                  {t("brand")}
                </th>
                <td className="p-2 border border-gray-300">
                  {i18n.language === "ar"
                    ? request.brandNameAr || t("unknown")
                    : request.brandNameEn || t("unknown")}
                </td>
              </tr>
              <tr>
                <th className="p-2 text-left border border-gray-300">
                  {t("requestDate")}
                </th>
                <td className="p-2 border border-gray-300">
                  {request.request.createdOn?.split("T")[0] || t("unknownDate")}
                </td>
              </tr>
              <tr className="bg-gray-100">
                <th className="p-2 text-left border border-gray-300">
                  {t("status")}
                </th>
                <td className="p-2 border border-gray-300">
                  {request.request.statusName || t("unknownStatus")}
                </td>
              </tr>

              {/* Service Details */}
              <tr>
                <th className="p-2 text-left border border-gray-300">
                  {t("serviceName")}
                </th>
                <td className="p-2 border border-gray-300">
                  {i18n.language === "ar"
                    ? request.servicesNameAr || t("unknownService")
                    : request.servicesNameEn || t("unknownService")}
                </td>
              </tr>
              <tr className="bg-gray-100">
                <th className="p-2 text-left border border-gray-300">
                  {t("description")}
                </th>
                <td className="p-2 border border-gray-300">
                  <div className="overflow-auto max-h-24 break-words">
                    {i18n.language === "ar"
                      ? request.servicesDescriptionsAr
                      : request.servicesDescriptionsEn}
                  </div>
                </td>
              </tr>
              <tr>
                <th className="p-2 text-left border border-gray-300">
                  {t("price")}
                </th>
                <td className="p-2 border border-gray-300">
                  {request.servicesPrice
                    ? `${request.servicesPrice} SAR`
                    : t("unknownPrice")}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Image Section */}
          {Array.isArray(request.serviceImages) &&
            request.serviceImages.length > 0 && (
              <section className="mt-6">
                <h3 className="text-lg font-semibold mb-2">{t("images")}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {request.serviceImages.map((image: any, index: number) => (
                    <div
                      key={image.id}
                      className="flex justify-center items-center"
                    >
                      <img
                        src={image.imagePath}
                        alt={`${t("serviceImage")} ${index + 1}`}
                        className="h-32 w-full object-cover rounded-lg border"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

          {request.extraServices && request.extraServices.length > 0 && (
            <section className="mt-6">
              <h3 className="text-lg font-semibold mb-3">
                {t("extraServices")}
              </h3>
              <div className="space-y-3">
                {request.extraServices.map((extra) => (
                  <div
                    key={extra.id}
                    className="p-3 border rounded-lg flex justify-between items-center bg-gray-50"
                  >
                    <div>
                      <h4 className="font-medium">
                        {i18n.language === "ar"
                          ? extra.extraNameAr
                          : extra.extraNameEn}
                      </h4>
                      {extra.extraDescriptionsAr ||
                      extra.extraDescriptionsEn ? (
                        <p className="text-sm text-gray-600 mt-1">
                          {i18n.language === "ar"
                            ? extra.extraDescriptionsAr
                            : extra.extraDescriptionsEn}
                        </p>
                      ) : null}
                    </div>
                    <span className="font-bold text-blue-600 whitespace-nowrap ml-4">
                      +{extra.extraPrice} SAR
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{t("total")}:</span>
                  <span className="font-bold text-lg">
                    {request.extraServices.reduce(
                      (sum, extra) => sum + extra.extraPrice,
                      request.servicesPrice || 0
                    )}{" "}
                    SAR
                  </span>
                </div>
              </div>
            </section>
          )}
        </div>
      </ServiceModal>

      <CardModal
        isOpen={isConfirmationOpen}
        titleKey={
          confirmationAction === "accept"
            ? "confirmAcceptTitle"
            : "confirmRejectTitle"
        }
        descriptionKey={
          confirmationAction === "accept"
            ? "confirmAcceptDescription"
            : "confirmRejectDescription"
        }
        onConfirm={handleConfirm}
        onCancel={() => setIsConfirmationOpen(false)}
      />
    </>
  );
};

export default WaitingServiceCard;
