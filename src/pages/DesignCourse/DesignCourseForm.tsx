import { Field, Form, Formik } from "formik";
import Graduation from "../../assets/graduation.png";
import Car from "../../assets/car.png";
import StudentMedical from "../../assets/Student_medical.png";
import OtherFees from "../../assets/Other_fees.png";
import Utopia from "../../assets/utopia.png";
import GraduationLight from "../../assets/graduation_light.png";
import CarLight from "../../assets/car_light.png";
import StudentMedicalLight from "../../assets/Student_medical_light.png";
import OtherFeesLight from "../../assets/Other_fees_light.png";
import TotalCosts from "../../assets/TotalCosts.png";
import { t } from "i18next";
import BaseInput from "../../components/atoms/molecules/formik-fields/BaseInput";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "../../utils/axios";
import { PiHouseLineLight, PiHouseLineThin } from "react-icons/pi";
import Button from "../../components/atoms/Button/Button";
import { lazy, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BaseSelect from "../../components/atoms/molecules/formik-fields/BaseSelect";
import { useRTL } from "../../hooks/useRTL";
import { StylesConfig, GroupBase } from "react-select";
import { toast } from "react-toastify";

interface CustomOption {
  label: string;
  value: string;
}

const DesignCourseSelect: StylesConfig<
  CustomOption,
  false,
  GroupBase<CustomOption>
> = {
  control: (provided) => ({
    ...provided,
    borderRadius: "15px",
    border: "1",
    borderColor: "#C9C5CA",
    minHeight: "44px",
    cursor: "pointer",
    padding: "4px 1px",
  }),
  option: (provided, state) => {
    let backgroundColor = "";
    let color = "";
    if (state.isSelected) {
      backgroundColor = "#9F85F3";
      color = "white";
    } else if (state.isFocused) {
      backgroundColor = "white";
      color = "#000";
    }

    return {
      ...provided,
      backgroundColor,
      color,
      fontWeight: "400",
      cursor: "pointer",
    };
  },
  singleValue: (provided) => ({
    ...provided,
    color: "black",
    fontWeight: "400",
  }),
  valueContainer: (provided) => ({
    ...provided,
    whiteSpace: "nowrap",
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "10px",
    boxShadow: "0px 4px 4px 0px #ddd",
    backgroundColor: "#E6EAEE",
  }),
  loadingIndicator: (provided) => ({
    ...provided,
    color: "#393D94",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "black",
  }),
};

const DesignCourseForm = () => {
  const [step, setStep] = useState(1);
  const location = useLocation();
  console.log("🚀 ~ DesignCourseForm ~ location:", location);
  const numberWeek = location?.state?.numberOfWeeks;
  const [numberOfWeeks, setNumberOfWeeks] = useState(null);
  console.log("🚀 ~ DesignCourseForm ~ numberOfWeeks:", numberOfWeeks);
  const partnersID = location?.state?.id;
  const startDate = location?.state?.startDate;
  const isRTL = useRTL();

  const isEnabled = !!partnersID && !!startDate && !!numberWeek;

  const initialValues = {
    number_weeks: numberOfWeeks || 0,
    start_date: startDate || "",
    partner_id: partnersID || 0,
    price: 0,
    courses_id: 0,
    courses_price: 0,
    living_id: 0,
    living_price: 0,
    pick_id: 0,
    pick_price: 0,
    medical_id: 0,
    medical_price: 0,
    fees_id: 0,
    fees_price: 0,
    amount: 0,
  };

  useEffect(() => {
    setNumberOfWeeks({
      id: numberWeek,
      label: `${numberWeek} ${!isRTL ? "A week" : "أسابيع"}`,
      value: `${numberWeek} ${!isRTL ? "A week" : "أسابيع"}`,
    });
  }, [numberWeek]);

  const fetchChooseYourCourseDetail = async () => {
    try {
      const data = await apiRequest({
        url: `/api/student/choose-your-course-details/${partnersID}/${numberOfWeeks?.id}/${startDate}?per_page=10000`,
        method: "GET",
      });
      return data?.data;
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };

  const { data } = useQuery({
    queryKey: ["choose-course-detail", numberOfWeeks?.id],
    queryFn: fetchChooseYourCourseDetail,
    suspense: true,
    enabled: !!numberOfWeeks?.id,
  });
  console.log("🚀 ~ DesignYourOwnCourse ~ data:", data);

  const weekOptions = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    label: i + 1,
    value: i + 1,
  }));

  const postCourseData = async (postData) => {
    try {
      const response = await apiRequest({
        url: `/api/student/design-your-course/store`,
        method: "POST",
        data: postData,
      });
      return response?.data;
    } catch (error) {
      console.error("Error posting data:", error.message);
    }
  };

  const {
    mutate,
    data: CourseData,
    error,
    isPending,
  } = useMutation({
    mutationFn: postCourseData,
    onSuccess: (data) => {
      toast.success(t("The course was designed successfully."));
    },
    onError: (error) => {
      console.error("Error posting data:", error.message);
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={() => {}}
        enableReinitialize={true}
      >
        {({ setFieldValue, values }) => {
          console.log("🚀 ~ DesignCourseForm ~ values:", values);
          return (
            <Form>
              <div className="sm:mb-0 mb-28">
                <div className={`${step === 1 ? "block" : "hidden"} sm:block`}>
                  <div className="mb-8 sm:mb-16">
                    <div className="flex justify-between items-center mb-4 sm:mb-12">
                      <div className="flex gap-2 items-center">
                        <img
                          src={Graduation}
                          alt="Graduation"
                          className="w-16 h-10 hidden sm:block"
                        />
                        <p className="text-lg font-medium sm:font-normal sm:text-xl">
                          {t("Courses")}
                        </p>
                      </div>

                      <div className="relative flex items-center gap-2">
                        <p className="text-[15px]">{t("study duration")}</p>
                        <BaseSelect
                          id="number_weeks"
                          name="number_weeks"
                          options={weekOptions}
                          onChange={(option) => {
                            setNumberOfWeeks({
                              id: option.id,
                              label: `${option.label} ${
                                !isRTL ? "A week" : "أسابيع"
                              }`,
                              value: `${option.value} ${
                                !isRTL ? "A week" : "أسابيع"
                              }`,
                            });
                          }}
                          className="w-full text-black text-center"
                          value={numberOfWeeks}
                          selectStyle={DesignCourseSelect}
                        />
                      </div>
                    </div>

                    <div>
                      <ul>
                        {data?.courses?.map((course, index) => (
                          <li
                            key={index}
                            className={`flex justify-between gap-2 items-center py-4 ${
                              index > 0 ? "border-t border-t-[#C9C5CA]" : ""
                            } sm:border-t-[1.8px] sm:border-t-[#707070] `}
                          >
                            <div>
                              <div className="flex items-end gap-2 sm:gap-4 mb-3">
                                <input
                                  id={`course_${index}`}
                                  name="courses_id"
                                  type="radio"
                                  className="p-2 cursor-pointer"
                                  onChange={(e) => {
                                    setFieldValue("courses_id", course.id);
                                    setFieldValue(
                                      "courses_price",
                                      course.plan?.[0]?.total_price
                                    );
                                  }}
                                />
                                <h2 className="text-base font-medium sm:font-normal sm:text-xl">
                                  {course.key}
                                </h2>{" "}
                                {course.note && (
                                  <span className="text-sm sm:text-[15px] bg-mainColor text-white rounded-full px-3 sm:px-5 py-1">
                                    {course.note}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm sm:text-[15px]">
                                {course.value}
                              </p>
                            </div>
                            <h2 className="text-[17px] sm:text-xl font-semibold sm:font-normal whitespace-nowrap">
                              {course.plan?.[0]?.total_price}{" "}
                              {course.plan?.[0]?.unit}
                            </h2>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mb-8 sm:mb-16">
                    <div className="flex justify-between items-center mb-4 sm:mb-12">
                      <div className="flex sm:gap-0 gap-1 items-center">
                        <PiHouseLineThin className="w-16 h-14 hidden sm:block" />
                        <p className="text-lg sm:text-xl font-medium sm:font-normal ">
                          {t("Housing")}
                        </p>
                      </div>

                      <div className="relative flex items-center gap-2">
                        <p className="text-[15px]">{t("duration of stay")}</p>
                        <BaseSelect
                          id="number_weeks"
                          name="number_weeks"
                          options={weekOptions}
                          onChange={(option) => {
                            setNumberOfWeeks({
                              id: option.id,
                              label: `${option.label} ${
                                !isRTL ? "A week" : "أسابيع"
                              }`,
                              value: `${option.value} ${
                                !isRTL ? "A week" : "أسابيع"
                              }`,
                            });
                          }}
                          className="w-full text-black text-center"
                          value={numberOfWeeks}
                          selectStyle={DesignCourseSelect}
                        />
                      </div>
                    </div>

                    <div>
                      <ul>
                        {data?.living?.map((living, index) => (
                          <li
                            key={index}
                            className={`flex justify-between gap-2 items-center py-4 ${
                              index > 0 ? "border-t border-t-[#C9C5CA]" : ""
                            } sm:border-t-[1.8px] sm:border-t-[#707070] `}
                          >
                            <div>
                              <div className="flex items-end gap-2 sm:gap-4 mb-3">
                                <input
                                  id={`living_${index}`}
                                  name="living_id"
                                  type="radio"
                                  className="p-2 cursor-pointer"
                                  onChange={(e) => {
                                    setFieldValue("living_id", living.id);
                                    setFieldValue(
                                      "living_price",
                                      living.plan?.[0]?.total_price
                                    );
                                  }}
                                />
                                <h2 className="text-base font-medium sm:font-normal sm:text-xl">
                                  {living.key}
                                </h2>{" "}
                                {living.note && (
                                  <span className="text-sm sm:text-[15px] bg-mainColor text-white rounded-full px-3 sm:px-5 py-1">
                                    {living.note}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm sm:text-[15px]">
                                {living.value}
                              </p>
                            </div>
                            <h2 className="text-[17px] sm:text-xl font-semibold sm:font-normal whitespace-nowrap">
                              {living.plan?.[0]?.total_price}{" "}
                              {living.plan?.[0]?.unit}
                            </h2>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className={`${step === 2 ? "block" : "hidden"} sm:block`}>
                  <div className="mb-8 sm:mb-16">
                    <div className="flex justify-between items-center mb-4 sm:mb-12">
                      <div className="flex gap-2 items-center">
                        <img
                          src={Car}
                          alt="Car"
                          className="w-16 h-10 hidden sm:block"
                        />
                        <p className="text-lg sm:text-xl font-medium sm:font-normal ">
                          {t("Airport pick up")}
                        </p>
                      </div>
                    </div>

                    <div>
                      <ul>
                        {data?.pick_up?.map((pickUp, index) => (
                          <li
                            key={index}
                            className={`flex justify-between gap-2 items-center py-4 ${
                              index > 0 ? "border-t border-t-[#C9C5CA]" : ""
                            } sm:border-t-[1.8px] sm:border-t-[#707070] `}
                          >
                            <div>
                              <div className="flex items-end gap-2 sm:gap-4 mb-3">
                                <input
                                  id={`pickUp_${index}`}
                                  name="pick_id"
                                  type="radio"
                                  className="p-2 cursor-pointer"
                                  onChange={(e) => {
                                    setFieldValue("pick_id", pickUp.id);
                                    setFieldValue(
                                      "pick_price",
                                      pickUp.plan?.[0]?.total_price
                                    );
                                  }}
                                />
                                <h2 className="text-base font-medium sm:font-normal sm:text-xl">
                                  {pickUp.key}
                                </h2>{" "}
                                {pickUp.note && (
                                  <span className="text-sm sm:text-[15px] bg-mainColor text-white rounded-full px-3 sm:px-5 py-1">
                                    {pickUp.note}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm sm:text-[15px]">
                                {pickUp.value}
                              </p>
                            </div>
                            <h2 className="text-[17px] sm:text-xl font-semibold sm:font-normal whitespace-nowrap">
                              {pickUp.plan?.[0]?.total_price}{" "}
                              {pickUp.plan?.[0]?.unit}
                            </h2>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mb-8 sm:mb-16">
                    <div className="flex justify-between items-center mb-4 sm:mb-12">
                      <div className="flex gap-2 items-center">
                        <img
                          src={StudentMedical}
                          alt="Student Medical"
                          className="w-14 h-14 hidden sm:block"
                        />
                        <p className="text-xl sm:text-xl font-medium sm:font-normal ">
                          {t("Student medical insurance")}
                        </p>
                      </div>
                    </div>

                    <div>
                      <ul>
                        {data?.medical?.map((medical, index) => (
                          <li
                            key={index}
                            className={`flex justify-between gap-2 items-center py-4 ${
                              index > 0 ? "border-t border-t-[#C9C5CA]" : ""
                            } sm:border-t-[1.8px] sm:border-t-[#707070] `}
                          >
                            <div>
                              <div className="flex items-end gap-2 sm:gap-4 mb-3">
                                <input
                                  id={`medical_${index}`}
                                  name="medical_id"
                                  type="radio"
                                  className="p-2 cursor-pointer"
                                  onChange={(e) => {
                                    setFieldValue("medical_id", medical.id);
                                    setFieldValue(
                                      "medical_price",
                                      medical.plan?.[0]?.total_price
                                    );
                                  }}
                                />
                                <h2 className="text-base font-medium sm:font-normal sm:text-xl">
                                  {medical.key}
                                </h2>{" "}
                                {medical.note && (
                                  <span className="text-sm sm:text-[15px] bg-mainColor text-white rounded-full px-3 sm:px-5 py-1">
                                    {medical.note}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm sm:text-[15px]">
                                {medical.value}
                              </p>
                            </div>
                            <h2 className="text-[17px] sm:text-xl font-semibold sm:font-normal whitespace-nowrap">
                              {medical.plan?.[0]?.total_price}{" "}
                              {medical.plan?.[0]?.unit}
                            </h2>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mb-8 sm:mb-16">
                    <div className="flex justify-between items-center mb-4 sm:mb-12">
                      <div className="flex gap-2 items-center">
                        <img
                          src={OtherFees}
                          alt="Other Fees"
                          className="w-14 h-14 hidden sm:block"
                        />
                        <p className="text-lg sm:text-xl font-medium sm:font-normal ">
                          {t("Other fees")}
                        </p>
                      </div>
                    </div>

                    <div>
                      <ul>
                        {data?.other_fees?.map((fees, index) => (
                          <li
                            key={index}
                            className={`flex justify-between gap-2 items-center py-4 ${
                              index > 0 ? "border-t border-t-[#C9C5CA]" : ""
                            } sm:border-t-[1.8px] sm:border-t-[#707070] `}
                          >
                            <div>
                              <div className="flex items-end gap-2 sm:gap-4 mb-3">
                                <input
                                  id={`fees_${index}`}
                                  name="fees_id"
                                  type="radio"
                                  className="p-2 cursor-pointer"
                                  onChange={(e) => {
                                    setFieldValue("fees_id", fees.id);
                                    setFieldValue(
                                      "fees_price",
                                      fees.plan?.[0]?.total_price
                                    );
                                  }}
                                />
                                <h2 className="text-base font-medium sm:font-normal sm:text-xl">
                                  {fees.key}
                                </h2>{" "}
                                {fees.note && (
                                  <span className="text-sm sm:text-[15px] bg-mainColor text-white rounded-full px-3 sm:px-5 py-1">
                                    {fees.note}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm sm:text-[15px]">
                                {fees.value}
                              </p>
                            </div>
                            <h2 className="text-[17px] sm:text-xl font-semibold sm:font-normal whitespace-nowrap">
                              {fees.plan?.[0]?.total_price}{" "}
                              {fees.plan?.[0]?.unit}
                            </h2>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div
                  className={`mb-8 sm:mb-16 ${
                    step === 3 ? "block" : "hidden"
                  } sm:block`}
                >
                  <div className="flex justify-between items-center mb-4 sm:mb-12">
                    <div className="flex gap-3 items-center">
                      <img
                        src={TotalCosts}
                        alt="Total Costs"
                        className="w-14 h-14 hidden sm:block"
                      />
                      <p className="text-lg sm:text-xl font-semibold sm:font-normal">
                        {t("Total costs")}
                      </p>
                    </div>
                  </div>

                  <div className="sm:bg-[#1B0924] sm:text-white sm:rounded-2xl">
                    <div className="flex justify-between items-center border-b border-b-[#707070] p-4">
                      <div className="flex gap-3 items-center">
                        <img
                          src={GraduationLight}
                          alt="Graduation"
                          className="w-20 h-12 sm:block hidden"
                        />
                        <div>
                          <p className="text-lg sm:text-xl font-medium sm:font-normal ">
                            {t("Courses")}
                          </p>
                          <p className="text-sm mt-2">
                            {t("الدورة التحضيرية لإختبار الآيلتس")}
                          </p>
                        </div>
                      </div>
                      <div className="py-2.5 sm:text-xl font-semibold sm:font-normal">
                        {values?.courses_price} SAR
                      </div>
                    </div>

                    <div className="flex justify-between items-center border-b border-b-[#707070] p-4">
                      <div className="flex sm:gap-1.5 items-center">
                        <PiHouseLineThin className="w-16 h-14 sm:w-20 sm:h-16 sm:block hidden" />
                        <div>
                          <p className="text-xl sm:text-xl font-medium sm:font-normal">
                            {t("Housing")}
                          </p>
                          <p className="text-sm mt-2">
                            {t("الإقامة مع عائلة")}
                          </p>
                        </div>
                      </div>
                      <div className="py-2.5 sm:text-xl font-semibold sm:font-normal">
                        {values?.living_price} SAR
                      </div>
                    </div>

                    <div className="flex justify-between items-center border-b border-b-[#707070] p-4">
                      <div className="flex gap-3.5 items-center">
                        <img
                          src={CarLight}
                          alt="Car"
                          className="w-16 h-10 sm:w-16 sm:h-12 sm:block hidden"
                        />
                        <div>
                          <p className="text-lg sm:text-xl font-medium sm:font-normal ">
                            {t("Airport pick up")}
                          </p>
                          <p className="text-sm mt-2">{t("بدون إستقبال")}</p>
                        </div>
                      </div>
                      <div className="py-2.5 sm:text-xl font-semibold sm:font-normal">
                        {values.pick_price} SAR
                      </div>
                    </div>

                    <div className="flex justify-between items-center border-b border-b-[#707070] p-4">
                      <div className="flex gap-3.5 items-center ">
                        <img
                          src={StudentMedicalLight}
                          alt="Student Medical"
                          className="w-14 h-14 sm:block hidden"
                        />
                        <div>
                          <p className="text-lg sm:text-xl font-medium sm:font-normal ">
                            {t("Student medical insurance")}
                          </p>
                          <p className="text-sm mt-2">
                            {t("بدون التأمين الطبي")}
                          </p>
                        </div>
                      </div>
                      <div className="py-2.5 sm:text-xl font-semibold sm:font-normal">
                        {values.medical_price} SAR
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-4">
                      <div className="flex gap-3.5 items-center">
                        <img
                          src={OtherFeesLight}
                          alt="Other Fees"
                          className="w-14 h-14 sm:block hidden"
                        />
                        <div>
                          <p className="text-lg sm:text-xl font-medium sm:font-normal ">
                            {t("Other fees")}
                          </p>
                          <p className="text-sm mt-2">{t("رسوم صيفية")}</p>
                        </div>
                      </div>
                      <div className="py-2.5 sm:text-xl font-semibold sm:font-normal">
                        {values.fees_price} SAR
                      </div>
                    </div>

                    <div className="justify-between items-center bg-mainColor px-4 py-3 rounded-2xl sm:flex hidden">
                      <div className="flex gap-2 items-center">
                        <p className="text-xl sm:text-2xl">{t("Total")}</p>
                      </div>
                      <div className="py-2.5 sm:text-xl font-semibold sm:font-normal">
                        {values.courses_price +
                          values.living_price +
                          values.medical_price +
                          values.pick_price +
                          values.fees_price}{" "}
                        SAR
                      </div>
                    </div>

                    <div className="bg-[#E8DEFF] sm:hidden block px-4 rounded-2xl">
                      <div className="flex justify-between items-center border-b border-b-[#C9C5CA] py-2.5">
                        <h2 className="font-semibold text-[17px]">
                          {t("Total")}
                        </h2>
                        <div className="py-2.5 font-semibold text-mainColor">
                          {values.courses_price +
                            values.living_price +
                            values.medical_price +
                            values.pick_price +
                            values.fees_price}{" "}
                          SAR
                        </div>
                      </div>
                      <div className="flex justify-between items-center border-b border-b-[#C9C5CA] py-2.5">
                        <h2 className="font-semibold text-[17px]">
                          {t("Application fees")}
                        </h2>
                        <div className="py-2.5 font-semibold text-mainColor">
                          11000 SAR
                        </div>
                      </div>
                      <div className="flex justify-between items-center py-2.5">
                        <h2 className="font-semibold text-[17px]">
                          {t("The rest will be paid after final acceptance.")}
                        </h2>
                        <div className="py-2.5 font-semibold text-mainColor">
                          11000 SAR
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#E8DEFF] sm:hidden block px-4 rounded-2xl mt-5">
                      <div className="flex justify-between items-center py-2.5">
                        <h2 className="font-semibold text-[17px]">
                          {t("Total")}
                        </h2>
                        <div className="py-2.5 font-semibold">11000 SAR</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden sm:block bg-mainColor w-3/4 lg:w-1/2 m-auto rounded-2xl text-white p-8 text-center mb-8 mt-40">
                  <h2 className="text-7xl">{t("We are with you")}</h2>
                  <p className="my-8 w-4/5 m-auto">
                    {t(
                      "We will stay in contact with you and if any problem occurs with the institute, we will solve it, God willing"
                    )}
                  </p>
                  <img src={Utopia} alt="Utopia" className="m-auto" />
                  <p>{t("utopia team")}</p>
                </div>
                <div className="w-3/4 lg:w-1/2 m-auto mb-28 hidden sm:block">
                  <Button
                    action={() => {
                      mutate({
                        number_weeks: values.number_weeks.id,
                        start_date: values.start_date,
                        partner_id: values.partner_id,
                        price: values.price,
                        courses_id: values.courses_id,
                        living_id: values.living_id,
                        pick_id: values.pick_id,
                        medical_id: values.medical_id,
                        fees_id: values.fees_id,
                        amount: values.partner_id,
                      });
                    }}
                    className="w-full bg-[#1B0924] py-3.5"
                    loading={isPending}
                  >
                    {t("book now")}
                  </Button>
                </div>

                <Button
                  className="text-white w-full sm:hidden block "
                  loading={isPending}
                  action={() => {
                    if (step === 3) {
                      mutate({
                        number_weeks: values.number_weeks.id,
                        start_date: values.start_date,
                        partner_id: values.partner_id,
                        price: values.price,
                        courses_id: values.courses_id,
                        living_id: values.living_id,
                        pick_id: values.pick_id,
                        medical_id: values.medical_id,
                        fees_id: values.fees_id,
                        amount: values.partner_id,
                      });
                    } else {
                      setStep((prev) => prev + 1);
                    }
                  }}
                >
                  {step === 3 ? `${t("create a quote")}` : `${t("next")}`}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default DesignCourseForm;
