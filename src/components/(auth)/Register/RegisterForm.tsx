import React, { useEffect, useState } from "react";
import Button from "../../atoms/Button/Button";
import { t } from "i18next";
import BaseInput from "../../atoms/molecules/formik-fields/BaseInput";
import { ErrorMessage, useFormikContext } from "formik";
import DownLoadApp from "../../atoms/molecules/downLoad-app/DownLoadApp";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoMdPhonePortrait } from "react-icons/io";
import { useRTL } from "../../../hooks/useRTL";
import cn from "../../../utils/cn";
import { IoPersonSharp } from "react-icons/io5";

interface RegisterForm_TP {
  isPending: boolean;
  handleSubmit: any;
}

const RegisterForm = ({ isPending, handleSubmit }) => {
  const { setFieldValue, values } = useFormikContext();
  console.log("🚀 ~ RegisterForm ~ values:", values)
  const [phone, setPhone] = useState("");
  const isRTL = useRTL();

  const handleInputChange = (event) => {
    const value = event.target.value.replace(/[^0-9+]/g, "");
    setPhone(value);
    setFieldValue("phone", value)
  };

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <div>
      {/* DESKTOP */}
      <div className="hidden sm:block">
        <div className="sm:w-[90%] lg:w-[70%] xl:w-[45%] mx-auto translate-y-1/3">
          <div className="flex flex-col gap-3 mb-6">
            {/* <h2 className="text-4xl">{t("register form")}</h2> */}
            {/* <p>{t("create account")}</p> */}
          </div>
          <div className="flex flex-col rounded-3xl bg-mainColor">
            <div className="px-24 py-24 ">
              <div
                style={{ gridTemplateColumns: "100px 1fr" }}
                className="grid gap-4 mb-6 animate_from_bottom"
              >
                <Button className="px-2 text-xs border cursor-auto rounded-2xl hover:scale-100">
                  {t("name")}
                </Button>
                <BaseInput
                  id="name"
                  name="name"
                  type="text"
                  className="p-4 text-right text-black bg-white border border-white rounded-2xl"
                />
              </div>
              <div
                style={{ gridTemplateColumns: "100px 1fr" }}
                className="grid gap-4 mb-6 animate_from_top"
              >
                <Button className="px-2 text-xs border cursor-auto rounded-2xl hover:scale-100">
                  {t("phone number")}
                </Button>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={handleInputChange}
                  className="p-4 text-right text-black bg-transparent bg-white border border-white rounded-2xl"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Button
                disabled={isPending}
                action={() => handleSubmit(values)}
                className="bg-[#FFB6BF] hover:bg-[#FFCC1A] animate_from_left py-4 rounded-3xl text-black font-normal hover:scale-1 duration-500"
              >
                {t("next")}
              </Button>
              {/* <p className="flex justify-center gap-1">
                <span className="text-white underline cursor-pointer">
                  {t("you have account already?")}
                </span>
                <Link to={"/login"} className="text-blue-700 underline ms-1">
                  {t("login")}
                </Link>
              </p> */}
            </div>
          </div>
        </div>

        <div className="hidden items-center logInBgWithOutClip h-[22rem] sm:flex "></div>
      </div>

      {/* MOBIL */}
      <div className="block h-[90vh] sm:hidden logInBg">
        <div
          style={{ gridTemplateColumns: "20px 1fr" }}
          className="grid items-center justify-center py-6 mx-6"
        >
          <Link to={"/"} className="">
            <FaArrowRightLong className="cursor-pointer justify-self-start" />
          </Link>
          <h4 className="text-xl text-center">{t("login")}</h4>
        </div>

        <div className="flex flex-col px-4 py-6 w-[95%] mx-auto bg-white">
          <div className="mt-2">
            <label htmlFor="name">{t("name")}</label>
            <div className="relative">
              <BaseInput
                id="name"
                name="name"
                type="text"
                className="px-3 py-1 mt-2 bg-transparent border rounded-lg text-start border-black/50"
              />
              <IoPersonSharp
                className={`absolute top-4 text-gray-700 ${
                  isRTL ? "left-4" : "right-4"
                }`}
              />
            </div>
          </div>
          <div className=" mt-5">
            <label htmlFor="phone">{t("phone number")}</label>
            <div className="relative">
              <BaseInput
                id="phone"
                name="phone"
                type="text"
                className="px-3 py-1 mt-2 bg-transparent border rounded-lg text-start border-black/50"
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
              className={cn(
                "font-normal text-white bg-mainColor hover:[#FFCC1A] transition-all duration-500 animate_from_left",
                {
                  "opacity-40 cursor-not-allowed": isPending,
                }
              )}
            >
              {t("next")}
            </Button>
            {/* <p className="flex justify-center gap-1">
              <span className="text-gray-700 cursor-pointer ">
                {t("you have account already?")}
              </span>
              <Link to={"/login"} className="underline text-mainColor ms-1">
                {t("login")}
              </Link>
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
