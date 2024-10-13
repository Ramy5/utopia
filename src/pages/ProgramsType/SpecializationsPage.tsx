import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { apiRequest } from "../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import { t } from "i18next";
import { IoLocationOutline } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";
import Button from "../../components/atoms/Button/Button";
import DownLoadApp from "../../components/atoms/molecules/downLoad-app/DownLoadApp";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useAuth } from "../../context/AuthContext";

const SpecializationsPage = () => {
  const location = useLocation();
  console.log("🚀 ~ SpecializationsPage ~ location:", location);
  const { user } = useAuth();
  const { id: specializationID = "", universityName = "" } =
    location.state || {};

  const fetchSpecialization = async (id) => {
    try {
      const data = await apiRequest({
        url: `/api/student/specialization/${id}`,
        method: "GET",
      });
      return data?.data;
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };

  const { data: specializations } = useQuery({
    queryKey: ["specialization-details", specializationID],
    queryFn: () => fetchSpecialization(specializationID),
    suspense: true,
  });

  return (
    <div>
      <div className="max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-[80rem] md:px-4 px-4 m-auto">
        <div className="relative block sm:hidden">
          <div className="absolute -translate-y-1/2 top-1/2 ">
            <Link to={"/"}>
              <FaArrowRightLong
                size={22}
                className="mt-4 cursor-pointer justify-self-start"
              />
            </Link>
          </div>
          <h2 className="py-6 text-3xl font-medium text-center">
            {specializations.name}
          </h2>
        </div>

        <div className="w-full my-6 sm:my-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-4 lg:gap-20">
            <div className="order-2 md:order-1">
              <div>
                <h2 className="hidden mt-3 mb-3 text-2xl font-medium md:mb-8 md:block">
                  {specializations?.name}
                </h2>
                <h2 className="block mb-3 text-2xl font-medium md:mb-4 md:hidden">
                  {t("brief about the major")}
                </h2>
                <p className="w-full ">{specializations?.desc}</p>
              </div>

              <div className="flex flex-wrap my-8 md:my-20 gap-x-16 gap-y-5">
                <div>
                  <h2 className="mb-3 text-lg font-medium">
                    {t("requirements")}
                  </h2>
                  <p>- {specializations?.requirement}</p>
                </div>
                <div>
                  <h2 className="mb-3 text-lg font-medium">{t("language")}</h2>
                  <p>- {specializations?.language}</p>
                </div>
                <div>
                  <h2 className="mb-3 text-lg font-medium">
                    {t("estimated time to receive admission:")}
                  </h2>
                  <p>
                    - {specializations?.duration_accept} <span>{t("day")}</span>
                  </p>
                </div>
              </div>

              <div className="hidden gap-3 lg:gap-4 sm:flex">
                <Button
                  bordered
                  className="border-[#707070] text-black px-3 lg:px-5"
                >
                  <span>{t("application fee")}</span>{" "}
                  {specializations?.order_price} <span>{t("reyal")}</span>
                </Button>
                <Link
                  to={user ? "/UniversityAdmissionRegister" : "/login"}
                  state={{
                    partnerId: specializations?.partner_id,
                    specializationID: specializationID,
                    universityName: universityName,
                  }}
                >
                  <Button>{t("apply now")}</Button>
                </Link>
              </div>

              <div className="flex items-center justify-between mb-4 sm:hidden">
                <h2 className="text-xl font-medium">{t("application fee")}</h2>
                <p className="text-lg font-medium text-mainColor">
                  {specializations?.order_price} <span>{t("reyal")}</span>
                </p>
              </div>
            </div>
            <div className="flex justify-center order-1 md:justify-end md:order-2">
              <div className="w-full rounded-3xl">
                <div className="rounded-3xl overflow-hidden h-72 sm:h-[380px] md:h-[500px] relative">
                  <div className="h-72 sm:h-[380px] md:h-[500px]">
                    <img
                      src={specializations?.image}
                      className="w-full h-full m-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Link
          state={{
            partnerId: specializations?.partner_id,
            specializationID: specializationID,
            universityName: universityName,
          }}
          to={user ? "/UniversityAdmissionRegister" : "/login"}
        >
          <Button className="block w-full py-4 sm:hidden rounded-2xl mb-28">
            {t("apply now")}
          </Button>
        </Link>
      </div>

      <div>
        <DownLoadApp />
      </div>
    </div>
  );
};

export default SpecializationsPage;
