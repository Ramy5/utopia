import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../../../utils/axios";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { t } from "i18next";
import cn from "../../../utils/cn";
import { CiHeart } from "react-icons/ci";
import { PiChatCircleThin } from "react-icons/pi";
import Logo from "../../../assets/logo.png";
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

const PartnerNavbar: React.FC<Navbar_TP> = ({ hidden }) => {
  const { token, clearAuth } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPendingManual, setIsPendingManual] = useState(false);
  const [profileImgIsEdit, setProfileImgIsEdit] = useState(false);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const pathName = location.pathname;

  const fetchProfile = async () => {
    try {
      const response: any = await apiRequest({
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
        const response: any = await apiRequest({
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
      const data: any = await apiRequest({
        url: "/api/partner/logout",
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
    },
  });

  const handleLogout = () => mutate();

  return (
    <nav className={hidden ? "hidden sm:block" : ""}>
      <header className="flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <Link to={"/"} className="">
          <img src={Logo} alt="logo" className="w-32 h-10" />
        </Link>

        {/* Nav Links */}
        <ul className="hidden gap-3 text-gray-700 xl:gap-6 md:flex">
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
        </ul>

        <div
          onClick={toggleDropdown}
          className="relative flex items-center gap-6"
        >
          <p className="relative mx-2 font-semibold cursor-pointer">
            <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs text-white bg-red-600 rounded-full">
              1
            </span>
            <IoMdNotifications className="text-[#7070708c] text-4xl" />
          </p>
          <div className="w-12 h-12 overflow-hidden rounded-xl">
            {profile?.image ? (
              <img
                src={profile?.image}
                alt={profile?.name}
                className="object-cover w-full h-full cursor-pointer"
              />
            ) : (
              <div className="flex items-center justify-center object-cover w-full h-full cursor-pointer bg-mainColor">
                <MdPerson className="text-4xl text-white" />
              </div>
            )}
          </div>

          {isOpen && (
            <div className="absolute z-40 w-48 mt-6 rounded-md start-0 top-10 focus:outline-none">
              <div className="">
                <p
                  onClick={openImageModal}
                  className="block px-4 py-2 text-sm text-gray-700 transition-all duration-500 bg-white border-b border-l border-r cursor-pointer animate_from_left hover:ps-6 hover:bg-gray-100"
                >
                  Add Pic
                </p>
                <p
                  onClick={handleLogout}
                  className={cn(
                    "block px-4 py-2 text-sm text-gray-700 transition-all duration-500 bg-white border-b border-l border-r cursor-pointer hover:ps-6 animate_from_left animation_delay-3 hover:bg-gray-100",
                    {
                      "cursor-not-allowed": isPending,
                    }
                  )}
                >
                  Sign Out
                </p>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Image upload modal */}
      {profileImgIsEdit && (
        <div className="">
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

export default PartnerNavbar;
