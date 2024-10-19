import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import LoginBg from "../../../assets/loginBg.jpg";
import Button from "../../../components/atoms/Button/Button";
import cn from "../../../utils/cn";
import { IoMdArrowDropdownCircle } from "react-icons/io";

const BookingInfo = () => {
  const [showStudentInfo, setShowStudentInfo] = useState(true);

  const CourseData = [
    {
      title: "Course Details:",
      name: "General English 20",
      type: "Single Room, shared Bathroom, Bed & Breakfast",
      duration: "اسبوع",
      dates: "2025 05 - 2024",
    },
    {
      title: "Accommodation",
      name: "Homestay",
      type: "Single Room, shared Bathroom, Bed & Breakfast",
      duration: "12 weeks",
      dates: "12 Feb 2024 - 05 Jul 2025",
    },
    {
      title: "Airport Transfers:",
      name: "Manchester Airport",
      type: "Arrival",
      duration: "12 weeks",
      dates: "12 Feb 2024 - 05 Jul 2025",
    },
  ];
  return (
    <div className="mb-20">
      <div className="flex gap-6">
        <h2 className="text-3xl">{"Booking Info"}</h2>
        <IoMdArrowDropdownCircle
          onClick={() => setShowStudentInfo((prev) => !prev)}
          className={cn(
            "text-3xl cursor-pointer transition-all duration-300 text-mainColor",
            {
              "-rotate-90": !showStudentInfo,
            }
          )}
        />
      </div>

      {showStudentInfo && (
        <div className="bg-[#F7F7F7] rounded-2xl py-16 px-4">
          <div className="grid grid-cols-12 gap-x-5 border-b border-[#D1CBCB] pb-8">
            <div className="col-span-4 lg:col-span-3">
              <img src={LoginBg} className="w-full h-full rounded-2xl" />
            </div>
            <div className="col-span-8 lg:col-span-9 ps-8">
              <div className="flex items-center justify-between border-b border-[#D1CBCB] mb-4">
                <h2 className="text-5xl">
                  Lila <span className="text-sm text-mainColor">Liverpool</span>
                </h2>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-16">
                  <div className="">
                    <p className="text-sm">Booking Date:</p>
                    <h2 className="text-mainColor">22 Jan 2023</h2>
                  </div>
                  <div className="">
                    <p className="text-sm">School Contact::</p>
                    <h2 className="text-mainColor">Stacey Machee</h2>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-y-2 ">
                  <Button className=" bg-[#FFCC1A] w-80 text-black rounded-3xl text-center py-2 px-2 lg:px-16 leading-[.4]">
                    <p className="text-lg font-[500]">Upload Net Invoice</p>
                    <span className="text-xs">Uploaded docs here</span>
                  </Button>
                  <Button className=" bg-[#FFCC1A] w-80 text-black rounded-3xl text-center py-2 px-2 lg:px-16 leading-[.4]">
                    <p className="text-lg font-[500]">Upload Gross Invoice</p>
                    <span className="text-xs">Uploaded docs here</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-x-5 border-b border-[#D1CBCB] pb-8">
            <div className="col-span-4 lg:col-span-3"></div>
            <div className="col-span-8 lg:col-span-9">
              <div className="flex items-center justify-between pb-2 my-8">
                <h2 className="text-3xl">Downloading Student Documents:</h2>
              </div>
              <div>
                <div className="flex items-end gap-x-10">
                  <div className="border bg-[#1B0924] text-white border-[#D1CBCB] rounded-2xl text-center py-4 px-2 md:px-8 w-[40%]">
                    <p className="text-sm">Student Passport</p>
                  </div>
                  <div className="border bg-[#1B0924] text-white border-[#D1CBCB] rounded-2xl text-center py-4 px-2 md:px-8 w-[45%]">
                    <p className="text-sm">High School Certificate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-x-5">
            <div className="col-span-4 lg:col-span-3"></div>
            <div className="col-span-8 lg:col-span-9 ">
              <h2 className="mt-12 text-3xl">Options</h2>
              <div className="grid my-8 md:grid-cols-2 gap-x-8 lg:gap-x-32 gap-y-8">
                {CourseData?.map((item, index) => (
                  <div
                    key={index}
                    className="border border-[#FFCC1A] rounded-3xl py-4 px-4 relative h-[22rem]"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs">{item.title}</p>
                      <span
                        className={cn(
                          "text-xs py-1.5 rounded-2xl bg-[#39FF0A] px-8"
                        )}
                      >
                        Confirmed
                      </span>
                    </div>
                    <h2 className="my-3 text-xl text-mainColor">{item.name}</h2>
                    <div className="border-t border-[#D1CBCB] text-sm pt-4">
                      <div>
                        <h3>type</h3>
                        <p className="mt-1 text-mainColor">{item.type}</p>
                      </div>
                      <div className="my-2">
                        <h3>Duration</h3>
                        <p className="mt-1 text-mainColor">{item.duration}</p>
                      </div>
                      <div>
                        <h3>Dates</h3>
                        <p className="mt-1 text-mainColor">{item.dates}</p>
                      </div>
                    </div>
                    <Button className="absolute left-0 right-0 w-full bg-[#FFCC1A] text-black py-3 leading-[.4] -bottom-1 rounded-3xl">
                      <p className="text-lg font-[500]">Upload Confirmation</p>
                      <span className="text-xs">Uploaded docs here</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingInfo;
