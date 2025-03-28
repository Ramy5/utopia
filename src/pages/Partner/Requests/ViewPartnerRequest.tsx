import React, { useState } from "react";
import StudentInfo from "./StudentInfo";
import BookingInfo from "./BookingInfo";
import Others from "./Others";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import cn from "../../../utils/cn";
import ChatForm from "../../../components/chat/ChatForm";
import Button from "../../../components/atoms/Button/Button";
import { apiRequest } from "../../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import DownLoadApp from "../../../components/atoms/molecules/downLoad-app/DownLoadApp";

const ViewPartnerRequest = () => {
  const [showChat, setShowChat] = useState(true);
  const [steps, setSteps] = useState(1);
  const id = useParams();

  const fetchViewPartnerRequest = async () => {
    try {
      const data = await apiRequest({
        url: `/api/partner/partner-order/show/${id}`,
        method: "GET",
      });
      return data?.data;
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };

  const { data } = useQuery({
    queryKey: ["ViewPartner_Request"],
    queryFn: fetchViewPartnerRequest,
    suspense: true,
  });

  return (
    <div>
      {/* DESKTOP */}
      <div className="max-w-full hidden md:block sm:max-w-5xl md:max-w-6xl lg:max-w-[80rem] md:px-4 mx-auto mt-16">
        <StudentInfo
          step={steps}
          personalInfo={data?.personalInfo}
          userName={data?.user}
          userImage={data?.image}
        />
        <BookingInfo
          step={steps}
          packageInfo={data?.packageInfo}
          design={data?.design}
          data={data}
        />
        <Others step={steps} others={data?.others} />

        {/* CHAT */}
        <div className="mb-20">
          <div className="flex gap-6">
            <h2 className="text-3xl">Messaging the Student</h2>
            <IoMdArrowDropdownCircle
              onClick={() => setShowChat((prev) => !prev)}
              className={cn(
                "text-3xl cursor-pointer transition-all duration-300 text-mainColor",
                {
                  "-rotate-90": !showChat,
                }
              )}
            />
          </div>

          {showChat && <ChatForm className="mb-0 rounded-none shadow-none" />}
        </div>
      </div>

      {/* MOBILE */}
      <div className="max-w-full block md:hidden pb-16 sm:max-w-5xl md:max-w-6xl lg:max-w-[80rem] md:px-4 mx-auto mt-8 sm:mt-16">
        <div className="flex items-center justify-between sm:justify-center px-4 mt-4 mb-6 md:hidden gap-x-2 sm:gap-x-12">
          <Button
            bordered={steps !== 1}
            action={() => setSteps(1)}
            className="text-sm font-medium px-2 py-2.5"
          >
            Personal information
          </Button>
          <Button
            bordered={steps !== 2}
            action={() => setSteps(2)}
            className="text-sm font-medium px-2 py-2.5"
          >
            Booking List
          </Button>
          <Button
            bordered={steps !== 3}
            action={() => setSteps(3)}
            className="text-sm font-medium px-3 py-2.5"
          >
            Other
          </Button>
        </div>

        <StudentInfo
          step={steps}
          personalInfo={data?.personalInfo}
          userName={data?.user}
          userImage={data?.image}
        />
        <BookingInfo
          step={steps}
          packageInfo={data?.packageInfo}
          design={data?.design}
          data={data}
        />
        <Others step={steps} others={data?.others} />
      </div>

      <div className="md:block hidden">
        <DownLoadApp />
      </div>
    </div>
  );
};

export default ViewPartnerRequest;
