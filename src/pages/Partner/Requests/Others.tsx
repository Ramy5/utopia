import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import cn from "../../../utils/cn";
import Button from "../../../components/atoms/Button/Button";
import { IoMdArrowDropdownCircle } from "react-icons/io";

const Others = () => {
  const [others, setOthers] = useState(true);

  const CourseData = [
    {
      name: "انجليزي عام ٢٠ درس في الاسبوع",
      type: "Student Visa",
      duration: "اسبوع",
      dates: "2025 05 - 2024",
      isConfirmed: true,
    },
    {
      name: "السكن العائلي ٢٠ درس في الاسبوع",
      type: "Student confirmed Inssurance",
      duration: "اسبوع",
      dates: "2025 05 - 2024",
      isConfirmed: false,
    },
    {
      name: "السكن العائلي ٢٠ درس في الاسبوع",
      type: "Flight confirmed Ticket",
      duration: "اسبوع",
      dates: "2025 05 - 2024",
      isConfirmed: false,
    },
  ];
  return (
    <div className="mb-20">
      <div className="flex gap-6">
        <h2 className="text-3xl">{"others"}</h2>
        <IoMdArrowDropdownCircle
          onClick={() => setOthers((prev) => !prev)}
          className={cn(
            "text-3xl cursor-pointer transition-all duration-300 text-mainColor",
            {
              "-rotate-90": !others,
            }
          )}
        />
      </div>

      {others && (
        <>
          <div className="grid grid-cols-2 my-8 md:grid-cols-3 gap-x-8 lg:gap-x-20 gap-y-12">
            {CourseData?.map((item, index) => (
              <div
                key={index}
                className="bg-[#F7F7F7] rounded-3xl py-4 px-4 relative h-32"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs">{item.type}</p>
                  <span
                    className={cn(
                      "text-xs py-1.5 rounded-2xl bg-mainColor text-[#39FF0A] px-8"
                    )}
                  >
                    confirmed
                  </span>
                </div>
                <Button className="absolute w-[90%] left-1/2 bg-[#1B0924] -translate-x-1/2 -bottom-3 rounded-3xl py-2">
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
        </>
      )}
    </div>
  );
};

export default Others;
