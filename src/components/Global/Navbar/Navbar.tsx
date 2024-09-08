import { Link } from "react-router-dom";
import Logo from "../../../assets/logo.png";

const Navbar = () => {
  return (
    <nav>
      <div className="px-4 py-2 flex justify-between items-center">
        {/* Language and Auth */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/login" className="hover:text-mainColor">
            تسجيل الدخول
          </Link>
          <Link to="signup" className="hover:text-mainColor">
            إنشاء حساب
          </Link>
          <button className="hover:text-mainColor">عربي EN</button>
        </div>

        {/* Nav Links */}
        <ul className="hidden md:flex gap-6 text-gray-700">
          <li className="hover:text-mainColor cursor-pointer">
            الباكجات السياحية
          </li>
          <li className="hover:text-mainColor cursor-pointer">
            الانشطه السياحية
          </li>
          <li className="hover:text-mainColor cursor-pointer">
            السياحة الفاخرة
          </li>
          <li className="hover:text-mainColor cursor-pointer">تذاكر الطيران</li>
          <li className="hover:text-mainColor cursor-pointer">الفنادق</li>
          <li className="hover:text-mainColor cursor-pointer">
            اللغة الانجليزية
          </li>
        </ul>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button className="text-mainColor pt-1 pb-2 px-2 text-sm border border-mainColor rounded-xl focus:outline-none">
            تسجيل الدخول
          </button>
        </div>

        {/* Logo */}
        <div>
          <img src={Logo} alt="logo" className="w-32 hidden lg:block h-10" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
