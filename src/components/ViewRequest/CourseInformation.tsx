import { t } from "i18next";
import React, { useRef, useState } from "react";
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
import { blob } from "stream/consumers";
import { saveAs } from "file-saver";
import { apiRequest } from "../../utils/axios";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { downloadImage, downloadPDF } from "../../hooks/Download";

const postAttachReceipt = async (postData) => {
  try {
    const data = await apiRequest({
      url: "/api/student/attachments",
      method: "POST",
      data: postData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data?.data;
  } catch (errors) {
    toast.error(errors);
  }
};

// const fetchDownLoadImg = async (item) => {
//   console.log("🚀 ~ fetchDownLoadImg ~ item:", item)
//   try {
//     const response = await apiRequest({
//       url: `/api/student/download-image/${item}`,
//       method: "GET",
//     });

//     return response?.data || [];
//   } catch (error) {
//     console.error("Error fetching items:", error.message);
//   }
// };

const CourseInformation = ({ steps, packageInfo, design, data }) => {
  const navigate = useNavigate();
  const [attachReceiptImage, setAttachReceiptImage] = useState(null);
  const [previewAttachReceiptImage, setPreviewAttachReceiptImage] =
    useState(null);

  const [passportImage, setPassportImage] = useState(null);
  const [previewPassportImage, setPreviewPassportImage] = useState(null);

  const [certificateImage, setCertificateImage] = useState(null);
  const [previewCertificateImage, setPreviewCertificateImage] = useState(null);

  const CourseData = [
    {
      name: t("Confirmation of acceptance"),
      isConfirmed: "https://images6.alphacoders.com/416/thumb-1920-416337.jpg",
    },
    {
      name: t("Confirmation of accommodation"),
      isConfirmed: packageInfo?.airport,
    },
    {
      name: t("Confirmation of airport pickup"),
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

  const handleAttachReceiptChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachReceiptImage(file);
      setPreviewAttachReceiptImage(URL.createObjectURL(file));
    }
  };

  const handlePassportChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPassportImage(file);
      setPreviewPassportImage(URL.createObjectURL(file));
    }
  };

  const handleCertificateChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCertificateImage(file);
      setPreviewCertificateImage(URL.createObjectURL(file));
    }
  };

  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ["attach_receipt"],
    mutationFn: (data: any) => postAttachReceipt(data),
    onSuccess: (data) => {
      console.log(data);
      toast.success(t("Image attached successfully"));
      setAttachReceiptImage(null);
      setPreviewAttachReceiptImage(null);
    },
  });

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
            <img
              src={CourseInformationData?.image}
              className="h-40 w-52 rounded-2xl"
            />
          </div>
          <div className="col-span-8 lg:col-span-9">
            <div className="flex items-center justify-between border-b border-[#D1CBCB] mb-8 pb-2">
              <h2 className="text-5xl">
                {CourseInformationData?.partner}{" "}
                <span className="text-sm text-mainColor">
                  {CourseInformationData?.city}
                </span>
              </h2>
              <div className="text-sm">
                <h2>{t("Application date:")}</h2>
                <p className="text-mainColor">
                  {CourseInformationData?.date_start}
                </p>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <div className="border border-[#D1CBCB] rounded-2xl text-center py-4 px-2 lg:px-8 w-3/4 relative cursor-pointer">
                  <span
                    className="absolute z-50 px-3 py-1 text-xs text-white -translate-x-1/2 bg-mainColor rounded-2xl left-1/2 -bottom-3"
                    onClick={() => {
                      const type = design !== null ? "design" : "app";
                      mutate({
                        id: data?.personalInfo?.id,
                        passport: null,
                        school_certificate: null,
                        full_payout_receipt: attachReceiptImage,
                        type: type,
                      });
                    }}
                  >
                    {t("Attach")}
                  </span>
                  <p className="text-sm">
                    {t("You can attach the receipt for full payment here")}
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAttachReceiptChange}
                    className="absolute opacity-0 cursor-pointer top-0 left-0 w-full h-full z-20"
                  />
                  {previewAttachReceiptImage && (
                    <img
                      src={previewAttachReceiptImage}
                      className="absolute left-5 top-1/2 -translate-y-1/2 w-16 h-10"
                    />
                  )}
                </div>
                <div className="border border-[#D1CBCB] rounded-2xl text-center py-4 px-4 md:px-8 w-1/2 relative">
                  <span
                    onClick={() => {
                      const fileExtension = CourseInformationData?.invoice
                        .split(".")
                        .pop()
                        .toLowerCase();
                      if (
                        ["jpg", "jpeg", "png", "gif", "svg", "bmp"].includes(
                          fileExtension
                        )
                      ) {
                        downloadImage(CourseInformationData?.invoice);
                      } else {
                        downloadPDF(CourseInformationData?.invoice);
                      }
                    }}
                    className="absolute px-3 py-1 text-xs text-white -translate-x-1/2 bg-mainColor rounded-2xl left-1/2 -bottom-3 cursor-pointer"
                  >
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
                <div className="border border-[#D1CBCB] rounded-2xl text-center py-4 px-2 md:px-8 w-[40%] relative">
                  <p className="text-sm">{t("Passport")}</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePassportChange}
                    className="absolute opacity-0 cursor-pointer top-0 left-0 w-full h-full z-20"
                  />
                  {previewPassportImage && (
                    <img
                      src={previewPassportImage}
                      className="absolute left-5 top-1/2 -translate-y-1/2 w-16 h-10"
                    />
                  )}
                </div>
                <div className="border border-[#D1CBCB] rounded-2xl text-center py-4 px-2 md:px-8 w-[45%] relative">
                  <p className="text-sm">{t("High school diploma")}</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCertificateChange}
                    className="absolute opacity-0 cursor-pointer top-0 left-0 w-full h-full z-20"
                  />
                  {previewCertificateImage && (
                    <img
                      src={previewCertificateImage}
                      className="absolute left-5 top-1/2 -translate-y-1/2 w-16 h-10"
                    />
                  )}
                </div>
                <p
                  className="px-3 py-1 text-xs text-white bg-mainColor rounded-2xl whitespace-nowrap cursor-pointer"
                  onClick={() => {
                    const type = design !== null ? "design" : "app";
                    mutate({
                      id: data?.personalInfo?.id,
                      passport: passportImage,
                      school_certificate: certificateImage,
                      full_payout_receipt: null,
                      type: type,
                    });
                  }}
                >
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
            {/* <div className="grid my-8 md:grid-cols-2 gap-x-8 lg:gap-x-32 gap-y-8">
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
            </div> */}
            <div className="grid my-8 md:grid-cols-2 gap-x-8 lg:gap-x-32 gap-y-8">
              {(design ? CourseData : [CourseData?.[0]])?.map(
                (item, index) =>
                  item && (
                    <div
                      key={index}
                      className={`border border-mainColor rounded-3xl py-4 px-4 relative h-32`}
                    >
                      <div className="flex items-center justify-between">
                        <p>{item.name}</p>
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
                      {/* <div ref={elementRef}>
                        <img src={item.isConfirmed} />
                      </div> */}
                      <Button
                        action={() => {
                          const fileExtension = item.isConfirmed
                            .split(".")
                            .pop()
                            .toLowerCase();
                          if (
                            [
                              "jpg",
                              "jpeg",
                              "png",
                              "gif",
                              "svg",
                              "bmp",
                            ].includes(fileExtension)
                          ) {
                            downloadImage(item.isConfirmed);
                          } else {
                            downloadPDF(item.isConfirmed);
                          }
                        }}
                        className="absolute left-0 right-0 w-full py-3 -bottom-1 rounded-2xl"
                      >
                        {t("Download")}
                      </Button>
                    </div>
                  )
              )}
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
                <img
                  src={CourseInformationData?.image}
                  className="w-36 h-[7rem] rounded-2xl"
                />
              </div>
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
                  <div className="flex items-center text-sm gap-x-1">
                    <h2 className="font-medium">{t("Application date:")}</h2>
                    <p className="text-[#79767A]">
                      {CourseInformationData?.date_start}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="border-b border-[#D1CBCB] pb-4">
                <div className="relative flex items-center justify-between w-full mt-4 text-center">
                  <label htmlFor="attach" className="text-sm font-medium">
                    {t("You can attach the receipt for full payment here")}
                  </label>
                  <input
                    id="attach"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      handleAttachReceiptChange(e);
                      toast.success(t("Image uploaded successfully"));
                    }}
                    className="absolute opacity-0 cursor-pointer top-0 left-0 w-full h-full z-20"
                  />
                  <Button
                    className="px-5 py-1.5 text-sm font-medium relative z-50"
                    action={() => {
                      const type = design !== null ? "design" : "app";
                      mutate({
                        id: data?.personalInfo?.id,
                        passport: null,
                        school_certificate: null,
                        full_payout_receipt: attachReceiptImage,
                        type: type,
                      });
                    }}
                  >
                    {t("Attach")}
                  </Button>
                </div>
                <div className="relative flex items-center justify-between mt-4">
                  <p className="text-sm font-medium">
                    {t("Download the invoice")}
                  </p>
                  <Button
                    action={() => {
                      const fileExtension = CourseInformationData?.invoice
                        .split(".")
                        .pop()
                        .toLowerCase();
                      if (
                        ["jpg", "jpeg", "png", "gif", "svg", "bmp"].includes(
                          fileExtension
                        )
                      ) {
                        downloadImage(CourseInformationData?.invoice);
                      } else {
                        downloadPDF(CourseInformationData?.invoice);
                      }
                    }}
                    className="px-5 py-1.5 text-sm font-medium"
                  >
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
                    <li className="!list-disc md:px-8 w-[40%] relative">
                      <label htmlFor="Passport" className="text-sm">
                        {t("Passport")}
                      </label>
                      <input
                        id="Passport"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          handlePassportChange(e);
                          toast.success(t("Image uploaded successfully"));
                        }}
                        className="absolute opacity-0 cursor-pointer top-0 left-0 w-full h-full z-20"
                      />
                    </li>
                    <li className="!list-disc md:px-8 w-[45%] relative">
                      <label htmlFor="diploma" className="text-sm">
                        {t("High school diploma")}
                      </label>
                      <input
                        id="diploma"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          handleCertificateChange(e);
                          toast.success(t("Image uploaded successfully"));
                        }}
                        className="absolute opacity-0 cursor-pointer top-0 left-0 w-full h-full z-20"
                      />
                    </li>
                  </ul>
                  <div className="flex items-center justify-end mt-2">
                    <Button
                      className="px-6 py-1.5 text-sm font-medium"
                      action={() => {
                        const type = design !== null ? "design" : "app";
                        mutate({
                          id: data?.personalInfo?.id,
                          passport: passportImage,
                          school_certificate: certificateImage,
                          full_payout_receipt: null,
                          type: type,
                        });
                      }}
                    >
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
                  {(design ? CourseData : [CourseData?.[0]])?.map(
                    (item, index) =>
                      item && (
                        <div
                          key={index}
                          className="border border-[#C9C5CA] rounded-xl py-4 px-4 relative"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <p className="font-medium">{item.name}</p>
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
                          <Button
                            className="mt-4 w-full rounded-xl py-2.5"
                            action={() => {
                              const fileExtension = item.isConfirmed
                                .split(".")
                                .pop()
                                .toLowerCase();
                              if (
                                [
                                  "jpg",
                                  "jpeg",
                                  "png",
                                  "gif",
                                  "svg",
                                  "bmp",
                                ].includes(fileExtension)
                              ) {
                                downloadImage(item.isConfirmed);
                              } else {
                                downloadPDF(item.isConfirmed);
                              }
                            }}
                          >
                            {t("Download")}
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
              <p>{t("Contact the institute")}</p>
            </div>
          </Button>
        </>
      )}
    </div>
  );
};

export default CourseInformation;
