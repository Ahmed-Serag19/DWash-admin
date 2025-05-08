import type React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";
import axios from "axios";
import { endpoints } from "@/constants/endPoints";

interface City {
  cityId: number;
  cityNameAr: string;
  cityNameEn: string;
  cityStatus: number;
}

interface LocationSectionProps {
  control: any;
  errors: any;
}

const LocationSection: React.FC<LocationSectionProps> = ({
  control,
  errors,
}) => {
  const { t, i18n } = useTranslation();
  const [cities, setCities] = useState<City[]>([]);
  const [isLoadingCities, setIsLoadingCities] = useState(false);

  // Fetch cities on component mount
  useEffect(() => {
    const fetchCities = async () => {
      setIsLoadingCities(true);
      try {
        const response = await axios.get(endpoints.getCities);
        if (response.data.success) {
          setCities(response.data.content);
        }
      } catch (error) {
        console.error("Failed to fetch cities", error);
      } finally {
        setIsLoadingCities(false);
      }
    };

    fetchCities();
  }, []);

  return (
    <>
      {/* City */}
      <div>
        <label
          htmlFor="cityId"
          className="block font-medium pb-2 pt-1 text-blue-900"
        >
          {t("city")}
        </label>
        <Controller
          name="cityId"
          control={control}
          rules={{ required: t("errorRequired") as string }}
          render={({ field }) => (
            <select
              {...field}
              onChange={(e) =>
                field.onChange(Number.parseInt(e.target.value, 10))
              }
              id="cityId"
              disabled={isLoadingCities}
              className={`border rounded-md p-2 w-full ${
                errors.cityId ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="0">
                {isLoadingCities ? t("loading") : t("selectCity")}
              </option>
              {cities.map((city) => (
                <option key={city.cityId} value={city.cityId}>
                  {i18n.language === "ar" ? city.cityNameAr : city.cityNameEn}
                </option>
              ))}
            </select>
          )}
        />
        {errors.cityId && (
          <p className="text-red-500 text-sm mt-1">{errors.cityId.message}</p>
        )}
      </div>
    </>
  );
};

export default LocationSection;
