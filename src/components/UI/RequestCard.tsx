import { t } from "i18next";
import React from "react";
import { Link } from "react-router-dom";

const RequestCard = (request) => {
  const {
    id,
    user,
    date_start: startDate,
    status,
    amount,
    image,
    package_name: packageName,
    partner,
  } = request;
  return (
    <Link
      to={`/viewRequest/${id}`}
      key={id}
      className="bg-[#F7F7F7] px-4 sm:px-12 py-12 lg:px-28 rounded-2xl flex flex-col sm:flex-row gap-8 sm:gap-16"
    >
      <div>
        <img
          src={image}
          alt={user}
          className="w-full h-full md:w-48 sm:w-60 rounded-2xl"
        />
      </div>
      <div className="flex flex-col justify-between gap-12">
        <div>
          <h3 className="text-2xl">{user}</h3>
          <p className="px-3 py-1 mt-4 text-sm border w-fit border-black/50 rounded-2xl">
            {t("under process")}
          </p>
        </div>
        <div className="grid items-center grid-cols-2 gap-10 sm:gap-16 xl:gap-32 lg:grid-cols-3 xl:grid-cols-4">
          <div>
            <h3 className="text-sm text-mainColor">{t("institute")}</h3>
            <p className="text-xl">{partner}</p>
          </div>
          <div>
            <h3 className="text-sm text-mainColor">{t("course")}</h3>
            <p className="text-xl">{packageName}</p>
          </div>
          <div>
            <h3 className="text-sm text-mainColor">{t("course start date")}</h3>
            <p className="text-xl">{startDate}</p>
          </div>
          <div>
            <h3 className="text-sm text-mainColor">{t("request number")}</h3>
            <p className="text-xl">{12}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RequestCard;
