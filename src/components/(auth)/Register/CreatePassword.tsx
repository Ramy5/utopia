import { t } from "i18next";
import React, { useEffect, useState } from "react";
import Button from "../../atoms/Button/Button";
import BaseInput from "../../atoms/molecules/formik-fields/BaseInput";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../utils/axios";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import { getTokenAsync } from "../../../../firebase";
import { useFormikContext } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoMdPhonePortrait } from "react-icons/io";
import { useRTL } from "../../../hooks/useRTL";

const setPasswordPost = async (postData) => {
  try {
    const data = await apiRequest({
      url: "/api/student/create-password",
      method: "POST",
      data: postData,
    });
    return data?.data;
  } catch (errors) {
    console.log("🚀 ~ loginPost ~ error:", errors);
  }
};

type CreatePassword_TP = {
  setStep?: React.Dispatch<React.SetStateAction<number>>;
  userId: number;
};

const CreatePassword: React.FC<CreatePassword_TP> = ({ setStep, userId }) => {
  const { setAuthData, user } = useAuth();
  const [fcmToken, setFcmToken] = useState(null);
  const { values, setFieldValue } = useFormikContext();
  const isRTL = useRTL();
  const navigate = useNavigate();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ["password"],
    mutationFn: (data) => setPasswordPost(data),
    onSuccess: (data) => {
      console.log(data);
      // setOtp(data?.otp);
      setAuthData(data);
      navigate("/studentRequest");
      setTimeout(() => {
        toast.success(t(`password was created`));
      }, 100);
    },
  });

  useEffect(() => {
    getTokenAsync(setFcmToken, toast);
  }, []);

  const handleSubmit = async (values: any) => {
    if (values?.password === "") {
      toast.error(t("password is empty"));
      return;
    }

    if (values?.newPassword === "") {
      toast.error(t("new password is empty"));
      return;
    }

    const data = {
      user_id: userId,
      password: values?.password,
      password_confirmation: values?.newPassword,
      fcm_token: fcmToken,
    };
    console.log("🚀 ~ onSubmit={ ~ values:", data);

    await mutate(data);
  };

  return (
    <>
      {/* DESKTOP */}
      <div className="hidden md:block">
        <div className="w-[45%] mx-auto my-16">
          <div className="flex flex-col gap-3 mb-6">
            <h2 className="text-4xl">{t("register form")}</h2>
            <p>{t("create password")}</p>
          </div>
          <div className="flex flex-col px-10 py-12 rounded-2xl bg-mainColor">
            <div
              style={{ gridTemplateColumns: "100px 1fr" }}
              className="grid gap-4 mb-6 animate_from_bottom"
            >
              <Button className="px-2 text-xs border cursor-auto hover:scale-100">
                {t("password")}
              </Button>
              <BaseInput
                id="password"
                name="password"
                type="password"
                className="p-3 text-right text-white bg-transparent border border-white rounded-lg"
              />
            </div>
            <div
              style={{ gridTemplateColumns: "100px 1fr" }}
              className="grid gap-4 mb-6 animate_from_top"
            >
              <Button className="px-2 text-xs border cursor-auto hover:scale-100">
                {t("new password")}
              </Button>
              <BaseInput
                id="newPassword"
                name="newPassword"
                type="password"
                className="p-3 text-right text-white bg-transparent border border-white rounded-lg"
              />
            </div>

            <div className="flex flex-col gap-4 mt-16">
              <Button
                disabled={isPending}
                action={() => handleSubmit(values)}
                className="bg-[#FFB6BF] hover:bg-[#FFCC1A] animate_from_left text-black font-normal"
              >
                {t("next")}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBIL */}
      <div className="block h-[90vh] md:hidden logInBg">
        <div
          style={{ gridTemplateColumns: "20px 1fr" }}
          className="grid items-center justify-center py-6 mx-6"
        >
          <Link to={"/"} className="">
            <FaArrowRightLong className="cursor-pointer justify-self-start" />
          </Link>
          <h4 className="text-xl text-center">{t("signup")}</h4>
        </div>

        <div className="flex flex-col px-4 py-6 w-[95%] mx-auto bg-white">
          <div className="">
            <label htmlFor="password">{t("password")}</label>
            <div className="relative">
              <BaseInput
                id="password"
                name="password"
                type="password"
                className="px-3 py-1 mt-2 text-right bg-transparent border rounded-lg border-black/50"
              />
              <IoMdPhonePortrait
                className={`absolute top-4 text-gray-700 ${
                  isRTL ? "left-4" : "right-4"
                }`}
              />
            </div>
          </div>
          <div className="">
            <label htmlFor="newPassword">{t("newPassword")}</label>
            <div className="relative">
              <BaseInput
                id="newPassword"
                name="newPassword"
                type="text"
                className="px-3 py-1 mt-2 text-right bg-transparent border rounded-lg border-black/50"
              />
              <IoMdPhonePortrait
                className={`absolute top-4 text-gray-700 ${
                  isRTL ? "left-4" : "right-4"
                }`}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-16">
            <Button
              disabled={isPending}
              action={() => handleSubmit(values)}
              className="font-normal text-white bg-mainColor hover:[#FFCC1A] transition-all duration-500 animate_from_left"
            >
              {t("next")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePassword;
