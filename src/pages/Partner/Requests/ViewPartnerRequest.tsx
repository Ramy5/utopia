import React, { useState } from "react";
import StudentInfo from "./StudentInfo";
import BookingInfo from "./BookingInfo";
import Others from "./Others";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import cn from "../../../utils/cn";
import ChatForm from "../../../components/chat/ChatForm";

const ViewPartnerRequest = () => {
  const [showChat, setShowChat] = useState(true);

  return (
    <div className="max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-[80rem] md:px-4 mx-auto mt-16">
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
  );
};

export default ViewPartnerRequest;
