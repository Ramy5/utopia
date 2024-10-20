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
    <>
      {/* DESKTOP */}
      <div className="hidden md:block">
        <Link
          to={route}
          key={id}
          className={cn("flex flex-col sm:flex-row gap-8 sm:gap-16", {
            " mx-4 sm:mx-14 py-6 lg:mx-20 border-t border-[#BEC8CF]": isPartner,
            "bg-[#F7F7F7] rounded-2xl  px-4 sm:px-12 py-12 lg:px-28":
              !isPartner,
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
      </div>

      {/* MOBILE */}
      {isPartner && (
        <div className="pb-16 md:hidden">
          <Link
            to={route}
            key={id}
            className={cn("flex gap-4", {
              " mx-4 shadow-lg px-2  py-4": isPartner,
              "bg-[#F7F7F7] rounded-2xl  px-4 sm:px-12 py-12 lg:px-28":
                !isPartner,
              "border border-[#bec8cf5d] my-4 bg-[#FFFFFF] shadow-sm !px-4  rounded-2xl mx-4 sm:mx-14 py-6 lg:mx-20 ":
                isSnatches,
            })}
          >
            <div>
              <img
                src={image}
                alt={user}
                className="object-cover w-32 h-full md:w-48 sm:w-60 rounded-2xl"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="pb-4 border-b border-gray-600">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg">{user}</h3>
                  {!isSnatches && (
                    <p className="px-2 py-1 text-xs border w-fit border-black/50 rounded-2xl">
                      {isPartner ? "Processing" : "under process"}
                    </p>
                  )}
                  {isSnatches && (
                    <Button className="text-sm text-black rounded-full">
                      Confirm
                    </Button>
                  )}
                </div>
                {isPartner && (
                  <div className="flex gap-2 mt-4 text-gray-600">
                    <IoPersonOutline className="text-lg" />
                    <p className="text-sm">Stacey MaKcre</p>
                  </div>
                )}
              </div>
              <div className="grid items-start grid-cols-2 gap-4">
                <div className="">
                  <h3 className="mb-2 text-sm">
                    {isPartner ? "School:" : "institute"}
                  </h3>
                  <p className="text-sm text-mainColor">{partner}</p>
                </div>
                <div className="">
                  <h3 className="mb-2 text-sm">
                    {isPartner ? "Course" : "course"}
                  </h3>
                  <p className="text-sm text-[#AEAAAE]">{packageName}</p>
                </div>
                <div className="">
                  <h3 className="mb-2 text-sm">
                    {isPartner ? "Start Date" : "course start date"}
                  </h3>
                  <p className="text-sm text-[#AEAAAE]">{startDate}</p>
                </div>
                <div className="">
                  <h3 className="mb-2 text-sm">
                    {isPartner ? "Student ID" : "request number"}
                  </h3>
                  <p className="text-sm text-[#AEAAAE]">{12}</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {isSnatches && (
        <div className="md:hidden">
          <Link
            to={route}
            key={id}
            className={cn("flex gap-4", {
              " mx-4 shadow-lg px-2  py-4": isPartner,
              "bg-[#F7F7F7] rounded-2xl  px-4 sm:px-12 lg:px-28": !isPartner,
              "border border-[#bec8cf5d] my-4 bg-[#FFFFFF] shadow-sm !px-4  rounded-2xl mx-4 sm:mx-14 py-4 lg:mx-20 ":
                isSnatches,
            })}
          >
            <div>
              <img
                src={image}
                alt={user}
                className="object-cover h-full w-44 md:w-48 sm:w-60 rounded-2xl"
              />
            </div>
            <div className="flex flex-col w-full gap-4">
              <div className="pb-4">
                <div className="flex items-center justify-between w-full">
                  <h3 className="text-lg">{user}</h3>
                  {!isSnatches && (
                    <p className="px-2 py-1 text-xs border w-fit border-black/50 rounded-2xl">
                      {isPartner ? "Processing" : "under process"}
                    </p>
                  )}
                  {isSnatches && (
                    <Button className="px-3 text-sm text-white rounded-xl md:text-black md:rounded-full">
                      Confirm
                    </Button>
                  )}
                </div>
                {isPartner && (
                  <div className="flex gap-2 mt-4 text-gray-600">
                    <IoPersonOutline className="text-lg" />
                    <p className="text-sm">Stacey MaKcre</p>
                  </div>
                )}
              </div>
              <div className="">
                <div className="flex gap-2">
                  <h3 className="mb-2 text-sm font-bold">School:</h3>
                  <p className="text-sm text-mainColor">{partner}</p>
                </div>
                <div className="flex gap-2">
                  <h3 className="mb-2 text-sm font-bold">
                    {isPartner ? "Course" : "course"}
                  </h3>
                  <p className="text-sm text-[#AEAAAE]">{packageName}</p>
                </div>
                <div className="flex gap-2">
                  <h3 className="mb-2 text-sm font-bold">Start Date</h3>
                  <p className="text-sm text-[#AEAAAE]">{startDate}</p>
                </div>
                <div className="flex gap-2">
                  <h3 className="mb-2 text-sm font-bold">Student ID</h3>
                  <p className="text-sm text-[#AEAAAE]">{12}</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default RequestCard;
