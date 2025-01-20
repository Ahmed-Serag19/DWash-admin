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
  console.log(service);
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
          <CardDescription className="text-stone-900 flex items-center justify-between gap-5 text-md font-semibold">
            <span>{t("requestNumber")}:</span> <span>{service.serviceId}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 px-2 sm:px-5 mt-5 ">
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
              {i18n.language === "ar" && service.request.requestTypeNameAr}

              {i18n.language === "en" && service.request.requestTypeNameEn}
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
        <div className="overflow-auto max-h-[80vh] py-5">
          <table className="w-full table-fixed border-collapse border  border-gray-300">
            <tbody>
              <tr className="bg-gray-100">
                <th
                  className={`p-2 ${
                    i18n.language === "ar" ? "text-right" : "text-left"
                  } border border-gray-300`}
                >
                  {t("serviceName")}
                </th>
                <td className="p-2 border border-gray-300">
                  {service.servicesNameEn || t("unknownService")}
                </td>
              </tr>

              <tr>
                <th
                  className={`p-2 ${
                    i18n.language === "ar" ? "text-right" : "text-left"
                  } border border-gray-300`}
                >
                  {t("price")}
                </th>
                <td className="p-2 border border-gray-300">
                  {service.servicesPrice
                    ? `${service.servicesPrice} SAR`
                    : t("unknownPrice")}
                </td>
              </tr>
              <tr className="bg-gray-100">
                <th
                  className={`p-2 ${
                    i18n.language === "ar" ? "text-right" : "text-left"
                  } border border-gray-300`}
                >
                  {t("requestType")}
                </th>
                <td className="p-2 border border-gray-300">
                  <span className="text-blue-600">
                    {i18n.language === "ar" &&
                      service.request.requestTypeNameAr}

                    {i18n.language === "en" &&
                      service.request.requestTypeNameEn}
                  </span>{" "}
                </td>
              </tr>
              <tr>
                <th
                  className={`p-2 ${
                    i18n.language === "ar" ? "text-right" : "text-left"
                  } border border-gray-300`}
                >
                  {t("status")}
                </th>
                <td className="p-2 border border-gray-300">
                  {service.request.statusName === "ACCEPTED" ? (
                    <span className="text-green-600">{t("accepted")}</span>
                  ) : (
                    <span className="text-red-500">{t("rejected")}</span>
                  )}
                </td>
              </tr>
              <tr className="bg-gray-100">
                <th
                  className={`p-2 ${
                    i18n.language === "ar" ? "text-right" : "text-left"
                  } border border-gray-300 bg-gray-100`}
                >
                  {t("description")}
                </th>

                <td className="p-2 border border-gray-300">
                  <div className="overflow-auto max-h-24 break-words">
                    {service.servicesDescriptionsEn || t("noDescription")}
                  </div>
                </td>
              </tr>
              <tr>
                <th
                  className={`p-2 ${
                    i18n.language === "ar" ? "text-right" : "text-left"
                  } border border-gray-300`}
                >
                  {t("requestDate")}
                </th>
                <td>
                  {service.request.createdOn?.split("T")[0] || t("unknownDate")}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Images Section */}
          {service.serviceImages && service.serviceImages.length > 0 && (
            <section className="mt-6">
              <h3 className="text-lg font-semibold mb-2">{t("images")}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {service.serviceImages.map(
                  (
                    image: { url: string; description: string },
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="flex justify-center items-center"
                    >
                      <img
                        src={image.url}
                        alt={
                          image.description ||
                          `${t("serviceImage")} ${index + 1}`
                        }
                        className="h-32 w-full object-cover rounded-lg border"
                      />
                    </div>
                  )
                )}
              </div>
            </section>
          )}

          {/* Extra Services Section */}
          {service.extraServices && service.extraServices.length > 0 && (
            <section className="mt-6">
              <h3 className="text-lg font-semibold mb-2">
                {t("extraServices")}
              </h3>
              <ul className="list-disc pl-5">
                {service.extraServices.map(
                  (extra: { id: number; name: string; price: number }) => (
                    <li key={extra.id} className="text-gray-900">
                      {extra.name} - {extra.price} {t("currency")}
                    </li>
                  )
                )}
              </ul>
            </section>
          )}
        </div>
      </ServiceModal>
    </>
  );
};

export default ClosedServiceCard;
