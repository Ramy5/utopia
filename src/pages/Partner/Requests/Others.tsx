import React, { useState } from "react";
import { IoChatbubbleOutline, IoChevronDown } from "react-icons/io5";
import cn from "../../../utils/cn";
import Button from "../../../components/atoms/Button/Button";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { downloadImage, downloadPDF } from "../../../hooks/Download";

const Others = ({ step, others }) => {
  const navigate = useNavigate();

  const CourseData = [
    {
      id: 1,
      title: "Student",
      desc: "Visa",
      isConfirmed: others?.visa,
    },
    {
      id: 2,
      title: "Student",
      desc: "confirmed Inssurance",
      isConfirmed: others?.travel,
    },
    {
      id: 3,
      title: "Flight",
      desc: "confirmed Ticket",
      isConfirmed: others?.ticket,
    },
  ];

  return (
    <div className="mx-4 mb-8">
      <div className="hidden gap-6 md:flex">
        <h2 className="text-3xl">{"others"}</h2>
        <IoMdArrowDropdownCircle
          className={cn(
            "text-3xl cursor-pointer transition-all duration-300 text-mainColor",
            {
              "-rotate-90": !others,
            }
          )}
        />
      </div>

      {/* DESKTOP */}
      <div className="hidden md:block">
        <div className="grid-cols-2 my-8 sm:grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-20 gap-y-12">
          {CourseData?.map((item, index) => (
            <div
              key={index}
              className="bg-[#F7F7F7] rounded-3xl py-4 px-4 relative h-32"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">{item.title}</p>
                  <p className="text-sm">{item.desc}</p>
                </div>
                <span
                  className={cn(
                    "text-xs py-1.5 rounded-2xl bg-mainColor text-[#39FF0A] px-5"
                  )}
                >
                  confirmed
                </span>
              </div>
              <Button
                action={() => {
                  const fileExtension = item.isConfirmed
                    .split(".")
                    .pop()
                    .toLowerCase();
                  if (
                    ["jpg", "jpeg", "png", "gif", "svg", "bmp"].includes(
                      fileExtension
                    )
                  ) {
                    downloadImage(item.isConfirmed);
                  } else {
                    downloadPDF(item.isConfirmed);
                  }
                }}
                className="absolute w-[90%] left-1/2 bg-[#1B0924] -translate-x-1/2 -bottom-3 rounded-3xl py-2"
              >
                Download Confirmation
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-28">
          <h2 className="text-3xl">Proof Of Payment</h2>
          <Button className="mt-8 text-black px-20 text-sm font-light bg-[#39FF0A] rounded-full">
            Download
          </Button>
        </div>
      </div>

      {/* MOBILE */}
      {step === 3 && (
        <>
          {/* MOBILE */}
          <div className="my-8 md:hidden block bg-[#F7F7F7] rounded-xl shadow-md p-4">
            <div className="border-b border-[#79767A]">
              {CourseData?.map((item, index) => (
                <div
                  key={index}
                  className="rounded-3xl py-4 px-4 relative border border-[#C9C5CA] my-5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm">{item.title}</p>
                      <p className="text-sm">{item.desc}</p>
                    </div>
                    <span
                      className={cn(
                        "text-xs py-1.5 rounded-2xl bg-[#39FF0A] px-8"
                      )}
                    >
                      Confirmed
                    </span>
                  </div>
                  <Button
                    action={() => {
                      const fileExtension = item.isConfirmed
                        .split(".")
                        .pop()
                        .toLowerCase();
                      if (
                        ["jpg", "jpeg", "png", "gif", "svg", "bmp"].includes(
                          fileExtension
                        )
                      ) {
                        downloadImage(item.isConfirmed);
                      } else {
                        downloadPDF(item.isConfirmed);
                      }
                    }}
                    className="w-full py-2 mt-4 rounded-xl"
                  >
                    Download Comfirmation
                  </Button>
                </div>
              ))}
            </div>

            <div className="rounded-3xl py-4 px-4 relative border border-[#C9C5CA] my-5">
              <div className="flex items-center justify-between">
                <p className="text-xs">Proof of payment</p>
              </div>
              <Button className="w-full py-2 mt-4 rounded-xl">
                Download Comfirmation
              </Button>
            </div>
          </div>

          <Button
            action={() => navigate("/chat")}
            className="text-base font-medium bg-[#1B0924] mt-5 sm:hidden block"
          >
            <div className="flex items-center gap-2">
              <IoChatbubbleOutline size={20} />
              <p>Contact student</p>
            </div>
          </Button>
        </>
      )}
    </div>
  );
};

export default Others;
