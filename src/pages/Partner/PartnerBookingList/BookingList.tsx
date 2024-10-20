import React, { useEffect, useState } from "react";
import { apiRequest } from "../../../utils/axios";
import Loading from "../../../components/Global/Loading/Loading";
import DownLoadApp from "../../../components/atoms/molecules/downLoad-app/DownLoadApp";
import RequestCard from "../../../components/UI/RequestCard";

const BookingList = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div>
      {/* DESKTOP */}
      <div>
        <div className="max-w-full md:my-16 sm:max-w-5xl md:max-w-6xl lg:max-w-[90rem] md:px-4 mx-auto">
          {/* LIST OF REQUESTS */}
          <div className="my-6 space-y-4 ">
            {requests?.map((request: any) => {
              return <RequestCard {...request} isPartner />;
            })}
          </div>
        </div>

        <DownLoadApp />
      </div>
    </div>
  );
};

export default BookingList;
