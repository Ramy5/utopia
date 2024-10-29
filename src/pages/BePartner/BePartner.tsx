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
import { bePartnerValidationSchema } from "../../Schema/BePartnerSchema";
import cn from "../../utils/cn";

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
    window.scrollTo(0, 0);
  }, []);

  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ["BePartner"],
    mutationFn: (data: any) => postBePartner(data),
    onSuccess: (data) => {
      toast.success(t("The data has been added successfully"));
    },
  });

  const formFields = [
    { id: "first_name", label: "first name" },
    { id: "last_name", label: "last name" },
    { id: "mobile_number", label: "Mobile number" },
    { id: "Email", label: "Email" },
    { id: "address", label: "address" },
    { id: "postal_code", label: "postal code" },
    { id: "country", label: "country" },
    { id: "city", label: "city" },
    { id: "job_title", label: "job title" },
    { id: "company_name", label: "company name" },
  ];

  return (
    <section>
      <div className="max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-[80rem] md:px-4 mx-auto">
        {isSuccess ? (
          <div className="w-[90%] sm:w-3/4 md:w-2/3 lg:w-1/2 my-12 sm:my-16 mx-auto">
            <div className="px-8 py-12 text-center text-white bg-mainColor rounded-2xl">
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
            <div className="px-4 my-8 sm:my-16 md:px-0">
              <h2 className="mb-0 text-3xl font-medium sm:text-6xl sm:mb-20">
                {t("become a partner")}
              </h2>
            </div>

            <div className="px-4 mb-24 sm:mb-16 md:px-0">
              <Formik
                initialValues={initialValues}
                validationSchema={bePartnerValidationSchema}
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
                {({ errors, touched, isValid, dirty }) => (
                  <Form>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
                      {formFields.map((field) => (
                        <div key={field.id}>
                          <label
                            htmlFor={field.id}
                            className="absolute z-10 bg-[#1B0925] text-white rounded-full w-[8rem] text-center py-[13.2px]"
                          >
                            {t(field.label)}
                          </label>
                          <BaseInput
                            id={field.id}
                            name={field.id}
                            type="text"
                            className="py-3 ps-[8.5rem]"
                          />
                          {errors[field.id] && touched[field.id] && (
                            <div className="mt-2 text-sm text-red-500">
                              {errors[field.id]}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex w-full mt-6">
                      <Button
                        type="submit"
                        disabled={!isValid || !dirty || isPending}
                        loading={isPending}
                        className={cn(
                          "bg-mainColor px-12 text-white py-3.5 rounded-2xl ms-auto",
                          {
                            "opacity-40 cursor-not-allowed":
                              !isValid || !dirty || isPending,
                          }
                        )}
                      >
                        {t("send")}
                      </Button>
                    </div>
                  </Form>
                )}
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
