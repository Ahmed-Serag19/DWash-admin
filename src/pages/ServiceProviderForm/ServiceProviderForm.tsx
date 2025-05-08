"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { endpoints } from "@/constants/endPoints";
import { toast } from "react-toastify";
import type { FormData, FreelancerData } from "@/interfaces/interfaces";
import PersonalInfoSection from "./PersonalInfoSection";
import ContactInfoSection from "./ContactInfoSection";
import LocationSection from "./LocationSection";

const ServiceProviderForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const initialData: FreelancerData | undefined = location.state?.data;
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      nameAr: "",
      nameEn: "",
      identificationTypeId: "",
      identificationNumber: "",
      mobileNumber: "",
      email: "",
      deductionPrs: 0,
      identityId: 0,
      cityId: 0,
    },
  });

  const selectedIdentityId = watch("identityId");

  useEffect(() => {
    if (initialData) {
      reset({
        nameAr: initialData.userDto?.nameAr || "",
        nameEn: initialData.userDto?.nameEn || "",
        identificationTypeId: initialData.userDto?.identificationTypeId || "",
        identificationNumber: initialData.userDto?.identificationNumber || "",
        mobileNumber: initialData.userDto?.mobile || "",
        email: initialData.userDto?.email || "",
        deductionPrs: initialData.brandWalletDto?.deductionPrs || 0,
        identityId: 0,
        cityId: initialData.userDto?.cityId || 0,
      });
    }
  }, [initialData, reset]);

  useEffect(() => {
    // Automatically set identificationNumber to "0000000000" when identityId is 4
    if (selectedIdentityId === 4) {
      setValue("identificationNumber", "0000000000");
    }
  }, [selectedIdentityId, setValue]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const formattedData = {
        nameAr: data.nameAr,
        nameEn: data.nameEn,
        identityId: Number(data.identityId),
        identificationTypeId: data.identificationTypeId,
        identificationNumber: data.identificationNumber,
        mobileNumber: data.mobileNumber,
        email: data.email,
        deductionPrs: Number(data.deductionPrs),
        cityId: Number(data.cityId),
      };

      const url = initialData?.userDto?.id
        ? endpoints.editServiceProvider(initialData.userDto.id)
        : endpoints.addServiceProvider;

      console.log("Submitting to URL:", url);
      console.log("Submitting data:", formattedData);

      let response;

      if (initialData) {
        response = await axios.put(url, formattedData, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        });
      } else {
        response = await axios.post(url, formattedData, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        });
      }

      if (response.data.success) {
        toast(initialData ? t("editSuccessMessage") : t("addSuccessMessage"), {
          type: "success",
        });
        navigate("/service-providers");
      } else {
        toast(t("formErrorMessage"), { type: "error" });
      }
    } catch (error) {
      console.error("Error submitting the form", error);
      toast(t("formErrorMessage"), { type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-10/12 mx-auto bg-white p-6 rounded-lg shadow-lg flex flex-col gap-10"
    >
      <h2 className="text-xl font-semibold text-blue-900 text-center">
        {initialData ? t("editServiceProvider") : t("addServiceProvider")}
      </h2>

      <div className="flex justify-around gap-10 w-full flex-col md:flex-row">
        <div className="md:w-1/2 w-full flex flex-col gap-5">
          <PersonalInfoSection
            control={control}
            register={register}
            errors={errors}
            selectedIdentityId={selectedIdentityId}
          />
        </div>

        <div className="md:w-1/2 w-full flex flex-col gap-5">
          <ContactInfoSection register={register} errors={errors} />

          <LocationSection control={control} errors={errors} />

          {/* Deduction Percentage */}
          <div>
            <label
              htmlFor="deductionPrs"
              className="block font-medium pb-2 pt-1 text-blue-900"
            >
              {t("deductionPercentage")}
            </label>
            <input
              id="deductionPrs"
              type="number"
              {...register("deductionPrs", {
                required: t("errorRequired") as string,
                min: { value: 0, message: t("errorMinValue") },
                max: { value: 100, message: t("errorMaxValue") },
              })}
              className={`border rounded-md p-2 w-full ${
                errors.deductionPrs ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.deductionPrs && (
              <p className="text-red-500 text-sm mt-1">
                {errors.deductionPrs.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-6 py-2 transition duration-500 font-semibold text-md"
        >
          {isLoading ? t("submitting") : t("submit")}
        </Button>
      </div>
    </form>
  );
};

export default ServiceProviderForm;
