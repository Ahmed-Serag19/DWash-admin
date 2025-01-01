import React, { useState } from "react";
import CardModal from "./CardModal";
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
import { useNavigate } from "react-router-dom";

const UserCard: React.FC<UserCardProps> = ({
  user,
  isInactive,
  onActivate,
  onDeactivate,
}) => {
  const { t, i18n } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<"activate" | "deactivate">(
    "activate"
  );
  const navigate = useNavigate();

  const handleModalOpen = (action: "activate" | "deactivate") => {
    setModalAction(action);
    setIsModalOpen(true);
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    if (modalAction === "activate") {
      onActivate(user.userDto.id);
    } else if (modalAction === "deactivate") {
      onDeactivate(user.userDto.id);
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <CardModal
        isOpen={isModalOpen}
        titleKey={
          modalAction === "activate"
            ? "activateUserTitle"
            : "deactivateUserTitle"
        }
        descriptionKey={
          modalAction === "activate"
            ? "activateUserDescription"
            : "deactivateUserDescription"
        }
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
      />
      <Card
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
        className="w-full  mx-auto border border-gray-200 shadow-md rounded-lg sm:min-w-[280px] min-w-[200px]"
      >
        <CardHeader className="flex items-center gap-4 border-b border-solid border-stone-300">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center bg-white  font-bold ${
              isInactive ? " text-red-600" : "text-blue-950"
            }`}
          >
            <FaUserCircle className="w-full h-full text-5xl" />
          </div>
          <div className="py-1 flex flex-col items-center justify-center">
            <CardTitle className="text-lg font-semibold text-blue-950">
              {user.userDto.nameAr}
            </CardTitle>
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
              <dt className="font-semibold text-blue-900">{t("idType")}:</dt>
              <dd>
                {i18n.language === "ar"
                  ? user.userDto.identityTyNameAr
                  : user.userDto.identityTyNameEn}
              </dd>
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
              onClick={() => handleModalOpen("activate")}
            >
              {t("activate")}
            </Button>
          ) : (
            <Button
              variant="outline"
              className="text-red-600 border-red-600 hover:bg-red-100"
              onClick={() => handleModalOpen("deactivate")}
            >
              {t("deactivate")}
            </Button>
          )}
          <Button
            variant="outline"
            className="text-blue-600 border-blue-600 hover:bg-blue-100"
            onClick={() =>
              navigate("/service-provider-form", {
                state: { data: user },
              })
            }
          >
            {t("edit")}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default UserCard;
