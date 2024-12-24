import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { endpoints } from "@/constants/endPoints";
import { IdentificationType, FormData } from "@/interfaces/interfaces";
import { toast } from "react-toastify";
const ServiceProviderForm: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [identificationTypes, setIdentificationTypes] = useState<
    IdentificationType[]
  >([]);
  const navigate = useNavigate();
  const location = useLocation();
  const initialData: FormData | undefined = location.state?.data;
  console.log(identificationTypes);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: initialData || {
      nameAr: "",
      nameEn: "",
      identificationTypeId: "1",
      identificationNumber: "",
      mobileNumber: "",
      email: "",
      deductionPrs: 0,
      identityId: 0,
    },
  });

  useEffect(() => {
    // Fetch identification types
    const fetchIdentificationTypes = async () => {
      const token = sessionStorage.getItem("accessToken");
      try {
        const response = await axios.get(endpoints.getIdentificationTypes, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setIdentificationTypes(response.data.content);
      } catch (error) {
        console.error("Failed to fetch identification types", error);
      }
    };

    fetchIdentificationTypes();
  }, []);

  useEffect(() => {
    // Reset the form whenever initialData changes
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const formattedData = {
        ...data,
        identityId: Number(data.identityId),
      };

      console.log("Formatted Payload:", formattedData);

      const url = data.id
        ? endpoints.editServiceProvider(data.id)
        : endpoints.addServiceProvider;

      const response = await axios.post(url, formattedData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        toast(data.id ? t("editSuccessMessage") : t("addSuccessMessage"), {
          type: "success",
        });
        navigate("/service-providers");
      } else {
        toast(t("formErrorMessage"), { type: "error" });
      }
    } catch (error) {
      console.error("Error submitting the form", error);
      toast(t("formErrorMessage"), { type: "error" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-8/12 mx-auto bg-white p-6 rounded-lg shadow-lg space-y-4"
    >
      <h2 className="text-xl font-semibold text-blue-900">
        {initialData ? t("editServiceProvider") : t("addServiceProvider")}
      </h2>

      {/* Name Arabic */}
      <div>
        <label
          htmlFor="nameAr"
          className="block font-medium pb-2 pt-1 text-blue-900"
        >
          {t("nameAr")}
        </label>
        <input
          id="nameAr"
          {...register("nameAr", {
            required: t("errorRequired") as string,
          })}
          className={`border rounded-md p-2 w-full ${
            errors.nameAr ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.nameAr && (
          <p className="text-red-500 text-sm mt-1">{errors.nameAr.message}</p>
        )}
      </div>

      {/* Name English */}
      <div>
        <label
          htmlFor="nameEn"
          className="block font-medium pb-2 pt-1 text-blue-900"
        >
          {t("nameEn")}
        </label>
        <input
          id="nameEn"
          {...register("nameEn", {
            required: t("errorRequired") as string,
          })}
          className={`border rounded-md p-2 w-full ${
            errors.nameEn ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.nameEn && (
          <p className="text-red-500 text-sm mt-1">{errors.nameEn.message}</p>
        )}
      </div>

      {/* Identification Type */}
      <div>
        <label
          htmlFor="identityId"
          className="block font-medium pb-2 pt-1 text-blue-900"
        >
          {t("identificationType")}
        </label>
        <Controller
          name="identityId"
          control={control}
          defaultValue={initialData?.identityId || undefined}
          rules={{ required: t("errorRequired") as string }}
          render={({ field }) => (
            <select
              {...field}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10); // Parse the value as a number
                field.onChange(value); // Update field value explicitly
              }}
              id="identityId"
              className={`border rounded-md p-2 w-full  ${
                errors.identityId ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="0">{t("selectOption")}</option>
              {identificationTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {i18n.language === "ar"
                    ? type.identityTyNameAr
                    : type.identityTyNameEn}
                </option>
              ))}
            </select>
          )}
        />
        {errors.identityId && (
          <p className="text-red-500 text-sm mt-1">
            {errors.identityId.message}
          </p>
        )}
      </div>

      {/* Identification Number */}
      <div>
        <label
          htmlFor="identificationNumber"
          className="block font-medium pb-2 pt-1 text-blue-900"
        >
          {t("identificationNumber")}
        </label>
        <input
          id="identificationNumber"
          {...register("identificationNumber", {
            required: t("errorRequired") as string,
            pattern: {
              value: /^\d+$/,
              message: t("errorNumbersOnly"),
            },
          })}
          className={`border rounded-md p-2 w-full ${
            errors.identificationNumber ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.identificationNumber && (
          <p className="text-red-500 text-sm mt-1">
            {errors.identificationNumber.message}
          </p>
        )}
      </div>

      {/* Mobile Number */}
      <div>
        <label
          htmlFor="mobileNumber"
          className="block font-medium pb-2 pt-1 text-blue-900"
        >
          {t("mobileNumber")}
        </label>
        <input
          id="mobileNumber"
          {...register("mobileNumber", {
            required: t("errorRequired") as string,
            pattern: {
              value: /^\d{10}$/,
              message: t("errorPhoneNumber"),
            },
          })}
          className={`border rounded-md p-2 w-full ${
            errors.mobileNumber ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.mobileNumber && (
          <p className="text-red-500 text-sm mt-1">
            {errors.mobileNumber.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block font-medium pb-2 pt-1 text-blue-900"
        >
          {t("email")}
        </label>
        <input
          id="email"
          {...register("email", {
            required: t("errorRequired") as string,
            pattern: {
              value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
              message: t("errorEmail"),
            },
          })}
          className={`border rounded-md p-2 w-full ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

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

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button type="submit" className="bg-blue-600 text-white px-6 py-2">
          {t("submit")}
        </Button>
      </div>
    </form>
  );
};

export default ServiceProviderForm;
