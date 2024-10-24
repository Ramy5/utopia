import React, { useState } from "react";
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
import { apiRequest } from "../utils/axios";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const ViewRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [steps, setSteps] = useState(1);

  const fetchViewRequest = async () => {
    try {
      const data = await apiRequest({
        url: `/api/student/order/show/${id}`,
        method: "GET",
      });
      return data?.data;
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };

  const { data } = useQuery({
    queryKey: ["ViewRequest"],
    queryFn: fetchViewRequest,
    suspense: true,
  });
  console.log("🚀 ~ ViewRequest ~ data:", data);

  return (
    <section>
      <div className="max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-[80rem] md:px-4 mx-auto sm:mt-16">
        <div className="px-4 md:px-0">
          <div className="items-center justify-between hidden sm:flex">
            <h2 className="text-3xl font-medium">{t("The order")}</h2>
            <Button
              className="text-base rounded-2xl"
              action={() => navigate(-1)}
            >
              {t("return")}
            </Button>
          </div>

          <div className="relative block sm:hidden">
            <div className="absolute -translate-y-1/2 top-1/2 ">
              <div onClick={() => navigate(-1)}>
                <FaArrowRightLong
                  size={22}
                  className="cursor-pointer justify-self-start"
                />
              </div>
            </div>
            <h2 className="py-6 text-xl font-semibold text-center">
              {data?.partner}
            </h2>
          </div>

          <div>
            <RequestStatus statusData={data} />
          </div>

          <div className="flex items-center justify-between mt-8 mb-10 sm:hidden gap-x-1">
            <Button
              bordered={steps !== 1}
              action={() => setSteps(1)}
              className="text-sm font-medium px-2 py-2.5"
            >
              {t("Personal information")}
            </Button>
            <Button
              bordered={steps !== 2}
              action={() => setSteps(2)}
              className="text-sm font-medium px-2 py-2.5"
            >
              {t("Course information")}
            </Button>
            <Button
              bordered={steps !== 3}
              action={() => setSteps(3)}
              className="text-sm font-medium px-3 py-2.5"
            >
              {t("Other")}
            </Button>
          </div>

          <div>
            <PersonalInformation
              steps={steps}
              personalInfo={data?.personalInfo}
              userName={data?.user}
              userImage={data?.image}
            />
          </div>

          <div>
            <CourseInformation
              steps={steps}
              packageInfo={data?.packageInfo}
              design={data?.design}
              data={data}
            />
          </div>

          <div>
            <OtherInformation steps={steps} others={data?.others} />
          </div>

          <div className="hidden sm:block">
            <div className="flex items-center mb-6 gap-x-3">
              <h2 className="text-3xl">{t("Contact the institute")}</h2>
              <div className="flex items-center justify-center rounded-full w-7 h-7 bg-mainColor">
                <IoChevronDown size={18} className="text-white" />
              </div>
            </div>

            <ChatForm className="mb-0 rounded-none shadow-none" />
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
