import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { FaUserCircle } from "react-icons/fa";
import { Button } from "./ui/button";
import { UserCardProps } from "@/interfaces/interfaces";

const UserCard: React.FC<UserCardProps> = ({
  user,
  isInactive,
  onActivate,
  onDeactivate,
}) => {
  const { t, i18n } = useTranslation();
  return (
    <Card
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
      className="w-full border border-gray-200 shadow-sm rounded-lg "
    >
      <CardHeader className="flex items-center space-x-4 border-b border-solid border-stone-300">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center bg-white  font-bold ${
            isInactive ? " text-red-600" : "text-blue-950"
          }`}
        >
          <FaUserCircle className="w-full h-full text-5xl" />
        </div>
        <div className="py-1 text-center">
          <CardTitle className="text-lg font-semibold text-blue-950">
            {user.userDto.nameEn}
          </CardTitle>
          <CardDescription className="text-sm text-gray-600">
            {user.userDto.email}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent
        className={`space-y-2 text-gray-700 flex flex-col mt-5 ${
          i18n.language === "ar" ? "text-right" : "text-left"
        }`}
      >
        <dl className="space-y-2">
          <div>
            <dt className="font-semibold text-blue-900">{t("mobile")}:</dt>
            <dd>{user.userDto.mobile}</dd>
          </div>
          <div>
            <dt className="font-semibold text-blue-900">{t("id")}:</dt>
            <dd>{user.userDto.identificationNumber}</dd>
          </div>
          <div>
            <dt className="font-semibold text-blue-900">{t("createdOn")}:</dt>
            <dd>{user.userDto.createdOn}</dd>
          </div>
          <div>
            <dt className="font-semibold text-blue-900">
              {t("deductionPercentage")}:
            </dt>
            <dd>{user.brandWalletDto.deductionPrs ?? t("n/a")}%</dd>
          </div>
        </dl>
      </CardContent>
      <CardFooter className="flex justify-center gap-3">
        {isInactive ? (
          <Button
            variant="outline"
            className="text-green-600 border-green-600 hover:bg-green-100"
            onClick={onActivate}
          >
            {t("activate")}
          </Button>
        ) : (
          <Button
            variant="outline"
            className="text-red-600 border-red-600 hover:bg-red-100"
            onClick={onDeactivate}
          >
            {t("deactivate")}
          </Button>
        )}
        <Button
          variant="outline"
          className="text-blue-600 border-blue-600 hover:bg-blue-100"
        >
          {t("edit")}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserCard;
