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
  request: any; // Replace with the proper interface
  onAccept: (id: number) => Promise<void>;
  onReject: (id: number) => Promise<void>;
};

const WaitingEditCard: React.FC<WaitingEditCardProps> = ({
  request,
  onAccept,
  onReject,
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

  const brandName =
    i18n.language === "ar"
      ? request.brandNameAr || t("unknown")
      : request.brandNameEn || t("unknown");

  const userName =
    i18n.language === "ar"
      ? request.userDto.nameAr || t("unknown")
      : request.userDto.nameEn || t("unknown");

  return (
    <>
      <Card className="shadow-md">
        <CardHeader className="bg-blue-100 rounded-md">
          <CardTitle className="text-blue-900 text-xl font-bold text-center py-2">
            {brandName}
          </CardTitle>
          <CardDescription className="text-gray-700 text-center">
            {t("submittedBy")}: {userName}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <div className="mb-2">
            <strong>{t("email")}: </strong>
            {request.userDto.email}
          </div>
          <div>
            <strong>{t("status")}: </strong>
            {t(request.requestDto.statusName.toLowerCase())}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
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
