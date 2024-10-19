import { t } from "i18next";
import React from "react";
import { apiRequest } from "../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import cn from "../../utils/cn";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate()
  const fetchOrders = async () => {
    try {
      const data = await apiRequest({
        url: "/api/student/orders",
        method: "GET",
      });
      return data?.data;
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };

  const { data } = useQuery({
    queryKey: ["Orders"],
    queryFn: fetchOrders,
    suspense: true,
  });

  console.log("🚀 ~ Orders ~ data:", data);

  const renderDataItem = (label, value) => {
    console.log("🚀 ~ renderDataItem ~ label:", label);
    return (
      <div className="flex items-center sm:block">
        <h3 className="text-sm mb-0 sm:mb-2 flex items-center">{t(label)} <span className="sm:hidden block mx-1">:</span></h3>
        <p className="text-mainColor">{value}</p>
      </div>
    );
  };
  return (
    <section className="my-20 max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-[80rem] md:px-4 mx-auto">
      <div className="flex gap-x-2 mb-5">
        <p className="bg-mainColor text-white rounded-xl px-6 pt-2 pb-1.5 text-lg">
          {t("add a request")}
        </p>
        <p className="bg-mainColor text-white rounded-xl text-2xl px-4 pt-2 ">
          +
        </p>
      </div>


      {data?.map((item, index) => (
        <div className="bg-[#F7F7F7] rounded-xl mb-4 py-8 p-4  sm:py-0 sm:p-6 md:p-8 lg:p-12 cursor-pointer" onClick={() => navigate(`/viewRequest/${item.id}`)}>
          <div className="flex items-center gap-x-4 sm:gap-x-8">
            <div>
              <img src={item.image} className="rounded-xl h-full" />
            </div>
            <div className="w-full">
              <div className="flex sm:block justify-between items-center">
                <h2 className="text-xl sm:text-2xl">{item.user}</h2>
                <span
                  className={cn(
                    "text-[10px] sm:text-xs py-1 rounded-2xl",
                    item.isConfirmed
                      ? "bg-[#39FF0A] px-8"
                      : "border border-[#707070] px-3"
                  )}
                >
                  {item.isConfirmed ? t("Confirmed") : t("Under process")}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-y-1.5 sm:gap-y-8 mt-2 sm:mt-12">
                {renderDataItem("The institute", item.partner)}
                {renderDataItem("course", item.package_name)}
                {renderDataItem("study start date", item.date_start)}
                {renderDataItem("Student number", item.amount)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Orders;
