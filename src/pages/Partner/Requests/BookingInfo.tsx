import React, { useState } from "react";
import {
  IoChatbubbleOutline,
  IoChevronDown,
  IoLocationOutline,
} from "react-icons/io5";
import LoginBg from "../../../assets/loginBg.jpg";
import Button from "../../../components/atoms/Button/Button";
import cn from "../../../utils/cn";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const BookingInfo = ({ step }: { step?: number }) => {
  const [showStudentInfo, setShowStudentInfo] = useState(true);
  const navigate = useNavigate();

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
    <div className="mx-4 mb-8">
      <div className="hidden gap-6 md:flex">
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

      {/* DESKTOP */}
      {showStudentInfo && (
        <div className="bg-[#F7F7F7] rounded-2xl py-8 sm:py-16 px-4 md:block hidden">
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

      {/* MOBILE */}
      {step === 2 && (
        <div className="md:hidden">
          <div className="bg-[#F7F7F7] rounded-2xl py-8 sm:py-12 px-4 block shadow-md">
            <div className=" border-b border-[#D1CBCB] pb-2">
              <div className="flex items-start gap-x-3">
                <div>
                  <div className="mb-6">
                    <img src={LoginBg} className="h-44 w-44 rounded-2xl" />
                  </div>
                </div>
                <div>
                  <div className="">
                    <div className="pb-2">
                      <h2 className="text-2xl font-medium">Lila</h2>
                      <div className="flex items-center gap-x-1 my-3.5">
                        <div className="bg-mainColor rounded-xl flex items-center justify-center w-[1.8rem] h-[1.8rem] ">
                          <IoLocationOutline
                            fill="white"
                            className="w-6 h-6 text-white"
                          />
                        </div>
                        <span className="text-sm font-medium">Liverpool</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col text-sm gap-x-1">
                  <p className="text-sm">Booking Date:</p>
                  <h2 className="text-[#79767A]">22 Jan 2023</h2>
                </div>
                <div className="flex flex-col text-sm gap-x-1">
                  <p className="text-sm">School Contact:</p>
                  <h2 className="text-[#79767A]">Stacey Machee</h2>
                </div>
              </div>
            </div>

            <div className="border-b border-[#D1CBCB] pb-4">
              <div className="relative flex items-center justify-between w-full mt-4 text-center">
                <Button className="px-5 bg-[#FFB6BF] text-black py-1.5 text-xs font-medium">
                  <p className="mb-2 text-xs font-bold">
                    upload the Net Invoice here
                  </p>
                  <span>Upload docs here</span>
                </Button>
                <div className="relative flex items-center justify-between">
                  <Button className="px-5 bg-[#FFB6BF] text-black py-1.5 text-xs font-medium">
                    <p className="mb-2 text-xs font-bold">
                      Upload Gross Invoice
                    </p>
                    <span>Upload docs here</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="pb-4 border-b border-[#D1CBCB]">
              <div className="flex items-center justify-between pb-2 my-8">
                <h2 className="text-xl">Downloading student documents ::</h2>
              </div>
              <div className="flex justify-between">
                <Button className="text-sm bg-[#1B0924]">
                  Student Passport
                </Button>
                <Button className="text-sm bg-[#1B0924]">
                  High School Certificate
                </Button>
              </div>
            </div>

            <div className="">
              <div className="">
                <h2 className="mt-12 text-3xl">Options</h2>
                <div className="grid mt-8 md:grid-cols-2 gap-x-8 lg:gap-x-32 gap-y-8">
                  {CourseData?.map((item, index) => (
                    <div
                      key={index}
                      className="border border-[#C9C5CA] rounded-xl py-4 px-4 relative"
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
                      <h2 className="my-3 text-xl text-mainColor">
                        {item.name}
                      </h2>
                      <div className="border-t border-[#D1CBCB] text-sm pt-4">
                        {/* <div>
                          <h3 className="font-semibold">Type</h3>
                          <p className="text-[#79767A] mt-2">{item.type}</p>
                        </div> */}
                        <div className="flex items-center gap-5 my-5">
                          <h3 className="font-semibold">Duration</h3>
                          <p className="text-[#79767A]">{item.duration}</p>
                        </div>
                        <div className="flex items-center gap-5">
                          <h3 className="font-semibold">Dates</h3>
                          <p className="text-[#79767A]">{item.dates}</p>
                        </div>
                      </div>
                      <Button className="mt-4 w-full rounded-xl py-2.5">
                        Upload Confirmation
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
              <p>Contact Student</p>
            </div>
          </Button>
        </div>
      )}
    </div>
  );
};

export default BookingInfo;
