import React, { useEffect, useState } from "react";
import { CourseCard, Sidebar } from "../components";
import { useAuth } from "../context/AuthContext";
import { CiHeart } from "react-icons/ci";
import { PiChatCircleThin } from "react-icons/pi";
import Button from "../components/atoms/Button/Button";
import { t } from "i18next";
import { apiRequest } from "../utils/axios";
import { Link } from "react-router-dom";

const Accounts = () => {
  const [requestTypeOpen, setRequestTypeOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const { user, token } = useAuth();

  const fetchRequests = async () => {
    try {
      //   setIsLoading(true);
      const data: any = await apiRequest({
        url: `/api/student/orders`,
        method: "GET",
      });
      setRequests(data?.data);
      //   setIsLoading(false);
    } catch (error) {
      //   setIsLoading(false);
      console.error("Error fetching items:", error.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchRequests();
    }
  }, []);

  const renderSidebarContent = () => (
    <div>
      <div className="flex items-center gap-2">
        {user && (
          <>
            <div className="w-10 h-10 overflow-hidden rounded-full">
              <img
                src={user?.image}
                alt={user?.name}
                className="object-cover w-full h-full"
              />
            </div>
            <p className="font-semibold">{user?.name}</p>
          </>
        )}
      </div>
    </div>
  );
  return (
    <div>
      <Sidebar className="animate_from_left">
        <div className="mx-auto">
          <header className="flex items-center justify-between mb-6 mt-2">
            {renderSidebarContent()}
            <div className="flex items-center gap-2">
              <CiHeart className="text-xl" />
              <PiChatCircleThin className="text-xl" />
            </div>
          </header>
          <Button
            action={() => setRequestTypeOpen(true)}
            className="flex items-center justify-center px-4 py-2 mb-4 text-white rounded-lg bg-mainColor"
          >
            {t("add request +")}
          </Button>
          {requests?.map((request, index) => (
            <CourseCard {...request} />
          ))}
        </div>
      </Sidebar>

      {requestTypeOpen && (
        <div>
          <div
            onClick={() => setRequestTypeOpen(false)}
            className="fixed z-[600] top-0 left-0 w-full h-full bg-black/30"
          ></div>
          <div className="px-4 fixed w-full top-1/2 -translate-y-1/2 mx-auto z-[800]">
            <div className="flex flex-col px-8 py-8 space-y-6 bg-white shadow-lg rounded-xl">
              <p>{t("choose the type of order you want to add")}</p>
              <Link
                onClick={() => {
                  setRequestTypeOpen(false);
                  //   setIsSidebarOpen({ ...isSidebarOpen, account: false });
                }}
                to={"/englishLanguage"}
                className="w-full"
              >
                <Button className="w-full text-white bg-mainColor">
                  {t("english")}
                </Button>
              </Link>
              <Link
                onClick={() => {
                  setRequestTypeOpen(false);
                  //   setIsSidebarOpen({ ...isSidebarOpen, account: false });
                }}
                to={"/universityAdmissions"}
                className="w-full"
              >
                <Button className="w-full bg-[#FFB6BF] text-black">
                  {t("University admissions")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accounts;
