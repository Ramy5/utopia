import React, { useState } from "react";
import StudentInfo from "./StudentInfo";
import BookingInfo from "./BookingInfo";
import Others from "./Others";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import cn from "../../../utils/cn";
import ChatForm from "../../../components/chat/ChatForm";
import Button from "../../../components/atoms/Button/Button";

const ViewPartnerRequest = () => {
  const [showChat, setShowChat] = useState(true);
  const [steps, setSteps] = useState(1);

  return (
    <div>
      {/* DESKTOP */}
      <div className="max-w-full hidden md:block sm:max-w-5xl md:max-w-6xl lg:max-w-[80rem] md:px-4 mx-auto mt-16">
        <StudentInfo />
        <BookingInfo />
        <Others />

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

          {showChat && <ChatForm />}
        </div>
      </div>

      {/* MOBILE */}
      <div className="max-w-full md:hidden pb-16 sm:max-w-5xl md:max-w-6xl lg:max-w-[80rem] md:px-4 mx-auto sm:mt-16">
        <div className="flex items-center justify-center px-4 mt-4 mb-6 sm:hidden gap-x-12">
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

        <StudentInfo step={steps} />
        <BookingInfo step={steps} />
        <Others step={steps} />

        {/* CHAT */}
        <div className="hidden mb-20 md:block">
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

          {showChat && <ChatForm />}
        </div>
      </div>
    </div>
  );
};

export default ViewPartnerRequest;
