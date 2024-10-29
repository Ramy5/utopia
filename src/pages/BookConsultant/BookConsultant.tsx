import { t } from "i18next";
import PhoneIcon from "../../assets/phoneIcon.svg";
import { Form, Formik } from "formik";
import BaseInput from "../../components/atoms/molecules/formik-fields/BaseInput";
import Button from "../../components/atoms/Button/Button";
import DownLoadApp from "../../components/atoms/molecules/downLoad-app/DownLoadApp";
import { apiRequest } from "../../utils/axios";
import { useMutation } from "@tanstack/react-query";
import logo from "../../assets/logo-footer.svg";
import { useRTL } from "../../hooks/useRTL";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoPersonOutline } from "react-icons/io5";
import { IoMdPhonePortrait } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { Footer, Navbar } from "../../components";
import { bookConsultantValidationSchema } from "../../Schema/BookConsultantSchema";
import cn from "../../utils/cn";

const bookConsultantPost = async (postData) => {
  try {
    const data = await apiRequest({
      url: "/api/student/student-book",
      method: "POST",
      data: postData,
    });
    return data?.data;
  } catch (error) {
    console.error("Error fetching items:", error.message);
  }
};

const BookConsultant = () => {
  const initialValues = {
    name: "",
    phone: "",
  };

  const isRTL = useRTL();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ["book-consultant"],
    mutationFn: (data) => bookConsultantPost(data),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={bookConsultantValidationSchema}
      onSubmit={async (values: any, { setSubmitting }) => {
        if (values?.name === "" || values?.phone === "") return;
        await mutate(values);
        setSubmitting(false);
      }}
    >
      {({ values, setFieldValue, isValid, dirty, errors, touched }) => (
        <Form className="">
          <div className="max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-[80rem] mx-auto">
            <Navbar hidden />
          </div>

          {/* DESKTOP */}
          <div className="hidden sm:block ">
            <div className="p-4 my-12 max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-[80rem] mx-auto">
              <div>
                {isSuccess ? (
                  <div>
                    <div className="flex rounded-2xl flex-col items-center justify-center w-[80%] md:w-[578px] bg-mainColor my-12 mx-auto text-white p-6 gap-7">
                      <h1 className="text-6xl">
                        {isRTL
                          ? `اهلا ${values?.name}`
                          : `welcome ${values?.name}`}
                      </h1>
                      <p className="text-lg text-center w-96">
                        {t(
                          "thank you for contacting us. we will contact you as soon as possible"
                        )}
                      </p>
                      <p className="text-lg">{t("have a nice day")}</p>
                      <div className="flex flex-col items-center gap-1">
                        <img src={logo} alt="logo" />
                        <p className="text-sm">فريق يوتوبيا</p>
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
                ) : (
                  <div className="flex flex-wrap items-center justify-center w-full px-12 pb-16 mt-20 bg-white md:justify-between ">
                    <div className="w-full md:w-auto">
                      <h2 className={`hidden mb-12 text-6xl sm:block `}>
                        {t("book consultant")}
                      </h2>
                      <div className="flex items-center justify-center w-full ">
                        <div className="relative w-full p-8 py-12 rounded-lg shadow-xl bg-mainColor">
                          <h2 className="mb-4 text-lg text-white ">
                            {t("consultant")}
                          </h2>

                          <div className="flex flex-col w-full space-y-4">
                            <div
                              style={{ gridTemplateColumns: "100px 1fr" }}
                              className="grid w-full gap-4"
                            >
                              <Button className="px-2 text-xs border cursor-auto hover:scale-100">
                                {t("name")}
                              </Button>
                              <BaseInput
                                id="name"
                                name="name"
                                type="text"
                                className="w-full md:w-[536px] p-3 text-right bg-white rounded-lg"
                              />
                            </div>
                            {errors.name && touched.name && (
                              <div className="mt-1 text-sm text-red-500">
                                {errors.name}
                              </div>
                            )}
                            <div
                              style={{ gridTemplateColumns: "100px 1fr" }}
                              className="grid w-full gap-4"
                            >
                              <Button className="px-2 text-xs border cursor-auto hover:scale-100">
                                {t("phone number")}
                              </Button>
                              <BaseInput
                                id="phone"
                                name="phone"
                                type="text"
                                className="w-full md:w-[536px] p-3 text-right bg-white rounded-lg"
                              />
                            </div>
                            {errors.phone && touched.phone && (
                              <div className="mt-2 text-sm text-red-500">
                                {errors.phone}
                              </div>
                            )}

                            <Button
                              type="submit"
                              loading={isPending}
                              disabled={!isValid || !dirty || isPending}
                              className={cn(
                                "w-1/3 py-3 mx-auto mt-6 text-white  bg-[#1B0924] hover:bg-[#1B0924]/80",
                                {
                                  "opacity-40 cursor-not-allowed":
                                    !isValid || !dirty || isPending,
                                }
                              )}
                            >
                              {t("send")}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <img
                      className="w-[200px] h-[200px] hidden lg:block xl:w-[350px] xl:h-[350px]"
                      src={PhoneIcon}
                      alt="phone"
                    />
                  </div>
                )}
              </div>
            </div>
            <DownLoadApp />
          </div>

          {/* MOBIL */}
          <div className="block sm:hidden">
            <div
              style={{ gridTemplateColumns: "20px 1fr" }}
              className="grid items-center justify-center mx-6 my-6"
            >
              <Link to={"/"} className="">
                <FaArrowRightLong className="cursor-pointer justify-self-start" />
              </Link>
              <h4 className="text-xl text-center">{t("book consultant")}</h4>
            </div>

            <>
              <div className="p-8 mx-auto mt-20 rounded-full phoneBgGradient w-fit">
                {isSuccess ? (
                  <FaCheck className="w-[100px] h-[100px] text-mainColor" />
                ) : (
                  <img
                    className="w-[100px] h-[100px]"
                    src={PhoneIcon}
                    alt="phone"
                  />
                )}
              </div>
              <div className="px-5 py-6 fixed bottom-0 overflow-y-auto w-full  h-[70vh] phoneWave bg-mainColor/30">
                {isSuccess ? (
                  <div>
                    <div className="flex flex-col items-center justify-center p-6 mx-auto my-12 mb-0 text-black rounded-2xl gap-7">
                      <h1 className="text-3xl">
                        {isRTL
                          ? `اهلا ${values?.name}`
                          : `welcome ${values?.name}`}
                      </h1>
                      <p className="text-lg text-center w-96">
                        {t(
                          "thank you for contacting us. we will contact you as soon as possible"
                        )}
                      </p>
                      <p className="text-lg">{t("have a nice day")}</p>
                      <div className="flex flex-col items-center gap-1">
                        <img src={logo} alt="logo" />
                        <p className="text-sm">فريق يوتوبيا</p>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <Link
                        to={"/"}
                        className="w-full px-6 py-3 text-center text-white rounded-md bg-mainColor"
                      >
                        {t("back to home")}
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mt-28">
                      <div className="">
                        <label htmlFor="name">{t("name")}</label>
                        <div className="relative">
                          <BaseInput
                            id="name"
                            name="name"
                            type="text"
                            className="px-3 py-1 mt-2 text-right bg-transparent border rounded-lg border-black/50"
                          />
                          <IoPersonOutline
                            className={`absolute top-4 text-gray-700 ${
                              isRTL ? "left-4" : "right-4"
                            }`}
                          />
                        </div>
                      </div>
                      {errors.phone && touched.phone && (
                        <div className="mt-2 mb-6 text-sm text-red-500">
                          {errors.phone}
                        </div>
                      )}
                      <div className="">
                        <label htmlFor="phone">{t("phone number")}</label>
                        <div className="relative">
                          <BaseInput
                            id="phone"
                            name="phone"
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
                      {errors.phone && touched.phone && (
                        <div className="mt-2 text-sm text-red-500">
                          {errors.phone}
                        </div>
                      )}
                    </div>

                    <Button
                      type="submit"
                      loading={isPending}
                      disabled={!isValid || !dirty || isPending}
                      className={cn(
                        "w-full py-3 mt-10 text-white bg-mainColor hover:bg-mainColor/70",
                        {
                          "opacity-40 cursor-not-allowed":
                            !isValid || !dirty || isPending,
                        }
                      )}
                    >
                      {t("send")}
                    </Button>
                  </>
                )}
              </div>
            </>
          </div>

          <Footer hidden />
        </Form>
      )}
    </Formik>
  );
};

export default BookConsultant;
