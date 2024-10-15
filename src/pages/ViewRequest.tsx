import React from "react";
import DownLoadApp from "../components/atoms/molecules/downLoad-app/DownLoadApp";
import Button from "../components/atoms/Button/Button";
import { t } from "i18next";
import RequestStatus from "../components/ViewRequest/RequestStatus";
import PersonalInformation from "../components/ViewRequest/PersonalInformation";
import CourseInformation from "../components/ViewRequest/CourseInformation";
import OtherInformation from "../components/ViewRequest/OtherInformation";
import { IoChevronDown } from "react-icons/io5";
import Chat from "./chat/Chat";
import ChatForm from "../components/chat/ChatForm";

const ViewRequest = () => {
  return (
    <section>
      <div className="max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-[80rem] md:px-4 mx-auto mt-16">
        <div className="px-4 md:px-0">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-medium">{t("The order")}</h2>
            <Button className="rounded-2xl text-base">{t("return")}</Button>
          </div>

          <div>
            <RequestStatus />
          </div>

          <div>
            <PersonalInformation />
          </div>

          <div>
            <CourseInformation />
          </div>

          <div>
            <OtherInformation />
          </div>

          <div className="">
            <div className="flex items-center gap-x-3 mb-6">
              <h2 className="text-3xl">{t("Contact the institute")}</h2>
              <div className="w-7 h-7 rounded-full bg-mainColor flex items-center justify-center">
                <IoChevronDown size={18} className="text-white" />
              </div>
            </div>

            <ChatForm className="rounded-none shadow-none mb-0"/>
          </div>
        </div>
      </div>

      <div>
        <DownLoadApp />
      </div>
    </section>
  );
};

export default ViewRequest;
