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
import CardModal from "./CardModal";
import WaitingEditModal from "./WaitingEditModal";
import { useTranslation } from "react-i18next";

type WaitingEditCardProps = {
  request: any;
  onAccept: (id: number) => Promise<void>;
  onReject: (id: number) => Promise<void>;
  status: string;
};

const WaitingEditCard: React.FC<WaitingEditCardProps> = ({
  request,
  onAccept,
  onReject,
  status,
}) => {
  const { t, i18n } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState<{
    isOpen: boolean;
    action: "accept" | "reject" | null;
  }>({ isOpen: false, action: null });

  const toggleDetailsModal = () => setIsModalOpen(!isModalOpen);

  const openConfirmationModal = (action: "accept" | "reject") => {
    setConfirmationModal({ isOpen: true, action });
  };

  const closeConfirmationModal = () => {
    setConfirmationModal({ isOpen: false, action: null });
  };

  const handleConfirmAction = async () => {
    if (confirmationModal.action === "accept") {
      await onAccept(request.requestDto.id);
    } else if (confirmationModal.action === "reject") {
      await onReject(request.requestDto.id);
    }
    closeConfirmationModal();
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
    <>
      <Card dir={i18n.language === "ar" ? "rtl" : "ltr"} className="shadow-md">
        <CardHeader className="bg-blue-100 rounded-md">
          <CardTitle className="text-blue-900 text-xl font-bold text-center py-2">
            {i18n.language === "ar" ? request.brandNameAr : request.brandNameEn}
          </CardTitle>
          <CardDescription className="text-gray-700 text-center">
            {t("submittedBy")}:{" "}
            {i18n.language === "ar"
              ? request.userDto.nameAr
              : request.userDto.nameEn}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 my-5">
          <div className="mb-2">
            <strong>{t("email")}: </strong>
            <span className="ps-2">{request.userDto.email}</span>
          </div>
          <div>
            <strong>{t("status")}: </strong>
            <span className="ps-2">{renderStatus()}</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-3 py-5">
          {status === "Opened" && (
            <>
              <Button
                variant="outline"
                className="text-green-600"
                onClick={() => openConfirmationModal("accept")}
              >
                {t("accept")}
              </Button>
              <Button
                variant="outline"
                className="text-red-600"
                onClick={() => openConfirmationModal("reject")}
              >
                {t("reject")}
              </Button>
            </>
          )}
          <Button
            variant="outline"
            className="text-blue-600"
            onClick={toggleDetailsModal}
          >
            {t("details")}
          </Button>
        </CardFooter>
      </Card>

      {/* Confirmation Modal */}
      <CardModal
        isOpen={confirmationModal.isOpen}
        titleKey={
          confirmationModal.action === "accept"
            ? "confirmAcceptTitle"
            : "confirmRejectTitle"
        }
        descriptionKey={
          confirmationModal.action === "accept"
            ? "confirmAcceptDescription"
            : "confirmRejectDescription"
        }
        onConfirm={handleConfirmAction}
        onCancel={closeConfirmationModal}
      />

      {/* Details Modal */}
      <WaitingEditModal
        isOpen={isModalOpen}
        onClose={toggleDetailsModal}
        request={request}
      />
    </>
  );
};

export default WaitingEditCard;
