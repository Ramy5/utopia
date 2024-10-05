import { t } from "i18next";
import React from "react";

const SummerPrograms = ({ data }) => {
  return (
    <div className="mb-24 sm:mb-28 mx-4 md:mx-0 block sm:hidden">
      <div className="flex items-center justify-between mb-12">
        <h2 className="font-semibold text-xl">{t("summer programs")}</h2>
        <p className="block md:hidden text-mainColor text-base underline">
          {t("More")}
        </p>
      </div>
      <div className="">
        {data?.summerPackages?.map((summer, index) => (
          <div className="grid grid-cols-5 gap-2 mb-6" key={index}>
            <div className="col-span-3 rounded-xl overflow-hidden h-40">
              <img src={summer.partner_image} alt="summer" className="h-full w-full" />
            </div>
            <div
              className={`${
                index === 0 ? "bg-[#FFB6BF]" : index === 1 ? "bg-[#FFCC1A]" : "bg-[#E8DEFF]"
              } rounded-xl col-span-2 flex items-center justify-center font-medium h-full w-full p-2`}
            >
              {summer.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummerPrograms;
