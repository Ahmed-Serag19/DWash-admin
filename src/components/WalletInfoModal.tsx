import type React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import type { WalletInfoModalProps } from "@/interfaces/interfaces";

const WalletInfoModal: React.FC<WalletInfoModalProps> = ({
  isOpen,
  onClose,
  walletInfo,
}) => {
  const { t, i18n } = useTranslation();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
        className="sm:max-w-md"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-blue-900">
            {t("walletInformation")}
          </DialogTitle>
          <DialogDescription>{t("walletDetailsDescription")}</DialogDescription>
        </DialogHeader>
        <div
          className={`space-y-4 ${
            i18n.language === "ar" ? "text-right" : "text-left"
          }`}
        >
          <div className="grid grid-cols-2 gap-2">
            <div className="font-semibold text-blue-900">{t("walletId")}:</div>
            <div>{walletInfo.walletId || t("notAvailable")}</div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="font-semibold text-blue-900">
              {t("deductionPercentage")}:
            </div>
            <div>
              {walletInfo.deductionPrs
                ? `${walletInfo.deductionPrs}%`
                : t("notAvailable")}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="font-semibold text-blue-900">{t("bankName")}:</div>
            <div>{walletInfo.bankName || t("notAvailable")}</div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="font-semibold text-blue-900">{t("iban")}:</div>
            <div>{walletInfo.iban || t("notAvailable")}</div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="font-semibold text-blue-900">
              {t("accountNumber")}:
            </div>
            <div>{walletInfo.bankAccountNumber || t("notAvailable")}</div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="font-semibold text-blue-900">
              {t("totalAmount")}:
            </div>
            <div>
              {walletInfo.totalAmount !== null ? walletInfo.totalAmount : 0}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="font-semibold text-blue-900">
              {t("lastTransferDate")}:
            </div>
            <div>{walletInfo.transferDate || t("notAvailable")}</div>
          </div>
        </div>
        <DialogFooter className="sm:justify-center">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="mt-2 bg-blue-900 text-white hover:bg-blue-700 transition duration-300 hover:text-white"
          >
            {t("close")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WalletInfoModal;
