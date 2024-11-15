import { t } from "i18next";
import React, { useEffect, useRef, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { useRTL } from "../../hooks/useRTL";
import { FaInstagram } from "react-icons/fa";
import BaseInput from "../../components/atoms/molecules/formik-fields/BaseInput";
import { Form, Formik } from "formik";
import Button from "../../components/atoms/Button/Button";
import DownLoadApp from "../../components/atoms/molecules/downLoad-app/DownLoadApp";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useAuth } from "../../context/AuthContext";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import cn from "../../utils/cn";

const SummerProgramsDetails = () => {
  const [styledHtml, setStyledHtml] = useState("");
  const location = useLocation();
  const [planId, setPlanId] = useState(null);
  const [amount, setAmount] = useState("");
  const { user } = useAuth();
  const programDetails = location.state;
  console.log("🚀 ~ SummerProgramsDetails ~ programDetails:", programDetails);
  const isRTL = useRTL();
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log("🚀 ~ SummerProgramsDetails ~ currentIndex:", currentIndex);
  console.log(
    "🚀 ~ SummerProgramsDetails ~ programDetails?.packageImage?.length:",
    programDetails?.packageImage?.length - 1
  );

  const handleSelectedPlanId = (id, amount) => {
    setPlanId(id);
    setAmount(amount);
  };

  useEffect(() => {
    const htmlWithStyles = programDetails?.includes
      ?.replace("<ul", '<ul class="flex flex-wrap !list-none gap-4"')
      ?.replace(
        /<li>/g,
        '<li class="border border-[#707070] px-4 py-1 rounded-lg text-[15px]">'
      );

    setStyledHtml(htmlWithStyles);
  }, []);

  const isActive = [
    { label: "age group", value: programDetails?.packageData.age_group },
    {
      label: "family accommodation",
      value:
        programDetails?.packageData.family_housing === "active"
          ? t("available")
          : t("unavailable"),
    },
    {
      label: "student accommodation",
      value:
        programDetails?.packageData.student_housing === "active"
          ? t("available")
          : t("unavailable"),
    },
    {
      label: "general english",
      value:
        programDetails?.packageData.general_english === "active"
          ? t("available")
          : t("unavailable"),
    },
    {
      label: "IELTS course",
      value:
        programDetails?.packageData.ielts_course === "active"
          ? t("available")
          : t("unavailable"),
    },
  ];

  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.activeIndex);
  };

  const handleNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handlePrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-[80rem] md:px-4 px-4 m-auto">
        <div className="grid grid-cols-1 gap-2 my-16 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <div>
              <h2 className="mb-5 text-3xl sm:text-4xl md:text-5xl md:mb-0">
                {programDetails?.name}
              </h2>
              <div className="hidden gap-1 my-6 md:flex">
                <div className="p-1 rounded-full bg-mainColor">
                  <IoLocationOutline
                    fill="white"
                    className="w-6 h-6 text-white"
                  />
                </div>
                <p className="bg-mainColor rounded-full px-5 py-0.5 text-white text-[15px]">
                  {programDetails?.city_name}
                </p>
              </div>
              <p className="w-full md:w-4/5 lg:w-3/4">{programDetails?.desc}</p>
            </div>
            <div className="mt-8 md:mt-20">
              <h2 className="block mb-3 text-2xl font-medium md:mb-0 md:hidden">
                {t("package includes")}
              </h2>
              <div className="hidden gap-1 mb-5 md:flex">
                <div className="p-1 rounded-full bg-mainColor">
                  <IoLocationOutline
                    fill="white"
                    className="w-6 h-6 text-white"
                  />
                </div>
                <p className="bg-mainColor rounded-full px-5 py-0.5 text-white text-[15px]">
                  {t("package includes")}
                </p>
              </div>
              <p className="mb-5">
                انجليزي عام 15 ساعة / الاسبوع - 20 درس/ الاسبوع
              </p>
              <p className="text-[15px] font-base">
                <span dangerouslySetInnerHTML={{ __html: styledHtml }} />
              </p>
            </div>
          </div>
          <div className="flex justify-center order-1 md:justify-end md:order-2 h-fit">
            <div className="md:border border-[#707070] rounded-3xl w-full md:w-auto overflow-x-hidden">
              <div className="relative overflow-hidden rounded-3xl h-60 md:h-full">
                <div className="relative w-full">
                  <Swiper
                    slidesPerView={1}
                    spaceBetween={0}
                    onSlideChange={handleSlideChange}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    loop={true}
                    pagination={{
                      clickable: true,
                    }}
                    modules={[Pagination, Navigation]}
                  >
                    <>
                      {programDetails?.packageImage.map((item, index) => (
                        <SwiperSlide key={index}>
                          <img
                            src={item?.image}
                            className="rounded-3xl object-fill w-full h-60 md:h-full md:max-h-96"
                          />
                        </SwiperSlide>
                      ))}
                    </>
                  </Swiper>

                  <div className="w-full hidden md:flex items-center justify-between absolute top-1/2 -translate-y-1/2 left-0 right-0 z-50">
                    <div
                      className={`w-7 h-7 flex items-center justify-center text-white font-semibold text-xl rounded-full bg-mainColor cursor-pointer `}
                      onClick={handlePrevSlide}
                    >
                      <HiChevronRight />
                    </div>
                    <div
                      className={`w-7 h-7 flex items-center justify-center text-white font-semibold text-xl rounded-full bg-mainColor cursor-pointer `}
                      onClick={handleNextSlide}
                    >
                      <HiChevronLeft />
                    </div>
                  </div>
                </div>

                <div className="w-full flex md:hidden items-center justify-between absolute top-1/2 -translate-y-1/2 left-0 right-0 z-50">
                  <div
                    className={`w-7 h-7 flex items-center justify-center text-white font-semibold text-xl rounded-full bg-mainColor  ${
                      currentIndex === 0
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                    onClick={handlePrevSlide}
                    disabled={currentIndex === 0}
                  >
                    <HiChevronRight />
                  </div>
                  <div
                    className={`w-7 h-7 flex items-center justify-center text-white font-semibold text-xl rounded-full bg-mainColor ${
                      currentIndex === programDetails?.packageImage?.length - 1
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                    onClick={handleNextSlide}
                    disabled={
                      currentIndex === programDetails?.packageImage?.length - 2
                    }
                  >
                    <HiChevronLeft />
                  </div>
                </div>

                <div className="absolute bottom-3 right-3 md:hidden z-50">
                  <Link
                    to={programDetails?.instagram}
                    className="flex items-center justify-center w-12 h-12 cursor-pointer bg-mainColor rounded-2xl"
                  >
                    <FaInstagram size={32} className="text-white" />
                  </Link>
                </div>
                <div className="items-center justify-between hidden gap-1 px-4 py-3 md:flex md:gap-4">
                  {isActive?.map((item, index) => (
                    <div
                      key={index}
                      className="border border-[#C9C5CA] md:border-none text-center px-2 py-3 md:px-0 rounded-2xl"
                    >
                      <h2 className="text-[15px]">{t(item.label)}</h2>
                      <p className="md:border border-[#707070] py-1 rounded-lg text-center mt-2 text-[15px] text-mainColor md:text-black">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="block mt-5 md:hidden">
                <Swiper slidesPerView={3} spaceBetween={8}>
                  <div>
                    {isActive?.map((item, index) => (
                      <SwiperSlide key={index}>
                        <div
                          key={index}
                          className="border border-[#C9C5CA] md:border-none text-center px-2 py-2 md:px-0 rounded-2xl"
                        >
                          <h2 className="text-[15px]">{t(item.label)}</h2>
                          <p className="md:border border-[#707070] py-1 rounded-lg text-center mt-1.5 text-[15px] text-mainColor md:text-black">
                            {item.value}
                          </p>
                        </div>
                      </SwiperSlide>
                    ))}
                  </div>
                </Swiper>
              </div>
            </div>
          </div>
        </div>

        <div className="grid items-end grid-cols-1 mt-8 mb-12 sm:grid-cols-12 gap-x-3 gap-y-8 md:mt-24 md:mb-20 ">
          <div className="sm:col-span-5 md:col-span-6">
            <h2 className="mb-4 text-2xl">{programDetails?.cityData.name}</h2>
            <div className="h-64 overflow-hidden cursor-pointer rounded-3xl md:h-80 lg:h-96">
              {programDetails?.cityData?.url ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${
                    programDetails.cityData.url.split("v=")[1]
                  }`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <Link to={programDetails?.cityData.url}>
                  <img
                    src={programDetails?.cityData.image}
                    alt="youtube"
                    className="hover:scale-[1.03] duration-300 w-full h-64 md:h-80 lg:h-full"
                  />
                </Link>
              )}
            </div>
          </div>
          <div className="sm:col-span-5 md:col-span-4 ">
            <h2 className="mb-4 text-2xl">{programDetails?.partner_name}</h2>
            <div className="h-64 overflow-hidden cursor-pointer rounded-3xl md:h-80 lg:h-96">
              {programDetails?.cityData?.url ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${
                    programDetails?.partner_url.split("v=")[1]
                  }`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <Link to={programDetails?.partner_url}>
                  <img
                    src={programDetails?.partner_image}
                    alt="youtube"
                    className="hover:scale-[1.03] duration-300 w-full h-64 md:h-80 lg:h-full"
                  />
                </Link>
              )}
            </div>
          </div>
          <div className="mr-auto sm:col-span-2 md:mr-0 ">
            <Link
              to={programDetails?.instagram}
              className="flex items-center justify-center w-20 h-20 rounded-full cursor-pointer bg-mainColor sm:rounded-2xl"
            >
              <FaInstagram size={50} className="text-white" />
            </Link>
          </div>
        </div>

        <div className="mb-28">
          <h2 className="mb-8 text-2xl">{t("duration and price")}</h2>
          <Formik initialValues={{}} onSubmit={() => {}}>
            <Form>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 e-full lg:w-3/4">
                {programDetails?.packagePlans?.map((plan, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <input
                      id={plan?.id}
                      name={`packagePlan`}
                      type="radio"
                      className="p-2 cursor-pointer"
                      onChange={(e) =>
                        handleSelectedPlanId(e.target.id, plan.price)
                      }
                    />
                    <h2
                      className={cn(
                        "border  px-5 py-2 rounded-xl text-center text-[15px] w-24",
                        {
                          "border-mainColor text-mainColor": planId == plan?.id,
                          "border-[#707070]": planId != plan?.id,
                        }
                      )}
                    >
                      {plan.duration == 1
                        ? `${t("mounth")}`
                        : plan.duration == 2
                        ? `${t("2 months")}`
                        : plan.duration > 10
                        ? `${plan.duration} ${t("mounth")}`
                        : `${plan.duration} ${t("Months")}`}
                    </h2>
                    <p
                      className={cn(
                        "border border-[#707070] px-5 py-2 rounded-xl text-center text-[15px] w-32",
                        {
                          "border-mainColor text-mainColor": planId == plan?.id,
                          "border-[#707070]": planId != plan?.id,
                        }
                      )}
                    >
                      {plan.price} <span>{plan.unit}</span>
                    </p>
                  </div>
                ))}
              </div>
              <Link
                to={user ? "/EnglishAdmissionRegister" : "/login"}
                state={{
                  englishName: programDetails?.name,
                  partnerId: programDetails?.partner_id,
                  packageId: programDetails?.category_id,
                  planId: planId,
                  amount: amount,
                  user_id: user?.id,
                }}
              >
                <Button className="w-full mt-8 sm:w-fit hover:bg-mainYellow duration-500">
                  {t("register now")}
                </Button>
              </Link>
            </Form>
          </Formik>
        </div>
      </div>

      <div>
        <DownLoadApp />
      </div>
    </div>
  );
};

export default SummerProgramsDetails;

{
  /* <ul className="flex flex-wrap w-3/4 gap-4">
<li className="border border-[#707070] px-4 py-1 rounded-lg text-[15px]">
  رسوم التأشيرة.
</li>
<li className="border border-[#707070] px-4 py-0.5 rounded-lg">
  رسوم التأشيرة.
</li>
<li className="border border-[#707070] px-4 py-0.5 rounded-lg">
  رسوم التأشيرة.
</li>
<li className="border border-[#707070] px-4 py-0.5 rounded-lg">
  الإقامة مع عائلة في غرفة مستقلة
</li>
<li className="border border-[#707070] px-4 py-0.5 rounded-lg">
  رسوم التأشيرة.
</li>
<li className="border border-[#707070] px-4 py-0.5 rounded-lg">
  شهادة معتمدةفي نهاية الكورس.
</li>
<li className="border border-[#707070] px-4 py-0.5 rounded-lg">
  شامل وجبات الفطور والعشاء وجميع الوجبات خلال الويكند.
</li>
<li className="border border-[#707070] px-4 py-0.5 rounded-lg">
  استخدام الكمبويتر والانترنت مجا نًا داخل المعهد.
</li>
</ul> */
}

{
  /* <div className="w-full hidden md:flex items-center justify-between absolute top-1/2 -translate-y-1/2 left-0 right-0 z-50">
<div
  className={`w-7 h-7 flex items-center justify-center text-white font-semibold text-xl rounded-full bg-mainColor  ${
    currentIndex === 0
      ? "cursor-not-allowed"
      : "cursor-pointer"
  }`}
  onClick={handlePrevSlide}
  disabled={currentIndex === 0}
>
  <HiChevronRight />
</div>
<div
  className={`w-7 h-7 flex items-center justify-center text-white font-semibold text-xl rounded-full bg-mainColor ${
    currentIndex ===
    programDetails?.packageImage?.length - 1
      ? "cursor-not-allowed"
      : "cursor-pointer"
  }`}
  onClick={handleNextSlide}
  disabled={
    currentIndex ===
    programDetails?.packageImage?.length - 2
  }
>
  <HiChevronLeft />
</div>
</div> */
}
