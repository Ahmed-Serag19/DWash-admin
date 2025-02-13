import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { endpoints } from "@/constants/endPoints";
import { toast } from "react-toastify";
import { Discount, DiscountFormInputs } from "@/interfaces/interfaces";
import CouponModal from "@/components/CouponModal";
import CardModal from "@/components/CardModal";
import CouponCard from "@/components/CouponCard";

const Coupons: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DiscountFormInputs>();
  const [isLoading, setIsLoading] = useState(false);
  const [isAddModalOpen, setisAddModalOpen] = useState(false);
  const [discountType, setDiscountType] = useState("AMOUNT");
  const [applyTo, setApplyTo] = useState("everyone");
  const [brandMail, setBrandMail] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDiscountId, setSelectedDiscountId] = useState<number | null>(
    null
  );

  const handleOpenDeleteModal = (discountId: number) => {
    setSelectedDiscountId(discountId);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedDiscountId(null);
    setIsDeleteModalOpen(false);
  };

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
      const payload = {
        ...data,
        brandMail: applyTo === "everyone" ? null : brandMail,
      };

      console.log("Payload sent to API:", payload);

      const response = await axios.post(endpoints.addDiscount, payload, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        toast.success(t("discountAdded"));
        fetchDiscounts();
        reset();
        setisAddModalOpen(false);
        setDiscountType("AMOUNT");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          i18n.language === "ar"
            ? error.response.data?.messageAr || t("errorAddingDiscount")
            : error.response.data?.messageEn || t("errorAddingDiscount");
        toast.error(errorMessage);
      } else {
        toast.error(t("errorAddingDiscount"));
      }
    }
  };

  const handleDeleteDiscount = async () => {
    if (selectedDiscountId === null) return;
    try {
      const response = await axios.delete(
        endpoints.deleteDiscount(selectedDiscountId),
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
    } finally {
      handleCloseDeleteModal();
    }
  };

  useEffect(() => {
    fetchDiscounts();
  }, []);

  return isLoading ? (
    <div className="loader"></div>
  ) : (
    <div className="flex flex-col items-center p-6 gap-5">
      <div className="flex justify-center items-center gap-5 flex-col  max-w-6xl mb-5">
        <div>
          <Button
            className="bg-blue-600 text-white px-4 py-2"
            onClick={() => setisAddModalOpen(true)}
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-6xl">
        {discounts.map((discount) => (
          <CouponCard
            key={discount.discountId}
            discount={discount}
            handleOpenDeleteModal={() =>
              handleOpenDeleteModal(discount.discountId)
            }
          />
        ))}
      </div>
      <CardModal
        isOpen={isDeleteModalOpen}
        titleKey={t("deleteCoupon")}
        onCancel={handleCloseDeleteModal}
        onConfirm={handleDeleteDiscount}
        descriptionKey={t("deleteCouponDesc")}
      />

      {/* Add Discount Modal */}
      {isAddModalOpen && (
        <CouponModal
          isOpen={isAddModalOpen}
          title={t("addDiscount")}
          onClose={() => setisAddModalOpen(false)}
        >
          <form
            onSubmit={handleSubmit(handleAddDiscount)}
            className="space-y-4"
          >
            {/* Discount Code */}
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

            {/* Discount Type */}
            <div>
              <label
                htmlFor="discountType"
                className="block text-blue-900 font-medium pt-1 pb-3"
              >
                {t("discountType")}
              </label>
              <select
                {...register("discountType", {
                  required: t("errorRequired") as string,
                  onChange: (e) => setDiscountType(e.target.value),
                })}
                className="w-full border rounded-md p-2"
              >
                <option value="AMOUNT">{t("amount")}</option>
                <option value="PERCENTAGE">{t("percentage")}</option>
              </select>
            </div>

            {/* Discount Amount */}
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
                  type="text"
                  {...register("discountAmount", {
                    required: t("errorRequired") as string,
                    validate: (value) =>
                      discountType === "PERCENTAGE"
                        ? value <= 100 || t("errorMaxPercentage")
                        : true,
                  })}
                  className="w-full border rounded-md p-2"
                />
                <span className="ml-2">
                  {discountType === "PERCENTAGE" ? "%" : "SAR"}
                </span>
              </div>
              {errors.discountAmount && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.discountAmount.message}
                </p>
              )}
            </div>

            {/* Start Date */}
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

            {/* End Date */}
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

            {/* BrandMail with Radio Buttons */}
            <div>
              <label className="block text-blue-900 font-medium pt-1 pb-3">
                {t("applyTo")}
              </label>
              <div className="space-y-2">
                {/* For Everyone */}
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="forEveryone"
                    value="everyone"
                    checked={applyTo === "everyone"}
                    onChange={() => {
                      setApplyTo("everyone");
                      setBrandMail("");
                    }}
                    className="cursor-pointer"
                  />
                  <label
                    htmlFor="forEveryone"
                    className="text-blue-900 cursor-pointer"
                  >
                    {t("forEveryone")}
                  </label>
                </div>

                {/* For a Service Provider */}
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="forServiceProvider"
                    value="serviceProvider"
                    checked={applyTo === "serviceProvider"}
                    onChange={() => setApplyTo("serviceProvider")}
                    className="cursor-pointer"
                  />
                  <label
                    htmlFor="forServiceProvider"
                    className="text-blue-900 cursor-pointer"
                  >
                    {t("forServiceProvider")}
                  </label>
                </div>

                {/* BrandMail Input */}
                <input
                  id="brandMail"
                  value={brandMail}
                  onChange={(e) => setBrandMail(e.target.value)}
                  className="w-full border rounded-md p-2 mt-2"
                  disabled={applyTo === "everyone"}
                  placeholder={t("serviceProviderEmail")}
                />
              </div>
            </div>

            {/* Submit Button */}
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
