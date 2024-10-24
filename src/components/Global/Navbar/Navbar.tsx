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
import { MdPerson } from "react-icons/md";
interface Navbar_TP {
  hidden?: boolean;
}

interface UserProfile {
  id: number;
  name: string;
  phone: string;
  image: string;
}

const Navbar: React.FC<Navbar_TP> = ({ hidden }) => {
  const { token, clearAuth } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPendingManual, setIsPendingManual] = useState(false);
  const [profileImgIsEdit, setProfileImgIsEdit] = useState(false);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    mutate({});
  };

  return (
    <nav className={hidden ? "hidden sm:block" : ""}>
      {token ? (
        <>
          <header className="items-center justify-between hidden px-4 py-2 md:flex">
            {/* Nav Links */}
            {/* <ul className="hidden gap-3 text-gray-700 xl:gap-6 sm:flex">
          <li className="cursor-pointer hover:text-mainColor">
            <Link
              className={cn({
                "font-bold": pathName === "/partnerBookingList",
              })}
              to={"/partnerBookingList"}
            >
              Booking List
            </Link>
          </li>
          <li className="cursor-pointer hover:text-mainColor">
            <Link
              className={cn({
                "font-bold": pathName === "/partnerUsers",
              })}
              to={"/partnerUsers"}
            >
              Users
            </Link>
          </li>
          <li className="cursor-pointer hover:text-mainColor">
            <Link
              className={cn({
                "font-bold": pathName === "/partnerSnatches",
              })}
              to={"/partnerSnatches"}
            >
              Snatches
            </Link>
          </li>
          <li className="cursor-pointer hover:text-mainColor">
            <Link
              className={cn({
                "font-bold": pathName === "/partnerContact",
              })}
              to={"/partnerContact"}
            >
              Contact Utopia
            </Link>
          </li>
        </ul> */}

            <div
              onClick={toggleDropdown}
              className="relative flex items-center gap-6"
            >
              <div className="w-12 h-12 overflow-hidden rounded-xl">
                {profile?.image ? (
                  <img
                    src={profile?.image}
                    alt={profile?.name}
                    className="object-cover w-full h-full cursor-pointer"
                    // onClick={openImageModal}
                  />
                ) : (
                  <div className="flex items-center justify-center object-cover w-full h-full cursor-pointer bg-mainColor">
                    <MdPerson className="text-4xl text-white" />
                  </div>
                )}
              </div>
              <p className="relative mx-2 font-semibold cursor-pointer">
                <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs text-white bg-red-600 rounded-full">
                  1
                </span>
                <IoMdNotifications className="text-[#7070708c] text-4xl" />
              </p>

              <Link to={"/orders"}>{t("orders")}</Link>
              <Link to={"/chat"}>{t("contact utopia")}</Link>

              {isOpen && (
                <div className="absolute z-40 w-48 mt-2 rounded-md start-0 top-10 focus:outline-none">
                  <div className="">
                    <p
                      onClick={openImageModal}
                      className="block px-4 py-2 text-sm text-gray-700 transition-all duration-500 bg-white border-b border-l border-r cursor-pointer animate_from_left hover:ps-6 hover:bg-gray-100"
                    >
                      {t("add pic")}
                    </p>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 transition-all duration-500 bg-white border-b border-l border-r cursor-pointer animate_from_left hover:ps-6 hover:bg-gray-100 animation_delay-3"
                    >
                      {t("dashboard")}
                    </Link>
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
            <div
              onClick={toggleDropdown}
              className="relative flex items-center gap-2"
            >
              <div className="w-10 h-10 overflow-hidden rounded-full">
                <img
                  src={profile?.image}
                  alt={profile?.name}
                  className="object-cover w-full h-full cursor-pointer"
                />
              </div>
              <p className="mx-2 font-semibold cursor-pointer">
                {profile?.name?.split(" ")[0]}
              </p>
              {isOpen && (
                <div className="absolute z-40 w-48 mt-2 rounded-md start-0 top-10 focus:outline-none">
                  <div className="">
                    <p
                      onClick={openImageModal}
                      className="block px-4 py-2 text-sm text-gray-700 transition-all duration-500 bg-white border-b border-l border-r cursor-pointer animate_from_left hover:ps-6 hover:bg-gray-100"
                    >
                      {t("add pic")}
                    </p>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 transition-all duration-500 bg-white border-b border-l border-r cursor-pointer animate_from_left hover:ps-6 hover:bg-gray-100 animation_delay-3"
                    >
                      {t("dashboard")}
                    </Link>
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
              <CiHeart className="text-xl" />
              <Link to={"/chat"}>
                <PiChatCircleThin className="text-xl" />
              </Link>
            </div>
            {/* Logo */}
            <Link to={"/"} className="ms-auto">
              <img src={Logo} alt="logo" className="w-32 h-10" />
            </Link>
          </header>
        </>
      ) : (
        <div className="flex items-center justify-between px-4 py-3 text-sm sm:py-4 xl:text-base">
          {/* Language and Auth */}
          <div className="items-center hidden gap-3 sm:flex xl:gap-6 ">
            <div className="flex gap-4">
              <img src={Star} alt="star" className="w-5" />
              <img src={Shop} alt="shop" className="w-5 " />
            </div>
            <Link to="/login" className="hover:text-mainColor text-[17px]">
              تسجيل الدخول
            </Link>
            <Link to="/register" className="hover:text-mainColor text-[17px]">
              إنشاء حساب
            </Link>
            <button className="hover:text-mainColor text-[17px]">
              عربي EN
            </button>
          </div>

          {/* Nav Links */}
          {/* <ul className="hidden gap-3 text-gray-700 xl:gap-6 sm:flex">
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
          </ul> */}

          {/* Hamburger Menu for Mobile */}
          <Link to={"/login"} className="sm:hidden">
            <button className="px-3 pt-2 pb-3 text-sm font-semibold border text-mainColor border-mainColor rounded-xl focus:outline-none">
              {t("login")}
            </button>
          </Link>

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
    </nav>
  );
};

export default Navbar;
