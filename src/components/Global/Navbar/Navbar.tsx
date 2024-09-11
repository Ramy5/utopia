import { Link } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import { CiHeart } from "react-icons/ci";
import { PiChatCircleThin } from "react-icons/pi";

const Navbar = () => {
  const isLogin = false;

  return (
    <nav>
      {isLogin ? (
        <header className="flex items-center justify-between px-4 py-2">
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
          <div className="lg:hidden">
            <button className="px-2 pt-1 pb-2 text-sm border text-mainColor border-mainColor rounded-xl focus:outline-none">
              تسجيل الدخول
            </button>
          </div>

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
