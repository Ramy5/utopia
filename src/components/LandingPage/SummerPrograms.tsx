import { t } from "i18next";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const SummerPrograms = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="mb-24 sm:mb-28 mx-4 md:mx-0 block sm:hidden">
      <div className="flex items-center justify-between mb-12">
        <h2 className="font-semibold text-xl">{t("summer programs")}</h2>
        <Link
          to="/programsSummer"
          className="block md:hidden text-mainColor text-base underline cursor-pointer"
        >
          {t("More")}
        </Link>
      </div>
      <div className="">
        {data?.summerPackages?.map((summer, index) => (
          <div
            className="grid grid-cols-5 gap-2 mb-6 cursor-pointer"
            key={index}
            onClick={() =>
              navigate("/programsSummer/details", {
                state: summer,
              })
            }
          >
            <div className="col-span-3 rounded-xl overflow-hidden h-40">
              <img
                src={summer.partner_image}
                alt="summer"
                className="h-full w-full"
                loading="lazy"
              />
            </div>
            <div
              className={`${
                index === 0
                  ? "bg-[#FFB6BF]"
                  : index === 1
                  ? "bg-[#FFCC1A]"
                  : "bg-[#E8DEFF]"
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
