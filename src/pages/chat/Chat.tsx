import React from "react";
import DownLoadApp from "../../components/atoms/molecules/downLoad-app/DownLoadApp";
import { FaArrowRightLong } from "react-icons/fa6";
import { t } from "i18next";
import { Footer, Navbar } from "../../components";
import ChatForm from "../../components/chat/ChatForm";

const Chat: React.FC = () => {
  return (
    <div>
      <div className="max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-[80rem] mx-auto">
        <Navbar hidden />
      </div>

      {/* DESKTOP */}
      <ChatForm />

      <DownLoadApp />

      {/* MOBAIL */}
      <div className="flex flex-col sm:hidden">
        <div
          style={{ gridTemplateColumns: "20px 1fr" }}
          className="grid items-center justify-center px-6 py-3"
        >
          <FaArrowRightLong className="cursor-pointer justify-self-start" />
          <h4 className="text-xl font-bold text-center">
            {t("chat with utopia team")}
          </h4>
        </div>

        <ChatForm />
      </div>

      <Footer hidden />
    </div>
  );
};

export default Chat;
