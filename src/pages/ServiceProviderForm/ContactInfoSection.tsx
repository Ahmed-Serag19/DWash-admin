import type React from "react";
import { useTranslation } from "react-i18next";

interface ContactInfoSectionProps {
  register: any;
  errors: any;
}

const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({
  register,
  errors,
}) => {
  const { t } = useTranslation();

  return (
    <>
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
    </>
  );
};

export default ContactInfoSection;
