import { useState } from "react";
import logoFooter from "../../../assets/logo-footer.svg";
import { FaBars, FaRegUser } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import Sidebar from "../../atoms/Sidebar/Sidebar";
import Notification from "../../notification/Notification";
import { FaArrowRightLong } from "react-icons/fa6";

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (page === "الاشعارات") {
      setIsNotificationOpen(true);
    } else {
      setIsNotificationOpen(false);
    }
  };

  return (
    <div>
      {/* Desktop Footer */}
      <footer className="hidden text-white bg-mainColor md:block">
        <div className="max-w-full py-4 md:px-8 sm:max-w-5xl md:max-w-6xl lg:max-w-[90rem] mx-auto">
          <div className="container grid grid-cols-1 gap-24 px-4 py-32 mx-auto lg:gap-40 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center md:text-right">
              <h4 className="pb-4 font-bold border-b">الدورات</h4>
              <ul className="pt-6 space-y-2">
                <li>دورة اللغة الإنجليزية العامة</li>
                <li>دورة التحضير للأيلتس</li>
                <li>دورة التحضير للتوفل</li>
                <li>دورة بزنس انجلش</li>
              </ul>
            </div>
            <div className="text-center md:text-right">
              <h4 className="pb-4 font-bold border-b">الوجهات</h4>
              <ul className="pt-6 space-y-2">
                <li>المملكة المتحدة</li>
                <li>الولايات المتحدة الأمريكية</li>
                <li>أيرلندا</li>
                <li>أستراليا</li>
                <li>نيوزيلندا</li>
              </ul>
            </div>
            <div className="text-center md:text-right">
              <h4 className="pb-4 font-bold border-b ">فرص</h4>
              <ul className="pt-6 space-y-2">
                <li>أصبح شريك</li>
                <li>يوتوبيا ستدي أعمال</li>
                <li>الوظائف</li>
              </ul>
            </div>
            <div className="text-center md:text-right">
              <h4 className="pb-4 font-bold border-b">تواصل معنا</h4>
              <ul className="pt-6 space-y-2">
                <li>+966550808636</li>
                <li>Admin@Utopia.com</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 pb-2 mt-8 text-center md:flex-row lg:justify-between">
            <p>جميع الحقوق محفوظة</p>
            <img src={logoFooter} alt="logo footer" />
            <p className="">الشروط والأحكام سياسة الخصوصية</p>
          </div>
        </div>
      </footer>

      {/* Mobile Footer */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg md:hidden">
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
              <h4 className="text-center">الاشعارات</h4>
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
    </div>
  );
};

export default Footer;
