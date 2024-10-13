import React, { useEffect, useState } from "react";
import { useRTL } from "../hooks/useRTL";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../utils/axios";
import { t } from "i18next";
import { Form, Formik } from "formik";
import { Footer, Navbar } from "../components";
import Button from "../components/atoms/Button/Button";
import BaseInput from "../components/atoms/molecules/formik-fields/BaseInput";
import DownLoadApp from "../components/atoms/molecules/downLoad-app/DownLoadApp";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoMdPhonePortrait } from "react-icons/io";
import RegisterForm from "../components/(auth)/Register/RegisterForm";
import RegisterOtp from "../components/(auth)/Register/VerificationCode";
import CreatePassword from "../components/(auth)/Register/CreatePassword";

const signupPost = async (postData) => {
  try {
    const data = await apiRequest({
      url: "/api/student/register",
      method: "POST",
      data: postData,
    });
    return data?.data;
  } catch (errors) {
    console.log("🚀 ~ loginPost ~ error:", errors);
  }
};

const Register = () => {
  const isRTL = useRTL();
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState(null);
  const { setAuthData } = useAuth();
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    phone: "",
    password: "",
    newPassword: "",
  };

  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ["student-signup"],
    mutationFn: (data) => signupPost(data),
    onSuccess: (data) => {
      setUserId(data?.user?.id);
      setStep(2);
      setTimeout(() => {
        toast.success(t(`otp was send`));
      }, 100);
    },
  });

  const handleSubmit = async (values: any) => {
    if (values?.phone === "") {
      toast.error(t("phone number is empty"));
      return;
    }

    if (values?.name === "") {
      toast.error(t("name is empty"));
      return;
    }

    const data = {
      phone: values?.phone,
      name: values?.name,
    };
    console.log("🚀 ~ onSubmit={ ~ values:", values);

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
            <div className="max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-[80rem] mx-auto">
              <Navbar hidden />
            </div>

            {step === 1 && (
              <RegisterForm handleSubmit={handleSubmit} isPending={isPending} />
            )}

            {step === 2 && <RegisterOtp userId={userId} setStep={setStep} />}

            {step === 3 && <CreatePassword userId={userId} setStep={setStep} />}
            <Footer hidden />
          </Form>
        );
      }}
    </Formik>
  );
};

export default Register;
