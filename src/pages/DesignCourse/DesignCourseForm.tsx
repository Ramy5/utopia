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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../utils/axios";
import { PiHouseLineLight, PiHouseLineThin } from "react-icons/pi";
import Button from "../../components/atoms/Button/Button";
import { lazy, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BaseSelect from "../../components/atoms/molecules/formik-fields/BaseSelect";
import { useRTL } from "../../hooks/useRTL";
import { StylesConfig, GroupBase } from "react-select";
import { toast } from "react-toastify";
import cn from "../../utils/cn";

interface CustomOption {
  label: string;
  value: string;
}

export const DesignCourseSelect: StylesConfig<
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

const postProcessPayment = async (postData) => {
  try {
    const data = await apiRequest({
      url: "/api/student/process-payment",
      method: "POST",
      data: postData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data?.data;
  } catch (errors) {
    toast.error(errors);
  }
};

const DesignCourseForm = () => {
  const [step, setStep] = useState(1);
  const location = useLocation();
  const numberWeek = location?.state?.numberOfWeeks;
  console.log("🚀 ~ DesignCourseForm ~ numberWeek:", numberWeek);
  const [numberOfWeeks, setNumberOfWeeks] = useState(null);
  console.log("🚀 ~ DesignCourseForm ~ numberOfWeeks:", numberOfWeeks);
  const [studyDurationWeeks, setStudyDurationWeeks] = useState(null);
  const [stayDurationWeeks, setStayDurationWeeks] = useState(null);
  const partnersID = location?.state?.id;
  const startDate = location?.state?.startDate;
  const isRTL = useRTL();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { id = null, amount = "", user_id = null } = location.state || {};

  // const isEnabled = !!partnersID && !!startDate && !!numberWeek;

  useEffect(() => {
    setNumberOfWeeks({
      id: Number(numberWeek),
      label: `${numberWeek} ${t("A Week")}`,
      value: `${numberWeek} ${t("A Week")}`,
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
    queryKey: ["choose-course-detail", !!numberOfWeeks?.id],
    queryFn: fetchChooseYourCourseDetail,
    suspense: true,
    enabled: !!numberOfWeeks?.id,
  });
  console.log("🚀 ~ DesignCourseForm ~ data:", data);

  console.log("🚀 ~ data?.other_fees:", data?.other_fees);

  const otherFeesWithOutSummer = data?.other_fees?.filter(
    (item) => item.key !== "fees"
  );
  console.log("🚀 ~ otherFeesWithOutSummer:", otherFeesWithOutSummer);
  const otherFeesSummer = data?.other_fees?.filter(
    (item) => item.key === "fees"
  );
  console.log("🚀 ~ otherFeesSummer:", otherFeesSummer);

  // const totalFeesPrice = data.other_fees
  // console.log("🚀 ~ totalFeesPrice:", totalFeesPrice)

  const totalFeesPrice = data.other_fees.reduce((sum, fee) => {
    const planTotal = fee.plan.reduce(
      (planSum, plan) => planSum + (Number(plan.total_price) || 0),
      0
    );
    return sum + planTotal;
  }, 0);

  const initialValues = {
    number_weeks: numberOfWeeks || 0,
    start_date: startDate || "",
    partner_id: partnersID || 0,
    price: 0,
    courses_id: 0,
    courses_price: 0,
    courses_title: 0,
    living_id: 0,
    living_price: 0,
    living_title: 0,
    pick_id: 0,
    pick_price: 0,
    pick_title: 0,
    medical_id: 0,
    medical_price: 0,
    medical_title: 0,
    fees_id: data.other_fees?.[0]?.id,
    fees_price: totalFeesPrice,
    fees_title: 0,
    // feesSummer_id: otherFeesSummer?.[0]?.id || 0,
    // feesSummer_price: otherFeesSummer?.[0]?.plan?.[0]?.total_price || 0,
    // feesSummer_title: otherFeesSummer?.[0]?.value || 0,
    amount: 0,
  };

  const fetchChooseYourCourseDetailOfStudyDuration = async () => {
    try {
      const data = await apiRequest({
        url: `/api/student/choose-your-course-details/${partnersID}/${
          studyDurationWeeks?.id ? studyDurationWeeks?.id : numberOfWeeks?.id
        }/${startDate}?per_page=10000`,
        method: "GET",
      });
      return data?.data;
    } catch (error) {
      console.error("Error fetching items:", error.message);
      throw error;
    }
  };

  const { data: studyDuration } = useQuery({
    queryKey: [
      "choose-course-detail_study",
      studyDurationWeeks?.id,
      numberOfWeeks?.id,
    ],
    queryFn: fetchChooseYourCourseDetailOfStudyDuration,
    suspense: true,
    enabled: !!studyDurationWeeks?.id || !!numberOfWeeks?.id,
  });
  console.log("🚀 ~ DesignCourseForm ~ studyDuration:", studyDuration);

  const fetchChooseYourCourseDetailOfStayDuration = async () => {
    try {
      const data = await apiRequest({
        url: `/api/student/choose-your-course-details/${partnersID}/${
          stayDurationWeeks?.id ? stayDurationWeeks?.id : numberOfWeeks?.id
        }/${startDate}?per_page=10000`,
        method: "GET",
      });
      return data?.data;
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };

  const { data: stayDuration } = useQuery({
    queryKey: [
      "choose-course-detail_stay",
      stayDurationWeeks?.id,
      numberOfWeeks?.id,
    ],
    queryFn: fetchChooseYourCourseDetailOfStayDuration,
    suspense: true,
    enabled: !!stayDurationWeeks?.id || !!numberOfWeeks?.id,
  });

  const weekOptions = Array.from({ length: 47 }, (_, i) => i + 2).map(
    (num) => ({
      id: num,
      label: `${num}`,
      value: `${num}`,
    })
  );

  const weekStayOptions = Array.from(
    {
      length: studyDurationWeeks
        ? studyDurationWeeks?.id - 1
        : numberOfWeeks?.id - 1,
    },
    (_, i) => i + 2
  ).map((num) => ({
    id: num,
    label: `${num}`,
    value: `${num}`,
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
    mutate: mutateProcessPayment,
    isPending: isPendingProcessPayment,
    isSuccess: isSuccessProcessPayment,
  } = useMutation({
    mutationKey: ["uniProcessPayment"],
    mutationFn: (data: any) => postProcessPayment(data),
    onSuccess: (data) => {
      window.location.href = data?.redirect_url;
    },
  });

  const {
    mutate,
    data: CourseData,
    error,
    isPending,
  } = useMutation({
    mutationFn: postCourseData,
    onSuccess: (data) => {
      toast.success(t("The course was designed successfully."));
      // navigate("/designRegister", {
      //   state: {
      //     amount: 1200,
      //     user_id: user_id,
      //     design_id: id,
      //     total_amount: amount * +numberOfWeeks?.id,
      //     date_start: startDate,
      //   },
      // });
      // mutateProcessPayment({
      //   amount: 1200,
      //   user_id: user_id,
      //   design_id: packageId,
      //   total_amount: amount * numberOfWeeks,
      //   date_start: startDate,
      // });
      navigate("/Message_peration");
    },
    onError: (error) => {
      console.error("Error posting data:", error.message);
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
                    <div className="flex items-center justify-between mb-4 sm:mb-12">
                      <div className="flex items-center gap-2">
                        <img
                          src={Graduation}
                          alt="Graduation"
                          className="hidden w-16 h-10 sm:block"
                        />
                        <div>
                          <p className="text-lg font-medium sm:font-normal sm:text-xl">
                            {t("Courses")}
                          </p>
                          {studyDuration?.courses?.[0]?.type ? (
                            <span className="w-fit mt-0.5 text-sm text-[15px] bg-mainColor text-white rounded-full px-3 sm:px-3.5 flex items-center pt-1 pb-1 h-6">
                              {studyDuration?.courses?.[0]?.type}
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>

                      <div className="relative flex items-center gap-2">
                        <p className="text-[15px] bg-mainColor py-3 px-6 text-white rounded-2xl">
                          {t("study duration")}
                        </p>
                        <BaseSelect
                          id="study_duration"
                          name="study_duration"
                          options={weekOptions}
                          onChange={(option) => {
                            setStudyDurationWeeks({
                              id: option.id,
                              label: `${option.label} ${t("A Week")}`,
                              value: `${option.value} ${t("A Week")}`,
                            });
                          }}
                          className="w-full text-center text-black"
                          value={
                            studyDurationWeeks
                              ? studyDurationWeeks
                              : numberOfWeeks
                          }
                          selectStyle={DesignCourseSelect}
                        />
                      </div>
                    </div>

                    <div>
                      <ul>
                        {studyDuration?.courses?.map((course, index) => {
                          return (
                            <li
                              key={index}
                              className={`flex justify-between gap-2 items-center py-4 ${
                                index > 0 ? "border-t border-t-[#C9C5CA]" : ""
                              } sm:border-t-[1.8px] sm:border-t-[#707070] `}
                            >
                              <div className="flex gap-3">
                                <input
                                  id={`course_${index}`}
                                  name="courses_id"
                                  type="radio"
                                  className="p-2 cursor-pointer mt-1"
                                  onChange={(e) => {
                                    setFieldValue("courses_id", course.id);
                                    setFieldValue(
                                      "courses_price",
                                      course.plan?.[0]?.total_price
                                    );
                                    setFieldValue("courses_title", course.key);
                                  }}
                                />
                                <div className="mb-3 ">
                                  <div className="flex items-center gap-3">
                                    <h2
                                      className={`text-base font-medium sm:font-normal sm:text-xl ${
                                        course?.id == values.courses_id
                                          ? " text-mainColor"
                                          : ""
                                      }`}
                                    >
                                      {course.key}
                                    </h2>{" "}
                                    {course.note && (
                                      <span className="text-sm sm:text-[15px] bg-mainColor text-white rounded-full px-3 sm:px-5 flex items-center pt-1 pb-0.5 h-7">
                                        {course.note}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm sm:text-[15px] mt-5 flex flex-wrap gap-y-3">
                                    {course.value.split("-")?.map((item) => (
                                      <span
                                        className={cn(
                                          "   py-1.5 rounded-xl  me-2",
                                          {
                                            "px-5 text-center border":
                                              course.value.split("-")
                                                ?.length !== 1,
                                            "border-mainColor text-mainColor":
                                              course?.id == values.courses_id,
                                            "border-[#707070]":
                                              course?.id != values.courses_id,
                                          }
                                        )}
                                      >
                                        {item}
                                      </span>
                                    ))}
                                  </p>
                                </div>
                              </div>
                              <h2
                                className={`text-[17px] sm:text-xl font-semibold sm:font-normal whitespace-nowrap ${
                                  course?.id == values.courses_id
                                    ? " text-mainColor"
                                    : ""
                                }`}
                              >
                                {course.plan.length !== 0
                                  ? Number(
                                      course.plan?.[0]?.total_price
                                    ).toFixed(2)
                                  : "0.00"}
                                <span>
                                  {" "}
                                  {course.plan?.[0]?.unit || t("reyal")}
                                </span>
                              </h2>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>

                  <div className="mb-8 sm:mb-16">
                    <div className="flex items-center justify-between mb-4 sm:mb-12">
                      <div className="flex items-center gap-1 sm:gap-0">
                        <PiHouseLineThin className="hidden w-16 h-14 sm:block" />
                        <div>
                          <p className="text-lg font-medium sm:font-normal sm:text-xl">
                            {t("Housing")}
                          </p>
                          {stayDuration?.living?.[0]?.type ? (
                            <span className="w-fit mt-0.5 text-sm text-[15px] bg-mainColor text-white rounded-full px-3 sm:px-3.5 flex items-center pt-1 pb-1 h-6">
                              {stayDuration?.living?.[0]?.type}
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>

                      <div className="relative flex items-center gap-2">
                        <p className="text-[15px] bg-mainColor py-3 px-6 text-white rounded-2xl">
                          {t("duration of stay")}
                        </p>
                        <BaseSelect
                          id="stay_duration"
                          name="stay_duration"
                          options={weekStayOptions}
                          onChange={(option) => {
                            setStayDurationWeeks({
                              id: option.id,
                              label: `${option.label} ${t("A Week")}`,
                              value: `${option.value} ${t("A Week")}`,
                            });
                          }}
                          className="w-full text-center text-black"
                          value={
                            stayDurationWeeks
                              ? stayDurationWeeks
                              : numberOfWeeks
                          }
                          selectStyle={DesignCourseSelect}
                        />
                      </div>
                    </div>

                    <div>
                      <ul>
                        {stayDuration?.living?.map((living, index) => {
                          return (
                            <li
                              key={index}
                              className={`flex justify-between gap-2 items-center py-4 ${
                                index > 0 ? "border-t border-t-[#C9C5CA]" : ""
                              } sm:border-t-[1.8px] sm:border-t-[#707070] `}
                            >
                              <div className="flex gap-3">
                                <input
                                  id={`living_${index}`}
                                  name="living_id"
                                  type="radio"
                                  className="p-2 cursor-pointer mt-1"
                                  onChange={(e) => {
                                    setFieldValue("living_id", living.id);
                                    setFieldValue(
                                      "living_price",
                                      living.plan?.[0]?.total_price
                                    );
                                    setFieldValue("living_title", living.key);
                                  }}
                                />
                                <div className="mb-3 ">
                                  <div className="flex items-center gap-3">
                                    <h2
                                      className={`text-base font-medium sm:font-normal sm:text-xl ${
                                        living?.id == values.living_id
                                          ? " text-mainColor"
                                          : ""
                                      }`}
                                    >
                                      {living.key}
                                    </h2>{" "}
                                    {living.note && (
                                      <p className="text-sm sm:text-[15px] bg-mainColor text-white rounded-full px-3 sm:px-5 flex items-center pt-1 pb-0.5 h-7">
                                        {living.note}
                                      </p>
                                    )}
                                  </div>
                                  <p className="text-sm sm:text-[15px] mt-5 flex flex-wrap gap-y-3">
                                    {living.value.split("-")?.map((item) => (
                                      <span
                                        className={cn(
                                          "   py-1.5 rounded-xl  me-2",
                                          {
                                            "px-5 text-center border":
                                              living.value.split("-")
                                                ?.length !== 1,
                                            "border-mainColor text-mainColor":
                                              living?.id == values.living_id,
                                            "border-[#707070]":
                                              living?.id != values.living_id,
                                          }
                                        )}
                                      >
                                        {item}
                                      </span>
                                    ))}
                                  </p>
                                </div>
                              </div>
                              <h2
                                className={`text-[17px] sm:text-xl font-semibold sm:font-normal whitespace-nowrap ${
                                  living?.id == values.living_id
                                    ? " text-mainColor"
                                    : ""
                                }`}
                              >
                                {living.plan.length !== 0
                                  ? Number(
                                      living.plan?.[0]?.total_price
                                    ).toFixed(2)
                                  : "0.00"}
                                <span>
                                  {" "}
                                  {living.plan?.[0]?.unit || t("reyal")}
                                </span>
                              </h2>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className={`${step === 2 ? "block" : "hidden"} sm:block`}>
                  <div className="mb-8 sm:mb-16">
                    <div className="flex items-center justify-between mb-4 sm:mb-12">
                      <div className="flex items-center gap-2">
                        <img
                          src={Car}
                          alt="Car"
                          className="hidden w-16 h-10 sm:block"
                        />
                        <div>
                          <p className="text-lg font-medium sm:font-normal sm:text-xl">
                            {t("Airport pick up")}
                          </p>
                          {data?.pick_up?.[0]?.type ? (
                            <span className="w-fit mt-0.5 text-sm text-[15px] bg-mainColor text-white rounded-full px-3 sm:px-3.5 flex items-center pt-1 pb-1 h-6">
                              {data?.pick_up?.[0]?.type}
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <ul>
                        {data?.pick_up?.map((pick_up, index) => {
                          return (
                            <li
                              key={index}
                              className={`flex justify-between gap-2 items-center py-4 ${
                                index > 0 ? "border-t border-t-[#C9C5CA]" : ""
                              } sm:border-t-[1.8px] sm:border-t-[#707070] `}
                            >
                              <div className="flex gap-3">
                                <input
                                  id={`pick_${index}`}
                                  name="pick_id"
                                  type="radio"
                                  className="p-2 cursor-pointer mt-1"
                                  onChange={(e) => {
                                    setFieldValue("pick_id", pick_up.id);
                                    setFieldValue(
                                      "pick_price",
                                      pick_up.plan?.[0]?.total_price
                                    );
                                    setFieldValue("pick_title", pick_up.key);
                                  }}
                                />
                                <div className="mb-3 ">
                                  <div className="flex items-center gap-3">
                                    <h2
                                      className={`text-base font-medium sm:font-normal sm:text-xl ${
                                        pick_up?.id == values.pick_id
                                          ? " text-mainColor"
                                          : ""
                                      }`}
                                    >
                                      {pick_up.key}
                                    </h2>{" "}
                                    {pick_up.note && (
                                      <span className="text-sm sm:text-[15px] bg-mainColor text-white rounded-full px-3 sm:px-5 flex items-center pt-1 pb-0.5 h-7">
                                        {pick_up.note}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm sm:text-[15px] mt-5 flex flex-wrap gap-y-3">
                                    {pick_up.value.split("-")?.map((item) => (
                                      <span
                                        className={cn(
                                          "   py-1.5 rounded-xl  me-2",
                                          {
                                            "px-5 text-center border":
                                              pick_up.value.split("-")
                                                ?.length !== 1,
                                            "border-mainColor text-mainColor":
                                              pick_up?.id == values.pick_id,
                                            "border-[#707070]":
                                              pick_up?.id != values.pick_id,
                                          }
                                        )}
                                      >
                                        {item}
                                      </span>
                                    ))}
                                  </p>
                                </div>
                              </div>
                              <h2
                                className={`text-[17px] sm:text-xl font-semibold sm:font-normal whitespace-nowrap ${
                                  pick_up?.id == values.pick_id
                                    ? " text-mainColor"
                                    : ""
                                }`}
                              >
                                {pick_up.plan.length !== 0
                                  ? Number(
                                      pick_up.plan?.[0]?.total_price
                                    ).toFixed(2)
                                  : "0.00"}
                                <span>
                                  {" "}
                                  {pick_up.plan?.[0]?.unit || t("reyal")}
                                </span>
                              </h2>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>

                  <div className="mb-8 sm:mb-16">
                    <div className="flex items-center justify-between mb-4 sm:mb-12">
                      <div className="flex items-center gap-2">
                        <img
                          src={StudentMedical}
                          alt="Student Medical"
                          className="hidden w-14 h-14 sm:block"
                        />

                        <div>
                          <p className="text-lg font-medium sm:font-normal sm:text-xl">
                            {t("Student medical insurance")}
                          </p>
                          {data?.medical?.[0]?.type ? (
                            <span className="w-fit mt-0.5 text-sm text-[15px] bg-mainColor text-white rounded-full px-3 sm:px-3.5 flex items-center pt-1 pb-1 h-6">
                              {data?.medical?.[0]?.type || t("optional")}
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <ul>
                        {data?.medical?.map((medical, index) => {
                          return (
                            <li
                              key={index}
                              className={`flex justify-between gap-2 items-center py-4 ${
                                index > 0 ? "border-t border-t-[#C9C5CA]" : ""
                              } sm:border-t-[1.8px] sm:border-t-[#707070] `}
                            >
                              <div className="flex gap-3">
                                <input
                                  id={`medical_${index}`}
                                  name="medical_id"
                                  type="radio"
                                  className="p-2 cursor-pointer mt-1"
                                  onChange={(e) => {
                                    setFieldValue("medical_id", medical.id);
                                    setFieldValue(
                                      "medical_price",
                                      medical.plan?.[0]?.total_price
                                    );
                                    setFieldValue("medical_title", medical.key);
                                  }}
                                />
                                <div className="mb-3 ">
                                  <div className="flex items-center gap-3">
                                    <h2
                                      className={`text-base font-medium sm:font-normal sm:text-xl ${
                                        medical?.id == values.medical_id
                                          ? " text-mainColor"
                                          : ""
                                      }`}
                                    >
                                      {medical.key}
                                    </h2>{" "}
                                    {medical.note && (
                                      <span className="text-sm sm:text-[15px] bg-mainColor text-white rounded-full px-3 sm:px-5 flex items-center pt-1 pb-0.5 h-7">
                                        {medical.note}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm sm:text-[15px] mt-5 flex flex-wrap gap-y-3">
                                    {medical.value.split("-")?.map((item) => (
                                      <span
                                        className={cn(
                                          "   py-1.5 rounded-xl  me-2",
                                          {
                                            "px-5 text-center border":
                                              medical.value.split("-")
                                                ?.length !== 1,
                                            "border-mainColor text-mainColor":
                                              medical?.id == values.medical_id,
                                            "border-[#707070]":
                                              medical?.id != values.medical_id,
                                          }
                                        )}
                                      >
                                        {item}
                                      </span>
                                    ))}
                                  </p>
                                </div>
                              </div>
                              <h2
                                className={`text-[17px] sm:text-xl font-semibold sm:font-normal whitespace-nowrap ${
                                  medical?.id == values.medical_id
                                    ? " text-mainColor"
                                    : ""
                                }`}
                              >
                                {medical.plan.length !== 0
                                  ? Number(
                                      medical.plan?.[0]?.total_price
                                    ).toFixed(2)
                                  : "0.00"}
                                <span>
                                  {" "}
                                  {medical.plan?.[0]?.unit || t("reyal")}
                                </span>
                              </h2>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>

                  <div className="mb-8 sm:mb-16">
                    <div className="flex items-center justify-between mb-4 sm:mb-12">
                      <div className="flex items-center gap-2">
                        <img
                          src={OtherFees}
                          alt="Other Fees"
                          className="hidden w-14 h-14 sm:block"
                        />
                        <div>
                          <p className="text-lg font-medium sm:font-normal sm:text-xl">
                            {t("Other fees")}
                          </p>
                          {data?.other_fees?.[0]?.type ? (
                            <span className="w-fit mt-0.5 text-sm text-[15px] bg-mainColor text-white rounded-full px-3 sm:px-3.5 flex items-center pt-1 pb-1 h-6">
                              {data?.other_fees?.[0]?.type || t("optional")}
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <ul>
                        {data?.other_fees?.map((other_fees, index) => {
                          return (
                            <li
                              key={index}
                              className={`flex justify-between gap-2 items-center py-4 ${
                                index > 0 ? "border-t border-t-[#C9C5CA]" : ""
                              } sm:border-t-[1.8px] sm:border-t-[#707070] `}
                            >
                              <div className="flex gap-3">
                                {/* <input
                                  id={`fees_${index}`}
                                  name="fees_id"
                                  type="checkbox"
                                  className="p-2 cursor-pointer mt-1"
                                  value={other_fees.plan?.[0]?.total_price}
                                  checked
                                /> */}
                                <div className="flex items-center justify-center w-[22.4px] h-[22.4px] bg-mainColor rounded-full ">
                                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                </div>
                                <div className="mb-3 ">
                                  <div className="flex items-center gap-3">
                                    <h2
                                      className={`text-base font-medium sm:font-normal sm:text-xl ${" text-mainColor"}`}
                                    >
                                      <span className="me-2">
                                        {other_fees.key == "fees" ||
                                        other_fees.key == "Christmas"
                                          ? other_fees.value
                                          : other_fees.key}
                                      </span>
                                      {"  "}
                                      {other_fees.key === "fees" ||
                                      other_fees.key === "Christmas" ? (
                                        <span className="text-mainColor">
                                          (
                                          {other_fees.plan.length !== 0
                                            ? Number(
                                                other_fees.plan?.[0]?.base_price
                                              ).toFixed(2)
                                            : "0.00"}
                                          {"  "}
                                          {other_fees.plan?.[0]?.unit}
                                          {"  "}
                                          {other_fees.plan?.[0]?.notes})
                                        </span>
                                      ) : (
                                        <span></span>
                                      )}
                                    </h2>{" "}
                                    {other_fees.note && (
                                      <span className="text-sm sm:text-[15px] bg-mainColor text-white rounded-full px-3 sm:px-5 flex items-center pt-1 pb-0.5 h-7">
                                        {other_fees.note}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm sm:text-[15px] mt-5 flex flex-wrap gap-y-3">
                                    {other_fees.value
                                      .split("-")
                                      ?.map((item) => (
                                        <span
                                          className={cn(
                                            "   py-1.5 rounded-xl  me-2 text-mainColor",
                                            {
                                              "px-5 text-center border":
                                                other_fees.value.split("-")
                                                  ?.length !== 1,
                                              "border-mainColor text-mainColor":
                                                other_fees?.id ==
                                                values.fees_id,
                                              "border-[#707070]":
                                                other_fees?.id !=
                                                values.fees_id,
                                            }
                                          )}
                                        >
                                          {item}
                                        </span>
                                      ))}
                                  </p>
                                </div>
                              </div>
                              <h2
                                className={`text-[17px] sm:text-xl font-semibold sm:font-normal whitespace-nowrap ${" text-mainColor"}`}
                              >
                                {other_fees.plan.length !== 0
                                  ? Number(
                                      other_fees.plan?.[0]?.total_price
                                    ).toFixed(2)
                                  : "0.00"}
                                <span>
                                  {" "}
                                  {other_fees.plan?.[0]?.unit || t("reyal")}
                                </span>
                              </h2>
                            </li>
                          );
                        })}
                      </ul>
                      {/* <ul>
                        {otherFeesSummer?.map((other_fees, index) => {
                          return (
                            <li
                              key={index}
                              className={`flex justify-between gap-2 items-center py-4 ${
                                index > 0 ? "border-t border-t-[#C9C5CA]" : ""
                              } sm:border-t-[1.8px] sm:border-t-[#707070] `}
                            >
                              <div className="flex gap-3">
                                <input
                                  id={`fees_${index}`}
                                  name="feesSummer_id"
                                  type="radio"
                                  className="p-2 cursor-pointer mt-1"
                                  value={other_fees.plan?.[0]?.total_price}
                                  checked={true}
                                />
                                <div className="mb-3 ">
                                  <div className="flex items-center gap-3">
                                    <h2
                                      className={`text-base font-medium sm:font-normal sm:text-xl ${
                                        other_fees?.id == values.feesSummer_id
                                          ? " text-mainColor"
                                          : ""
                                      }`}
                                    >
                                      <span className="me-2">
                                        {other_fees.key == "fees" ||
                                        other_fees.key == "Christmas"
                                          ? other_fees.value
                                          : other_fees.key}
                                      </span>
                                      {"  "}
                                      {other_fees.key === "fees" ||
                                      other_fees.key === "Christmas" ? (
                                        <span className="text-mainColor">
                                          (
                                          {other_fees.plan.length !== 0
                                            ? Number(
                                                other_fees.plan?.[0]?.base_price
                                              ).toFixed(2)
                                            : "0.00"}
                                          {"  "}
                                          {other_fees.plan?.[0]?.unit}
                                          {"  "}
                                          {other_fees.plan?.[0]?.notes})
                                        </span>
                                      ) : (
                                        <span></span>
                                      )}
                                    </h2>{" "}
                                    {other_fees.note && (
                                      <span className="text-sm sm:text-[15px] bg-mainColor text-white rounded-full px-3 sm:px-5 flex items-center pt-1 pb-0.5 h-7">
                                        {other_fees.note}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm sm:text-[15px] mt-5 flex flex-wrap gap-y-3">
                                    {other_fees.value
                                      .split("-")
                                      ?.map((item) => (
                                        <span
                                          className={cn(
                                            "   py-1.5 rounded-xl  me-2",
                                            {
                                              "px-5 text-center border":
                                                other_fees.value.split("-")
                                                  ?.length !== 1,
                                              "border-mainColor text-mainColor":
                                                other_fees?.id ==
                                                values.feesSummer_id,
                                              "border-[#707070]":
                                                other_fees?.id !=
                                                values.feesSummer_id,
                                            }
                                          )}
                                        >
                                          {item}
                                        </span>
                                      ))}
                                  </p>
                                </div>
                              </div>
                              <h2
                                className={`text-[17px] sm:text-xl font-semibold sm:font-normal whitespace-nowrap ${
                                  other_fees?.id == values.feesSummer_id
                                    ? " text-mainColor"
                                    : ""
                                }`}
                              >
                                {other_fees.plan.length !== 0
                                  ? Number(
                                      other_fees.plan?.[0]?.total_price
                                    ).toFixed(2)
                                  : "0.00"}
                                <span>
                                  {" "}
                                  {other_fees.plan?.[0]?.unit || t("reyal")}
                                </span>
                              </h2>
                            </li>
                          );
                        })}
                      </ul> */}
                    </div>
                  </div>
                </div>

                <div
                  className={`mb-8 sm:mb-16 ${
                    step === 3 ? "block" : "hidden"
                  } sm:block`}
                >
                  <div className="flex items-center justify-between mb-4 sm:mb-12">
                    <div className="flex items-center gap-3">
                      <img
                        src={TotalCosts}
                        alt="Total Costs"
                        className="hidden w-14 h-14 sm:block"
                      />
                      <div>
                        <p className="text-lg font-semibold sm:text-xl sm:font-normal mb-1">
                          {t("Total costs")}
                        </p>
                        <p className="bg-mainColor rounded-full w-fit px-4 h-7 flex items-center justify-center text-white text-sm">
                          {t("Saudi Riyal")}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="sm:bg-[#1B0924] sm:text-white sm:rounded-2xl">
                    <div className="flex justify-between items-center border-b border-b-[#707070] p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={GraduationLight}
                          alt="Graduation"
                          className="hidden w-20 h-12 sm:block"
                        />
                        <div>
                          <p className="text-lg font-medium sm:text-xl sm:font-normal ">
                            {t("Courses")}
                          </p>
                          <p className="mt-2 text-sm">
                            {values?.courses_title || ""}
                          </p>
                        </div>
                      </div>
                      <div className="py-2.5 sm:text-xl font-semibold sm:font-normal">
                        {values?.courses_price.toFixed(2) || "0.00"}{" "}
                        {t("reyal")}
                      </div>
                    </div>

                    <div className="flex justify-between items-center border-b border-b-[#707070] p-4">
                      <div className="flex sm:gap-1.5 items-center">
                        <PiHouseLineThin className="hidden w-16 h-14 sm:w-20 sm:h-16 sm:block" />
                        <div>
                          <p className="text-xl font-medium sm:text-xl sm:font-normal">
                            {t("Housing")}
                          </p>
                          <p className="mt-2 text-sm">
                            {values?.living_title || ""}
                          </p>
                        </div>
                      </div>
                      <div className="py-2.5 sm:text-xl font-semibold sm:font-normal">
                        {values?.living_price.toFixed(2) || "0.00"} {t("reyal")}
                      </div>
                    </div>

                    <div className="flex justify-between items-center border-b border-b-[#707070] p-4">
                      <div className="flex gap-3.5 items-center">
                        <img
                          src={CarLight}
                          alt="Car"
                          className="hidden w-16 h-10 sm:w-16 sm:h-12 sm:block"
                        />
                        <div>
                          <p className="text-lg font-medium sm:text-xl sm:font-normal ">
                            {t("Airport pick up")}
                          </p>
                          <p className="mt-2 text-sm">
                            {values?.pick_title || ""}
                          </p>
                        </div>
                      </div>
                      <div className="py-2.5 sm:text-xl font-semibold sm:font-normal">
                        {values.pick_price.toFixed(2) || "0.00"} {t("reyal")}
                      </div>
                    </div>

                    <div className="flex justify-between items-center border-b border-b-[#707070] p-4">
                      <div className="flex gap-3.5 items-center ">
                        <img
                          src={StudentMedicalLight}
                          alt="Student Medical"
                          className="hidden w-14 h-14 sm:block"
                        />
                        <div>
                          <p className="text-lg font-medium sm:text-xl sm:font-normal ">
                            {t("Student medical insurance")}
                          </p>
                          <p className="mt-2 text-sm">
                            {values?.medical_title || ""}
                          </p>
                        </div>
                      </div>
                      <div className="py-2.5 sm:text-xl font-semibold sm:font-normal">
                        {values.medical_price.toFixed(2) || "0.00"} {t("reyal")}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4">
                      <div className="flex gap-3.5 items-center">
                        <img
                          src={OtherFeesLight}
                          alt="Other Fees"
                          className="hidden w-14 h-14 sm:block"
                        />
                        <div>
                          <p className="text-lg font-medium sm:text-xl sm:font-normal ">
                            {t("Other fees")}
                          </p>
                          <p className="mt-2 text-sm">
                            {values?.fees_title || ""}
                          </p>
                        </div>
                      </div>
                      <div className="py-2.5 sm:text-xl font-semibold sm:font-normal">
                        {values.fees_price.toFixed(2) || "0.00"} {t("reyal")}
                      </div>
                    </div>

                    <div className="items-center justify-between hidden px-4 py-3 bg-mainColor rounded-2xl sm:flex">
                      <div className="flex items-center gap-2">
                        <p className="text-xl sm:text-2xl">{t("Total")}</p>
                      </div>
                      <div className="py-2.5 sm:text-xl font-semibold sm:font-normal">
                        {(
                          Number(values.courses_price || 0) +
                          Number(values.living_price || 0) +
                          Number(values.medical_price || 0) +
                          Number(values.pick_price || 0) +
                          Number(values.fees_price || 0)
                        ).toFixed(2)}{" "}
                        {t("reyal")}
                      </div>
                    </div>

                    <div className="bg-[#E8DEFF] sm:hidden block px-4 rounded-2xl">
                      <div className="flex justify-between items-center border-b border-b-[#C9C5CA] py-2.5">
                        <h2 className="font-semibold text-[17px]">
                          {t("Total")}
                        </h2>
                        <div className="py-2.5 font-semibold text-mainColor">
                          {(
                            Number(values.courses_price || 0) +
                            Number(values.living_price || 0) +
                            Number(values.medical_price || 0) +
                            Number(values.pick_price || 0) +
                            Number(values.fees_price || 0)
                          ).toFixed(2)}{" "}
                          {t("reyal")}
                        </div>
                      </div>
                      <div className="flex justify-between items-center border-b border-b-[#C9C5CA] py-2.5">
                        <h2 className="font-semibold text-[17px]">
                          {t("Application fees")}
                        </h2>
                        <div className="py-2.5 font-semibold text-mainColor">
                          11000 {t("reyal")}
                        </div>
                      </div>
                      <div className="flex justify-between items-center py-2.5">
                        <h2 className="font-semibold text-[17px]">
                          {t("The rest will be paid after final acceptance.")}
                        </h2>
                        <div className="py-2.5 font-semibold text-mainColor">
                          11000 {t("reyal")}
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#E8DEFF] sm:hidden block px-4 rounded-2xl mt-5">
                      <div className="flex justify-between items-center py-2.5">
                        <h2 className="font-semibold text-[17px]">
                          {t("Total")}
                        </h2>
                        <div className="py-2.5 font-semibold">
                          11000 {t("reyal")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden w-3/4 p-8 m-auto mt-40 mb-8 text-center text-white sm:block bg-mainColor lg:w-1/2 rounded-2xl">
                  <h2 className="text-7xl">{t("We are with you")}</h2>
                  <p className="w-4/5 m-auto my-8">
                    {t(
                      "We will stay in contact with you and if any problem occurs with the institute, we will solve it, God willing"
                    )}
                  </p>
                  <img src={Utopia} alt="Utopia" className="m-auto" />
                  <p>{t("utopia team")}</p>
                </div>
                <div className="hidden w-3/4 m-auto lg:w-1/2 mb-28 sm:block">
                  <Button
                    action={() => {
                      const total_price =
                        Number(values.courses_price || 0) +
                        Number(values.living_price || 0) +
                        Number(values.medical_price || 0) +
                        Number(values.pick_price || 0) +
                        Number(+values.fees_price || 0);
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
                        total_cost: [
                          {
                            courses_id: {
                              id: values.courses_id,
                              values: values.courses_price,
                            },
                            living_id: {
                              id: values.living_id,
                              values: values.living_price,
                            },
                            pick_id: {
                              id: values.pick_id,
                              values: values.pick_price,
                            },
                            medical_id: {
                              id: values.medical_id,
                              values: values.medical_price,
                            },
                            fees_id: {
                              id: values.fees_id,
                              values: +values.fees_price,
                            },
                          },
                        ],
                        total_price,
                      });
                    }}
                    className="w-full bg-[#1B0924] py-3.5 hover:bg-mainYellow duration-500"
                    loading={isPending}
                  >
                    {t("book now")}
                  </Button>
                </div>

                <Button
                  className="block w-full text-white sm:hidden "
                  loading={isPending}
                  action={() => {
                    const total_price =
                      Number(values.courses_price || 0) +
                      Number(values.living_price || 0) +
                      Number(values.medical_price || 0) +
                      Number(values.pick_price || 0) +
                      Number(values.fees_price || 0);
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
                        total_cost: [
                          {
                            courses_id: {
                              id: values.courses_id,
                              values: values.courses_price,
                            },
                            living_id: {
                              id: values.living_id,
                              values: values.living_price,
                            },
                            pick_id: {
                              id: values.pick_id,
                              values: values.pick_price,
                            },
                            medical_id: {
                              id: values.medical_id,
                              values: values.medical_price,
                            },
                            fees_id: {
                              id: values.fees_id,
                              values: values.fees_price,
                            },
                          },
                        ],
                        total_price,
                      });
                    } else {
                      setStep((prev) => prev + 1);
                    }
                  }}
                >
                  {step === 3 ? `${t("Download quote")}` : `${t("next")}`}
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
