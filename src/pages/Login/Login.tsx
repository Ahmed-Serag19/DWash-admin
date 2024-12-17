import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type LoginFormData = {
  username: string;
  password: string;
  local: string;
};

const Login = () => {
  const { t, i18n } = useTranslation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>(); // Type the form data

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    const language = i18n.language === "ar" ? "AR" : "EN";
    const formData = { ...data, local: language };

    console.log(formData);
    navigate("/homepage");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-stone-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg space-y-14 relative">
        <h2 className="text-2xl font-semibold text-blue-950 mb-6">
          {t("login")}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-blue-950 font-semibold"
            >
              {t("username")}
            </label>
            <div className="flex items-center border-b border-blue-950">
              <FaUser className="text-gray-600  mr-2" />
              <input
                id="username"
                type="text"
                placeholder={t("usernamePlaceholder")}
                {...register("username", { required: "Username is required" })}
                className="w-full py-2 px-3 text-blue-950 focus:outline-none"
              />
            </div>
            {errors.username && (
              <p className="text-red-500 text-sm">
                {errors.username.message as string}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-blue-950 font-semibold"
            >
              {t("password")}
            </label>
            <div className="flex items-center border-b border-blue-950">
              <FaLock className="text-gray-600  mr-2" />
              <input
                id="password"
                type={passwordVisible ? "text" : "password"}
                placeholder={t("passwordPlaceholder")}
                {...register("password", { required: "Password is required" })}
                className="w-full py-2 px-3 text-blue-950 focus:outline-none"
              />
              <button type="button" onClick={togglePasswordVisibility}>
                {passwordVisible ? (
                  <FaEyeSlash className="text-blue-950" />
                ) : (
                  <FaEye className="text-blue-950" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password.message as string}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-950 text-white font-semibold rounded-md transition duration-300 hover:bg-blue-800"
            >
              {t("login")}
            </button>
          </div>
        </form>
      </div>
      <div className="absolute bottom-10 right-10">
        <LanguageSwitcher />
      </div>
    </div>
  );
};

export default Login;
