import React, { useEffect, useState } from "react";
import DownLoadApp from "../components/atoms/molecules/downLoad-app/DownLoadApp";
import { apiRequest } from "../utils/axios";
import Button from "../components/atoms/Button/Button";
import { t } from "i18next";
import { FaPlus } from "react-icons/fa6";
import RequestCard from "../components/UI/RequestCard";
import Loading from "../components/Global/Loading/Loading";
import { Link } from "react-router-dom";

const StudentRequest = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log("🚀 ~ StudentRequest ~ requests:", requests);

  const fetchRequests = async () => {
    try {
      setIsLoading(true);
      const data: any = await apiRequest({
        url: `/api/student/orders`,
        method: "GET",
      });
      setRequests(data?.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching items:", error.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div>
      {/* DESKTOP */}
      <div>
        <div className="max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-[80rem] md:px-4 mx-auto">
          {/* ADD REQUEST */}
          <div className="flex gap-4 mx-4">
            <Link to={"/addRequest"} className="py-4">
              <Button className="py-4 text-xl rounded-2xl">
                {t("add request")}
              </Button>
            </Link>
            <Link className="py-4 " to={"/addRequest"}>
              <Button className="h-full py-4 text-xl rounded-2xl">
                <FaPlus />
              </Button>
            </Link>
          </div>

          {/* LIST OF REQUESTS */}
          <div className="my-6 space-y-4 ">
            {requests?.map((request: any) => {
              return <RequestCard {...request} />;
            })}
          </div>
        </div>

        <DownLoadApp />
      </div>
    </div>
  );
};

export default StudentRequest;
