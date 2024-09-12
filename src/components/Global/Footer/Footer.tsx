import { useEffect, useState } from "react";
import logoFooter from "../../../assets/logo-footer.svg";
import { FaBars, FaRegUser } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import Sidebar from "../../atoms/Sidebar/Sidebar";
import Notification from "../../notification/Notification";
import { FaArrowRightLong } from "react-icons/fa6";
import CourseCard from "../../UI/CourseCard";
import { CiHeart } from "react-icons/ci";
import { PiChatCircleThin } from "react-icons/pi";
import { useRTL } from "../../../hooks/useRTL";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { t } from "i18next";

const currentPages = [
  {
    id: 1,
    text: "الرئيسية",
    icon: <IoHomeOutline className="text-xl" />,
  },
  {
    id: 2,
    text: "الاشعارات",
    icon: <IoIosNotificationsOutline className="text-xl" />,
  },
  {
    id: 3,
    text: "الحساب",
    icon: <FaRegUser className="text-xl" />,
  },
  {
    id: 4,
    text: "المزيد",
    icon: <FaBars className="text-xl" />,
  },
];

const notifications = [
  {
    message: "تهانينا لقد تم قبولك في جامعة ولتاكيد القبول يرجى اكمال الدفع",
    date: "1/2/2024",
    isHighlighted: true,
  },
  {
    message: "تهانينا لقد تم قبولك في جامعة ولتاكيد القبول يرجى اكمال الدفع",
    date: "1/2/2024",
  },
  {
    message: "تهانينا لقد تم قبولك في جامعة ولتاكيد القبول يرجى اكمال الدفع",
    date: "1/2/2024",
  },
  {
    message: "تهانينا لقد تم قبولك في جامعة ولتاكيد القبول يرجى اكمال الدفع",
    date: "1/2/2024",
  },
  {
    message: "تهانينا لقد تم قبولك في جامعة ولتاكيد القبول يرجى اكمال الدفع",
    date: "1/2/2024",
  },
];

const Footer = () => {
  const [currentPage, setCurrentPage] = useState("الرئيسية");
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const isRTL = useRTL();

  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = isRTL ? "ar" : "en";
  }, [isRTL]);

  const toggleLang = () => {
    i18n.changeLanguage(isRTL ? "en" : "ar");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (page === "الاشعارات") {
      setIsAccountOpen(false);
      setIsMoreOpen(false);
      setIsNotificationOpen(true);
    } else if (page === "الحساب") {
      setIsNotificationOpen(false);
      setIsMoreOpen(false);
      setIsAccountOpen(true);
    } else if (page === "المزيد") {
      setIsAccountOpen(false);
      setIsNotificationOpen(false);
      setIsMoreOpen(true);
    } else {
      setIsAccountOpen(false);
      setIsNotificationOpen(false);
      setIsMoreOpen(false);
    }
  };

  return (
    <div>
      {/* Desktop Footer */}
      <footer className="hidden text-white bg-mainColor md:block">
        <div className="max-w-full py-4 md:px-8 sm:max-w-5xl md:max-w-6xl lg:max-w-[90rem] mx-auto">
          <div className="container grid grid-cols-1 gap-24 px-4 py-32 mx-auto lg:gap-40 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center md:text-right">
              <h4 className="pb-4 font-bold border-b">{t("courses")}</h4>
              <ul className="pt-6 space-y-2">
                <li>دورة اللغة الإنجليزية العامة</li>
                <li>دورة التحضير للأيلتس</li>
                <li>دورة التحضير للتوفل</li>
                <li>دورة بزنس انجلش</li>
              </ul>
            </div>
            <div className="text-center md:text-right">
              <h4 className="pb-4 font-bold border-b">{t("destinations")}</h4>
              <ul className="pt-6 space-y-2">
                <li>المملكة المتحدة</li>
                <li>الولايات المتحدة الأمريكية</li>
                <li>أيرلندا</li>
                <li>أستراليا</li>
                <li>نيوزيلندا</li>
              </ul>
            </div>
            <div className="text-center md:text-right">
              <h4 className="pb-4 font-bold border-b ">{t("opportunities")}</h4>
              <ul className="pt-6 space-y-2">
                <li>
                  <Link to={"/bePartner"}>{t("become partner")}</Link>
                </li>
                <li>يوتوبيا ستدي أعمال</li>
                <li>{t("jobs")}</li>
              </ul>
            </div>
            <div className="text-center md:text-right">
              <h4 className="pb-4 font-bold border-b">{t("contact us")}</h4>
              <ul className="pt-6 space-y-2">
                <li>
                  <a href="tel:966550808636">+966550808636</a>
                </li>
                <li>
                  <a href="mailto:Admin@Utopia.com">Admin@Utopia.com</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 pb-2 mt-8 text-center md:flex-row lg:justify-between">
            <p>{t("all rights reserved")}</p>
            <img src={logoFooter} alt="logo footer" />
            <p className="">{t("terms and conditions privacy police")}</p>
          </div>
        </div>
      </footer>

      {/* Mobile Footer */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg rounded-t-3xl md:hidden">
        <div className="flex justify-around text-gray-500">
          {currentPages?.map((currPage) => (
            <button
              onClick={() => handlePageChange(currPage.text)}
              key={currPage.id}
              className={`flex flex-col items-center py-3 px-4 gap-1 text-xs ${
                currPage.text === currentPage
                  ? "text-mainColor border-t-2 border-t-mainColor"
                  : "border-t-2 border-t-transparent"
              } focus:outline-none`}
            >
              {currPage.icon}
              <span>{currPage.text}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* NOTIFICATION SIDEBAR */}
      {isNotificationOpen && (
        <Sidebar className="animate_from_left">
          <div>
            <div
              style={{ gridTemplateColumns: "20px 1fr" }}
              className="grid items-center justify-center"
            >
              <FaArrowRightLong
                className="cursor-pointer justify-self-start"
                onClick={() => {
                  setIsNotificationOpen(false);
                  setCurrentPage("الرئيسية");
                }}
              />
              <h4 className="text-center">{t("notifications")}</h4>
            </div>
            <div className="min-h-screen py-4">
              {notifications.map((notification, index: number) => (
                <Notification
                  key={index}
                  message={notification.message}
                  date={notification.date}
                  isHighlighted={notification.isHighlighted}
                />
              ))}
            </div>
          </div>
        </Sidebar>
      )}

      {/* ACCOUNT SIDEBAR */}
      {isAccountOpen && (
        <Sidebar className="animate_from_left">
          <div className="mx-auto">
            <header className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 overflow-hidden rounded-full">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                </div>
                <p className="font-semibold">مرحبا احمد</p>
              </div>
              <div className="flex items-center gap-2">
                <CiHeart className="text-xl" />
                <PiChatCircleThin className="text-xl" />
              </div>
            </header>

            <button className="flex items-center justify-center px-4 py-2 mb-4 text-white rounded-lg bg-mainColor">
              {t("add request +")}
            </button>

            <CourseCard
              name="عبد العزيز البحيا"
              institute="ليڤربول"
              course="انجليزي عام"
              lessonsCount={20}
              startDate="22 مارس 2024"
            />

            <CourseCard
              name="عبد العزيز البحيا"
              institute="ليڤربول"
              course="انجليزي عام"
              lessonsCount={20}
              startDate="22 مارس 2024"
            />
          </div>
        </Sidebar>
      )}

      {/* MORE SIDEBAR */}
      {isMoreOpen && (
        <Sidebar className="animate_from_left">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 overflow-hidden rounded-full">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="font-semibold">مرحبا احمد</p>
            </div>

            <div className="mx-auto my-8">
              {/* Language Toggle */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium">{t("language")}</span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={toggleLang}
                    className={`p-1 pb-2 border text-xs rounded-md ${
                      isRTL
                        ? "bg-mainColor text-white"
                        : "bg-white text-gray-600"
                    } border-gray-300`}
                  >
                    عربي
                  </button>
                  <button
                    onClick={toggleLang}
                    className={`p-1 pb-2 border text-xs  rounded-md ${
                      !isRTL
                        ? "bg-mainColor text-white"
                        : "bg-white text-gray-600"
                    } border-gray-300`}
                  >
                    EN
                  </button>
                </div>
              </div>

              {/* Menu List */}
              <ul className="flex flex-col gap-3 bg-white">
                <li>
                  <Link
                    onClick={() => setIsMoreOpen(false)}
                    className="flex items-center justify-between p-4 duration-300 shadow-md cursor-pointer translation-all hover:ps-8 hover:bg-gray-100"
                    to={"/whyUs"}
                  >
                    <span>{t("Why choose Utopia?")}</span>
                    <span>❯</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/successStory"}
                    className="flex items-center justify-between p-4 duration-300 shadow-md cursor-pointer translation-all hover:ps-8 hover:bg-gray-100"
                  >
                    <span>{t("success stories")}</span>
                    <span>❯</span>
                  </Link>
                </li>
                <li className="flex items-center justify-between p-4 duration-300 shadow-md cursor-pointer translation-all hover:ps-8 hover:bg-gray-100">
                  <span>{t("bank accounts")}</span>
                  <span>❯</span>
                </li>
                <li className="flex items-center justify-between p-4 duration-300 shadow-md cursor-pointer translation-all hover:ps-8 hover:bg-gray-100">
                  <span>{t("partners")}</span>
                  <span>❯</span>
                </li>
                <li className="flex items-center justify-between p-4 duration-300 shadow-md cursor-pointer translation-all hover:ps-8 hover:bg-gray-100">
                  <span>{t("logout")}</span>
                  <span>❯</span>
                </li>
              </ul>
            </div>
          </div>
        </Sidebar>
      )}
    </div>
  );
};

export default Footer;
