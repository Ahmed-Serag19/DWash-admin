"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";
import axios from "axios";
import { endpoints } from "@/constants/endPoints";
import type { IdentificationType } from "@/interfaces/interfaces";

interface PersonalInfoSectionProps {
  control: any;
  register: any;
  errors: any;
  selectedIdentityId: number;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  control,
  register,
  errors,
  selectedIdentityId,
}) => {
  const { t, i18n } = useTranslation();
  const [identificationTypes, setIdentificationTypes] = useState<
    IdentificationType[]
  >([]);

  useEffect(() => {
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

  return (
    <>
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
          rules={{ required: t("errorRequired") as string }}
          render={({ field }) => (
            <select
              {...field}
              onChange={(e) =>
                field.onChange(Number.parseInt(e.target.value, 10))
              }
              id="identityId"
              className={`border rounded-md p-2 w-full ${
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
            required:
              selectedIdentityId !== 4 ? (t("errorRequired") as string) : false,
            pattern: {
              value: /[0-9]{10}/,
              message: t("errorNumbersOnly"),
            },
          })}
          disabled={selectedIdentityId === 4}
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
    </>
  );
};

export default PersonalInfoSection;
