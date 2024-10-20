import React, { useState } from "react";
import Button from "../../../components/atoms/Button/Button";
import cn from "../../../utils/cn";
import Chat from "../../chat/Chat";
import ChatForm from "../../../components/chat/ChatForm";
import PartnerTeam from "./PartnerTeam";
import DownLoadApp from "../../../components/atoms/molecules/downLoad-app/DownLoadApp";

const Contact = () => {
  const [activeTab, setActiveTab] = useState("chat");

  return (
    <>
      {/* DESKTOP */}
      <div className="max-w-full hidden md:block sm:max-w-5xl md:max-w-6xl lg:max-w-[80rem] md:px-4 mx-auto">
        <h2 className="my-8 text-3xl">Contact Utopia</h2>
        {/* TABS */}
        <div className="flex items-center gap-4 my-6">
          <Button
            action={() => setActiveTab("chat")}
            className={cn("w-48 rounded-full !py-2", {
              "bg-transparent text-black/70 border border-black/40":
                activeTab === "team",
            })}
          >
            Chat
          </Button>
          <Button
            action={() => setActiveTab("team")}
            className={cn("w-48 rounded-full !py-2", {
              "bg-transparent text-black/70 border border-black/40":
                activeTab === "chat",
            })}
          >
            Our Team
          </Button>
        </div>

        {/* CONTENT */}
        <div>
          {activeTab === "chat" && <ChatForm />}
          {activeTab === "team" && <PartnerTeam />}
        </div>
      </div>

      {/* MOBILE */}
      <div className="max-w-full pb-20 mx-4 md:hidden sm:max-w-5xl md:max-w-6xl lg:max-w-[80rem] md:px-4 ">
        {/* TABS */}
        <div className="flex items-center gap-4 my-6">
          <Button
            action={() => setActiveTab("chat")}
            className={cn("w-48  !py-2 bg-[#FFCC1A] text-black", {
              "bg-transparent text-black/70 border border-black/40":
                activeTab === "team",
            })}
          >
            Chat
          </Button>
          <Button
            action={() => setActiveTab("team")}
            className={cn("w-48  !py-2 bg-[#FFCC1A] text-black", {
              "bg-transparent text-black/70 border border-black/40":
                activeTab === "chat",
            })}
          >
            Our Team
          </Button>
        </div>

        {/* CONTENT */}
        <div>
          {activeTab === "chat" && <ChatForm />}
          {activeTab === "team" && <PartnerTeam />}
        </div>
      </div>

      <DownLoadApp />
    </>
  );
};

export default Contact;
