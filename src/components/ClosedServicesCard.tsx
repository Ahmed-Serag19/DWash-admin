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
import { useTranslation } from "react-i18next";
import { ClosedServiceCardProps } from "@/interfaces/interfaces";

const ClosedServiceCard: React.FC<ClosedServiceCardProps> = ({ service }) => {
  const { t, i18n } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const serviceName =
    i18n.language === "ar"
      ? service.servicesNameAr || t("unknownService")
      : service.servicesNameEn || t("unknownService");

  const servicePrice = service.servicesPrice
    ? `${service.servicesPrice} SAR`
    : t("unknownPrice");

  const statusName = service.request.statusName || t("unknownStatus");

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <>
      <Card
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
        key={service.request.id}
        className="shadow-md  md:min-w-[330px]"
      >
        <CardHeader className="bg-blue-100 rounded-md ">
          <CardTitle className="text-blue-900 text-xl font-bold text-center py-2 min-h-[90px]">
            {serviceName}
          </CardTitle>
          <CardDescription className="text-stone-900 flex items-center justify-between gap-5 text-md font-semibold">
            <span>{t("status")}:</span>{" "}
            {statusName === "ACCEPTED" ? (
              <span className="text-green-600 text-lg">{t("accepted")}</span>
            ) : (
              <span className="text-red-500 text-lg">{t("rejected")}</span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 px-2 sm:px-5 mt-5 mb-2">
          <div className="flex justify-between">
            <span className="font-medium">{t("requestDate")}:</span>
            <span>
              {service.request.createdOn?.split("T")[0] || t("unknownDate")}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{t("price")}:</span>
            <span>{servicePrice}</span>
          </div>
          <div className="flex justify-between min-h-[50px]">
            <span className="font-medium">{t("requestType")}:</span>
            <span>
              {i18n.language === "ar"
                ? service.request.requestTypeNameAr
                : service.request.requestTypeNameEn}
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-center gap-2">
          <Button
            className="bg-blue-600 text-white hover:bg-blue-500 transition duration-300"
            onClick={toggleModal}
          >
            {t("details")}
          </Button>
        </CardFooter>
      </Card>

      <ServiceModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        title={t("details")}
      >
        <div className="flex flex-col gap-4 py-3 px-4">
          <div className="flex justify-between">
            <strong className="text-gray-700">{t("serviceName")}:</strong>
            <span className="text-gray-900">{serviceName}</span>
          </div>

          <div className="flex justify-between">
            <strong className="text-gray-700">{t("price")}:</strong>
            <span className="text-gray-900">{servicePrice}</span>
          </div>
          <div className="flex justify-between">
            <strong className="text-gray-700">{t("requestType")}:</strong>
            <span className="text-gray-900">
              {i18n.language === "ar"
                ? service.request.requestTypeNameAr
                : service.request.requestTypeNameEn}
            </span>
          </div>
          <div className="flex justify-between">
            <span>{t("status")}:</span>{" "}
            {statusName === "ACCEPTED" ? (
              <span className="text-green-600 text-md">{t("accepted")}</span>
            ) : (
              <span className="text-red-500 text-md">{t("rejected")}</span>
            )}
          </div>
          <div className="flex justify-between">
            <strong className="text-gray-700">{t("description")}:</strong>
            <span className="text-gray-900">
              {i18n.language === "ar"
                ? service.servicesDescriptionsAr
                : service.servicesDescriptionsEn}
            </span>
          </div>
        </div>
      </ServiceModal>
    </>
  );
};

export default ClosedServiceCard;
