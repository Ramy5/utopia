import React, { useEffect, useState } from "react";
import DownLoadApp from "../../components/atoms/molecules/downLoad-app/DownLoadApp";
import { t } from "i18next";
import { Form, Formik } from "formik";
import BaseInput from "../../components/atoms/molecules/formik-fields/BaseInput";
import Button from "../../components/atoms/Button/Button";
import Utopia from "../../assets/utopia.png";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../utils/axios";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

const postBePartner = async (postData) => {
  try {
    const data = await apiRequest({
      url: "/api/student/become-partner",
      method: "POST",
      data: postData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data?.data;
  } catch (errors) {
    toast.error(errors);
    console.log("🚀 ~ loginPost ~ error:", errors);
  }
};

const BePartner = () => {
  const navigate = useNavigate();

  const initialValues = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    Email: "",
    address: "",
    postal_code: "",
    country: "",
    city: "",
    job_title: "",
    company_name: "",
  };

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ["BePartner"],
    mutationFn: (data: any) => postBePartner(data),
    onSuccess: (data) => {
      toast.success(t("The data has been added successfully"));
    },
  });

  return (
    <section>
      <div className="max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-[80rem] md:px-4 mx-auto">
        {isSuccess ? (
          <div className="w-[90%] sm:w-3/4 md:w-2/3 lg:w-1/2 my-12 sm:my-16 mx-auto">
            <div className="bg-mainColor text-white rounded-2xl  text-center py-12 px-8">
              <h2 className="text-5xl font-medium">{t("Hello!")} محمد</h2>
              <p className="my-8 text-lg">
                {t(
                  "Thank you for getting in touch. We will contact you as soon as possible"
                )}
              </p>
              <p className="mb-8 text-lg">{t("We wish you a happy day")}</p>
              <div>
                <img src={Utopia} alt="Utopia" className="mx-auto" />
                <p className="mt-2">{t("utopia team")}</p>
              </div>
            </div>
            <Button
              type="submit"
              className="bg-[#1B0924] px-12 py-3.5 rounded-2xl ms-auto mb-12 sm:mb-0 mt-8"
              action={() => navigate("/")}
            >
              {t("Return to the homepage")}
            </Button>
          </div>
        ) : (
          <>
            <div className="my-8 sm:my-16 px-4 md:px-0">
              <h2 className="text-3xl font-medium sm:text-6xl mb-0 sm:mb-20">
                {t("become a partner")}
              </h2>
            </div>

            <div className="mb-24 sm:mb-16 px-4 md:px-0">
              <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                  mutate({
                    f_name: values.first_name,
                    l_name: values.last_name,
                    phone: values.mobile_number,
                    email: values.Email,
                    address: values.address,
                    post_code: values.postal_code,
                    county: values.country,
                    city: values.city,
                    job_name: values.job_title,
                    company_name: values.company_name,
                  });
                }}
              >
                <Form className="">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
                    <div>
                      <label
                        htmlFor="first_name"
                        className="absolute z-10 bg-[#1B0925] text-white rounded-full w-[8rem] text-center py-[13.2px]"
                      >
                        {t("first name")}
                      </label>
                      <BaseInput
                        id="first_name"
                        name="first_name"
                        type="text"
                        className="py-3 ps-[8.5rem]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="last_name"
                        className="absolute z-10 bg-[#1B0925] text-white rounded-full w-[8rem] text-center py-[13.2px]"
                      >
                        {t("last name")}
                      </label>
                      <BaseInput
                        id="last_name"
                        name="last_name"
                        type="text"
                        className="py-3 ps-[8.5rem]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="mobile_number"
                        className="absolute z-10 bg-[#1B0925] text-white rounded-full w-[8rem] text-center py-[13.2px]"
                      >
                        {t("Mobile number")}
                      </label>
                      <BaseInput
                        id="mobile_number"
                        name="mobile_number"
                        type="text"
                        className="py-3 ps-[8.5rem]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="Email"
                        className="absolute z-10 bg-[#1B0925] text-white rounded-full w-[8rem] text-center py-[13.2px]"
                      >
                        {t("Email")}
                      </label>
                      <BaseInput
                        id="Email"
                        name="Email"
                        type="text"
                        className="py-3 ps-[8.5rem]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="address"
                        className="absolute z-10 bg-[#1B0925] text-white rounded-full w-[8rem] text-center py-[13.2px]"
                      >
                        {t("address")}
                      </label>
                      <BaseInput
                        id="address"
                        name="address"
                        type="text"
                        className="py-3 ps-[8.5rem]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="postal_code"
                        className="absolute z-10 bg-[#1B0925] text-white rounded-full w-[8rem] text-center py-[13.2px]"
                      >
                        {t("postal code")}
                      </label>
                      <BaseInput
                        id="postal_code"
                        name="postal_code"
                        type="text"
                        className="py-3 ps-[8.5rem]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="country"
                        className="absolute z-10 bg-[#1B0925] text-white rounded-full w-[8rem] text-center py-[13.2px]"
                      >
                        {t("country")}
                      </label>
                      <BaseInput
                        id="country"
                        name="country"
                        type="text"
                        className="py-3 ps-[8.5rem]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="city"
                        className="absolute z-10 bg-[#1B0925] text-white rounded-full w-[8rem] text-center py-[13.2px]"
                      >
                        {t("city")}
                      </label>
                      <BaseInput
                        id="city"
                        name="city"
                        type="text"
                        className="py-3 ps-[8.5rem]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="job_title"
                        className="absolute z-10 bg-[#1B0925] text-white rounded-full w-[8rem] text-center py-[13.2px]"
                      >
                        {t("job title")}
                      </label>
                      <BaseInput
                        id="job_title"
                        name="job_title"
                        type="text"
                        className="py-3 ps-[8.5rem]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="company_name"
                        className="absolute z-10 bg-[#1B0925] text-white rounded-full w-[8rem] text-center py-[13.2px]"
                      >
                        {t("company name")}
                      </label>
                      <BaseInput
                        id="company_name"
                        name="company_name"
                        type="text"
                        className="py-3 ps-[8.5rem]"
                      />
                    </div>
                  </div>
                  <div className="w-full mt-6 flex">
                    <Button
                      type="submit"
                      className="bg-mainColor px-12 py-3.5 rounded-2xl ms-auto"
                      loading={isPending}
                    >
                      {t("send")}
                    </Button>
                  </div>
                </Form>
              </Formik>
            </div>
          </>
        )}
      </div>

      <div>
        <DownLoadApp />
      </div>
    </section>
  );
};

export default BePartner;
