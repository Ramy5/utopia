import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import { CiHeart } from "react-icons/ci";
import { PiChatCircleThin } from "react-icons/pi";
import { t } from "i18next";
import { useState, useEffect } from "react";
import { apiRequest } from "../../../utils/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import cn from "../../../utils/cn";
import { useAuth } from "../../../context/AuthContext";
import Shop from "../../../assets/shop.png";
import Star from "../../../assets/star.png";
import { IoMdNotifications } from "react-icons/io";
import { MdOutlineFavorite, MdPerson } from "react-icons/md";
import { useRTL } from "../../../hooks/useRTL";
import { useTranslation } from "react-i18next";
import { FaArrowRightLong, FaBars } from "react-icons/fa6";
import Button from "../../atoms/Button/Button";
import Sidebar from "../../atoms/Sidebar/Sidebar";
import { IoClose } from "react-icons/io5";
import { GrFavorite } from "react-icons/gr";

interface Navbar_TP {
  hidden?: boolean;
}

interface UserProfile {
  id: number;
  name: string;
  phone: string;
  image: string;
}

// const currentPages = [
//   { id: 1, text: "home", icon: <IoHomeOutline className="text-xl" /> },
//   {
//     id: 2,
//     text: "notification",
//     icon: <IoIosNotificationsOutline className="text-xl" />,
//   },
//   { id: 3, text: "account", icon: <FaRegUser className="text-xl" /> },
//   { id: 4, text: "more", icon: <FaBars className="text-xl" /> },
// ];

const Navbar: React.FC<Navbar_TP> = ({ hidden }) => {
  const { token, clearAuth, user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPendingManual, setIsPendingManual] = useState(false);
  const [profileImgIsEdit, setProfileImgIsEdit] = useState(false);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const isRTL = useRTL();
  const { i18n } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState({
    notifications: false,
    account: false,
    more: false,
  });
  const [requestTypeOpen, setRequestTypeOpen] = useState(false);
  const [selectLang, setSelectLang] = useState(
    localStorage.getItem("lang") || "en"
  );

  const fetchProfile = async () => {
    try {
      const response = await apiRequest({
        url: "/api/student/getProfile",
        method: "GET",
        token,
      });

      if (response?.status_code === 200) {
        setProfile(response.data.user);
      } else {
        toast.error("Failed to fetch profile data");
      }
    } catch (error) {
      toast.error("Error fetching profile data");
    }
  };

  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setNewImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const openImageModal = () => {
    setProfileImgIsEdit(true);
  };

  const closeImageModal = () => {
    setProfileImgIsEdit(false);
    setNewImage(null);
    setPreviewImage(null);
  };

  const uploadImage = async () => {
    if (newImage) {
      const formData = new FormData();
      formData.append("image", newImage);

      try {
        setIsPendingManual(true);
        const response = await apiRequest({
          url: "/api/student/editProfile",
          method: "POST",
          data: formData,
          token,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response?.status_code === 200) {
          toast.success("Image uploaded successfully!");
          fetchProfile();
          closeImageModal();
        } else {
          toast.error(`Failed to upload image: ${response?.message}`);
        }
      } catch (error) {
        toast.error("An error occurred during the upload.");
      } finally {
        setIsPendingManual(false);
      }
    }
  };

  const logOutPost = async (postData) => {
    try {
      const data = await apiRequest({
        url: "/api/student/logout",
        method: "POST",
        data: postData,
        token: token,
      });
      return data?.data;
    } catch (errors) {
      console.log("🚀 ~ loginPost ~ error:", errors);
    }
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["student-logout"],
    mutationFn: (data) => logOutPost(data),
    onSuccess: (data) => {
      clearAuth();
      navigate("/");
    },
  });

  const toggleLang = () => {
    const currentLang = localStorage.getItem("lang") || "ar";
    const newLang = currentLang === "ar" ? "en" : "ar";

    i18n.changeLanguage(newLang);

    localStorage.setItem("lang", newLang);

    window.location.reload();
  };

  // const toggleLang = (selectedLang: string) => {
  //   i18n.changeLanguage(selectedLang);
  //   localStorage.setItem("lang", selectedLang);
  //   document.documentElement.lang = selectedLang;
  //   document.documentElement.dir = selectedLang === "ar" ? "rtl" : "ltr";
  // };

  // useEffect(() => toggleLang(selectLang), [selectLang]);

  // useEffect(() => {
  //   document.documentElement.dir = isRTL ? "rtl" : "ltr";
  //   document.documentElement.lang = isRTL ? "ar" : "en";
  // }, [isRTL]);

  // const toggleLang = () => {
  //   i18n.changeLanguage(isRTL ? "en" : "ar");
  //   window.location.reload();
  // };

  const handleLogout = () => {
    mutate({});
  };

  const renderSidebarContent = () => (
    <div>
      <div className="flex items-center justify-between my-2">
        <div className="flex items-center gap-2 ">
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
        <Button
          className="bg-transparent p-0"
          action={() => setIsSidebarOpen({ ...isSidebarOpen, more: false })}
        >
          <IoClose size={38} className="text-black" />
        </Button>
      </div>
    </div>
  );

  return (
    <nav className={hidden ? "hidden sm:block" : ""}>
      {token ? (
        <>
          <header className="items-center justify-between hidden px-4 py-2 md:flex">
            <div className="relative flex items-center gap-6">
              <div className="w-12 h-12 overflow-hidden rounded-xl سة:لامخؤن">
                {profile?.image ? (
                  <img
                    src={profile?.image}
                    alt={profile?.name}
                    className="object-cover w-full h-full cursor-pointer"
                    onClick={() => setIsOpen((prev) => !prev)}
                  />
                ) : (
                  <div className="flex items-center justify-center object-cover w-full h-full cursor-pointer bg-mainColor">
                    <MdPerson className="text-4xl text-white" />
                  </div>
                )}
              </div>

              <Button
                className="bg-transparent p-0"
                action={() => navigate("/favorites")}
              >
                {/* <img src={Star} alt="star" className="w-6" /> */}
                <div title={t("Favorites")}>
                  <GrFavorite size={30} className="text-mainColor " />
                </div>
              </Button>

              <button
                onClick={toggleLang}
                className="hover:text-mainColor text-[17px]"
              >
                عربي EN
              </button>
              {/* <p className="relative mx-2 font-semibold cursor-pointer">
                <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs text-white bg-red-600 rounded-full">
                  1
                </span>
                <IoMdNotifications className="text-[#7070708c] text-4xl" />
              </p> */}

              {/* <Link to={"/orders"}>{t("orders")}</Link> */}
              {/* <Link to={"/chat"}>{t("contact utopia")}</Link> */}

              {isOpen && (
                <div className="absolute z-40 w-48 mt-2 rounded-md start-0 top-10 focus:outline-none">
                  <div className="">
                    <p
                      onClick={openImageModal}
                      className="block px-4 py-2 text-sm text-gray-700 transition-all duration-500 bg-white border-b border-l border-r cursor-pointer animate_from_left hover:ps-6 hover:bg-gray-100"
                    >
                      {t("add pic")}
                    </p>
                    <p
                      onClick={handleLogout}
                      className={cn(
                        "block px-4 py-2 text-sm text-gray-700 transition-all duration-500 bg-white border-b border-l border-r cursor-pointer hover:ps-6 animate_from_left animation_delay-5 hover:bg-gray-100",
                        {
                          "cursor-not-allowed": isPending,
                        }
                      )}
                    >
                      {t("logout")}{" "}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Logo */}
            <Link to={"/"} className="">
              <img src={Logo} alt="logo" className="w-32 h-10" />
            </Link>
          </header>

          {/* // mobile */}
          <header className="flex items-center px-4 py-2 md:hidden sm:justify-start">
            <Button
              className="bg-transparent p-0 me-3"
              action={() => setIsSidebarOpen({ ...isSidebarOpen, more: true })}
            >
              <FaBars size={28} className="text-mainColor" />
            </Button>
            <div
              onClick={toggleDropdown}
              className="relative flex items-center gap-1"
            >
              <div className="w-10 h-10 overflow-hidden rounded-full">
                <img
                  src={profile?.image}
                  alt={profile?.name}
                  className="object-cover w-full h-full cursor-pointer"
                />
              </div>
              <p className="mx-2 font-semibold cursor-pointer text-sm">
                {profile?.name?.split(" ")[0]}
              </p>
              {isOpen && (
                <div className="absolute z-30 w-48 mt-2 rounded-md start-0 top-10 focus:outline-none">
                  <div className="">
                    <p
                      onClick={openImageModal}
                      className="block px-4 py-2 text-sm text-gray-700 transition-all duration-500 bg-white border-b border-l border-r cursor-pointer animate_from_left hover:ps-6 hover:bg-gray-100"
                    >
                      {t("add pic")}
                    </p>
                    <p
                      onClick={handleLogout}
                      className={cn(
                        "block px-4 py-2 text-sm text-gray-700 transition-all duration-500 bg-white border-b border-l border-r cursor-pointer hover:ps-6 animate_from_left animation_delay-5 hover:bg-gray-100",
                        {
                          "cursor-not-allowed": isPending,
                        }
                      )}
                    >
                      {t("logout")}{" "}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 mx-2">
              <Link to={"/favorites"}>
                <GrFavorite size={26} className="text-mainColor " />
              </Link>
              {/* <Link to={"/chat"}>
                <PiChatCircleThin className="text-xl" />
              </Link> */}
            </div>
            {/* Logo */}
            <Link to={"/"} className="ms-auto">
              <img src={Logo} alt="logo" className="w-28 sm:w-32 " />
            </Link>
          </header>
        </>
      ) : (
        <div className="flex items-center justify-between px-4 py-3 text-sm sm:py-4 xl:text-base">
          {/* Language and Auth */}
          <div className="items-center hidden gap-3 sm:flex xl:gap-6 ">
            <div className="flex gap-4">
              <Button
                className="bg-transparent p-0"
                action={() => navigate("/favorites")}
              >
                <div title={t("Favorites")}>
                  <GrFavorite size={30} className="text-mainColor " />
                </div>
              </Button>
              {/* <img src={Shop} alt="shop" className="w-5 " /> */}
            </div>
            <Link to="/register" className="hover:text-mainColor text-[17px]">
              {t("login")}
            </Link>
            {/* <Link to="/register" className="hover:text-mainColor text-[17px]">
              {t("Create an account")}
            </Link> */}
            <button
              onClick={toggleLang}
              className="hover:text-mainColor text-[17px]"
            >
              عربي EN
            </button>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div
            className={`flex items-center justify-between w-full my-1 sm:hidden ${
              isRTL ? "" : "flex-row-reverse"
            }`}
          >
            <Button
              className="bg-transparent p-0 "
              action={() => setIsSidebarOpen({ ...isSidebarOpen, more: true })}
            >
              <FaBars size={28} className="text-mainColor" />
            </Button>
            <Link to={"/"}>
              <img src={Logo} alt="Logo" className="w-28 " />
            </Link>
          </div>

          {/* Logo */}
          <Link to={"/"}>
            <img src={Logo} alt="logo" className="hidden w-32 h-10 sm:block" />
          </Link>
        </div>
      )}

      {/* Image upload modal */}
      {profileImgIsEdit && (
        <div>
          <div
            onClick={() => setProfileImgIsEdit(false)}
            className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50"
          ></div>
          <div className="fixed top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 z-[100] max-w-sm w-full p-4 bg-white rounded-md shadow-lg sm:max-w-xl">
            <h2 className="mb-4 text-lg font-semibold">{t("add image")}</h2>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-4"
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="object-cover w-full h-64 mb-4 rounded-md sm:h-72"
              />
            )}
            <div className="flex justify-end gap-2">
              <button
                onClick={closeImageModal}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                {t("close")}
              </button>
              <button
                onClick={uploadImage}
                className={cn("px-4 py-2 text-white bg-mainColor rounded-md", {
                  "cursor-not-allowed opacity-40": isPendingManual,
                })}
              >
                {t("add image")}
              </button>
            </div>
          </div>
        </div>
      )}

      {isSidebarOpen.more && (
        <Sidebar className="animate_from_left">
          <div>
            {renderSidebarContent()}
            <div className="mx-auto my-8">
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

              <ul className="flex flex-col gap-3 bg-white">
                {[
                  "Why choose Utopia?",
                  "success stories",
                  "bank accounts",
                  "partners",
                  "notification",
                  "account",
                  !!token ? "logout" : "login",
                ].map((item, index) => (
                  <li key={index}>
                    <Link
                      onClick={() => {
                        if (token && item == "logout") {
                          handleLogout();
                        } else if (!token && item === "login") {
                          navigate("/register");
                        }
                        setIsSidebarOpen({ ...isSidebarOpen, more: false });
                      }}
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
                          : item === "notification"
                          ? "/notifications"
                          : item === "account"
                          ? "/accounts"
                          : item === "login"
                          ? "/register"
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
    </nav>
  );
};

export default Navbar;
