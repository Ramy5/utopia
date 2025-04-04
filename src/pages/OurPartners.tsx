import { t } from "i18next";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../utils/axios";
import { useQuery } from "@tanstack/react-query";

const OurPartners = () => {
  const navigate = useNavigate();
  const fetchOurPartners = async () => {
    try {
      const response = await apiRequest({
        url: "/api/student/banks-account",
        method: "GET",
      });

      return response?.data || [];
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };

  const { data = [] } = useQuery({
    queryKey: ["Our_Partners"],
    queryFn: fetchOurPartners,
    suspense: true,
  });

  return (
    <div className="py-3 px-4 relative block sm:hidden">
      <div className="relative">
        <div className="absolute top-1/2 -translate-y-1/2 ">
          <div onClick={() => navigate(-1)}>
            <FaArrowRightLong
              size={22}
              className="cursor-pointer justify-self-start"
            />
          </div>
        </div>
        <h2 className="text-3xl font-medium text-center py-12">
          {t("our partners")}
        </h2>
      </div>
      <div className="grid grid-cols-3 gap-y-8 mt-4">
        {data?.map((item) => (
          <div className="m-auto">
            <img src={item.image} alt="Partners" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurPartners;
