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

const SpecializationsPage = () => {
  const location = useLocation();
  const specializationID = location.state;

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

  console.log("🚀 ~ SpecializationsPage ~ specializations:", specializations);

  return (
    <div>
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
            {specializations.name}
          </h2>
        </div>

        <div className="my-6 sm:my-20 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4 lg:gap-20">
            <div className="order-2 md:order-1">
              <div>
                <h2 className="text-2xl font-medium mb-3 md:mb-8 mt-3 hidden md:block">
                  {specializations?.name}
                </h2>
                <h2 className="text-2xl font-medium mb-3 md:mb-4 block md:hidden">
                  {t("brief about the major")}
                </h2>
                <p className="w-full ">{specializations?.desc}</p>
              </div>

              <div className="my-8 md:my-20 flex flex-wrap gap-x-16 gap-y-5">
                <div>
                  <h2 className="text-lg font-medium mb-3">
                    {t("requirements")}
                  </h2>
                  <p>- {specializations?.requirement}</p>
                </div>
                <div>
                  <h2 className="text-lg font-medium mb-3">{t("language")}</h2>
                  <p>- {specializations?.language}</p>
                </div>
                <div>
                  <h2 className="text-lg font-medium mb-3">
                    {t("estimated time to receive admission:")}
                  </h2>
                  <p>
                    - {specializations?.duration_accept} <span>{t("day")}</span>
                  </p>
                </div>
              </div>

              <div className="gap-3 lg:gap-4 sm:flex hidden">
                <Button bordered className="border-[#707070] text-black px-3 lg:px-5">
                  <span>{t("application fee")}</span>{" "}
                  {specializations?.order_price} <span>{t("reyal")}</span>
                </Button>
                <Button>{t("apply now")}</Button>
              </div>

              <div className="flex sm:hidden justify-between items-center mb-4">
                <h2 className="text-xl font-medium">{t("application fee")}</h2>
                <p className="text-mainColor text-lg font-medium">{specializations?.order_price} <span>{t("reyal")}</span></p>
              </div>
            </div>
            <div className="flex justify-center md:justify-end order-1 md:order-2">
              <div className="rounded-3xl w-full">
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

        <Button className="sm:hidden block w-full py-4 rounded-2xl mb-28">
          {t("apply now")}
        </Button>
      </div>

      <div>
        <DownLoadApp />
      </div>
    </div>
  );
};

export default SpecializationsPage;
