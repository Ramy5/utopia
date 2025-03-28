import React, { Fragment, useEffect, useState } from "react";
import { apiRequest } from "../../../utils/axios";
import Loading from "../../../components/Global/Loading/Loading";
import DownLoadApp from "../../../components/atoms/molecules/downLoad-app/DownLoadApp";
import RequestCard from "../../../components/UI/RequestCard";
import { useQuery } from "@tanstack/react-query";

const BookingList = () => {
  const fetchRequests = async () => {
    try {
      const data: any = await apiRequest({
        url: `/api/partner/partner-orders?per_page=10000`,
        method: "GET",
      });
      return data?.data;
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };

  const { data: requests } = useQuery({
    queryKey: ["partner_requests"],
    queryFn: fetchRequests,
    suspense: true,
  });

  return (
    <div>
      {/* DESKTOP */}
      <div>
        <div className="max-w-full md:my-16 sm:max-w-5xl md:max-w-6xl lg:max-w-[90rem] md:px-4 mx-auto">
          {/* LIST OF REQUESTS */}
          <div className="my-6 space-y-4 ">
            {requests?.map((request: any, index) => {
              return (
                <Fragment key={index}>
                  <RequestCard {...request} isPartner />;
                </Fragment>
              );
            })}
          </div>
        </div>

        <DownLoadApp />
      </div>
    </div>
  );
};

export default BookingList;
