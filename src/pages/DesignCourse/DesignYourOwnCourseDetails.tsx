import { t } from "i18next";
import { useEffect, useRef, useState } from "react";
import { apiRequest } from "../../utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IoLocationOutline } from "react-icons/io5";
import {
  Link,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
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
import Loading from "../../components/Global/Loading/Loading";
import { useAuth } from "../../context/AuthContext";
import { ar } from "date-fns/locale";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import RegisterForm from "../../components/(auth)/Register/RegisterForm";
import RegisterOtp from "../../components/(auth)/Register/VerificationCode";
import logo from "../../assets/logo-footer.svg";
import { toast } from "react-toastify";

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
      backgroundColor = "#9F85F3";
      color = "white";
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
    color: "#9F85F3",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "white",
  }),
};

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

const DesignYourOwnCourseDetails = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const { user } = useAuth();
  const isRTL = useRTL();

  const swiperRef = useRef([]);
  const [registerNow, setRegisterNow] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [courseDetails, setCourseDetails] = useState(
    JSON.parse(localStorage.getItem("courseDetails")) || null
  );
  const [startDate, setStartDate] = useState(null);

  const [numberOfWeeks, setNumberOfWeeks] = useState(
    courseDetails?.weeksId
      ? {
          id: courseDetails.weeksId,
          label: `${courseDetails.weeksId} ${
            !isRTL ? "A week" : "أســـــــــبوع"
          }`,
          value: `${courseDetails.weeksId} ${
            !isRTL ? "A week" : "أســـــــــبوع"
          }`,
        }
      : null
  );
  const navigate = useNavigate();
  const location = useLocation();
  const [userId, setUserId] = useState(null);
  const [fcmToken, setFcmToken] = useState(null);
  const [steps, setSteps] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const handlePopState = (event) => {
      localStorage.removeItem("courseDetails");
    };

    window.onpopstate = handlePopState;
  }, []);

  const isEnabled =
    !!courseDetails?.cityId &&
    !!courseDetails?.weeksId &&
    !!courseDetails?.formattedDate;

  const fetchDesignYourOwnCourseDetails = async () => {
    if (!isEnabled) {
      return null;
    }
    try {
      const data = await apiRequest({
        url: `/api/student/filter-package-by-weeks/${courseDetails?.cityId}/${courseDetails?.weeksId}/${courseDetails?.formattedDate}?per_page=10000`,
        method: "GET",
      });
      return data?.data;
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };

  const { data, isFetching, refetch, isRefetching, isLoading } = useQuery({
    queryKey: [
      "design_your_own_course_details",
      courseDetails?.cityId,
      courseDetails?.weeksId,
      courseDetails?.formattedDate,
    ],
    queryFn: fetchDesignYourOwnCourseDetails,
    suspense: true,
    enabled: isEnabled,
  });

  const weekOptions = Array.from({ length: 47 }, (_, i) => i + 2).map(
    (num) => ({
      id: num,
      label: `${num} ${!isRTL ? "A week" : "أســـــــــبوع"}`,
      value: `${num} ${!isRTL ? "A week" : "أســـــــــبوع"}`,
    })
  );

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSlideChange = (swiper, index) => {
    if (swiper.activeIndex === index) {
      setCurrentIndex(swiper.activeIndex);
    }
  };

  const handleNextSlide = (index) => {
    if (swiperRef.current[index]) {
      swiperRef.current[index].slideNext();
    }
  };

  const handlePrevSlide = (index) => {
    if (swiperRef.current[index]) {
      swiperRef.current[index].slidePrev();
    }
  };

  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ["student-signup"],
    mutationFn: (data) => signupPost(data),
    onSuccess: (data) => {
      setUserId(data?.user_id);
      setSteps(2);
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

  if (isFetching || isRefetching || isLoading) return <Loading />;

  return (
    <div>
      {steps === 0 && (
        <>
          <div className="max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-[80rem] md:px-4 px-4 m-auto">
            <div className="relative block sm:hidden">
              <div className="absolute -translate-y-1/2 top-1/2 ">
                <div onClick={() => navigate(-1)}>
                  <FaArrowRightLong
                    size={22}
                    className="cursor-pointer justify-self-start"
                  />
                </div>
              </div>
              <h2 className="py-6 text-xl font-semibold text-center">
                {t("available institutes")}
              </h2>
            </div>

            <div className="hidden my-16 sm:block">
              {!!!data?.partners?.length ? (
                <div>
                  <h2 className="mb-8 text-5xl">
                    {location?.state?.city_name}
                  </h2>
                  <div>
                    <Formik
                      initialValues={{ week: "", start_date: "" }}
                      onSubmit={(value) => {
                        localStorage.setItem(
                          "courseDetails",
                          JSON.stringify({
                            cityId: location?.state.city_id,
                            weeksId: value.week,
                            formattedDate: value.start_date,
                          })
                        );
                        setCourseDetails({
                          cityId: location?.state.city_id,
                          weeksId: value.week,
                          formattedDate: value.start_date,
                        });
                      }}
                    >
                      {({ setFieldValue }) => (
                        <Form className="hidden sm:grid grid-cols-10 gap-4 items-end mt-20 mb-[26rem]">
                          <div className="relative col-span-4">
                            <BaseSelect
                              id="week"
                              name="week"
                              placeholder={t("study duration")}
                              options={weekOptions}
                              onChange={(option) => {
                                setFieldValue("week", option.id);
                                setNumberOfWeeks({
                                  id: option.id,
                                  label: `${option.label}`,
                                  value: `${option.value}`,
                                });
                              }}
                              className="pt-1.5 w-full text-black text-center"
                              value={numberOfWeeks}
                              selectStyle={OwnCoursSelectStyle}
                            />
                          </div>
                          <div className="relative col-span-4">
                            <DatePicker
                              showIcon
                              id="start_date"
                              className="bg-mainColor pt-1.5 w-full h-[4.7rem] rounded-[14px] border-none relative mt-3"
                              selected={startDate}
                              onChange={(date) => {
                                setStartDate(date);
                                const formatdDate = date
                                  ?.toISOString()
                                  .split("T")[0];
                                setFieldValue("start_date", formatdDate);
                              }}
                              dateFormat="d MMMM yyyy"
                              locale={ar}
                              filterDate={isMonday}
                              minDate={new Date()}
                              disabledKeyboardNavigation
                              placeholderText={t("study start date")}
                              icon={<FaChevronDown />}
                            />
                          </div>

                          <Button
                            type="submit"
                            className="col-span-2 h-[4.7rem] hover:bg-[#FACC1F] duration-300 rounded-[14px] bg-[#1B0924] text-white text-2xl font-normal"
                            loading={isLoading}
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
                    <h2 className="mb-8 text-5xl">
                      {location?.state.city_name}
                    </h2>
                    <div className="chooseCourse">
                      <Formik
                        initialValues={{
                          week: "",
                          start_date: data?.start_date || "",
                        }}
                        onSubmit={(value) => {
                          setRegisterNow(true);
                          setCourseDetails({
                            cityId: location?.state.city_id,
                            weeksId: value.week
                              ? value.week
                              : courseDetails?.weeksId,
                            formattedDate: !!value.start_date
                              ? value.start_date
                              : data?.start_date,
                          });
                          localStorage.setItem(
                            "courseDetails",
                            JSON.stringify({
                              cityId: location?.state.city_id,
                              weeksId: value.week
                                ? value.week
                                : courseDetails?.weeksId,
                              formattedDate: !!value.start_date
                                ? value.start_date
                                : data?.start_date,
                            })
                          );

                          refetch();
                        }}
                      >
                        {({ setFieldValue }) => {
                          return (
                            <Form className="items-end hidden grid-cols-10 gap-3 mt-20 mb-20 sm:grid md:mb-24">
                              <div className="relative col-span-3 lg:col-span-2">
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
                                      label: `${option.label} `,
                                      value: `${option.value} `,
                                    });
                                  }}
                                  className="pt-1.5 w-full text-black text-center"
                                  value={numberOfWeeks}
                                  // disabled
                                />
                              </div>
                              <div className="relative col-span-4 lg:col-span-3">
                                <label htmlFor="start_date">
                                  {t("study start date")}
                                </label>
                                <DatePicker
                                  showIcon
                                  id="start_date"
                                  className="pt-1.5 w-full h-[3.4rem] rounded-[14px] relative mt-3 border-1 border-[#C9C5CA]"
                                  selected={startDate}
                                  onChange={(date) => {
                                    setStartDate(date);
                                    const formatdDate = date
                                      ?.toISOString()
                                      .split("T")[0];
                                    setFieldValue("start_date", formatdDate);
                                  }}
                                  dateFormat="d MMMM yyyy"
                                  locale={ar}
                                  filterDate={isMonday}
                                  minDate={new Date()}
                                  disabledKeyboardNavigation
                                  placeholderText={t("study start date")}
                                  icon={<FaChevronDown />}
                                  // disabled
                                />
                              </div>

                              <Button
                                type="submit"
                                className="col-span-1 w-44 h-[3.4rem] rounded-[14px] hover:bg-[#FACC1F] duration-300 bg-[#1B0924] text-white text-xl font-normal"
                              >
                                {t("research")}
                              </Button>
                            </Form>
                          );
                        }}
                      </Formik>
                    </div>

                    <div>
                      {data?.partners.map((item, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-1 md:grid-cols-10 mb-28 gap-y-8 gap-x-4"
                        >
                          <div
                            className={`col-span-5 lg:col-span-4 h-full  ${
                              index % 2 !== 0 ? "order-2" : "order-1"
                            }`}
                          >
                            <div className="w-full relative z-0">
                              <Swiper
                                slidesPerView={1}
                                spaceBetween={0}
                                onSlideChange={(swiper) =>
                                  handleSlideChange(swiper, index)
                                }
                                onSwiper={(swiper) =>
                                  (swiperRef.current[index] = swiper)
                                }
                                loop={true}
                                speed={1800}
                                pagination={{
                                  clickable: true,
                                }}
                                modules={[Pagination, Navigation]}
                              >
                                <>
                                  {item?.images.map((item, index) => (
                                    <SwiperSlide key={index}>
                                      <img
                                        src={item?.image}
                                        className="w-full overflow-hidden rounded-2xl h-[300px] object-cover"
                                      />
                                    </SwiperSlide>
                                  ))}
                                </>
                              </Swiper>

                              <div className="w-full hidden md:flex items-center justify-between absolute top-1/2 -translate-y-1/2 left-0 right-0 z-50">
                                <div
                                  className={`w-7 h-7 flex items-center justify-center text-white font-semibold text-xl rounded-full bg-mainColor cursor-pointer `}
                                  onClick={() => handlePrevSlide(index)}
                                >
                                  <HiChevronRight />
                                </div>
                                <div
                                  className={`w-7 h-7 flex items-center justify-center text-white font-semibold text-xl rounded-full bg-mainColor cursor-pointer `}
                                  onClick={() => handleNextSlide(index)}
                                >
                                  <HiChevronLeft />
                                </div>
                              </div>
                            </div>
                            <div className="pt-2">
                              <ul className="flex justify-between items-center mt-5 mb-0.5">
                                {[
                                  "معتمد",
                                  "أنشطة متنوعة",
                                  "يقع في وسط المدينة",
                                ].map((list, idx) => (
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
                                ))}
                              </ul>

                              <div className="items-center justify-between hidden gap-1 pt-5 sm:flex sm:gap-2">
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
                          </div>
                          <div
                            className={`bg-mainColor rounded-2xl col-span-5 lg:col-span-6 ps-10 lg:ps-16 py-12 lg:py-16 relative ${
                              index % 2 !== 0 ? "order-1" : "order-2"
                            }`}
                          >
                            <div className="flex gap-20">
                              <div>
                                <h2 className="text-2xl text-white">
                                  {item.partner_name}
                                </h2>
                                <p
                                  className="w-3/4 text-base text-white lg:text-lg mt-14 mb-12 text-ellipsis max-h-48 overflow-hidden"
                                  style={{
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: 6,
                                  }}
                                >
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
                                className="bg-white text-[#1B0924] hover:bg-mainYellow duration-500"
                                action={() => {
                                  if (user) {
                                    navigate("/designCourse/register", {
                                      state: {
                                        id: item.id,
                                        numberOfWeeks: data?.numberOfWeeks,
                                        startDate: data?.start_date,
                                        amount: item.price,
                                        user_id: user ? user.id : null,
                                      },
                                    });
                                    localStorage.removeItem("courseDetails");
                                  } else {
                                    setSelectedCourse({
                                      id: item.id,
                                      numberOfWeeks: data?.numberOfWeeks,
                                      startDate: data?.start_date,
                                      amount: item.price,
                                      user_id: user ? user.id : null,
                                    });
                                    setSteps(1);
                                  }
                                }}
                              >
                                {t("Register now")}
                              </Button>
                              <div className="bg-[#1B0924] text-white rounded-xl px-6 pt-2.5">
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

            {/* MOBILE */}
            <div className="block my-5 sm:hidden">
              <div>
                {!data?.partners?.length ? (
                  <div className="mt-12 chooseCourse">
                    <Formik
                      initialValues={{ week: "", start_date: "" }}
                      onSubmit={(values) => {
                        setIsSubmit(true);
                        setCourseDetails({
                          cityId: location?.state.city_id,
                          weeksId: values.week,
                          formattedDate: values.start_date,
                        });
                      }}
                    >
                      {({ setFieldValue }) => (
                        <Form className="grid items-end grid-cols-1 gap-3 mb-24">
                          <div className="relative">
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
                                  label: `${option.label}`,
                                  value: `${option.value}`,
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
                              onChange={(date) => {
                                setStartDate(date);
                                const formatdDate = date
                                  ?.toISOString()
                                  .split("T")[0];
                                setFieldValue("start_date", formatdDate);
                              }}
                              dateFormat="d MMMM yyyy"
                              locale={ar}
                              filterDate={isMonday}
                              minDate={new Date()}
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
                      )}
                    </Formik>
                  </div>
                ) : (
                  <div>
                    <div className="px-5 py-3 m-auto mb-10 text-lg font-medium border-2 sm:text-xl text-mainColor border-mainColor w-fit sm:px-8 rounded-2xl">
                      {data?.city} - {numberOfWeeks?.id} {t("اسابيع")} -{" "}
                      {courseDetails?.formattedDate}
                    </div>
                    {data?.partners.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          if (user) {
                            navigate("/designCourse/register", {
                              state: {
                                id: item.id,
                                numberOfWeeks: data?.numberOfWeeks,
                                startDate: data?.start_date,
                                amount: item.price,
                                user_id: user ? user.id : null,
                              },
                            });
                            localStorage.removeItem("courseDetails");
                          } else {
                            setSelectedCourse({
                              id: item.id,
                              numberOfWeeks: data?.numberOfWeeks,
                              startDate: data?.start_date,
                              amount: item.price,
                              user_id: user ? user.id : null,
                            });
                            setSteps(1);
                          }
                        }}
                      >
                        <div className="flex h-40 mb-8 overflow-hidden cursor-pointer shadow-card rounded-2xl group">
                          <div className="rounded-2xl overflow-hidden h-40 w-[800px] sm:w-[550px]">
                            <img
                              src={item.image}
                              alt="choose course"
                              className="h-full w-full group-hover:scale-[1.03] duration-300"
                            />
                          </div>
                          <div className="px-4 py-4">
                            <h2 className="text-lg font-semibold sm:text-xl">
                              {item.partner_name}
                            </h2>
                            <p className="my-3 text-[15px] sm:text-base overflow-hidden text-ellipsis line-clamp-2">
                              {item.desc}
                            </p>
                            <p className="w-full text-xl font-semibold text-mainColor text-end">
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
      )}

      <Formik
        initialValues={{
          user_id: "",
          plan_id: "",
          week: "",
          start_date: "",
        }}
        onSubmit={() => {}}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              {steps === 1 && (
                <RegisterForm
                  handleSubmit={handleSubmit}
                  isPending={isPending}
                />
              )}

              {steps === 2 && (
                <RegisterOtp
                  userId={userId}
                  setStep={setSteps}
                  selectedCourse={selectedCourse}
                />
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default DesignYourOwnCourseDetails;

// #################################################################################

// import { t } from "i18next";
// import { useEffect, useRef, useState } from "react";
// import { apiRequest } from "../../utils/axios";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { IoLocationOutline } from "react-icons/io5";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { FaArrowRightLong, FaChevronDown } from "react-icons/fa6";
// import DownLoadApp from "../../components/atoms/molecules/downLoad-app/DownLoadApp";
// import { Form, Formik } from "formik";
// import Button from "../../components/atoms/Button/Button";
// import BaseSelect from "../../components/atoms/molecules/formik-fields/BaseSelect";
// import { StylesConfig, GroupBase } from "react-select";
// import { useRTL } from "../../hooks/useRTL";
// import "../../../node_modules/react-datepicker/dist/react-datepicker.css";
// import DatePicker from "react-datepicker";
// import State_flag from "../../assets/State_flag.png";
// import MainPopup from "../../components/UI/MainPopup";
// import Loading from "../../components/Global/Loading/Loading";
// import { useAuth } from "../../context/AuthContext";
// import { ar } from "date-fns/locale";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Pagination, Navigation } from "swiper/modules";
// import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

// interface CustomOption {
//   label: string;
//   value: string;
// }

// const OwnCoursSelectStyle: StylesConfig<
//   CustomOption,
//   false,
//   GroupBase<CustomOption>
// > = {
//   control: (provided) => ({
//     ...provided,
//     backgroundColor: "#9F85F3",
//     borderRadius: "14px",
//     border: "0",
//     minHeight: "44px",
//     cursor: "pointer",
//     padding: "20px 8px",
//   }),
//   option: (provided, state) => {
//     let backgroundColor = "";
//     let color = "";
//     if (state.isSelected) {
//       backgroundColor = "#9F85F3";
//       color = "white";
//     } else if (state.isFocused) {
//       backgroundColor = "#9F85F3";
//       color = "white";
//     }

//     return {
//       ...provided,
//       backgroundColor,
//       color,
//       fontWeight: "500",
//       cursor: "pointer",
//     };
//   },
//   singleValue: (provided) => ({
//     ...provided,
//     color: "white",
//     fontWeight: "500",
//   }),
//   valueContainer: (provided) => ({
//     ...provided,
//     whiteSpace: "nowrap",
//   }),
//   menu: (provided) => ({
//     ...provided,
//     borderRadius: "10px",
//     boxShadow: "0px 4px 4px 0px #ddd",
//     backgroundColor: "#E6EAEE",
//   }),
//   loadingIndicator: (provided) => ({
//     ...provided,
//     color: "#9F85F3",
//   }),
//   placeholder: (provided) => ({
//     ...provided,
//     color: "white",
//   }),
// };

// const DesignYourOwnCourseDetails = () => {
//   const [isSubmit, setIsSubmit] = useState(false);
//   const { user } = useAuth();
//   const [numberOfWeeks, setNumberOfWeeks] = useState(null);
//   const [startDate, setStartDate] = useState(null);
//   const swiperRef = useRef(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const formattedDate = startDate?.toISOString().split("T")[0];
//   const [courseDetails, setCourseDetails] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const isRTL = useRTL();

//   const isEnabled =
//     courseDetails?.cityId &&
//     courseDetails?.weeksId &&
//     courseDetails?.formattedDate;

//   const fetchDesignYourOwnCourseDetails = async () => {
//     if (!isEnabled) {
//       return null;
//     }
//     try {
//       const data = await apiRequest({
//         url: `/api/student/filter-package-by-weeks/${courseDetails?.cityId}/${courseDetails?.weeksId}/${courseDetails?.formattedDate}?per_page=10000`,
//         method: "GET",
//       });
//       return data?.data;
//     } catch (error) {
//       console.error("Error fetching items:", error.message);
//     }
//   };

//   const { data, isFetching, refetch, isRefetching, isLoading } = useQuery({
//     queryKey: ["design_your_own_course_details", isEnabled],
//     queryFn: fetchDesignYourOwnCourseDetails,
//     suspense: true,
//     enabled: !!isEnabled,
//   });
//   console.log("🚀 ~ DesignYourOwnCourse ~ data:", data);

//   const weekOptions = Array.from({ length: 47 }, (_, i) => i + 2).map(
//     (num) => ({
//       id: num,
//       label: `${num} ${!isRTL ? "A week" : "أســـــــــبوع"}`,
//       value: `${num} ${!isRTL ? "A week" : "أســـــــــبوع"}`,
//     })
//   );

//   const isActive = [
//     { label: "age group", value: 25 },
//     {
//       label: "family accommodation",
//       value: "active" === "active" ? t("available") : t("unavailable"),
//     },
//     {
//       label: "student accommodation",
//       value: "active" === "active" ? t("available") : t("unavailable"),
//     },
//     {
//       label: "general english",
//       value: "active" === "active" ? t("available") : t("unavailable"),
//     },
//     {
//       label: "IELTS course",
//       value: "active" === "active" ? t("available") : t("unavailable"),
//     },
//   ];

//   const isMonday = (date) => {
//     return date.getDay() === 1;
//   };

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const handleSlideChange = (swiper) => {
//     setCurrentIndex(swiper.activeIndex);
//   };

//   const handleNextSlide = () => {
//     if (swiperRef.current) {
//       swiperRef.current.slideNext();
//     }
//   };

//   const handlePrevSlide = () => {
//     if (swiperRef.current) {
//       swiperRef.current.slidePrev();
//     }
//   };

//   if (isFetching || isRefetching || isLoading) return <Loading />;

//   return (
//     <>
//       <div className="max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-[80rem] md:px-4 px-4 m-auto">
//         <div className="relative block sm:hidden">
//           <div className="absolute -translate-y-1/2 top-1/2 ">
//             <div onClick={() => navigate(-1)}>
//               <FaArrowRightLong
//                 size={22}
//                 className="cursor-pointer justify-self-start"
//               />
//             </div>
//           </div>
//           <h2 className="py-6 text-xl font-semibold text-center">
//             {t("available institutes")}
//           </h2>
//         </div>

//         <div className="hidden my-16 sm:block">
//           {!!!data?.partners?.length ? (
//             <div>
//               <h2 className="mb-8 text-5xl">{location?.state.city_name}</h2>
//               <div>
//                 <Formik
//                   initialValues={{ week: "", start_date: "" }}
//                   onSubmit={(value) => {
//                     setCourseDetails({
//                       cityId: location?.state.city_id,
//                       weeksId: value.week,
//                       formattedDate: value.start_date,
//                     });
//                   }}
//                 >
//                   {({ setFieldValue }) => (
//                     <Form className="hidden sm:grid grid-cols-10 gap-4 items-end mt-20 mb-[26rem]">
//                       <div className="relative col-span-4">
//                         <BaseSelect
//                           id="week"
//                           name="week"
//                           placeholder={t("study duration")}
//                           // label={t("study duration")}
//                           options={weekOptions}
//                           onChange={(option) => {
//                             setFieldValue("week", option.id);
//                             setNumberOfWeeks({
//                               id: option.id,
//                               label: `${option.label}`,
//                               value: `${option.value}`,
//                             });
//                           }}
//                           className="pt-1.5 w-full text-black text-center"
//                           value={numberOfWeeks}
//                           selectStyle={OwnCoursSelectStyle}
//                         />
//                       </div>
//                       <div className="relative col-span-4">
//                         {/* <label htmlFor="start_date">
//                           {t("study start date")}
//                         </label> */}
//                         <DatePicker
//                           showIcon
//                           id="start_date"
//                           className="bg-mainColor pt-1.5 w-full h-[4.7rem] rounded-[14px] border-none relative mt-3"
//                           selected={startDate}
//                           onChange={(date) => {
//                             setStartDate(date);
//                             const formatdDate = date
//                               ?.toISOString()
//                               .split("T")[0];
//                             setFieldValue("start_date", formatdDate);
//                           }}
//                           dateFormat="d MMMM yyyy"
//                           locale={ar}
//                           filterDate={isMonday}
//                           disabledKeyboardNavigation
//                           placeholderText={t("study start date")}
//                           icon={<FaChevronDown />}
//                         />
//                       </div>

//                       <Button
//                         type="submit"
//                         className="col-span-2 h-[4.7rem] hover:bg-[#FACC1F] duration-300 rounded-[14px] bg-[#1B0924] text-white text-2xl font-normal"
//                         loading={isLoading}
//                       >
//                         {t("research")}
//                       </Button>
//                     </Form>
//                   )}
//                 </Formik>
//               </div>
//             </div>
//           ) : (
//             <div>
//               <div>
//                 <h2 className="mb-8 text-5xl">{location?.state.city_name}</h2>
//                 <div className="chooseCourse">
//                   <Formik
//                     initialValues={{ week: "", start_date: "" }}
//                     onSubmit={(value) => {
//                       setCourseDetails({
//                         cityId: location?.state.city_id,
//                         weeksId: value.week,
//                         formattedDate: value.start_date,
//                       });
//                     }}
//                   >
//                     {({ setFieldValue }) => {
//                       return (
//                         <Form className="items-end hidden grid-cols-10 gap-3 mt-20 mb-20 sm:grid md:mb-24">
//                           <div className="relative col-span-3 lg:col-span-2">
//                             <BaseSelect
//                               id="week"
//                               name="week"
//                               placeholder={t("study duration")}
//                               label={t("study duration")}
//                               options={weekOptions}
//                               onChange={(option) => {
//                                 setFieldValue("week", option.id);
//                                 setNumberOfWeeks({
//                                   id: option.id,
//                                   label: `${option.label} ${
//                                     !isRTL ? "A week" : "أســـــــــبوع"
//                                   }`,
//                                   value: `${option.value} ${
//                                     !isRTL ? "A week" : "أســـــــــبوع"
//                                   }`,
//                                 });
//                               }}
//                               className="pt-1.5 w-full text-black text-center"
//                               value={numberOfWeeks}
//                               // disabled
//                             />
//                           </div>
//                           <div className="relative col-span-4 lg:col-span-3">
//                             <label htmlFor="start_date">
//                               {t("study start date")}
//                             </label>
//                             <DatePicker
//                               showIcon
//                               id="start_date"
//                               className="pt-1.5 w-full h-[3.4rem] rounded-[14px] relative mt-3 border-1 border-[#C9C5CA]"
//                               selected={startDate}
//                               onChange={(date) => {
//                                 setStartDate(date);
//                                 const formatdDate = date
//                                   ?.toISOString()
//                                   .split("T")[0];
//                                 setFieldValue("start_date", formatdDate);
//                               }}
//                               dateFormat="d MMMM yyyy"
//                               locale={ar}
//                               filterDate={isMonday}
//                               disabledKeyboardNavigation
//                               placeholderText={t("study start date")}
//                               icon={<FaChevronDown />}
//                               // disabled
//                             />
//                           </div>

//                           <Button
//                             type="submit"
//                             className="col-span-1 w-44 h-[3.4rem] rounded-[14px] hover:bg-[#FACC1F] duration-300 bg-[#1B0924] text-white text-xl font-normal"
//                           >
//                             {t("research")}
//                           </Button>
//                         </Form>
//                       );
//                     }}
//                   </Formik>
//                 </div>

//                 <div>
//                   {data?.partners.map((item, index) => (
//                     <div
//                       key={index}
//                       className="grid grid-cols-1 md:grid-cols-10 mb-28 gap-y-8 gap-x-4"
//                     >
//                       <div
//                         className={`col-span-5 lg:col-span-4 h-full  ${
//                           index % 2 !== 0 ? "order-2" : "order-1"
//                         }`}
//                       >
//                         <div
//                           className="w-full relative z-0"
//                           // style={{ height: "calc(100% - 160px)" }}
//                         >
//                           <Swiper
//                             slidesPerView={1}
//                             spaceBetween={0}
//                             onSlideChange={handleSlideChange}
//                             onSwiper={(swiper) => (swiperRef.current = swiper)}
//                             loop={true}
//                             speed={1800}
//                             pagination={{
//                               clickable: true,
//                             }}
//                             modules={[Pagination, Navigation]}
//                           >
//                             <>
//                               {item?.images.map((item, index) => (
//                                 <SwiperSlide key={index}>
//                                   <img
//                                     src={item?.image}
//                                     className="w-full overflow-hidden rounded-2xl h-[300px] object-cover"
//                                   />
//                                 </SwiperSlide>
//                               ))}
//                             </>
//                           </Swiper>

//                           <div className="w-full hidden md:flex items-center justify-between absolute top-1/2 -translate-y-1/2 left-0 right-0 z-50">
//                             <div
//                               className={`w-7 h-7 flex items-center justify-center text-white font-semibold text-xl rounded-full bg-mainColor cursor-pointer `}
//                               onClick={handlePrevSlide}
//                             >
//                               <HiChevronRight />
//                             </div>
//                             <div
//                               className={`w-7 h-7 flex items-center justify-center text-white font-semibold text-xl rounded-full bg-mainColor cursor-pointer `}
//                               onClick={handleNextSlide}
//                             >
//                               <HiChevronLeft />
//                             </div>
//                           </div>
//                           {/* <img
//                             src={item.image}
//                             alt="own details"
//                             className="w-full overflow-hidden rounded-2xl h-[300px] object-cover"
//                           /> */}
//                         </div>
//                         <div className="pt-2">
//                           <ul className="flex justify-between items-center mt-5 mb-0.5">
//                             {[
//                               "معتمد",
//                               "أنشطة متنوعة",
//                               "يقع في وسط المدينة",
//                             ].map((list, idx) => (
//                               <li
//                                 key={idx}
//                                 className={`px-3 lg:px-5 py-1.5 rounded-xl text-[15px] ${
//                                   idx === 0
//                                     ? "bg-mainColor"
//                                     : idx === 1
//                                     ? "bg-[#FFB6BF]"
//                                     : "bg-[#FACC1F]"
//                                 }`}
//                               >
//                                 {list}
//                               </li>
//                             ))}
//                           </ul>

//                           <div className="items-center justify-between hidden gap-1 pt-5 sm:flex sm:gap-2">
//                             {isActive?.map((item, index) => (
//                               <div
//                                 key={index}
//                                 className="border border-[#C9C5CA] sm:border-none text-center px-2 sm:px-0 rounded-2xl"
//                               >
//                                 <h2 className="lg:text-[15px]">
//                                   {t(item.label)}
//                                 </h2>
//                                 <p className="sm:border border-[#707070] py-1 rounded-lg text-center mt-2 text-[15px] text-mainColor sm:text-black">
//                                   {item.value}
//                                 </p>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                       <div
//                         className={`bg-mainColor rounded-2xl col-span-5 lg:col-span-6 ps-10 lg:ps-16 py-12 lg:py-16 relative ${
//                           index % 2 !== 0 ? "order-1" : "order-2"
//                         }`}
//                       >
//                         <div className="flex gap-20">
//                           <div>
//                             <h2 className="text-2xl text-white">
//                               {item.partner_name}
//                             </h2>
//                             <p
//                               className="w-3/4 text-base text-white lg:text-lg mt-14 mb-12 text-ellipsis max-h-48 overflow-hidden"
//                               style={{
//                                 display: "-webkit-box",
//                                 WebkitBoxOrient: "vertical",
//                                 WebkitLineClamp: 6,
//                               }}
//                             >
//                               {item.desc}
//                             </p>
//                           </div>
//                           <img
//                             src={State_flag}
//                             alt="state flag"
//                             className="w-[100px] h-[100px] lg:w-32 lg:h-32 rounded-full absolute left-6 top-9 lg:top-12"
//                           />
//                         </div>
//                         <div className="flex gap-3">
//                           <Button
//                             className="bg-white text-[#1B0924] hover:bg-mainYellow duration-500"
//                             action={() => {
//                               if (user) {
//                                 navigate("/designCourse/register", {
//                                   state: {
//                                     id: item.id,
//                                     numberOfWeeks: data?.numberOfWeeks,
//                                     startDate: data?.start_date,
//                                     amount: item.price,
//                                     user_id: user ? user.id : null,
//                                   },
//                                 });
//                               } else {
//                                 navigate("/register");
//                               }
//                             }}
//                           >
//                             {t("register now")}
//                           </Button>
//                           <div className="bg-[#1B0924] text-white rounded-xl px-6 pt-2.5">
//                             {item.price} SAR
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="block my-5 sm:hidden">
//           <div>
//             {!data?.partners?.length ? (
//               <div className="mt-12 chooseCourse">
//                 <Formik
//                   initialValues={{ week: "", start_date: "" }}
//                   onSubmit={(values) => {
//                     console.log(
//                       "🚀 ~ DesignYourOwnCourseDetails ~ value:",
//                       values
//                     );
//                     setIsSubmit(true);
//                     setCourseDetails({
//                       cityId: location?.state.city_id,
//                       weeksId: values.week,
//                       formattedDate: values.start_date,
//                     });
//                   }}
//                 >
//                   {({ setFieldValue }) => (
//                     <Form className="grid items-end grid-cols-1 gap-3 mb-24">
//                       <div className="relative">
//                         <BaseSelect
//                           id="week"
//                           name="week"
//                           placeholder={t("study duration")}
//                           label={t("study duration")}
//                           options={weekOptions}
//                           onChange={(option) => {
//                             setFieldValue("week", option.id);
//                             setNumberOfWeeks({
//                               id: option.id,
//                               label: `${option.label} ${
//                                 !isRTL ? "A week" : "أســـــــــبوع"
//                               }`,
//                               value: `${option.value} ${
//                                 !isRTL ? "A week" : "أســـــــــبوع"
//                               }`,
//                             });
//                           }}
//                           className="pt-1.5 w-full text-black text-center"
//                           value={numberOfWeeks}
//                         />
//                       </div>
//                       <div className="relative">
//                         <label htmlFor="start_date">
//                           {t("study start date")}
//                         </label>
//                         <DatePicker
//                           autoComplete="off"
//                           showIcon
//                           id="start_date"
//                           className="pt-1.5 w-full h-[3.4rem] rounded-[14px] relative mt-3 border-1 border-[#C9C5CA]"
//                           selected={startDate}
//                           // onChange={(date) => setStartDate(date)}
//                           onChange={(date) => {
//                             setStartDate(date);
//                             const formatdDate = date
//                               ?.toISOString()
//                               .split("T")[0];
//                             setFieldValue("start_date", formatdDate);
//                           }}
//                           dateFormat="d MMMM yyyy"
//                           locale={ar}
//                           filterDate={isMonday}
//                           disabledKeyboardNavigation
//                           placeholderText={t("study start date")}
//                           withPortal
//                           portalId="root-portal"
//                           icon={<FaChevronDown />}
//                         />
//                       </div>

//                       <Button
//                         type="submit"
//                         className="col-span-1 w-full mt-4 h-[3.4rem] rounded-[14px] bg-[#1B0924] text-white text-xl font-normal"
//                       >
//                         {t("research")}
//                       </Button>
//                     </Form>
//                   )}
//                 </Formik>
//               </div>
//             ) : (
//               <div>
//                 <div className="px-5 py-3 m-auto mb-10 text-lg font-medium border-2 sm:text-xl text-mainColor border-mainColor w-fit sm:px-8 rounded-2xl">
//                   {data?.city} - {numberOfWeeks?.id} {t("اسابيع")} -{" "}
//                   {formattedDate}
//                 </div>
//                 {data?.partners.map((item, index) => (
//                   <div
//                     key={index}
//                     onClick={() => {
//                       if (user) {
//                         navigate("/designCourse/register", {
//                           state: {
//                             id: item.id,
//                             numberOfWeeks: data?.numberOfWeeks,
//                             startDate: data?.start_date,
//                             amount: item.price,
//                             user_id: user ? user.id : null,
//                           },
//                         });
//                       } else {
//                         navigate("/register");
//                       }
//                     }}
//                   >
//                     <div className="flex h-40 mb-8 overflow-hidden cursor-pointer shadow-card rounded-2xl group">
//                       <div className="rounded-2xl overflow-hidden h-40 w-[800px] sm:w-[550px]">
//                         <img
//                           src={item.image}
//                           alt="choose course"
//                           className="h-full w-full group-hover:scale-[1.03] duration-300"
//                         />
//                       </div>
//                       <div className="px-4 py-4">
//                         <h2 className="text-lg font-semibold sm:text-xl">
//                           {item.partner_name}
//                         </h2>
//                         <p className="my-3 text-[15px] sm:text-base overflow-hidden text-ellipsis line-clamp-2">
//                           {item.desc}
//                         </p>
//                         <p className="w-full text-xl font-semibold text-mainColor text-end">
//                           {item.price} SAR
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <div>
//         <DownLoadApp />
//       </div>
//     </>
//   );
// };

// export default DesignYourOwnCourseDetails;
