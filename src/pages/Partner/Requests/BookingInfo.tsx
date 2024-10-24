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
import { apiRequest } from "../../../utils/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { downloadImage, downloadPDF } from "../../../hooks/Download";

const postPartnerAttachments = async (postData) => {
  try {
    const data = await apiRequest({
      url: "/api/partner/partnerAttachments",
      method: "POST",
      data: postData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data?.data;
  } catch (errors) {
    toast.error(errors);
    console.log("🚀 ~ loginPost ~ error:", errors);
  }
};

const BookingInfo = ({ step, packageInfo, design, data }: any) => {
  console.log("🚀 ~ BookingInfo ~ data:", data);
  console.log("🚀 ~ BookingInfo ~ packageInfo:", packageInfo);
  const [showStudentInfo, setShowStudentInfo] = useState(true);
  const [netInvoice, setNetInvoice] = useState(null);
  const [grossInvoice, setGrossInvoice] = useState(null);
  const [accept, setAccept] = useState(null);
  const [residence, setResidence] = useState(null);
  const [airport, setAirport] = useState(null);
  const navigate = useNavigate();

  const CourseData = [
    {
      id: 1,
      name: "Course Details",
      isConfirmed: packageInfo?.accept,
    },
    {
      id: 2,
      name: "Accommodation",
      isConfirmed: packageInfo?.airport,
    },
    {
      id: 3,
      name: "Airport Transfers",
      isConfirmed: packageInfo?.residence,
    },
  ];

  const CourseInformationData = {
    image: packageInfo?.image,
    partner: packageInfo?.partner,
    city: packageInfo?.city,
    date_start: packageInfo?.date_start,
    invoice: packageInfo?.invoice,
  };

  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ["attach_receipt"],
    mutationFn: (data: any) => postPartnerAttachments(data),
    onSuccess: (data) => {
      console.log(data);
      toast.success("Image attached successfully");
      setNetInvoice(null);
    },
  });

  const handleNetInvoiceChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNetInvoice(file);
    }
    mutate({
      invoice: netInvoice,
      accept: null,
      residence: null,
      airport: null,
    });
  };

  const handleGrossInvoiceChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGrossInvoice(file);
    }
    mutate({
      invoice: grossInvoice,
      accept: null,
      residence: null,
      airport: null,
    });
  };

  const handleِِAcceptChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAccept(file);
    }
    mutate({
      invoice: null,
      accept: accept,
      residence: null,
      airport: null,
    });
  };

  const handleِِResidenceChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResidence(file);
    }
    mutate({
      invoice: null,
      accept: null,
      residence: residence,
      airport: null,
    });
  };

  const handleِِAirportChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAirport(file);
    }
    mutate({
      invoice: null,
      accept: null,
      residence: null,
      airport: airport,
    });
  };

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
      <div className="bg-[#F7F7F7] rounded-2xl py-8 sm:py-16 px-4 md:block hidden">
        <div className="grid grid-cols-12 gap-x-5 border-b border-[#D1CBCB] pb-8">
          <div className="col-span-4 lg:col-span-3">
            <img
              src={CourseInformationData?.image}
              className="h-40 w-52 rounded-2xl"
            />
          </div>
          <div className="col-span-8 lg:col-span-9 ps-8">
            <div className="flex items-center justify-between border-b border-[#D1CBCB] pb-2 mb-4">
              <h2 className="text-5xl">
                {CourseInformationData?.partner}{" "}
                <span className="text-sm text-mainColor">
                  {CourseInformationData?.city}
                </span>
              </h2>
            </div>
            <div className="flex lg:items-center items-start gap-y-4 lg:flex-row flex-col justify-between">
              <div className="flex items-center gap-16">
                <div className="">
                  <p className="text-sm">Booking Date:</p>
                  <h2 className="text-mainColor">
                    {CourseInformationData?.date_start}
                  </h2>
                </div>
                <div className="">
                  <p className="text-sm">School Contact::</p>
                  <h2 className="text-mainColor">Stacey Machee</h2>
                </div>
              </div>
              <div className="flex lg:flex-col flex-row items-center gap-2 w-full lg:w-auto">
                <div className="relative w-full bg-[#FFCC1A] rounded-3xl text-center py-2 px-2 lg:px-16 ">
                  <label
                    htmlFor="netInvoice"
                    className="cursor-pointer w-full text-black leading-[.4]"
                  >
                    <p className="text-lg font-[500]">Upload Net Invoice</p>
                    <span className="text-xs">Uploaded docs here</span>
                  </label>
                  <input
                    id="netInvoice"
                    type="file"
                    accept="image/*"
                    onChange={handleNetInvoiceChange}
                    className="absolute hidden cursor-pointer top-0 left-0 w-full h-full z-20"
                  />
                </div>
                <div className="relative w-full bg-[#FFCC1A] rounded-3xl text-center py-2 px-2 lg:px-16 ">
                  <label
                    htmlFor="grossInvoice"
                    className=" cursor-pointer w-full text-black leading-[.4]"
                  >
                    <p className="text-lg font-[500]">Upload Gross Invoice</p>
                    <span className="text-xs">Uploaded docs here</span>
                  </label>
                  <input
                    id="grossInvoice"
                    type="file"
                    accept="image/*"
                    onChange={handleGrossInvoiceChange}
                    className="absolute hidden cursor-pointer top-0 left-0 w-full h-full z-20"
                  />
                </div>
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
              <div className="flex items-end gap-x-2 lg:gap-x-10">
                <div
                  onClick={() => {
                    const fileExtension = data.packageInfo?.passport
                      .split(".")
                      .pop()
                      .toLowerCase();
                    if (
                      ["jpg", "jpeg", "png", "gif", "svg", "bmp"].includes(
                        fileExtension
                      )
                    ) {
                      downloadImage(data.packageInfo?.passport);
                    } else {
                      downloadPDF(data.packageInfo?.passport);
                    }
                  }}
                  className="border cursor-pointer bg-[#1B0924] text-white border-[#D1CBCB] rounded-2xl text-center py-4 px-2 md:px-6 w-[40%]"
                >
                  <p className="text-sm">Student Passport</p>
                </div>
                <div
                  onClick={() => {
                    const fileExtension = data.packageInfo?.school_certificate
                      .split(".")
                      .pop()
                      .toLowerCase();
                    if (
                      ["jpg", "jpeg", "png", "gif", "svg", "bmp"].includes(
                        fileExtension
                      )
                    ) {
                      downloadImage(data.packageInfo?.school_certificate);
                    } else {
                      downloadPDF(data.packageInfo?.school_certificate);
                    }
                  }}
                  className="border cursor-pointer bg-[#1B0924] text-white border-[#D1CBCB] rounded-2xl text-center py-4 px-2 md:px-8 w-[60%]"
                >
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
            <div className="grid my-8 lg:grid-cols-2 gap-x-8 lg:gap-x-32 gap-y-8">
              {(!design ? CourseData : [CourseData?.[0]])?.map(
                (item, index) =>
                  item && (
                    <div
                      key={index}
                      className={`border border-[#FFCC1A] rounded-3xl py-4 px-4 relative h-36`}
                    >
                      <div className="flex items-center justify-between">
                        <p>{item.name}</p>
                        <span
                          className={cn(
                            "text-xs py-1.5 rounded-2xl bg-[#39FF0A] px-8"
                          )}
                        >
                          Confirmed
                        </span>
                      </div>
                      <div className="">
                        <Button className="absolute left-0 right-0 w-full bg-[#FFCC1A] text-black py-3 leading-[.4] -bottom-1 rounded-3xl">
                          <p className="text-lg font-[500]">
                            Upload Confirmation
                          </p>
                          <span className="text-xs">Uploaded docs here</span>
                          <input
                            id="netInvoice"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              if (item.id === 1) {
                                handleِِAcceptChange(e);
                              } else if (item.id === 2) {
                                handleِِResidenceChange(e);
                              } else {
                                handleِِAirportChange(e);
                              }
                            }}
                            className="absolute opacity-0 cursor-pointer top-0 left-0 w-full h-full z-20"
                          />
                        </Button>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      {step === 2 && (
        <div className="md:hidden block">
          <div className="bg-[#F7F7F7] rounded-2xl py-8 sm:py-12 px-4 block shadow-md">
            <div className=" border-b border-[#D1CBCB] pb-2">
              <div className="flex items-start gap-x-3">
                <div>
                  <div className="mb-6">
                    <img
                      src={CourseInformationData?.image}
                      className="h-44 w-44 rounded-2xl"
                    />
                  </div>
                </div>
                <div>
                  <div className="">
                    <div className="pb-2">
                      <h2 className="text-2xl font-medium">
                        {CourseInformationData?.partner}
                      </h2>
                      <div className="flex items-center gap-x-1 my-3.5">
                        <div className="bg-mainColor rounded-xl flex items-center justify-center w-[1.8rem] h-[1.8rem] ">
                          <IoLocationOutline
                            fill="white"
                            className="w-6 h-6 text-white"
                          />
                        </div>
                        <span className="text-sm font-medium">
                          {CourseInformationData?.city}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col text-sm gap-x-1">
                  <p className="text-sm">Booking Date:</p>
                  <h2 className="text-[#79767A]">
                    {CourseInformationData?.date_start}
                  </h2>
                </div>
                <div className="flex flex-col text-sm gap-x-1">
                  <p className="text-sm">School Contact:</p>
                  <h2 className="text-[#79767A]">Stacey Machee</h2>
                </div>
              </div>
            </div>

            <div className="border-b border-[#D1CBCB] pb-4">
              <div className="relative flex items-center justify-between w-full mt-4 text-center">
                <Button className="px-5 bg-[#FFB6BF] text-black py-1.5 text-xs font-medium relative">
                  <p className="mb-2 text-xs font-bold">Upload net invoice</p>
                  <span>Upload docs here</span>
                  <input
                    id="netInvoice"
                    type="file"
                    accept="image/*"
                    onChange={handleNetInvoiceChange}
                    className="absolute opacity-0 cursor-pointer top-0 left-0 w-full h-full z-20"
                  />
                </Button>
                <div className="relative flex items-center justify-between">
                  <Button className="px-5 bg-[#FFB6BF] text-black py-1.5 text-xs font-medium relative">
                    <p className="mb-2 text-xs font-bold">
                      Upload Gross Invoice
                    </p>
                    <span>Upload docs here</span>
                    <input
                      id="grossInvoice"
                      type="file"
                      accept="image/*"
                      onChange={handleGrossInvoiceChange}
                      className="absolute opacity-0 cursor-pointer top-0 left-0 w-full h-full z-20"
                    />
                  </Button>
                </div>
              </div>
            </div>

            <div className="pb-4 border-b border-[#D1CBCB]">
              <div className="flex items-center justify-between pb-2 my-8">
                <h2 className="text-xl">Downloading student documents ::</h2>
              </div>
              <div className="flex justify-between gap-x-2">
                <Button
                  action={() => {
                    const fileExtension = data.packageInfo?.passport
                      .split(".")
                      .pop()
                      .toLowerCase();
                    if (
                      ["jpg", "jpeg", "png", "gif", "svg", "bmp"].includes(
                        fileExtension
                      )
                    ) {
                      downloadImage(data.packageInfo?.passport);
                    } else {
                      downloadPDF(data.packageInfo?.passport);
                    }
                  }}
                  className="text-sm bg-[#1B0924]"
                >
                  Student Passport
                </Button>
                <Button
                  action={() => {
                    const fileExtension = data.packageInfo?.school_certificate
                      .split(".")
                      .pop()
                      .toLowerCase();
                    if (
                      ["jpg", "jpeg", "png", "gif", "svg", "bmp"].includes(
                        fileExtension
                      )
                    ) {
                      downloadImage(data.packageInfo?.school_certificate);
                    } else {
                      downloadPDF(data.packageInfo?.school_certificate);
                    }
                  }}
                  className="text-sm bg-[#1B0924]"
                >
                  High School Certificate
                </Button>
              </div>
            </div>

            <div className="">
              <div className="">
                <h2 className="mt-12 text-3xl">Options</h2>
                <div className="grid mt-8 md:grid-cols-2 gap-x-8 lg:gap-x-32 gap-y-8">
                  {(design ? CourseData : [CourseData?.[0]])?.map(
                    (item, index) =>
                      item && (
                        <div
                          key={index}
                          className={`border border-[#FFCC1A] rounded-3xl py-4 px-4 relative h-36`}
                        >
                          <div className="flex items-center justify-between">
                            <p>{item.name}</p>
                            <span
                              className={cn(
                                "text-xs py-1.5 rounded-2xl bg-[#39FF0A] px-8"
                              )}
                            >
                              Confirmed
                            </span>
                          </div>
                          <Button className="absolute left-0 right-0 w-full bg-[#FFCC1A] text-black py-3 leading-[.4] -bottom-1 rounded-3xl">
                            <p className="text-lg font-[500]">
                              Upload Confirmation
                            </p>
                            <span className="text-xs">Uploaded docs here</span>
                            <input
                              id="netInvoice"
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                if (item.id === 1) {
                                  handleِِAcceptChange(e);
                                } else if (item.id === 2) {
                                  handleِِResidenceChange(e);
                                } else {
                                  handleِِAirportChange(e);
                                }
                              }}
                              className="absolute opacity-0 cursor-pointer top-0 left-0 w-full h-full z-20"
                            />
                          </Button>
                        </div>
                      )
                  )}
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
