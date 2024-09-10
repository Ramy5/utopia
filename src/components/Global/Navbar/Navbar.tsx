import { Link } from "react-router-dom";
import Logo from "../../../assets/logo.png";

const Navbar = () => {
  return (
    <nav>
      <div className="flex items-center justify-between px-4 py-2 text-sm xl:text-base">
        {/* Language and Auth */}
        <div className="items-center hidden gap-3 lg:flex xl:gap-6">
          <Link to="/login" className="hover:text-mainColor">
            تسجيل الدخول
          </Link>
          <Link to="signup" className="hover:text-mainColor">
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
          <li className="cursor-pointer hover:text-mainColor">تذاكر الطيران</li>
          <li className="cursor-pointer hover:text-mainColor">الفنادق</li>
          <li className="cursor-pointer hover:text-mainColor">
            اللغة الانجليزية
          </li>
        </ul>

        {/* Hamburger Menu for Mobile */}
        <div className="lg:hidden">
          <button className="px-2 pt-1 pb-2 text-sm border text-mainColor border-mainColor rounded-xl focus:outline-none">
            تسجيل الدخول
          </button>
        </div>

        {/* Logo */}
        <div>
          <img src={Logo} alt="logo" className="hidden w-32 h-10 lg:block" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
