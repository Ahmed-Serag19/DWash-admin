import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { CouponCardProps } from "@/interfaces/interfaces";
import i18n from "@/i18n";

const CouponCard: React.FC<CouponCardProps> = ({
  discount,
  handleOpenDeleteModal,
}) => {
  const { t } = useTranslation();
  return (
    <Card
      key={discount.discountId}
      className="shadow-md md:min-w-[270px] min-w-[250px]"
    >
      <CardHeader className="bg-blue-100 rounded-md">
        <CardTitle className="text-blue-900 text-xl font-bold text-center">
          {discount.discountCode}
        </CardTitle>
        <CardDescription className="text-stone-700 text-center text-md font-semibold min-h-[50px]">
          {t("for")} {discount.freelancer || t("everyone")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 mt-5 mb-2">
        <div className="flex justify-between">
          <span className="font-medium">{t("added")} : </span>
          <span>{discount.createdOn.split("T")[0]}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">{t("amount")} : </span>
          {i18n.language === "en" ? (
            <span>
              {discount.discountAmount}{" "}
              {discount.discountType === "AMOUNT" ? "SAR" : "%"}
            </span>
          ) : (
            <span className="space-x-1">
              <span>{discount.discountAmount}</span>
              <span>{discount.discountType === "AMOUNT" ? "SAR" : "%"}</span>
            </span>
          )}
        </div>
        <div className="flex justify-between">
          <span className="font-medium">{t("startDate")} : </span>
          <span>{discount.startDate.split("T")[0]}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">{t("endDate")} : </span>
          <span>{discount.endDate.split("T")[0]}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-red-600 text-white"
          onClick={handleOpenDeleteModal}
        >
          {t("delete")}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CouponCard;
