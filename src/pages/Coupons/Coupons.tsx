import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { endpoints } from "@/constants/endPoints";
import { toast } from "react-toastify";
import { Discount, DiscountFormInputs } from "@/interfaces/interfaces";
import CouponModal from "@/components/CouponModal";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

const Coupons: React.FC = () => {
  const { t } = useTranslation();
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const { register, handleSubmit, control, reset } =
    useForm<DiscountFormInputs>();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [discountTypePreview, setDiscountTypePreview] = useState("");
  const fetchDiscounts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(endpoints.getDiscounts, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      });
      if (response.data.success) {
        setDiscounts(response.data.content);
      } else {
        toast.error(t("errorFetchingData"));
      }
    } catch (error) {
      toast.error(t("errorFetchingData"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddDiscount = async (data: DiscountFormInputs) => {
    try {
      const response = await axios.post(endpoints.addDiscount, data, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      });
      if (response.data.success) {
        toast.success(t("discountAdded"));
        fetchDiscounts();
        reset();
        setIsModalOpen(false);
      } else {
        toast.error(t("errorAddingDiscount"));
      }
    } catch (error) {
      toast.error(t("errorAddingDiscount"));
    }
  };

  const handleDeleteDiscount = async (discountId: number) => {
    try {
      const response = await axios.delete(
        endpoints.deleteDiscount(discountId),
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        toast.success(t("discountDeleted"));
        fetchDiscounts();
      } else {
        toast.error(t("errorDeletingDiscount"));
      }
    } catch (error) {
      toast.error(t("errorDeletingDiscount"));
    }
  };

  useEffect(() => {
    fetchDiscounts();
  }, []);

  return (
    <div className="flex flex-col items-center p-6 gap-5">
      <div className="flex justify-center items-center gap-5 flex-col  max-w-6xl mb-5">
        <div>
          <Button
            className="bg-blue-600 text-white px-4 py-2"
            onClick={() => setIsModalOpen(true)}
          >
            {t("addDiscount")}
          </Button>
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-900">
            {t("manageDiscounts")}
          </h1>
        </div>
      </div>

      {/* Discount Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 min-h-[500px] lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {discounts.map((discount) => (
          <div
            key={discount.discountId}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
          >
            <h3 className="text-lg font-bold text-blue-900">
              {discount.discountCode}
            </h3>
            <p>
              {t("type")}: {discount.discountType}
            </p>
            <p>
              {t("amount")}: {discount.discountAmount}{" "}
              {discount.discountType === "AMOUNT" ? "SAR" : "%"}
            </p>
            <p>
              {t("startDate")}: {discount.startDate.split("T")[0]}
            </p>
            <p>
              {t("endDate")}: {discount.endDate.split("T")[0]}
            </p>
            <p>
              {t("for")}: {discount.freelancer || t("everyone")}
            </p>
            <Button
              className="mt-4 bg-red-600 text-white py-1"
              onClick={() => handleDeleteDiscount(discount.discountId)}
            >
              {t("delete")}
            </Button>
          </div>
        ))}
      </div>

      {/* Add Discount Modal */}
      {isModalOpen && (
        <CouponModal
          isOpen={isModalOpen}
          title={t("addDiscount")}
          onClose={() => setIsModalOpen(false)}
        >
          <form
            onSubmit={handleSubmit(handleAddDiscount)}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="discountCode"
                className="block text-blue-900 font-medium pt-1 pb-3"
              >
                {t("discountCode")}
              </label>
              <input
                id="discountCode"
                {...register("discountCode", {
                  required: t("errorRequired") as string,
                })}
                className="w-full border rounded-md p-2"
              />
            </div>

            <div>
              <label
                htmlFor="discountType"
                className="block text-blue-900 font-medium pt-1 pb-3"
              >
                {t("discountType")}
              </label>
              <Controller
                name="discountType"
                control={control}
                defaultValue="AMOUNT"
                render={({ field }) => (
                  <select {...field} className="w-full border rounded-md p-2">
                    <option value="AMOUNT">{t("amount")}</option>
                    <option value="PERCENTAGE">{t("percentage")}</option>
                  </select>
                )}
              />
            </div>

            <div>
              <label
                htmlFor="discountAmount"
                className="block text-blue-900 font-medium pt-1 pb-3"
              >
                {t("discountAmount")}
              </label>
              <div className="flex items-center">
                <input
                  id="discountAmount"
                  type="number"
                  {...register("discountAmount", {
                    required: t("errorRequired") as string,
                  })}
                  className="w-full border rounded-md p-2"
                />
                <span className="ml-2">
                  {control._defaultValues.discountType === "PERCENTAGE"
                    ? "%"
                    : "SAR"}
                </span>
              </div>
            </div>

            <div>
              <label
                htmlFor="startDate"
                className="block text-blue-900 font-medium pt-1 pb-3"
              >
                {t("startDate")}
              </label>
              <input
                id="startDate"
                type="date"
                {...register("startDate", {
                  required: t("errorRequired") as string,
                })}
                className="w-full border rounded-md p-2"
              />
            </div>

            <div>
              <label
                htmlFor="endDate"
                className="block text-blue-900 font-medium pt-1 pb-3"
              >
                {t("endDate")}
              </label>
              <input
                id="endDate"
                type="date"
                {...register("endDate", {
                  required: t("errorRequired") as string,
                })}
                className="w-full border rounded-md p-2"
              />
            </div>

            <div>
              <label
                htmlFor="brandMail"
                className="block text-blue-900 font-medium pt-1 pb-3"
              >
                {t("brandMail")}
              </label>
              <input
                id="brandMail"
                {...register("brandMail")}
                className="w-full border rounded-md p-2"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 text-white py-2"
            >
              {t("addDiscount")}
            </Button>
          </form>
        </CouponModal>
      )}
    </div>
  );
};
export default Coupons;
