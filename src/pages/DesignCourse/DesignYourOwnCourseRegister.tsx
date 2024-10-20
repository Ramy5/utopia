import React from "react";
import { apiRequest } from "../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { t } from "i18next";
import { FaArrowRightLong, FaInstagram } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { IoMdCheckmark } from "react-icons/io";
import DesignCourseForm from "./DesignCourseForm";
import Button from "../../components/atoms/Button/Button";

const DesignYourOwnCourseRegister = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const AvailableCourseID = location.state.id;

  const fetchPartnerDetails = async () => {
    try {
      const data = await apiRequest({
        url: `/api/student/show-partner-details/${AvailableCourseID}`,
        method: "GET",
      });
      return data?.data;
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };

  const { data } = useQuery({
    queryKey: ["show-partner-details"],
    queryFn: fetchPartnerDetails,
    suspense: true,
  });
  console.log("🚀 ~ DesignYourOwnCourse ~ data:", data);

  const isActive = [
    { label: "age group", value: 18 },
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
  return (
    <div className="max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-[80rem] md:px-4 px-4 m-auto">
      <h2 className="text-3xl sm:text-4xl md:text-5xl mb-5 md:mb-0 mt-12 hidden sm:block md:hidden">
        {t("register now")}
      </h2>
      <div className="relative block sm:hidden">
        <div className="absolute top-1/2 -translate-y-1/2 ">
          <div onClick={() => navigate(-1)}>
            <FaArrowRightLong
              size={22}
              className="cursor-pointer justify-self-start"
            />
          </div>
        </div>
        <h2 className="text-xl font-semibold text-center py-6">
          {data?.partner?.name}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-16 mt-10 sm:mt-16">
        <div className="order-2 md:order-1">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-5 md:mb-0 hidden md:block">
              {t("register now")}
            </h2>
          </div>
          <div className="mt-8 md:mt-28">
            <h2 className="text-xl font-medium mb-3 block">
              {data?.partner?.name}
            </h2>
            <div className="hidden sm:flex gap-1 mb-5">
              <div className="bg-mainColor rounded-full p-1">
                <IoLocationOutline
                  fill="white"
                  className="text-white w-6 h-6"
                />
              </div>
              <p className="bg-mainColor rounded-full px-5 py-0.5 text-white text-[15px]">
                {data?.partner?.city}
              </p>
            </div>
          </div>

          <p className="w-full md:w-4/5 lg:w-3/4 mt-8 md:mt-20">
            {data?.partner?.desc}
          </p>
        </div>
        <div className="flex justify-center md:justify-end order-1 md:order-2">
          <div className="md:bg-[#EAEAEA] rounded-3xl w-full md:w-auto">
            <div className="rounded-3xl overflow-hidden h-64 md:h-full relative">
              <img
                src={data?.partner?.image}
                className="w-full h-full md:h-96 m-auto rounded-3xl"
              />
              <div className="absolute bottom-0 left-0 z-50 sm:hidden flex gap-1 bg-[#0000004D] w-full p-4">
                <div className="bg-mainColor rounded-lg p-1">
                  <IoLocationOutline
                    fill="white"
                    className="text-white w-6 h-6"
                  />
                </div>
                <p className="px-1 py-0.5 text-white font-semibold text-lg">
                  {data?.partner?.city}
                </p>
              </div>
              <div className="hidden sm:flex justify-between items-center gap-1 sm:gap-4 px-4 py-3">
                {isActive?.map((item, index) => (
                  <div
                    key={index}
                    className="border border-[#C9C5CA] sm:border-none text-center px-2 py-3 sm:px-0 rounded-2xl"
                  >
                    <h2 className="text-[15px]">{t(item.label)}</h2>
                    <p className="sm:border border-[#707070] py-1 rounded-lg text-center mt-2 text-[15px] text-mainColor md:text-black">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap justify-between items-center">
              <div className="sm:hidden flex gap-1 py-4 w-fit">
                <div className="bg-mainColor rounded-lg p-1">
                  <IoMdCheckmark fill="white" className="text-white w-5 h-5" />
                </div>
                <p className="px-1 py-0.5 font-semibold text-[14px]">
                  {t("certified")}
                </p>
              </div>
              <div className="sm:hidden flex gap-1 w-fit py-4">
                <div className="bg-mainColor rounded-lg p-1">
                  <IoMdCheckmark fill="white" className="text-white w-5 h-5" />
                </div>
                <p className="px-1 py-0.5 font-semibold text-[14px]">
                  {t("various Activities")}
                </p>
              </div>
              <div className="sm:hidden flex gap-1 w-fit py-4">
                <div className="bg-mainColor rounded-lg p-1">
                  <IoLocationOutline
                    fill="white"
                    className="text-white w-5 h-5"
                  />
                </div>
                <p className="px-1 py-0.5 font-semibold text-[14px]">
                  {t("located in the city center")}
                </p>
              </div>
            </div>
            <div className="mt-5 block md:hidden">
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
      <Button
        className="mb-28 w-full bg-mainColor sm:hidden"
        action={() => navigate("/designCourse/registration", 
          {state: location.state}
        )}
      >
        {t("next")}
      </Button>

      <div className="sm:block hidden">
        <DesignCourseForm />
      </div>
    </div>
  );
};

export default DesignYourOwnCourseRegister;
