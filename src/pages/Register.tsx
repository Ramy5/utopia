import { useEffect, useState } from "react";
import { useRTL } from "../hooks/useRTL";
import { useAuth } from "../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../utils/axios";
import { t } from "i18next";
import { Form, Formik } from "formik";
import { Footer, Navbar } from "../components";
import RegisterForm from "../components/(auth)/Register/RegisterForm";
import RegisterOtp from "../components/(auth)/Register/VerificationCode";
import logo from "../assets/logo-footer.svg";
import { messaging, getToken, getTokenAsync } from "../../firebase";
import * as Yup from "yup";

const signupPost = async (postData) => {
  try {
    const data = await apiRequest({
      // url: "/api/student/register",
      url: "/api/student/login2",
      method: "POST",
      data: postData,
    });
    return data?.data;
  } catch (errors) {
    console.log("🚀 ~ loginPost ~ error:", errors);
  }
};

const validationSchema = Yup.object({
  phone: Yup.string()
    .matches(/^\d+$/, "Only numeric values are allowed")
    .required("Phone number is required"),
});

const Register = () => {
  const isRTL = useRTL();
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState(null);
  const [fcmToken, setFcmToken] = useState(null);
  const location = useLocation();
  const packageId = location.state?.package_id;
  console.log("🚀 ~ Register ~ packageId:", packageId)

  const initialValues = {
    name: "",
    phone: "",
    fcm_token: "",
    password: "",
    newPassword: "",
  };

  useEffect(() => {
    getTokenAsync(setFcmToken, toast);
    window.scrollTo(0, 0);
  }, []);

  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ["student-signup"],
    mutationFn: (data) => signupPost(data),
    onSuccess: (data) => {
      setUserId(data?.user_id);
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
      fcm_token: fcmToken,
    };

    await mutate(data);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
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

            {step === 2 && <RegisterOtp userId={userId} setStep={setStep} packageId={packageId} />}

            {step === 3 && (
              <div>
                <div className="flex rounded-2xl flex-col items-center justify-center w-[80%] md:w-[578px] bg-mainColor my-24 mx-auto text-white p-6 gap-7">
                  <h1 className="text-4xl sm:text-6xl">
                    {isRTL ? `اهلا ${values?.name}` : `welcome ${values?.name}`}
                  </h1>
                  <p className="text-lg text-center sm:w-96">
                    {t(
                      "The request has been sent, and the educational consultant will contact you soon."
                    )}
                  </p>
                  <p className="text-lg">{t("have a nice day")}</p>
                  <div className="flex flex-col items-center gap-1">
                    <img src={logo} alt="logo" />
                    <p className="text-sm">{t("utopia team")}</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Link
                    to={"/"}
                    className="px-6 py-1 mb-12 text-white bg-black rounded-md"
                  >
                    {t("back to home")}
                  </Link>
                </div>
              </div>
            )}

            {/* {step === 3 && <CreatePassword userId={userId} setStep={setStep} />} */}
            <Footer hidden />
          </Form>
        );
      }}
    </Formik>
  );
};

export default Register;
