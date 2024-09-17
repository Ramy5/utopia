import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import { CiHeart } from "react-icons/ci";
import { PiChatCircleThin } from "react-icons/pi";
import { t } from "i18next";
import { useAuth } from "../../../context/AuthContext";
import { useState } from "react";

interface Navbar_TP {
  hidden?: boolean;
}

const Navbar: React.FC<Navbar_TP> = ({ hidden }) => {
  const { token, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { clearAuth } = useAuth();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={hidden ? "hidden md:block" : ""}>
      {token ? (
        <header className="flex items-center px-4 py-2 lg:justify-start">
          <div
            onClick={toggleDropdown}
            className="relative flex items-center gap-2"
          >
            <div className="w-10 h-10 overflow-hidden rounded-full">
              <img
                src={user?.image}
                alt={user?.name}
                className="object-cover w-full h-full cursor-pointer"
              />
            </div>
            <p className="mx-2 font-semibold">{user?.name}</p>
            {isOpen && (
              <div className="absolute right-0 z-40 w-48 mt-2 rounded-md top-10 focus:outline-none">
                <div className="">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 transition-all duration-500 bg-white border-b border-l border-r cursor-pointer animate_from_left hover:ps-6 hover:bg-gray-100"
                  >
                    {t("dashboard")}
                  </Link>
                  <p
                    onClick={clearAuth}
                    className="block px-4 py-2 text-sm text-gray-700 transition-all duration-500 bg-white border-b border-l border-r cursor-pointer hover:ps-6 animate_from_left animation_delay-3 hover:bg-gray-100"
                  >
                    {t("logout")}{" "}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 mx-2">
            <CiHeart className="text-xl" />
            <PiChatCircleThin className="text-xl" />
          </div>
          {/* Logo */}
          <Link to={"/"} className="ms-auto">
            <img src={Logo} alt="logo" className="w-32 h-10" />
          </Link>
        </header>
      ) : (
        <div className="flex items-center justify-between px-4 py-2 text-sm xl:text-base">
          {/* Language and Auth */}
          <div className="items-center hidden gap-3 lg:flex xl:gap-6">
            <Link to="/login" className="hover:text-mainColor">
              تسجيل الدخول
            </Link>
            <Link to="/register" className="hover:text-mainColor">
              إنشاء حساب
            </Link>
            <button className="hover:text-mainColor">عربي EN</button>
          </div>

          {/* Nav Links */}
          <ul className="hidden gap-3 text-gray-700 xl:gap-6 lg:flex">
            <li className="cursor-pointer hover:text-mainColor">
              الباكجات السياحية
            </li>
            <li className="cursor-pointer hover:text-mainColor">
              الانشطه السياحية
            </li>
            <li className="cursor-pointer hover:text-mainColor">
              السياحة الفاخرة
            </li>
            <li className="cursor-pointer hover:text-mainColor">
              تذاكر الطيران
            </li>
            <li className="cursor-pointer hover:text-mainColor">الفنادق</li>
            <li className="cursor-pointer hover:text-mainColor">
              <a href={"/#englishSection"}>اللغة الانجليزية</a>
            </li>
          </ul>

          {/* Hamburger Menu for Mobile */}
          <Link to={"/login"} className="lg:hidden">
            <button className="px-2 pt-1 pb-2 text-sm border text-mainColor border-mainColor rounded-xl focus:outline-none">
              {t("login")}
            </button>
          </Link>

          {/* Logo */}
          <Link to={"/"}>
            <img src={Logo} alt="logo" className="hidden w-32 h-10 lg:block" />
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
