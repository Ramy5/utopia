import { t } from "i18next";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import RequestStatus01 from "../../assets/RequestStatus01.svg";
import RequestStatus02 from "../../assets/RequestStatus02.svg";
import RequestStatus03 from "../../assets/RequestStatus03.svg";
import RequestStatus04 from "../../assets/RequestStatus04.svg";
import RequestStatus05 from "../../assets/RequestStatus05.svg";
import StraightLine from "../../assets/StraightLine.svg";
import DashedLine from "../../assets/DashedLine.svg";

const RequestStatus = ({ statusData }) => {

  const RequestStatusData = [
    {
      title: "Submit the request and pay the deposit",
      percentageNumber: "20%",
      day: "8 يناير",
      status: false,
    },
    {
      title: "Complete the placement test",
      percentageNumber: "40%",
      day: "8 يناير",
      status: false,
    },
    {
      title: "Confirmation of acceptance",
      percentageNumber: "60%",
      day: "8 يناير",
      status: false,
    },
    {
      title: "Complete the payment",
      percentageNumber: "80%",
      day: "8 يناير",
      status: false,
    },
    {
      title: "Final acceptance",
      percentageNumber: "100%",
      day: "8 يناير",
      status: false,
    },
  ];

  const updatedRequestStatusData = RequestStatusData.map((item, index) => {
    if (index <= statusData?.status) {
      return { ...item, status: true };
    } else {
      return { ...item, status: false };
    }
  });

  console.log("🚀 ~ updatedRequestStatusData ~ updatedRequestStatusData:", updatedRequestStatusData)


  const notesData = [
    {
      phase: "Phase one:",
      phase_type: "Submit the request and pay the deposit",
      phase_state: "The application has been submitted successfully",
    },
    {
      phase: "Phase two:",
      phase_type: "Confirmation of acceptance",
      phase_state: "Please complete all the requirements",
    },
    {
      phase: "Phase three:",
      phase_type: "Complete the payment",
      phase_state:
        "The application is under review, and you will be informed of any updates soon",
    },
    {
      phase: "Phase four:",
      phase_type: "Final acceptance",
      phase_state:
        "Congratulations! You have been accepted permanently, and you can download your acceptance letter from the booking information at the bottom of the page",
    },
  ];
  return (
    <div>
      <div className="bg-[#F7F7F7] rounded-2xl flex sm:flex-row flex-col items-center justify-between px-3 sm:px-5 py-8 sm:py-12 relative z-10 my-6 sm:my-8 shadow-md sm:shadow-none">
        <div className="bg-[#707070] w-[96%] h-[0.7px] absolute left-1/2 -translate-x-1/2 bottom-[5.22rem] -z-10 sm:block hidden"></div>
        {updatedRequestStatusData?.map((item, index) => (
          <div key={index} className="text-center sm:block hidden">
            <span className="text-xs">{item.percentageNumber}</span>
            <p
              className={`border text-xs  rounded-2xl sm:px-2 md:px-4 py-3.5 mt-4 mb-3 ${
                item.status
                  ? "bg-[#FFB6BF] border-[#FFB6BF]"
                  : "bg-[#F7F7F7] border-[#BEC8CF]"
              }`}
            >
              {t(`${item.title}`)}
            </p>
            <div
              className={`w-4 h-4 rounded-full border mx-auto ${
                item.status
                  ? "bg-mainColor border-mainColor"
                  : "bg-[#F7F7F7] border-[#707070]"
              }`}
            ></div>
            <p className="text-xs mt-3">{item.day}</p>
          </div>
        ))}

        <h2 className="sm:hidden block font-semibold">
          {t("The request is being prepared")}
        </h2>

        <div className="text-center gap-x-0.5 flex items-center sm:hidden justify-between w-full mt-8">
          <img src={RequestStatus01} className="w-6 h-6" />
          <img src={StraightLine} className="col-span-2 w-1/2" />
          <img src={RequestStatus02} className="w-6 h-6" />
          <img src={DashedLine} className="col-span-2 w-1/2" />
          <img src={RequestStatus03} className="w-6 h-6" />
          <img src={DashedLine} className="col-span-2 w-1/2" />
          <img src={RequestStatus04} className="w-6 h-6" />
          <img src={DashedLine} className="col-span-2 w-1/2" />
          <img src={RequestStatus05} className="w-6 h-6" />
        </div>
      </div>

      <div className="bg-[#FFCC1A] py-5 sm:py-10 px-4 text-center rounded-2xl">
        <p className="text-[15px]">
          {statusData?.message
            ? statusData?.message
            : t(
                "A message that can be changed according to the application stage"
              )}
        </p>
      </div>

      <div className="mb-20 sm:block hidden">
        <h2 className="text-3xl mt-16 mb-6">{t("notes for messages")}</h2>
        <div>
          {notesData?.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-x-2 mb-3 text-[15px]"
            >
              <p className="whitespace-nowrap">
                {t(`${item.phase}`)} <span>{t(`${item.phase_type}`)}</span>
              </p>
              <BsArrowLeft size={20} />
              <p>{t(`${item.phase_state}`)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RequestStatus;
