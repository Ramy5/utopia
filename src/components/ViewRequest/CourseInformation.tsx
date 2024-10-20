import { t } from "i18next";
import React from "react";
import LoginBg from "../../assets/loginBg.jpg";
import Button from "../atoms/Button/Button";
import {
  IoChatbubbleOutline,
  IoChevronDown,
  IoLocationOutline,
} from "react-icons/io5";
import cn from "../../utils/cn";
import { PiChatCircleThin } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const CourseInformation = ({ steps }) => {
  const navigate = useNavigate();
  const CourseData = [
    {
      name: "انجليزي عام ٢٠ درس في الاسبوع",
      type: "غرفة خاصة، حمام مشترك، افطار وعشاء",
      duration: "اسبوع",
      dates: "2025 05 - 2024",
      isConfirmed: true,
    },
    {
      name: "السكن العائلي ٢٠ درس في الاسبوع",
      type: "غرفة خاصة، حمام مشترك، افطار وعشاء",
      duration: "اسبوع",
      dates: "2025 05 - 2024",
      isConfirmed: false,
    },
    {
      name: "السكن العائلي ٢٠ درس في الاسبوع",
      type: "غرفة خاصة، حمام مشترك، افطار وعشاء",
      duration: "اسبوع",
      dates: "2025 05 - 2024",
      isConfirmed: false,
    },
  ];
  return (
    <div className="mb-20">
      <div className="items-center hidden mb-6 sm:flex gap-x-3">
        <h2 className="text-3xl">{t("Course information")}</h2>
        <div className="flex items-center justify-center rounded-full w-7 h-7 bg-mainColor">
          <IoChevronDown size={18} className="text-white" />
        </div>
      </div>

      {/* DESKTOP */}
      <div className="bg-[#F7F7F7] rounded-2xl py-8 sm:py-16 px-4 sm:block hidden">
        <div className="grid grid-cols-12 gap-x-5 border-b border-[#D1CBCB] pb-8">
          <div className="col-span-4 lg:col-span-3">
            <img src={LoginBg} className="h-40 w-52 rounded-2xl" />
          </div>
          <div className="col-span-8 lg:col-span-9">
            <div className="flex items-center justify-between border-b border-[#D1CBCB] mb-8 pb-2">
              <h2 className="text-5xl">
                ليلى <span className="text-sm text-mainColor">ليڤربول</span>
              </h2>
              <div className="text-sm">
                <h2>{t("Application date:")}</h2>
                <p className="text-mainColor">22 Jan 2023</p>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <div className="border border-[#D1CBCB] rounded-2xl text-center py-4 px-2 lg:px-8 w-3/4 relative">
                  <span className="absolute px-3 py-1 text-xs text-white -translate-x-1/2 bg-mainColor rounded-2xl left-1/2 -bottom-3">
                    {t("Attach")}
                  </span>
                  <p className="text-sm">
                    {t("You can attach the receipt for full payment here")}
                  </p>
                </div>
                <div className="border border-[#D1CBCB] rounded-2xl text-center py-4 px-4 md:px-8 w-1/2 relative">
                  <span className="absolute px-3 py-1 text-xs text-white -translate-x-1/2 bg-mainColor rounded-2xl left-1/2 -bottom-3">
                    {t("Download")}
                  </span>
                  <p className="text-sm">{t("Download the invoice")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-x-5 border-b border-[#D1CBCB] pb-8">
          <div className="col-span-4 lg:col-span-3"></div>
          <div className="col-span-8 lg:col-span-9">
            <div className="flex items-center justify-between pb-2 my-8">
              <h2 className="text-3xl">
                {t("Requirements that have been attached:")}
              </h2>
            </div>
            <div>
              <div className="flex items-end gap-x-2">
                <div className="border border-[#D1CBCB] rounded-2xl text-center py-4 px-2 md:px-8 w-[40%]">
                  <p className="text-sm">{t("Passport")}</p>
                </div>
                <div className="border border-[#D1CBCB] rounded-2xl text-center py-4 px-2 md:px-8 w-[45%]">
                  <p className="text-sm">{t("High school diploma")}</p>
                </div>
                <p className="px-3 py-1 text-xs text-white bg-mainColor rounded-2xl whitespace-nowrap">
                  {t("Attach the requirements")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-x-5">
          <div className="col-span-4 lg:col-span-3"></div>
          <div className="col-span-8 lg:col-span-9 ">
            <h2 className="mt-12 text-3xl">{t("Options")}</h2>
            <div className="grid my-8 md:grid-cols-2 gap-x-8 lg:gap-x-32 gap-y-8">
              {CourseData?.map((item, index) => (
                <div
                  key={index}
                  className="border border-mainColor rounded-3xl py-4 px-4 relative h-[22rem]"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs">{t("Accommodation")}</p>
                    <span
                      className={cn(
                        "text-xs py-1.5 rounded-2xl",
                        item.isConfirmed
                          ? "bg-[#39FF0A] px-8"
                          : "bg-[#D1CBCB] px-4"
                      )}
                    >
                      {item.isConfirmed ? t("Confirmed") : t("Under process")}
                    </span>
                  </div>
                  <h2 className="my-3 text-xl text-mainColor">{item.name}</h2>
                  <div className="border-t border-[#D1CBCB] text-sm pt-4">
                    <div>
                      <h3>{t("type")}</h3>
                      <p className="mt-1 text-mainColor">{item.type}</p>
                    </div>
                    <div className="my-2">
                      <h3>{t("Duration")}</h3>
                      <p className="mt-1 text-mainColor">{item.duration}</p>
                    </div>
                    <div>
                      <h3>{t("Dates")}</h3>
                      <p className="mt-1 text-mainColor">{item.dates}</p>
                    </div>
                  </div>
                  <Button className="absolute left-0 right-0 w-full py-3 -bottom-1 rounded-2xl">
                    {t("Download")}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      {steps === 2 && (
        <>
          <div className="bg-[#F7F7F7] rounded-2xl py-8 sm:py-16 px-4 sm:hidden block shadow-md">
            <div className="flex items-start gap-x-3 border-b border-[#D1CBCB] pb-2">
              <div className="">
                <img src={LoginBg} className="w-36 h-[7rem] rounded-2xl" />
              </div>
              <div className="">
                <div className="pb-2">
                  <h2 className="text-2xl font-medium">ليلى</h2>
                  <div className="flex items-center gap-x-1 my-3.5">
                    <div className="bg-mainColor rounded-xl flex items-center justify-center w-[1.8rem] h-[1.8rem] ">
                      <IoLocationOutline
                        fill="white"
                        className="w-6 h-6 text-white"
                      />
                    </div>
                    <span className="text-sm font-medium">ليڤربول</span>
                  </div>
                  <div className="flex items-center text-sm gap-x-1">
                    <h2 className="font-medium">{t("Application date:")}</h2>
                    <p className="text-[#79767A]">22 Jan 2023</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="border-b border-[#D1CBCB] pb-4">
                <div className="relative flex items-center justify-between w-full mt-4 text-center">
                  <p className="text-sm font-medium">
                    {t("You can attach the receipt for full payment here")}
                  </p>
                  <Button className="px-5 py-1.5 text-sm font-medium">
                    {t("Attach")}
                  </Button>
                </div>
                <div className="relative flex items-center justify-between mt-4">
                  <p className="text-sm font-medium">
                    {t("Download the invoice")}
                  </p>
                  <Button className="px-5 py-1.5 text-sm font-medium">
                    {t("Download")}
                  </Button>
                </div>
              </div>
            </div>

            <div className="pb-4 border-b border-[#D1CBCB]">
              <div className="col-span-4 lg:col-span-3"></div>
              <div className="col-span-8 lg:col-span-9">
                <div className="flex items-center justify-between pb-2 my-8">
                  <h2 className="text-xl">
                    {t("Requirements that have been attached:")}
                  </h2>
                </div>
                <div>
                  <ul className="flex items-end gap-x-2 ms-4">
                    <li className="!list-disc md:px-8 w-[40%]">
                      <p className="text-sm">{t("Passport")}</p>
                    </li>
                    <li className="!list-disc md:px-8 w-[45%]">
                      <p className="text-sm">{t("High school diploma")}</p>
                    </li>
                  </ul>
                  <div className="flex items-center justify-end mt-2">
                    <Button className="px-6 py-1.5 text-sm font-medium">
                      {t("Attach")}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="">
              <div className="">
                <h2 className="mt-12 text-3xl">{t("Options")}</h2>
                <div className="grid mt-8 md:grid-cols-2 gap-x-8 lg:gap-x-32 gap-y-8">
                  {CourseData?.map((item, index) => (
                    <div
                      key={index}
                      className="border border-[#C9C5CA] rounded-xl py-4 px-4 relative"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-xs">{t("Accommodation")}</p>
                        <span
                          className={cn(
                            "text-xs py-1.5 rounded-2xl",
                            item.isConfirmed
                              ? "bg-[#39FF0A] px-8"
                              : "bg-[#D1CBCB] px-4"
                          )}
                        >
                          {item.isConfirmed
                            ? t("Confirmed")
                            : t("Under process")}
                        </span>
                      </div>
                      <h2 className="my-3 text-xl text-mainColor">
                        {item.name}
                      </h2>
                      <div className="border-t border-[#D1CBCB] text-sm pt-4">
                        <div>
                          <h3 className="font-semibold">{t("type")}</h3>
                          <p className="text-[#79767A] mt-2">{item.type}</p>
                        </div>
                        <div className="flex items-center gap-5 my-5">
                          <h3 className="font-semibold">{t("Duration")}</h3>
                          <p className="text-[#79767A]">{item.duration}</p>
                        </div>
                        <div className="flex items-center gap-5">
                          <h3 className="font-semibold">{t("Dates")}</h3>
                          <p className="text-[#79767A]">{item.dates}</p>
                        </div>
                      </div>
                      <Button className="mt-4 w-full rounded-xl py-2.5">
                        {t("Download")}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Button
            action={() => navigate("/chat")}
            className="text-base font-medium bg-[#1B0924] mt-5 sm:hidden block mb-24"
          >
            <div className="flex items-center gap-2">
              <IoChatbubbleOutline size={20} />
              <p>{t("Contact the institute")}</p>
            </div>
          </Button>
        </>
      )}
    </div>
  );
};

export default CourseInformation;
