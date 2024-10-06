import { t } from "i18next";
import { useState } from "react";
import { apiRequest } from "../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import { IoLocationOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaArrowRightLong, FaChevronDown } from "react-icons/fa6";
import DownLoadApp from "../../components/atoms/molecules/downLoad-app/DownLoadApp";
import { Form, Formik } from "formik";
import Button from "../../components/atoms/Button/Button";
import BaseSelect from "../../components/atoms/molecules/formik-fields/BaseSelect";
import { StylesConfig, GroupBase } from "react-select";
import { useRTL } from "../../hooks/useRTL";
import "../../../node_modules/react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import State_flag from "../../assets/State_flag.png";
import MainPopup from "../../components/UI/MainPopup";

interface CustomOption {
  label: string;
  value: string;
}

const OwnCoursSelectStyle: StylesConfig<
  CustomOption,
  false,
  GroupBase<CustomOption>
> = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#9F85F3",
    borderRadius: "14px",
    border: "0",
    minHeight: "44px",
    cursor: "pointer",
    padding: "20px 8px",
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
      fontWeight: "500",
      cursor: "pointer",
    };
  },
  singleValue: (provided) => ({
    ...provided,
    color: "white",
    fontWeight: "500",
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
    color: "white",
  }),
};

const DesignYourOwnCourseDetails = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  console.log("🚀 ~ DesignYourOwnCourseDetails ~ isSubmit:", isSubmit);
  const [numberOfWeeks, setNumberOfWeeks] = useState(null);
  console.log(
    "🚀 ~ DesignYourOwnCourseDetails ~ numberOfWeeks:",
    numberOfWeeks
  );
  const [startDate, setStartDate] = useState(null);
  console.log("🚀 ~ DesignYourOwnCourseDetails ~ startDate:", startDate);
  const formattedDate = startDate?.toISOString().split("T")[0];
  const navigate = useNavigate();
  const location = useLocation();
  const isRTL = useRTL();

  const isEnabled =
    !!isSubmit &&
    !!location?.state.city_id &&
    !!numberOfWeeks &&
    !!formattedDate;

  const fetchDesignYourOwnCourseDetails = async () => {
    if (!isEnabled) {
      return null;
    }
    try {
      const data = await apiRequest({
        url: `/api/student/filter-package-by-weeks/${location?.state.city_id}/${numberOfWeeks?.id}/${formattedDate}?per_page=10000`,
        method: "GET",
      });
      return data?.data;
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };

  const { data } = useQuery({
    queryKey: ["design_your_own_course_details", isEnabled],
    queryFn: fetchDesignYourOwnCourseDetails,
    suspense: true,
    enabled: !!isEnabled,
  });
  console.log("🚀 ~ DesignYourOwnCourse ~ data:", data);

  const weekOptions = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    label: i + 1,
    value: i + 1,
  }));

  const isActive = [
    { label: "age group", value: 25 },
    {
      label: "family accommodation",
      value: "active" === "active" ? t("available") : t("unavailable"),
    },
    {
      label: "student accommodation",
      value: "active" === "active" ? t("available") : t("unavailable"),
    },
    {
      label: "general english",
      value: "active" === "active" ? t("available") : t("unavailable"),
    },
    {
      label: "IELTS course",
      value: "active" === "active" ? t("available") : t("unavailable"),
    },
  ];

  const isMonday = (date) => {
    return date.getDay() === 1;
  };

  return (
    <>
      <div className="max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-[90rem] md:px-4 px-4 m-auto">
        <div className="relative block sm:hidden">
          <div className="absolute top-1/2 -translate-y-1/2 ">
            <Link to={"/"}>
              <FaArrowRightLong
                size={22}
                className="mt-4 cursor-pointer justify-self-start"
              />
            </Link>
          </div>
          <h2 className="text-3xl font-medium text-center py-6">
            {t("available institutes")}
          </h2>
        </div>

        <div className="my-16 sm:block hidden">
          {!data?.partners?.length ? (
            <div>
              <h2 className="text-5xl mb-8">{location?.state.city_name}</h2>
              <div>
                <Formik
                  initialValues={{ week: "", start_date: "" }}
                  onSubmit={() => {
                    setIsSubmit(true);
                  }}
                >
                  {({ setFieldValue }) => (
                    <Form className="hidden sm:grid grid-cols-10 gap-4 items-end mt-20 mb-[26rem]">
                      <div className="relative col-span-4">
                        <BaseSelect
                          id="week"
                          name="week"
                          placeholder={t("study duration")}
                          label={t("study duration")}
                          options={weekOptions}
                          onChange={(option) => {
                            setFieldValue("week", option.id);
                            setNumberOfWeeks({
                              id: option.id,
                              label: `${option.label} ${
                                !isRTL ? "A week" : "أســـــــــبوع"
                              }`,
                              value: `${option.value} ${
                                !isRTL ? "A week" : "أســـــــــبوع"
                              }`,
                            });
                          }}
                          className="pt-1.5 w-full text-black text-center"
                          value={numberOfWeeks}
                          selectStyle={OwnCoursSelectStyle}
                        />
                      </div>
                      <div className="col-span-4 relative">
                        <label htmlFor="start_date">
                          {t("study start date")}
                        </label>
                        <DatePicker
                          showIcon
                          id="start_date"
                          className="bg-mainColor pt-1.5 w-full h-[4.7rem] rounded-[14px] border-none relative mt-3"
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          filterDate={isMonday}
                          disabledKeyboardNavigation
                          placeholderText={t("study start date")}
                          icon={<FaChevronDown />}
                        />
                      </div>

                      <Button
                        type="submit"
                        className="col-span-2 h-[4.7rem] rounded-[14px] bg-[#1B0924] text-white text-2xl font-normal"
                      >
                        {t("research")}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          ) : (
            <div>
              <div>
                <h2 className="text-5xl mb-8">{location?.state.city_name}</h2>
                <div className="chooseCourse">
                  <Formik
                    initialValues={{ week: "", start_date: "" }}
                    onSubmit={() => {
                      setIsSubmit(true);
                    }}
                  >
                    <Form className="hidden sm:grid grid-cols-10 gap-3 items-end mt-20 mb-20 md:mb-24">
                      <div className="relative col-span-3 lg:col-span-2">
                        <BaseSelect
                          id="week"
                          name="week"
                          placeholder={t("study duration")}
                          label={t("study duration")}
                          options={weekOptions}
                          // onChange={(option) => {
                          //   setNumberOfWeeks({
                          //     id: option.id,
                          //     label: `${option.label} ${
                          //       !isRTL ? "A week" : "أســـــــــبوع"
                          //     }`,
                          //     value: `${option.value} ${
                          //       !isRTL ? "A week" : "أســـــــــبوع"
                          //     }`,
                          //   });
                          // }}
                          className="pt-1.5 w-full text-black text-center"
                          value={numberOfWeeks}
                          disabled
                        />
                      </div>
                      <div className="col-span-4 lg:col-span-3 relative">
                        <label htmlFor="start_date">
                          {t("study start date")}
                        </label>
                        <DatePicker
                          showIcon
                          id="start_date"
                          className="pt-1.5 w-full h-[3.4rem] rounded-[14px] relative mt-3 border-1 border-[#C9C5CA]"
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          filterDate={isMonday}
                          disabledKeyboardNavigation
                          placeholderText={t("study start date")}
                          icon={<FaChevronDown />}
                          disabled
                        />
                      </div>

                      {/* <Button
                          type="submit"
                          className="col-span-1 w-44 h-[3.4rem] rounded-[14px] bg-[#1B0924] text-white text-xl font-normal"
                        >
                          {t("research")}
                        </Button> */}
                    </Form>
                  </Formik>
                </div>

                <div>
                  {data?.partners.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-10 mb-28 gap-y-8 gap-x-4"
                    >
                      <div
                        className={`col-span-5 lg:col-span-4 ${
                          index % 2 !== 0 ? "order-2" : "order-1"
                        }`}
                      >
                        <div className="w-full">
                          <img
                            src={item.image}
                            alt="own details"
                            className="rounded-2xl overflow-hidden h-60 w-full"
                          />
                        </div>
                        <ul className="flex justify-between items-center mt-5 mb-0.5">
                          {["معتمد", "أنشطة متنوعة", "يقع في وسط المدينة"].map(
                            (list, idx) => (
                              <li
                                key={idx}
                                className={`px-3 lg:px-5 py-1.5 rounded-xl text-[15px] ${
                                  idx === 0
                                    ? "bg-mainColor"
                                    : idx === 1
                                    ? "bg-[#FFB6BF]"
                                    : "bg-[#FACC1F]"
                                }`}
                              >
                                {list}
                              </li>
                            )
                          )}
                        </ul>

                        <div className="hidden sm:flex justify-between items-center gap-1 sm:gap-2 pt-5">
                          {isActive?.map((item, index) => (
                            <div
                              key={index}
                              className="border border-[#C9C5CA] sm:border-none text-center px-2 sm:px-0 rounded-2xl"
                            >
                              <h2 className="lg:text-[15px]">
                                {t(item.label)}
                              </h2>
                              <p className="sm:border border-[#707070] py-1 rounded-lg text-center mt-2 text-[15px] text-mainColor sm:text-black">
                                {item.value}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div
                        className={`bg-mainColor rounded-2xl col-span-5 lg:col-span-6 ps-10 lg:ps-16 py-12 lg:py-16 relative ${
                          index % 2 !== 0 ? "order-1" : "order-2"
                        }`}
                      >
                        <div className="flex gap-20">
                          <div>
                            <h2 className="text-white text-2xl">
                              {item.partner_name}
                            </h2>
                            <p className="text-white text-base lg:text-lg my-14 w-3/4">
                              {item.desc}
                            </p>
                          </div>
                          <img
                            src={State_flag}
                            alt="state flag"
                            className="w-[100px] h-[100px] lg:w-32 lg:h-32 rounded-full absolute left-6 top-9 lg:top-12"
                          />
                        </div>
                        <div className="flex gap-3">
                          <Button
                            className="bg-white text-[#1B0924]"
                            action={() =>
                              navigate("/designCourse/register", {
                                state: {
                                  id: item.id,
                                  numberOfWeeks: data?.numberOfWeeks,
                                  startDate: data?.start_date,
                                },
                              })
                            }
                          >
                            {t("register now")}
                          </Button>
                          <div className="bg-[#1B0924] text-white rounded-xl px-6 py-1.5">
                            {item.price} SAR
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="my-5 sm:hidden block">
          <div>
            {!data?.partners?.length ? (
              <div className="chooseCourse mt-12">
                <Formik
                  initialValues={{ week: "", start_date: "" }}
                  onSubmit={() => {
                    setIsSubmit(true);
                  }}
                >
                  <Form className="grid grid-cols-1 gap-3 items-end mb-24">
                    <div className="relative">
                      <BaseSelect
                        id="week"
                        name="week"
                        placeholder={t("study duration")}
                        label={t("study duration")}
                        options={weekOptions}
                        onChange={(option) => {
                          setNumberOfWeeks({
                            id: option.id,
                            label: `${option.label} ${
                              !isRTL ? "A week" : "أســـــــــبوع"
                            }`,
                            value: `${option.value} ${
                              !isRTL ? "A week" : "أســـــــــبوع"
                            }`,
                          });
                        }}
                        className="pt-1.5 w-full text-black text-center"
                        value={numberOfWeeks}
                      />
                    </div>
                    <div className="relative">
                      <label htmlFor="start_date">
                        {t("study start date")}
                      </label>
                      <DatePicker
                        autoComplete="off"
                        showIcon
                        id="start_date"
                        className="pt-1.5 w-full h-[3.4rem] rounded-[14px] relative mt-3 border-1 border-[#C9C5CA]"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        filterDate={isMonday}
                        disabledKeyboardNavigation
                        placeholderText={t("study start date")}
                        withPortal
                        portalId="root-portal"
                        icon={<FaChevronDown />}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="col-span-1 w-full mt-4 h-[3.4rem] rounded-[14px] bg-[#1B0924] text-white text-xl font-normal"
                    >
                      {t("research")}
                    </Button>
                  </Form>
                </Formik>
              </div>
            ) : (
              <div>
                <div className="border-2 mb-10 text-lg sm:text-xl text-mainColor font-medium border-mainColor w-fit px-5 sm:px-8 py-3 rounded-2xl m-auto">
                  {data?.city} - {numberOfWeeks?.id} {t("اسابيع")} -{" "}
                  {formattedDate}
                </div>
                {data?.partners.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      navigate("/designCourse/register", {
                        state: {
                          id: item.id,
                          numberOfWeeks: data?.numberOfWeeks,
                          startDate: data?.start_date,
                        },
                      })
                    }}
                  >
                    <div className="flex shadow-card rounded-2xl overflow-hidden mb-8 h-40 cursor-pointer group">
                      <div className="rounded-2xl overflow-hidden h-40 w-[800px] sm:w-[550px]">
                        <img
                          src={item.image}
                          alt="choose course"
                          className="h-full w-full group-hover:scale-[1.03] duration-300"
                        />
                      </div>
                      <div className="px-4 py-4">
                        <h2 className="text-lg sm:text-xl font-semibold">
                          {item.partner_name}
                        </h2>
                        <p className="my-3 text-[15px] sm:text-base overflow-hidden text-ellipsis line-clamp-2">
                          {item.desc}
                        </p>
                        <p className="text-mainColor text-xl text-end w-full font-semibold">
                          {item.price} SAR
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <DownLoadApp />
      </div>
    </>
  );
};

export default DesignYourOwnCourseDetails;
