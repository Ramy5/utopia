import { Form, Formik } from "formik";
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import BaseInput from "../../components/atoms/molecules/formik-fields/BaseInput";
import Button from "../../components/atoms/Button/Button";
import { useAuth } from "../../context/AuthContext";
import { apiRequest } from "../../utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdOutlineMailOutline, MdOutlinePerson } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import { IoMdPhonePortrait } from "react-icons/io";

const postUniversityForm = async (postData) => {
  try {
    const data = await apiRequest({
      url: "/api/student/university-register-package",
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

const fetchNationalities = async () => {
  try {
    const data = await apiRequest({
      url: `/api/student/nationalities`,
      method: "GET",
    });
    return data?.data;
  } catch (error) {
    console.error("Error fetching items:", error.message);
  }
};

const UniversityAdmissionForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation();
  const {
    partnerId = null,
    specializationID = null,
    universityName = "",
  } = location.state || {};
  console.log(location);
  const [step, setStep] = useState(1);
  const [universityNameState, setUniversityNameState] =
    useState(universityName);
  console.log(
    "🚀 ~ UniversityAdmissionForm ~ universityNameState:",
    universityNameState
  );

  const initialValues = {
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    nationality: "",
    phoneNumber: user?.phone,
    email: "",
    englishLevel: "",
    address: "",
    city: "",
    postalCode: "",
    specialRequests: "",
    heardAboutUs: "",
    contactForBooking: "",
    agreeToTerms: false,
    documents: {
      highSchoolCertificate: null,
      passportPhoto: null,
      passportSizePhoto: null,
    },
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required(t("required")),
    lastName: Yup.string().required(t("required")),
    birthDate: Yup.date().required(t("required")),
    gender: Yup.string().required(t("required")),
    nationality: Yup.string().required(t("required")),
    phoneNumber: Yup.string().required(t("required")),
    email: Yup.string().email(t("invalid_email")).required(t("required")),
    englishLevel: Yup.string().required(t("required")),
    address: Yup.string().required(t("required")),
    city: Yup.string().required(t("required")),
    postalCode: Yup.string().required(t("required")),
    agreeToTerms: Yup.boolean().oneOf([true], t("must_accept_terms")),
  });

  useEffect(() => {
    setUniversityNameState(universityName);
  }, [location.state]);

  const { data: nationalities } = useQuery({
    queryKey: ["nationalities"],
    queryFn: fetchNationalities,
    suspense: true,
  });
  console.log("🚀 ~ UniversityAdmissionForm ~ nationalities:", nationalities);

  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ["password"],
    mutationFn: (data: any) => postUniversityForm(data),
    onSuccess: (data) => {
      console.log(data);
      navigate("/");
      toast.success(t("registration successful"));
    },
  });

  const handleSubmit = async (values: any) => {
    console.log("🚀 ~ handleSubmit ~ values:", values);
    const formatData = {
      city_name: values?.city,
      nationality_id: values?.nationality,
      f_name: values?.firstName,
      l_name: values?.lastName,
      phone: values?.phoneNumber,
      email: values?.email,
      postal_code: values?.postalCode,
      birthday: values?.birthDate,
      gender: values?.gender,
      level: values?.englishLevel,
      address: values?.address,
      // is_smoker: 1,
      // problem_with_pets: 1,
      // relative_name: "ASD",
      // relative_relation: "my_cousin",
      // relative_phone: 010000000000,
      // abs_her_id: 3000623213123,
      // abs_her_phone: 011111111111111,
      // health_problems: 1,
      // health_problems_desc: "AEWE",
      special_requests: values?.specialRequests,
      hear_about_utopia: values?.heardAboutUs,
      contact_you_to_book: values?.contactForBooking === "yes" ? 1 : 0,
      partner_id: partnerId,
      specialization_id: specializationID,
      // plan_id: 1,
      passport: values?.documents?.passportPhoto,
      school_certificate: values?.documents?.highSchoolCertificate,
      image: values?.documents?.passportSizePhoto,
    };
    console.log(formatData);

    await mutate(formatData);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, values, touched, setFieldValue, isValid }) => {
        console.log("🚀 ~ UniversityAdmissionForm ~ validateField:", isValid);
        return (
          <Form className="">
            {/* DESKTOP */}
            <div className="p-4 my-12 hidden sm:block max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-[90rem] mx-auto">
              <div className="mb-24 space-y-4">
                <h1 className="text-4xl font-bold ">
                  {t("registration form")}
                </h1>
                <p className="text-xl">{universityName}</p>
              </div>

              <div className="grid gap-x-36 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {/* Personal Information */}
                <div className="mb-4">
                  <BaseInput
                    label={t("first name")}
                    id="firstName"
                    name="firstName"
                    type="text"
                    className={`mb-1 text-center border rounded-2xl border-[#BEC8CF] ${
                      touched.firstName && errors.firstName && "border-red-700"
                    }`}
                  />
                  {touched.firstName && errors.firstName && (
                    <div className="text-sm text-red-700">
                      {errors.firstName}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <BaseInput
                    label={t("last name")}
                    id="lastName"
                    name="lastName"
                    type="text"
                    className={`mb-1 text-center border rounded-2xl border-[#BEC8CF] ${
                      touched.lastName && errors.lastName && "border-red-700"
                    }`}
                  />
                  {touched.lastName && errors.lastName && (
                    <div className="mt-1 text-sm text-red-700">
                      {errors.lastName}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <BaseInput
                    label={t("birth date")}
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    className={`mb-1 border text-center rounded-2xl border-[#BEC8CF] ${
                      touched.birthDate && errors.birthDate && "border-red-700"
                    }`}
                  />
                  {touched.birthDate && errors.birthDate && (
                    <div className="mt-1 text-sm text-red-700">
                      {errors.birthDate}
                    </div>
                  )}
                </div>

                {/* Gender */}
                <div className="mb-4">
                  <label className="block text-transparent">
                    {t("gender")}
                  </label>
                  <div className="flex gap-4">
                    <label
                      htmlFor="male"
                      className={`cursor-pointer px-10 py-3 rounded-2xl  border ${
                        values.gender === "male"
                          ? "bg-gray-200 border-gray-500 text-black"
                          : "border-gray-300 text-[#8f9395]"
                      }`}
                    >
                      <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="male"
                        className="hidden"
                        onChange={() => setFieldValue("gender", "male")}
                      />
                      {t("male")}
                    </label>

                    <label
                      htmlFor="female"
                      className={`cursor-pointer px-10 py-3 rounded-2xl border ${
                        values.gender === "female"
                          ? "bg-gray-200 border-gray-500 text-black"
                          : "border-gray-300 text-[#8f9395]"
                      }`}
                    >
                      <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="female"
                        className="hidden"
                        onChange={() => setFieldValue("gender", "female")}
                      />
                      {t("female")}
                    </label>
                  </div>
                  {touched.gender && errors.gender && (
                    <div className="mt-1 text-sm text-red-700">
                      {errors.gender}
                    </div>
                  )}
                </div>

                {/* Contact Information */}
                <div className="mb-4">
                  <BaseInput
                    label={t("phone number")}
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    disabled
                    className={`mb-1 border text-center rounded-2xl border-[#BEC8CF] ${
                      touched.phoneNumber &&
                      errors.phoneNumber &&
                      "border-red-700"
                    }`}
                  />
                  {touched.phoneNumber && errors.phoneNumber && (
                    <div className="mt-1 text-sm text-red-700">
                      {errors.phoneNumber}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <BaseInput
                    label={t("email")}
                    id="email"
                    name="email"
                    type="email"
                    className={`mb-1 border text-center rounded-2xl border-[#BEC8CF] ${
                      touched.email && errors.email && "border-red-700"
                    }`}
                  />
                  {touched.email && errors.email && (
                    <div className="mt-1 text-sm text-red-700">
                      {errors.email}
                    </div>
                  )}
                </div>

                {/* Nationality */}
                <div className="mb-4">
                  <label
                    htmlFor="nationality"
                    className="block mb-2 text-gray-700"
                  >
                    {t("nationality")}
                  </label>
                  <select
                    id="nationality"
                    name="nationality"
                    className={`mb-1 border w-full text-center rounded-2xl border-[#BEC8CF] ${
                      touched.nationality &&
                      errors.nationality &&
                      "border-red-700"
                    }`}
                    onChange={(e) =>
                      setFieldValue("nationality", e.target.value)
                    }
                  >
                    {nationalities?.map(
                      (nationality: { id: number; name: string }) => (
                        <option key={nationality.id} value={nationality.id}>
                          {nationality.name}
                        </option>
                      )
                    )}
                  </select>
                  {touched.nationality && errors.nationality && (
                    <div className="mt-1 text-sm text-red-700">
                      {errors.nationality}
                    </div>
                  )}
                </div>

                {/* Additional Details */}
                <div className="mb-4">
                  <label
                    htmlFor="englishLevel"
                    className="block mb-2 text-gray-700"
                  >
                    {t("english level")}
                  </label>
                  <select
                    id="englishLevel"
                    name="englishLevel"
                    className={`mb-1 border text-center w-full rounded-2xl border-[#BEC8CF] ${
                      touched.nationality &&
                      errors.nationality &&
                      "border-red-700"
                    }`}
                    onChange={(e) =>
                      setFieldValue("englishLevel", e.target.value)
                    }
                  >
                    <option value="" label={t("select option")} />
                    <option value="acceptable" label={t("acceptable")} />
                    <option value="good" label={t("good")} />
                    <option value="very_good " label={t("very good")} />
                    <option value="excellent " label={t("excellent")} />
                  </select>
                  {touched.englishLevel && errors.englishLevel && (
                    <div className="mt-1 text-sm text-red-700">
                      {errors.englishLevel}
                    </div>
                  )}
                </div>
              </div>

              {/* NATIONAL ADDRESS */}
              <div>
                <div className="my-24 ">
                  <h1 className="text-4xl font-bold">
                    {t("national address")}
                  </h1>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-x-36 gap-y-14">
                  <div className="col-span-2 mb-4">
                    <BaseInput
                      label={t("address")}
                      id="address"
                      name="address"
                      placeholder={t("example: king fahd road 6579")}
                      type="text"
                      className={`mb-1 border text-center  rounded-2xl border-[#BEC8CF] ${
                        touched.address && errors.address && "border-red-700"
                      }`}
                    />
                    {touched.address && errors.address && (
                      <div className="mt-1 text-sm text-red-700">
                        {errors.address}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <BaseInput
                      label={t("city")}
                      id="city"
                      name="city"
                      placeholder="جدة"
                      type="text"
                      className={`mb-1 text-center border rounded-2xl border-[#BEC8CF] ${
                        touched.address && errors.address && "border-red-700"
                      }`}
                    />
                    {touched.city && errors.city && (
                      <div className="mt-1 text-sm text-red-700">
                        {errors.city}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <BaseInput
                      label={t("postal code")}
                      id="postalCode"
                      name="postalCode"
                      type="text"
                      placeholder="987658"
                      className={`mb-1 border text-center rounded-2xl border-[#BEC8CF] ${
                        touched.address && errors.address && "border-red-700"
                      }`}
                    />
                    {touched.postalCode && errors.postalCode && (
                      <div className="mt-1 text-sm text-red-700">
                        {errors.postalCode}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              <div className="my-20">
                <label
                  htmlFor="specialRequests"
                  className="block mb-2 text-gray-700"
                >
                  {t("are there any special request")}
                </label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  rows={6}
                  className={`mb-1 border w-96  rounded-2xl border-[#BEC8CF] ${
                    touched.address && errors.address && "border-red-700"
                  }`}
                  placeholder={t("enter special requests")}
                  onChange={(e) =>
                    setFieldValue("specialRequests", e.target.value)
                  }
                ></textarea>
              </div>

              {/* How did you hear about us? */}
              <div className="my-20">
                <label
                  htmlFor="heardAboutUs"
                  className="block mb-2 text-gray-700"
                >
                  {t("how did you hear")}
                </label>
                <select
                  id="heardAboutUs"
                  name="heardAboutUs"
                  className={`mb-1 border w-96  rounded-2xl border-[#BEC8CF] ${
                    touched.address && errors.address && "border-red-700"
                  }`}
                  onChange={(e) =>
                    setFieldValue("heardAboutUs", e.target.value)
                  }
                >
                  <option value="" label={t("select option")} />
                  <option value="friend" label={t("friend")} />
                  <option value="facebook" label={t("facebook")} />
                  <option value="other" label={t("other")} />
                </select>
              </div>

              {/* Contact for Booking */}
              <div className="mb-20">
                <label className="block mb-2 text-gray-700">
                  {t("contact for booking")}
                </label>
                <div className="flex gap-4">
                  <label
                    htmlFor="yes"
                    className={`cursor-pointer px-10 py-3 rounded-2xl  border ${
                      values.contactForBooking === "yes"
                        ? "bg-gray-200 border-gray-500 text-black"
                        : "border-gray-300 text-[#8f9395]"
                    }`}
                  >
                    <input
                      type="radio"
                      id="yes"
                      name="contactForBooking"
                      value="yes"
                      className="hidden"
                      onChange={() => setFieldValue("contactForBooking", "yes")}
                    />
                    {t("yes")}
                  </label>

                  <label
                    htmlFor="no"
                    className={`cursor-pointer px-10 py-3 rounded-2xl border ${
                      values.contactForBooking === "no"
                        ? "bg-gray-200 border-gray-500 text-black"
                        : "border-gray-300 text-[#8f9395]"
                    }`}
                  >
                    <input
                      type="radio"
                      id="no"
                      name="contactForBooking"
                      value="no"
                      className="hidden"
                      onChange={() => setFieldValue("contactForBooking", "no")}
                    />
                    {t("no")}
                  </label>
                </div>
              </div>

              {/* File Uploads */}
              <div className="mb-20">
                <div className="p-6 mb-12 bg-gray-100 rounded-2xl w-screen sm:w-[60vw] lg:w-[45vw] xl:w-[40vw]">
                  <p className="mb-2 text-3xl font-semibold">
                    {t("upload requirements")}
                  </p>
                  <p className="mb-10 text-sm">
                    {t(
                      "if the requirements are not ready, you can save and attach later"
                    )}
                  </p>

                  <div className="flex flex-wrap gap-4 mb-6">
                    <button
                      type="button"
                      className="px-4 py-2 text-white bg-gray-800 rounded-full"
                      onClick={() =>
                        document
                          .getElementById("highSchoolCertificateInput")
                          ?.click()
                      }
                    >
                      {t("high school certificate")}
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 text-white bg-gray-800 rounded-full"
                      onClick={() =>
                        document.getElementById("passportPhotoInput")?.click()
                      }
                    >
                      {t("passport photo")}
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 text-white bg-gray-800 rounded-full"
                      onClick={() =>
                        document
                          .getElementById("passportSizePhotoInput")
                          ?.click()
                      }
                    >
                      {t("passport size photo")}
                    </button>
                  </div>
                </div>

                {/* Hidden File Inputs */}
                <input
                  id="highSchoolCertificateInput"
                  type="file"
                  className="hidden"
                  onChange={(event) =>
                    setFieldValue(
                      "documents.highSchoolCertificate",
                      event.currentTarget.files[0]
                    )
                  }
                />
                <input
                  id="passportPhotoInput"
                  type="file"
                  className="hidden"
                  onChange={(event) =>
                    setFieldValue(
                      "documents.passportPhoto",
                      event.currentTarget.files[0]
                    )
                  }
                />
                <input
                  id="passportSizePhotoInput"
                  type="file"
                  className="hidden"
                  onChange={(event) =>
                    setFieldValue(
                      "documents.passportSizePhoto",
                      event.currentTarget.files[0]
                    )
                  }
                />

                {/* Display Selected Files */}
                <div className="flex flex-col gap-4 mt-4">
                  {values.documents.highSchoolCertificate && (
                    <div className="flex items-center gap-6 p-2">
                      <Button className="bg-[#BEC8CF] rounded-2xl py-3">
                        {t("high school certificate")}
                      </Button>
                      <Button className="bg-transparent text-black border border-[#BEC8CF] rounded-2xl py-3 ">
                        {values.documents.highSchoolCertificate.name}
                      </Button>
                      <Button
                        type="button"
                        className="bg-transparent text-black border border-[#BEC8CF] rounded-2xl py-3"
                        action={() =>
                          setFieldValue("documents.highSchoolCertificate", null)
                        }
                      >
                        {t("remove")}
                      </Button>
                    </div>
                  )}
                  {values.documents.passportPhoto && (
                    <div className="flex items-center gap-6 p-2">
                      <Button className="bg-[#BEC8CF] rounded-2xl py-3">
                        {t("passport photo")}
                      </Button>
                      <Button className="bg-transparent text-black border border-[#BEC8CF] rounded-2xl py-3 ">
                        {values.documents.passportPhoto.name}
                      </Button>
                      <Button
                        type="button"
                        className="bg-transparent text-black border border-[#BEC8CF] rounded-2xl py-3 "
                        action={() =>
                          setFieldValue("documents.passportPhoto", null)
                        }
                      >
                        {t("remove")}
                      </Button>
                    </div>
                  )}
                  {values.documents.passportSizePhoto && (
                    <div className="flex items-center gap-6 p-2">
                      <Button className="bg-[#BEC8CF] rounded-2xl py-3">
                        {t("passport size photo")}
                      </Button>
                      <Button className="bg-transparent text-black border border-[#BEC8CF] rounded-2xl py-3 ">
                        {values.documents.passportSizePhoto.name}
                      </Button>
                      <Button
                        type="button"
                        className="bg-transparent text-black border border-[#BEC8CF] rounded-2xl py-3"
                        action={() =>
                          setFieldValue("documents.passportSizePhoto", null)
                        }
                      >
                        {t("remove")}
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Agree to Terms */}
              <div className="mb-4">
                <label className="flex items-center gap-2 ">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    name="agreeToTerms"
                    className={`border border-[#BEC8CF] ${
                      touched.address && errors.address && "border-red-700"
                    }`}
                    onChange={(e) =>
                      setFieldValue("agreeToTerms", e.target.checked)
                    }
                  />
                  <span className="text-gray-700">{t("agree to terms")}</span>
                </label>
                {touched.agreeToTerms && errors.agreeToTerms && (
                  <div className="mt-1 text-sm text-red-700">
                    {errors.agreeToTerms}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                loading={isPending}
                className="py-4 mt-8 text-white bg-mainColor rounded-2xl"
              >
                {t("confirm and submit")}
              </Button>
            </div>

            {/* MOBILE */}
            <div className="sm:hidden">
              {step === 1 && (
                <>
                  <div
                    style={{ gridTemplateColumns: "20px 1fr" }}
                    className="grid items-center justify-center px-6 py-3"
                  >
                    <FaArrowRightLong
                      onClick={() => navigate("/specializations")}
                      className="cursor-pointer justify-self-start"
                    />
                    <h4 className="text-xl font-bold text-center">
                      {t("registration form")}
                    </h4>
                  </div>
                  <div className="p-4">
                    <h2 className="mb-8 font-bold">
                      {t(`this is the registration form for application to`)}{" "}
                      {universityNameState}{" "}
                      {t("please fill out this form carefully")}
                    </h2>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="relative mb-4">
                        <BaseInput
                          label={t("first name")}
                          id="firstName"
                          name="firstName"
                          type="text"
                          className={`mb-1 border rounded-xl border-[#BEC8CF] ${
                            touched.firstName &&
                            errors.firstName &&
                            "border-red-700"
                          }`}
                        />
                        <MdOutlinePerson className="absolute top-1/2 left-3 text-xl text-[#BEC8CF]" />
                        {touched.firstName && errors.firstName && (
                          <div className="text-sm text-red-700">
                            {errors.firstName}
                          </div>
                        )}
                      </div>

                      <div className="relative mb-4">
                        <BaseInput
                          label={t("last name")}
                          id="lastName"
                          name="lastName"
                          type="text"
                          className={`mb-1 border rounded-xl border-[#BEC8CF] ${
                            touched.lastName &&
                            errors.lastName &&
                            "border-red-700"
                          }`}
                        />
                        <MdOutlinePerson className="absolute top-1/2 left-3 text-xl text-[#BEC8CF]" />
                        {touched.lastName && errors.lastName && (
                          <div className="mt-1 text-sm text-red-700">
                            {errors.lastName}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="relative mb-4">
                      <BaseInput
                        label={t("birth date")}
                        id="birthDate"
                        name="birthDate"
                        type="date"
                        className={`mb-1 border rounded-xl border-[#BEC8CF] ${
                          touched.birthDate &&
                          errors.birthDate &&
                          "border-red-700"
                        }`}
                      />
                      {touched.birthDate && errors.birthDate && (
                        <div className="mt-1 text-sm text-red-700">
                          {errors.birthDate}
                        </div>
                      )}
                    </div>

                    <div className="relative mb-4">
                      <BaseInput
                        label={t("phone number")}
                        id="phoneNumber"
                        name="phoneNumber"
                        type="text"
                        disabled
                        className={`mb-1 border rounded-xl border-[#BEC8CF] ${
                          touched.phoneNumber &&
                          errors.phoneNumber &&
                          "border-red-700"
                        }`}
                      />
                      <IoMdPhonePortrait className="absolute top-1/2 left-3 text-xl text-[#BEC8CF]" />
                      {touched.phoneNumber && errors.phoneNumber && (
                        <div className="mt-1 text-sm text-red-700">
                          {errors.phoneNumber}
                        </div>
                      )}
                    </div>

                    <div className="relative mb-4">
                      <BaseInput
                        label={t("email")}
                        id="email"
                        name="email"
                        type="email"
                        className={`mb-1 border rounded-xl border-[#BEC8CF] ${
                          touched.email && errors.email && "border-red-700"
                        }`}
                      />
                      <MdOutlineMailOutline className="absolute top-1/2 left-3 text-xl text-[#BEC8CF]" />
                      {touched.email && errors.email && (
                        <div className="mt-1 text-sm text-red-700">
                          {errors.email}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      {/* Nationality */}
                      <div className="mb-4">
                        <label
                          htmlFor="nationality"
                          className="block mb-2 text-gray-700"
                        >
                          {t("nationality")}
                        </label>
                        <select
                          id="nationality"
                          name="nationality"
                          className={`mb-1 border w-full rounded-xl border-[#BEC8CF] ${
                            touched.nationality &&
                            errors.nationality &&
                            "border-red-700"
                          }`}
                          onChange={(e) =>
                            setFieldValue("nationality", e.target.value)
                          }
                        >
                          {nationalities?.map(
                            (nationality: { id: number; name: string }) => (
                              <option
                                key={nationality.id}
                                value={nationality.id}
                              >
                                {nationality.name}
                              </option>
                            )
                          )}
                        </select>
                        {touched.nationality && errors.nationality && (
                          <div className="mt-1 text-sm text-red-700">
                            {errors.nationality}
                          </div>
                        )}
                      </div>

                      {/* Additional Details */}
                      <div className="mb-4 ">
                        <label
                          htmlFor="englishLevel"
                          className="block mb-2 text-gray-700"
                        >
                          {t("english level")}
                        </label>
                        <select
                          id="englishLevel"
                          name="englishLevel"
                          className={`mb-1 border w-full rounded-xl border-[#BEC8CF] ${
                            touched.nationality &&
                            errors.nationality &&
                            "border-red-700"
                          }`}
                          onChange={(e) =>
                            setFieldValue("englishLevel", e.target.value)
                          }
                        >
                          <option value="" label={t("select option")} />
                          <option value="acceptable" label={t("acceptable")} />
                          <option value="good" label={t("good")} />
                          <option value="very_good " label={t("very good")} />
                          <option value="excellent " label={t("excellent")} />
                        </select>
                        {touched.englishLevel && errors.englishLevel && (
                          <div className="mt-1 text-sm text-red-700">
                            {errors.englishLevel}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Gender */}
                    <div className="mb-4">
                      <label className="block mb-2">{t("gender")}</label>
                      <div className="flex flex-col gap-4">
                        <div className="">
                          <input
                            type="radio"
                            id="male"
                            name="gender"
                            value="male"
                            className="text-mainColor focus:outline-none focus:ring-0"
                            onChange={() => setFieldValue("gender", "male")}
                          />
                          <label htmlFor="male" className="mx-2">
                            {t("male")}
                          </label>
                        </div>

                        <div>
                          <input
                            type="radio"
                            id="female"
                            name="gender"
                            value="female"
                            className="text-mainColor"
                            onChange={() => setFieldValue("gender", "female")}
                          />
                          <label htmlFor="female" className="mx-2">
                            {t("female")}
                          </label>
                        </div>
                      </div>
                      {touched.gender && errors.gender && (
                        <div className="mt-1 text-sm text-red-700">
                          {errors.gender}
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="my-6">
                        <h1 className="text-xl font-bold">
                          {t("national address")}
                        </h1>
                      </div>
                      <div className="relative mb-4 ">
                        <BaseInput
                          label={t("address")}
                          id="address"
                          name="address"
                          placeholder={t("example: king fahd road 6579")}
                          type="text"
                          className={`mb-1 border rounded-xl border-[#BEC8CF] ${
                            touched.address &&
                            errors.address &&
                            "border-red-700"
                          }`}
                        />
                        <MdOutlinePerson className="absolute top-1/2 left-3 text-xl text-[#BEC8CF]" />
                        {touched.address && errors.address && (
                          <div className="mt-1 text-sm text-red-700">
                            {errors.address}
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="mb-4">
                          <BaseInput
                            label={t("city")}
                            id="city"
                            name="city"
                            placeholder="جدة"
                            type="text"
                            className={`mb-1 border rounded-xl border-[#BEC8CF] ${
                              touched.address &&
                              errors.address &&
                              "border-red-700"
                            }`}
                          />
                          {touched.city && errors.city && (
                            <div className="mt-1 text-sm text-red-700">
                              {errors.city}
                            </div>
                          )}
                        </div>

                        <div className="mb-4">
                          <BaseInput
                            label={t("postal code")}
                            id="postalCode"
                            name="postalCode"
                            type="text"
                            placeholder="987658"
                            className={`mb-1 border rounded-xl border-[#BEC8CF] ${
                              touched.address &&
                              errors.address &&
                              "border-red-700"
                            }`}
                          />
                          {touched.postalCode && errors.postalCode && (
                            <div className="mt-1 text-sm text-red-700">
                              {errors.postalCode}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <Button
                      type="button"
                      disabled={isValid}
                      action={() => {
                        setStep(2);
                      }}
                      className={`w-full disabled:bg-mainColor/60 disabled:cursor-not-allowed disabled:border-none py-4 mt-8 text-white bg-mainColor rounded-xl`}
                    >
                      {t("next")}
                    </Button>
                  </div>
                </>
              )}

              {step === 2 && (
                <div>
                  <div
                    onClick={() => setStep(1)}
                    style={{ gridTemplateColumns: "20px 1fr" }}
                    className="grid items-center justify-center px-6 py-3"
                  >
                    <FaArrowRightLong className="cursor-pointer justify-self-start" />
                  </div>

                  <div className="p-4">
                    {/* Special Requests */}
                    <div className="">
                      <label
                        htmlFor="specialRequests"
                        className="block mb-2 text-gray-700"
                      >
                        {t("are there any special request")}
                      </label>
                      <textarea
                        id="specialRequests"
                        name="specialRequests"
                        rows={6}
                        className={`mb-1 border w-96  rounded-2xl border-[#BEC8CF] ${
                          touched.address && errors.address && "border-red-700"
                        }`}
                        placeholder={t("enter special requests")}
                        onChange={(e) =>
                          setFieldValue("specialRequests", e.target.value)
                        }
                      ></textarea>
                    </div>

                    {/* How did you hear about us? */}
                    <div className="my-6">
                      <label
                        htmlFor="heardAboutUs"
                        className="block mb-2 text-gray-700"
                      >
                        {t("how did you hear")}
                      </label>
                      <select
                        id="heardAboutUs"
                        name="heardAboutUs"
                        className={`mb-1 border w-96  rounded-2xl border-[#BEC8CF] ${
                          touched.address && errors.address && "border-red-700"
                        }`}
                        onChange={(e) =>
                          setFieldValue("heardAboutUs", e.target.value)
                        }
                      >
                        <option value="" label={t("select option")} />
                        <option value="friend" label={t("friend")} />
                        <option value="facebook" label={t("facebook")} />
                        <option value="other" label={t("other")} />
                      </select>
                    </div>

                    {/* Contact for Booking */}
                    <div className="mb-6">
                      <label className="block mb-2 text-gray-700">
                        {t("contact for booking")}
                      </label>
                      <div className="space-y-1 ">
                        <div>
                          <input
                            type="radio"
                            id="yes"
                            name="contactForBooking"
                            value="yes"
                            onChange={() =>
                              setFieldValue("contactForBooking", "yes")
                            }
                          />
                          <label htmlFor="yes" className="mx-2">
                            {t("yes")}
                          </label>
                        </div>

                        <div>
                          <input
                            type="radio"
                            id="no"
                            name="contactForBooking"
                            value="no"
                            onChange={() =>
                              setFieldValue("contactForBooking", "no")
                            }
                          />
                          <label htmlFor="no" className="mx-2">
                            {t("no")}
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* File Uploads */}
                    <div className="mb-6">
                      <div className=" mb-6 w-screen sm:w-[60vw] lg:w-[45vw] xl:w-[40vw]">
                        <p className="mb-2 text-xl font-semibold">
                          {t("upload requirements")}
                        </p>
                        <p className="mb-10 text-sm">
                          {t(
                            "if the requirements are not ready, you can save and attach later"
                          )}
                        </p>

                        <div className="flex flex-col gap-4 mb-6">
                          <div>
                            <div className="flex items-center justify-between gap-4">
                              <p className="font-bold">
                                {t("high school certificate")}
                              </p>
                              <div className="flex gap-2 mx-4">
                                <Button
                                  className="px-8 py-2 text-sm"
                                  action={() =>
                                    document
                                      .getElementById(
                                        "highSchoolCertificateInput"
                                      )
                                      ?.click()
                                  }
                                >
                                  {t("attach")}
                                </Button>
                                <Button
                                  type="button"
                                  className="text-sm py-2 px-8 text-white bg-[#6a6d6e]"
                                  action={() =>
                                    setFieldValue(
                                      "documents.highSchoolCertificate",
                                      null
                                    )
                                  }
                                >
                                  {t("remove")}
                                </Button>
                              </div>
                            </div>
                            {values.documents.highSchoolCertificate && (
                              <Button className="bg-transparent text-black border border-[#BEC8CF] mt-4 block mx-auto ">
                                {values?.documents?.highSchoolCertificate?.name}
                              </Button>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center justify-between gap-4">
                              <p className="font-bold">{t("passport photo")}</p>
                              <div className="flex gap-2 mx-4">
                                <Button
                                  className="px-8 py-2 text-sm"
                                  action={() =>
                                    document
                                      .getElementById("passportPhotoInput")
                                      ?.click()
                                  }
                                >
                                  {t("attach")}
                                </Button>
                                <Button
                                  type="button"
                                  className="text-sm py-2 px-8 text-white bg-[#6a6d6e]"
                                  action={() =>
                                    setFieldValue(
                                      "documents.passportPhoto",
                                      null
                                    )
                                  }
                                >
                                  {t("remove")}
                                </Button>
                              </div>
                            </div>
                            {values.documents.passportPhoto && (
                              <Button className="bg-transparent text-black border border-[#BEC8CF] mt-4 block mx-auto ">
                                {values?.documents?.passportPhoto?.name}
                              </Button>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center justify-between gap-4">
                              <p className="font-bold">
                                {t("passport size photo")}
                              </p>
                              <div className="flex gap-2 mx-4">
                                <Button
                                  className="px-8 py-2 text-sm"
                                  action={() =>
                                    document
                                      .getElementById("passportSizePhotoInput")
                                      ?.click()
                                  }
                                >
                                  {t("attach")}
                                </Button>
                                <Button
                                  type="button"
                                  className="text-sm py-2 px-8 text-white bg-[#6a6d6e]"
                                  action={() =>
                                    setFieldValue(
                                      "documents.passportSizePhoto",
                                      null
                                    )
                                  }
                                >
                                  {t("remove")}
                                </Button>
                              </div>
                            </div>
                            {values.documents.passportSizePhoto && (
                              <Button className="bg-transparent text-black border border-[#BEC8CF] mt-4 block mx-auto ">
                                {values?.documents?.passportSizePhoto?.name}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Hidden File Inputs */}
                      <input
                        id="highSchoolCertificateInput"
                        type="file"
                        className="hidden"
                        onChange={(event) =>
                          setFieldValue(
                            "documents.highSchoolCertificate",
                            event.currentTarget.files[0]
                          )
                        }
                      />
                      <input
                        id="passportPhotoInput"
                        type="file"
                        className="hidden"
                        onChange={(event) =>
                          setFieldValue(
                            "documents.passportPhoto",
                            event.currentTarget.files[0]
                          )
                        }
                      />
                      <input
                        id="passportSizePhotoInput"
                        type="file"
                        className="hidden"
                        onChange={(event) =>
                          setFieldValue(
                            "documents.passportSizePhoto",
                            event.currentTarget.files[0]
                          )
                        }
                      />
                    </div>

                    {/* Agree to Terms */}
                    <div className="mb-4">
                      <label className="flex items-center gap-2 ">
                        <input
                          type="checkbox"
                          id="agreeToTerms"
                          name="agreeToTerms"
                          className={`border border-[#BEC8CF] ${
                            touched.address &&
                            errors.address &&
                            "border-red-700"
                          }`}
                          onChange={(e) =>
                            setFieldValue("agreeToTerms", e.target.checked)
                          }
                        />
                        <span className="underline text-mainColor">
                          {t("agree to terms")}
                        </span>
                      </label>
                      {touched.agreeToTerms && errors.agreeToTerms && (
                        <div className="mt-1 text-sm text-red-700">
                          {errors.agreeToTerms}
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      loading={isPending}
                      disabled={!isValid}
                      className={`w-full disabled:bg-mainColor/60 disabled:cursor-not-allowed disabled:border-none py-4 mt-8 text-white bg-mainColor rounded-xl`}
                    >
                      {t("confirm and submit")}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default UniversityAdmissionForm;
