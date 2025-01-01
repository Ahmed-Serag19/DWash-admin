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
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState<
    "accept" | "reject" | null
  >(null);

  const userName =
    i18n.language === "ar"
      ? request.request.user.nameAr || t("unknown")
      : request.request.user.nameEn || t("unknown");

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
      await onAccept(request.request.requestId);
    } else if (confirmationAction === "reject") {
      await onReject(request.request.requestId);
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
        key={request.request.requestId}
        className="shadow-md md:min-w-[330px] "
      >
        <CardHeader className="bg-blue-100 rounded-md">
          <CardTitle className="text-blue-900 text-xl font-bold text-center py-2">
            {serviceName}
          </CardTitle>
          <CardDescription className="text-stone-900 flex items-center justify-between gap-5 text-md font-semibold">
            <span>{t("user")}:</span> <span>{userName}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 px-2 sm:px-5 mt-5 mb-2">
          <div className="flex justify-between">
            <span className="font-medium">{t("requestDate")}:</span>
            <span>{request.createdOn?.split("T")[0] || t("unknownDate")}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{t("price")}:</span>
            <span>{servicePrice}</span>
          </div>
          <div className="flex justify-between min-h-[50px]">
            <span className="font-medium">{t("email")}:</span>
            <span>{request.request.user.email}</span>
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
        <div className="flex flex-col gap-4 py-3 px-4">
          <div className="flex justify-between">
            <strong className="text-gray-700">{t("user")}:</strong>
            <span className="text-gray-900">
              {i18n.language === "ar"
                ? request.request.user.nameAr || t("unknown")
                : request.request.user.nameEn || t("unknown")}
            </span>
          </div>
          <div className="flex justify-between">
            <strong className="text-gray-700">{t("email")}:</strong>
            <span className="text-gray-900">{request.request.user.email}</span>
          </div>
          <div className="flex justify-between">
            <strong className="text-gray-700">{t("serviceName")}:</strong>
            <span className="text-gray-900">
              {i18n.language === "ar"
                ? request.servicesNameAr || t("unknownService")
                : request.servicesNameEn || t("unknownService")}
            </span>
          </div>
          <div className="flex justify-between">
            <strong className="text-gray-700">{t("description")}:</strong>
            <span className="text-gray-900">
              {i18n.language === "ar"
                ? request.servicesDescriptionsAr
                : request.servicesDescriptionsEn}
            </span>
          </div>
          <div className="flex justify-between">
            <strong className="text-gray-700">{t("price")}:</strong>
            <span className="text-gray-900">
              {request.servicesPrice
                ? `${request.servicesPrice} SAR`
                : t("unknownPrice")}
            </span>
          </div>
          <div className="flex justify-between">
            <strong className="text-gray-700">{t("status")}:</strong>
            <span className="text-gray-900">
              {request.request.statusName || t("unknownStatus")}
            </span>
          </div>
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
