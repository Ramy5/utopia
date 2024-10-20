import { useEffect, useLayoutEffect, useState } from "react";
import logoFooter from "../../../assets/logo-footer.svg";
import { FaBars, FaRegUser } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import Sidebar from "../../atoms/Sidebar/Sidebar";
import Notification from "../../notification/Notification";
import { FaArrowRightLong } from "react-icons/fa6";
import CourseCard from "../../UI/CourseCard";
import { CiHeart } from "react-icons/ci";
import { PiChatCircleThin, PiShootingStarLight } from "react-icons/pi";
import { useRTL } from "../../../hooks/useRTL";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { t } from "i18next";
import { apiRequest } from "../../../utils/axios";
import FormatDate from "../../../utils/FormatDate";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import Button from "../../atoms/Button/Button";
import { ROLE } from "../../../constants/LocalStorageKeys";

const currentPages = [
  { id: 1, text: "home", icon: <IoHomeOutline className="text-xl" /> },
  {
    id: 2,
    text: "notification",
    icon: <IoIosNotificationsOutline className="text-xl" />,
  },
  { id: 3, text: "account", icon: <FaRegUser className="text-xl" /> },
  { id: 4, text: "more", icon: <FaBars className="text-xl" /> },
];

const currentPartnerPages = [
  { id: 1, text: "Booking List", icon: <IoHomeOutline className="text-xl" /> },

  { id: 2, text: "Users", icon: <FaRegUser className="text-xl" /> },
  {
    id: 3,
    text: "Snatches",
    icon: <PiShootingStarLight className="text-2xl" />,
  },
];

const Footer = ({ hidden }: { hidden?: boolean }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [notificationState, setNotificationState] = useState([]);
  const [requestTypeOpen, setRequestTypeOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState({
    notifications: false,
    account: false,
    more: false,
  });
  const [isPartnerSidebarOpen, setIsPartnerSidebarOpen] = useState({
    users: false,
    snatches: false,
  });
  const isRTL = useRTL();
  const navigate = useNavigate();
  const { clearAuth, user, token } = useAuth();
  const { i18n } = useTranslation();
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const role = localStorage.getItem(ROLE); // ROLE

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

  const getAllNotifications = async () => {
    try {
      const data: any = await apiRequest({
        url: "/api/student/notifications",
        method: "GET",
        token,
      });
      setNotificationState(data?.data);
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getAllNotifications();
      fetchRequests();
    }
  }, []);

  useLayoutEffect(() => {
    if (role === "Partner") {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = "en";
    } else {
      document.documentElement.dir = isRTL ? "rtl" : "ltr";
      document.documentElement.lang = isRTL ? "ar" : "en";
    }
  }, [isRTL, role]);

  const notifications = notificationState?.map((notification: any) => {
    const date = new Date(notification?.created_at?.replace(" ", "T"));

    return {
      title: notification?.title,
      message: notification?.description,
      type: notification?.type,
      id: notification?.id,
      date: FormatDate(date),
      isHighlighted: !!!notification?.is_read,
      // notification?.notifiable_id
      // notification?.notifiable_type
    };
  });

  const deleteNotification = async (notificationId: number | string) => {
    try {
      await apiRequest({
        url: "/api/student/delete-notification",
        method: "POST",
        data: {
          id: notificationId,
        },
        token,
      });

      getAllNotifications();
      toast.success(t("notification was deleted successfully"));
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };

  const handleLogout = () => {
    clearAuth();
    setCurrentPage(1);
    setIsSidebarOpen({ ...isSidebarOpen, more: false });
  };

  const toggleLang = () => {
    i18n.changeLanguage(isRTL ? "en" : "ar");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setIsSidebarOpen({
      notifications: page === 2,
      account: page === 3,
      more: page === 4,
    });
  };

  const handlePartnerPageChange = (page: number) => {
    setCurrentPage(page);
    setIsSidebarOpen({
      users: page === 2,
      snatches: page === 3,
    });
  };

  const renderSidebarContent = () => (
    <div>
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 overflow-hidden rounded-full">
          <img
            src={user?.image}
            alt={user?.name}
            className="object-cover w-full h-full"
          />
        </div>
        <p className="font-semibold">{user?.name}</p>
      </div>
    </div>
  );

  if (isLoading) return <Loading />;

  return (
    <div className={hidden ? "hidden sm:block" : ""}>
      {/* Desktop Footer */}
      <footer
        className={`hidden text-white bg-mainColor sm:block ${
          hidden ? "hidden sm:block" : ""
        }`}
      >
        <div className="max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-[80rem] md:px-4 mx-auto">
          <div className="container grid grid-cols-1 gap-24 py-20 lg:gap-40 md:grid-cols-2 lg:grid-cols-4">
            {["courses", "destinations", "opportunities", "contact us"].map(
              (section, index) => (
                <div key={index} className="text-center md:text-right">
                  <h4 className="w-3/5 pb-4 m-auto text-xl font-semibold border-b md:w-full">
                    {t(section)}
                  </h4>
                  <ul className="pt-6 space-y-6 text-sm">
                    {section === "courses" &&
                      [
                        "دورة اللغة الإنجليزية العامة",
                        "دورة التحضير للأيلتس",
                        "دورة التحضير للتوفل",
                        "دورة بزنس انجلش",
                      ].map((item, i) => <li key={i}>{item}</li>)}
                    {section === "destinations" &&
                      [
                        "المملكة المتحدة",
                        "الولايات المتحدة الأمريكية",
                        "أيرلندا",
                        "أستراليا",
                        "نيوزيلندا",
                      ].map((item, i) => <li key={i}>{item}</li>)}
                    {section === "opportunities" && (
                      <>
                        <li>
                          <Link to="/bePartner">{t("become partner")}</Link>
                        </li>
                        <li>يوتوبيا ستدي أعمال</li>
                        <li>{t("jobs")}</li>
                      </>
                    )}
                    {section === "contact us" && (
                      <>
                        <li>
                          <a href="tel:966550808636">+966550808636</a>
                        </li>
                        <li>
                          <a href="mailto:Admin@Utopia.com">Admin@Utopia.com</a>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              )
            )}
          </div>
          <div className="flex flex-col items-center justify-center gap-4 pb-2 mt-8 text-center md:flex-row lg:justify-between">
            <p>{t("all rights reserved")}</p>
            <img src={logoFooter} alt="logo footer" />
            <p>{t("terms and conditions privacy police")}</p>
          </div>
        </div>
      </footer>

      {/* Mobile Footer */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-custom rounded-t-3xl sm:hidden">
        <div className="flex justify-around text-gray-500">
          {currentPages.map((currPage) => (
            <button
              onClick={() => handlePageChange(currPage.id)}
              key={currPage.id}
              className={`flex flex-col items-center py-3 px-4 gap-1 text-xs ${
                currPage.id === currentPage
                  ? "text-mainColor border-t-2 border-t-mainColor"
                  : "border-t-2 border-t-transparent"
              }`}
            >
              {currPage.icon}
              <span>{`${t(currPage.text)}`}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* PARTNER FOOTER */}
      {role === "Partner" && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-custom rounded-t-3xl sm:hidden">
          <div className="flex justify-around text-gray-500">
            {currentPartnerPages.map((currPage) => (
              <Link
                onClick={() => handlePartnerPageChange(currPage.id)}
                to={
                  currPage.id === 1
                    ? "/partnerBookingList"
                    : currPage.id === 2
                    ? "/partnerUsers"
                    : "/partnerSnatches"
                }
                key={currPage.id}
                className={`flex flex-col items-center py-3 px-4 gap-1 text-xs ${
                  currPage.id === currentPage
                    ? "text-mainColor border-t-2 border-t-mainColor"
                    : "border-t-2 border-t-transparent"
                }`}
              >
                {currPage.icon}
                <span className="mt-1">{`${t(currPage.text)}`}</span>
              </Link>
            ))}
          </div>
        </nav>
      )}

      {/* NOTIFICATION SIDEBAR */}
      {isSidebarOpen.notifications && (
        <Sidebar className="animate_from_left">
          <div>
            <div
              style={{ gridTemplateColumns: "20px 1fr" }}
              className="grid items-center justify-center py-3"
            >
              <FaArrowRightLong
                className="cursor-pointer justify-self-start"
                onClick={() =>
                  setIsSidebarOpen({ ...isSidebarOpen, notifications: false })
                }
              />
              <h4 className="text-center">{t("notifications")}</h4>
            </div>
            <div
              style={{ height: "calc(100vh - 105px)" }}
              className="py-4 overflow-auto "
            >
              {notifications?.map((notification) => (
                <Notification
                  onDelete={deleteNotification}
                  key={notification?.id}
                  {...notification}
                />
              ))}
            </div>
          </div>
        </Sidebar>
      )}

      {/* ACCOUNT SIDEBAR */}
      {isSidebarOpen.account && (
        <Sidebar className="animate_from_left">
          <div className="mx-auto">
            <header className="flex items-center justify-between mb-6">
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
      )}

      {/* MORE SIDEBAR */}
      {isSidebarOpen.more && (
        <Sidebar className="animate_from_left">
          <div>
            {renderSidebarContent()}
            <div className="mx-auto my-8">
              {/* Language Toggle */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium">{t("language")}</span>
                <div className="flex items-center gap-4">
                  {["عربي", "EN"].map((lang, index) => (
                    <button
                      key={index}
                      onClick={toggleLang}
                      className={`p-1 pb-2 border text-xs rounded-md ${
                        lang === (isRTL ? "عربي" : "EN")
                          ? "bg-mainColor text-white"
                          : "bg-white text-gray-600"
                      } border-gray-300`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Menu List */}
              <ul className="flex flex-col gap-3 bg-white">
                {[
                  "Why choose Utopia?",
                  "success stories",
                  "bank accounts",
                  "partners",
                  "logout",
                ].map((item, index) => (
                  <li
                    key={index}
                    onClick={item === "logout" ? handleLogout : undefined}
                  >
                    <Link
                      onClick={() =>
                        setIsSidebarOpen({ ...isSidebarOpen, more: false })
                      }
                      className="flex items-center justify-between p-4 duration-300 shadow-md cursor-pointer translation-all hover:ps-8 hover:bg-gray-100"
                      to={
                        item === "Why choose Utopia?"
                          ? "/whyUs"
                          : item === "success stories"
                          ? "/successStory"
                          : item === "bank accounts"
                          ? "/bankAccounts"
                          : item === "partners"
                          ? "/ourPartners"
                          : ""
                      }
                    >
                      <span>{t(item)}</span>
                      <span>❯</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Sidebar>
      )}

      {/* REQUEST TYPE */}
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
                  setIsSidebarOpen({ ...isSidebarOpen, account: false });
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
                  setIsSidebarOpen({ ...isSidebarOpen, account: false });
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

export default Footer;
