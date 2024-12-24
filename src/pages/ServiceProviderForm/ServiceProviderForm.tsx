import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { endpoints } from "@/constants/endPoints";

const ServiceProviderForm: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [identificationTypes, setIdentificationTypes] = useState<
    IdentificationType[]
  >([]);
  const navigate = useNavigate();
  const location = useLocation();
  const initialData: FormData | undefined = location.state?.data;

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
      identificationTypeId: undefined,
      identificationNumber: "",
      mobileNumber: "",
      email: "",
      deductionPrs: 0,
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
      const url = data.id
        ? endpoints.editServiceProvider(data.id) // Edit if id is present
        : endpoints.addServiceProvider; // Add if no id

      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        alert(initialData ? t("editSuccessMessage") : t("addSuccessMessage"));
        navigate("/service-providers"); // Navigate back to list
      } else {
        alert(t("formErrorMessage"));
      }
    } catch (error) {
      console.error("Error submitting the form", error);
      alert(t("formErrorMessage"));
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
          htmlFor="identificationTypeId"
          className="block font-medium pb-2 pt-1 text-blue-900"
        >
          {t("identificationType")}
        </label>
        <Controller
          name="identificationTypeId"
          control={control}
          rules={{ required: t("errorRequired") as string }}
          render={({ field }) => (
            <select
              {...field}
              id="identificationTypeId"
              className={`border rounded-md p-2 w-full ${
                errors.identificationTypeId
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <option value="">{t("selectOption")}</option>
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
        {errors.identificationTypeId && (
          <p className="text-red-500 text-sm mt-1">
            {errors.identificationTypeId.message}
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
