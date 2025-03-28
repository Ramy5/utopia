import { t } from "i18next";
import React, { useState } from "react";
import { apiRequest } from "../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import { IoLocationOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import DownLoadApp from "../../components/atoms/molecules/downLoad-app/DownLoadApp";

const SummerProgramsPage = () => {
  const navigate = useNavigate();
  const fetchProgramsTypeDetails = async () => {
    try {
      const data = await apiRequest({
        url: "/api/student/summer-packages",
        method: "GET",
      });
      return data?.data;
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };

  const { data } = useQuery({
    queryKey: ["summer_programs"],
    queryFn: fetchProgramsTypeDetails,
    suspense: true,
  });

  return (
    <>
      <div className="max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-[80rem] md:px-4 mx-auto">
        <div className="my-16 sm:block hidden px-4 md:px-0">
          <h2 className="text-6xl mb-20">{t("summer programs")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-16 md:gap-8 lg:gap-28">
            {data?.map((item, index) => (
              <div
                key={index}
                className="cursor-pointer group"
                onClick={() =>
                  navigate("/programsSummer/details", { state: item })
                }
              >
                <h2 className="bg-[#EAEAEA] rounded-2xl py-3 px-2 text-xl lg:text-2xl text-center">
                  {item.name}
                </h2>
                <div className="flex gap-1 mt-5 mb-10">
                  <div className="bg-mainColor rounded-full p-1">
                    <IoLocationOutline
                      fill="white"
                      className="text-white w-6 h-6"
                    />
                  </div>
                  <p className="bg-mainColor rounded-full px-7 flex items-center pt-0.5 text-[15px] text-white">
                    {item.city_name}
                  </p>
                </div>
                <div className="h-64 rounded-3xl overflow-hidden">
                  <img
                    src={item.cityData.image}
                    alt="summer programs"
                    className="h-full md:h-full lg:h-full group-hover:scale-[1.03] duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 mb-44 px-4 sm:hidden block">
          <div className="relative">
            <div className="absolute top-1/2 -translate-y-1/2 ">
              <div onClick={() => navigate(-1)}>
                <FaArrowRightLong
                  size={22}
                  className="cursor-pointer justify-self-start"
                />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-center py-6">
              {t("summer programs")}
            </h2>
          </div>
          <div className="mt-8">
            {data?.map((item, index) => (
              <div
                key={index}
                className="relative mb-24 cursor-pointer"
                onClick={() =>
                  navigate("/programsSummer/details", { state: item })
                }
              >
                <div className="h-64">
                  <img
                    src={item.cityData.image}
                    alt="summer programs"
                    className="w-full h-full rounded-2xl"
                  />
                </div>
                <div
                  className={`${
                    index === 0
                      ? "bg-[#FFB6BF]"
                      : index === 1
                      ? "bg-[#FFCC1A]"
                      : "bg-[#E8DEFF]"
                  } absolute left-1/2 -translate-x-1/2 py-5 w-[80%]  sm:px-20 rounded-2xl text-black -bottom-16`}
                >
                  <h2 className="text-lg text-center font-medium mb-4">
                    {item.name}
                  </h2>
                  <div className="flex items-center justify-center bg-white px-5 py-3 w-fit mx-auto rounded-2xl gap-1">
                    <IoLocationOutline className="w-6 h-6" />
                    <p className="text-lg">{item.city_name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <DownLoadApp />
      </div>
    </>
  );
};

export default SummerProgramsPage;
