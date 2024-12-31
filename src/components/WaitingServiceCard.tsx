import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface WaitingServiceCardProps {
  request: any;
  onAccept: (id: number) => void;
  onReject: (id: number) => void;
  onViewDetails: (request: any) => void;
}

const WaitingServiceCard: React.FC<WaitingServiceCardProps> = ({
  request,
  onAccept,
  onReject,
  onViewDetails,
}) => {
  const { t, i18n } = useTranslation();
  console.log(request);
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

  return (
    <Card
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
      key={request.request.requestId}
      className="shadow-md sm:min-w-[300px]"
    >
      <CardHeader className="bg-blue-100 rounded-md">
        <CardTitle className="text-blue-900 text-xl font-bold text-center py-2">
          {serviceName}
        </CardTitle>
        <CardDescription
          dir={i18n.language === "ar" ? "rtl" : "ltr"}
          className="text-stone-900 flex items-center justify-between gap-5 text-md font-semibold"
        >
          <span>{t("user")}:</span> <span>{userName}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 mt-5 mb-2">
        <div className="flex justify-between">
          <span className="font-medium">{t("requestDate")}:</span>
          <span>{request.createdOn?.split("T")[0] || t("unknownDate")}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">{t("price")}:</span>
          <span>{servicePrice}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">{t("email")}:</span>
          <span>{request.user.email}</span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-center gap-2">
        <Button
          className="bg-green-600 text-white"
          onClick={() => onAccept(request.request.requestId)}
        >
          {t("accept")}
        </Button>
        <Button
          className="bg-red-600 text-white"
          onClick={() => onReject(request.request.requestId)}
        >
          {t("reject")}
        </Button>
        <Button
          className="bg-blue-600 text-white"
          onClick={() => onViewDetails(request)}
        >
          {t("details")}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WaitingServiceCard;
