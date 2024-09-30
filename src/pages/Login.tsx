import React, { useEffect, useState } from "react";
import Button from "../components/atoms/Button/Button";
import { t } from "i18next";
import BaseInput from "../components/atoms/molecules/formik-fields/BaseInput";
import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import DownLoadApp from "../components/atoms/molecules/downLoad-app/DownLoadApp";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoMdPhonePortrait } from "react-icons/io";
import { useRTL } from "../hooks/useRTL";
import { Footer, Navbar } from "../components";
import { apiRequest } from "../utils/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { messaging, getToken, getTokenAsync } from "../../firebase";
import { useAuth } from "../context/AuthContext";
import cn from "../utils/cn";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";

const loginPost = async (postData) => {
  try {
    const data = await apiRequest({
      url: "/api/student/login",
      method: "POST",
      data: postData,
    });
    return data?.data;
  } catch (errors) {
    console.log("🚀 ~ loginPost ~ error:", errors);
  }
};

const Login = () => {
  const [role, setRole] = useState("student");
  const [fcmToken, setFcmToken] = useState(null);
  const isRTL = useRTL();
  const { setAuthData } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    phone: "",
    email: "",
    password: "",
    studentPassword: "",
  };

  useEffect(() => {
    getTokenAsync(setFcmToken, toast);
  }, []);

  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ["student-login"],
    mutationFn: (data) => loginPost(data),
    onSuccess: (data) => {
      console.log(data);
      setAuthData(data);
      navigate("/studentRequest");
      setTimeout(() => {
        toast.success(t(`login was successful`));
      }, 100);
    },
  });

  const handleStudentSubmit = async (values: any) => {
    if (values?.phone === "") {
      toast.error(t("phone number is empty"));
      return;
    }

    if (values?.studentPassword === "") {
      toast.error(t("password is empty"));
      return;
    }

    const data = {
      phone: values?.phone,
      password: values?.studentPassword,
      fcm_token: fcmToken,
    };

    await mutate(data);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {}}
    >
      {({ values }) => {
        return (
          <Form>
            <div className="max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-[90rem] mx-auto">
              <Navbar hidden />
            </div>

            {/* DESKTOP */}
            <div className="hidden md:block">
              <div className="w-[45%] mx-auto my-16">
                <div className="flex justify-center w-full gap-4 my-6">
                  <Button
                    className={cn("text-black animate_scale font-normal", {
                      "bg-[#FFCC1A]": role === "student",
                      "bg-transparent border border-mainColor":
                        role !== "student",
                    })}
                    action={() => setRole("student")}
                  >
                    {t("student login")}
                  </Button>
                  <Button
                    className={cn(
                      "text-black animate_scale animation_delay-3 font-normal",
                      {
                        "bg-[#FFCC1A]": role === "partner",
                        "bg-transparent border border-mainColor":
                          role !== "partner",
                      }
                    )}
                    action={() => setRole("partner")}
                  >
                    {t("partner login")}
                  </Button>
                </div>

                {role === "student" ? (
                  <div className="flex flex-col px-10 py-12 bg-mainColor">
                    <div
                      style={{ gridTemplateColumns: "100px 1fr" }}
                      className="grid gap-4 mb-6 animate_from_top"
                    >
                      <Button className="px-2 text-xs border cursor-auto hover:scale-100">
                        {t("phone number")}
                      </Button>
                      <BaseInput
                        id="phone"
                        name="phone"
                        type="text"
                        className="border-[#C9C5CA] p-3 text-white bg-transparent border rounded-lg text-start"
                      />
                    </div>
                    <div
                      style={{ gridTemplateColumns: "100px 1fr" }}
                      className="grid gap-4 mb-6 animate_from_bottom"
                    >
                      <Button className="px-2 text-xs border cursor-auto hover:scale-100">
                        {t("password")}
                      </Button>
                      <BaseInput
                        id="studentPassword"
                        name="studentPassword"
                        type="password"
                        className="border-[#C9C5CA] p-3 text-white bg-transparent border rounded-lg text-start"
                      />
                    </div>
                    <div className="flex flex-col gap-4 mt-16">
                      <Button
                        disabled={isPending}
                        action={() => handleStudentSubmit(values)}
                        className={cn(
                          "bg-[#FFB6BF] hover:bg-[#FFCC1A] animate_from_left text-black font-normal",
                          {
                            "opacity-40 cursor-not-allowed": isPending,
                          }
                        )}
                      >
                        {t("login")}
                      </Button>
                      <Link
                        to={"/register"}
                        className="text-white underline ms-1"
                      >
                        <Button className="w-full font-normal bg-transparent border border-white animate_from_right animation_delay-3">
                          {t("register")}
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col px-10 py-12 bg-mainColor">
                    <div
                      style={{ gridTemplateColumns: "100px 1fr" }}
                      className="grid gap-4 mb-6 animate_from_right"
                    >
                      <Button className="px-2 text-xs border cursor-auto hover:scale-100">
                        {t("email")}
                      </Button>
                      <BaseInput
                        id="email"
                        name="email"
                        type="email"
                        className="border-[#C9C5CA] p-3 text-right text-white bg-transparent border rounded-lg"
                      />
                    </div>
                    <div
                      style={{ gridTemplateColumns: "100px 1fr" }}
                      className="grid gap-4 mb-6 animate_from_left"
                    >
                      <Button className="px-2 text-xs border cursor-auto hover:scale-100">
                        {t("password")}
                      </Button>
                      <BaseInput
                        id="password"
                        name="password"
                        type="text"
                        className="border-[#C9C5CA] p-3 text-right text-white bg-transparent border rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col gap-4 mt-16">
                      <Button
                        className={cn(
                          "bg-[#FFB6BF] hover:bg-[#FFCC1A] animate_scale text-black font-normal",
                          {
                            "opacity-40 cursor-not-allowed": isPending,
                          }
                        )}
                      >
                        {t("login")}
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <DownLoadApp />
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
                <h4 className="text-xl text-center">{t("login")}</h4>
              </div>
              <div className="flex justify-center w-full gap-4 my-6">
                <Button
                  className={cn("text-black animate_scale font-normal", {
                    "bg-[#FFCC1A]": role === "student",
                    "bg-transparent border border-black": role !== "student",
                  })}
                  action={() => setRole("student")}
                >
                  {t("student login")}
                </Button>
                <Button
                  className={cn(
                    "text-black animate_scale animation_delay-3 font-normal",
                    {
                      "bg-[#FFCC1A]": role === "partner",
                      "bg-transparent border border-black": role !== "partner",
                    }
                  )}
                  action={() => setRole("partner")}
                >
                  {t("partner login")}
                </Button>
              </div>

              {role === "student" ? (
                <div className="flex flex-col px-4 py-6 w-[95%] mx-auto bg-white">
                  <div className="">
                    <label htmlFor="phone" className="text-[#100D10]">
                      {t("phone number")}
                    </label>
                    <div className="relative">
                      <BaseInput
                        id="phone"
                        name="phone"
                        type="text"
                        className="border-[#C9C5CA] px-3 py-1 mt-2 bg-transparent border rounded-lg text-start "
                      />
                      <IoMdPhonePortrait
                        className={`absolute top-4 text-gray-700 ${
                          isRTL ? "left-4" : "right-4"
                        }`}
                      />
                    </div>
                  </div>
                  <div className="">
                    <label htmlFor="studentPassword" className="text-[#100D10]">
                      {t("password")}
                    </label>
                    <div className="relative">
                      <BaseInput
                        id="studentPassword"
                        name="studentPassword"
                        type={showPassword ? "text" : "password"}
                        className="border-[#C9C5CA] px-3 py-1 mt-2 bg-transparent border rounded-lg text-start "
                      />
                      {showPassword ? (
                        <IoEyeSharp
                          onClick={() => setShowPassword((prev) => !prev)}
                          className={`absolute top-4 text-gray-700 ${
                            isRTL ? "left-4" : "right-4"
                          }`}
                        />
                      ) : (
                        <IoEyeOffSharp
                          onClick={() => setShowPassword((prev) => !prev)}
                          className={`absolute top-4 text-gray-700 ${
                            isRTL ? "left-4" : "right-4"
                          }`}
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 mt-16">
                    <Button
                      disabled={isPending}
                      action={() => handleStudentSubmit(values)}
                      className={cn(
                        "font-normal text-white bg-mainColor hover:[#FFCC1A] transition-all duration-500 animate_from_left",
                        {
                          "opacity-40 cursor-not-allowed": isPending,
                        }
                      )}
                    >
                      {t("login")}
                    </Button>
                    <p className="flex justify-center gap-1">
                      <span>{t("you don't have account?")}</span>
                      <Link
                        to={"/register"}
                        className="underline text-mainColor ms-1"
                      >
                        {t("register")}
                      </Link>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col px-4 py-6 w-[95%] mx-auto bg-white">
                  <div className="">
                    <label htmlFor="email" className="text-[#100D10]">
                      {t("email")}
                    </label>
                    <div className="relative">
                      <BaseInput
                        id="email"
                        name="email"
                        type="email"
                        className="border-[#C9C5CA] px-3 py-1 mt-2 bg-transparent border rounded-lg text-start "
                      />
                      <IoMdPhonePortrait
                        className={`absolute top-4 text-gray-700 ${
                          isRTL ? "left-4" : "right-4"
                        }`}
                      />
                    </div>
                  </div>
                  <div className="">
                    <label htmlFor="password" className="text-[#100D10]">
                      {t("password")}
                    </label>
                    <div className="relative">
                      <BaseInput
                        id="password"
                        name="password"
                        type="password"
                        className="border-[#C9C5CA] px-3 py-1 mt-2 bg-transparent border rounded-lg text-start "
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
                      className={cn(
                        "font-normal text-white bg-mainColor hover:[#FFCC1A] transition-all duration-500 hover:bg animate_from_left",
                        {
                          "opacity-40 cursor-not-allowed": isPending,
                        }
                      )}
                    >
                      {t("login")}
                    </Button>
                    {/* <p className="flex justify-center gap-1">
                      <span>{t("you don't have account?")}</span>
                      <Link
                        to={"/register"}
                        className="underline text-mainColor ms-1"
                      >
                        {t("register")}
                      </Link>
                    </p> */}
                  </div>
                </div>
              )}
            </div>

            <Footer hidden />
          </Form>
        );
      }}
    </Formik>
  );
};

export default Login;
