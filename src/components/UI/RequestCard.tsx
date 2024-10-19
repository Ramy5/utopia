import { t } from "i18next";
import React from "react";
import { Link } from "react-router-dom";
import cn from "../../utils/cn";
import { MdPerson } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";
import Button from "../atoms/Button/Button";

const RequestCard = (props) => {
  const {
    id,
    user,
    date_start: startDate,
    status,
    amount,
    image,
    package_name: packageName,
    partner,
    isPartner,
    isSnatches,
  } = props;

  const route = isSnatches
    ? `/viewPartnerRequest/${id}`
    : isPartner
    ? `/viewPartnerRequest/${id}`
    : `/viewRequest/${id}`;

  return (
    <Link
      to={route}
      key={id}
      className={cn("flex flex-col sm:flex-row gap-8 sm:gap-16", {
        " mx-4 sm:mx-14 py-6 lg:mx-20 border-t border-[#BEC8CF]": isPartner,
        "bg-[#F7F7F7] rounded-2xl  px-4 sm:px-12 py-12 lg:px-28": !isPartner,
        "border border-[#bec8cf5d] my-6 bg-[#FFFFFF] shadow-sm !px-4  rounded-2xl mx-4 sm:mx-14 py-6 lg:mx-20 ":
          isSnatches,
      })}
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
          <div className="flex items-center justify-between">
            <h3 className="text-2xl">{user}</h3>
            {isSnatches && (
              <Button className="text-sm text-black rounded-full">
                Confirm
              </Button>
            )}
            {isPartner && (
              <div className="flex items-center gap-6">
                <p className="">Stacey MaKcre</p>
                <IoPersonOutline className="text-2xl" />
              </div>
            )}
          </div>
          {!isSnatches && (
            <p className="px-3 py-1 mt-4 text-sm border w-fit border-black/50 rounded-2xl">
              {isPartner ? "Processing" : t("under process")}
            </p>
          )}
        </div>
        <div className="grid items-center grid-cols-2 gap-10 sm:gap-16 xl:gap-32 lg:grid-cols-3 xl:grid-cols-4">
          <div>
            <h3 className="text-sm text-mainColor">
              {isPartner ? "School:" : t("institute")}
            </h3>
            <p className="text-xl">{partner}</p>
          </div>
          <div>
            <h3 className="text-sm text-mainColor">
              {isPartner ? "Course" : t("course")}
            </h3>
            <p className="text-xl">{packageName}</p>
          </div>
          <div>
            <h3 className="text-sm text-mainColor">
              {isPartner ? "Start Date" : t("course start date")}
            </h3>
            <p className="text-xl">{startDate}</p>
          </div>
          <div>
            <h3 className="text-sm text-mainColor">
              {isPartner ? "Student ID" : t("request number")}
            </h3>
            <p className="text-xl">{12}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RequestCard;
