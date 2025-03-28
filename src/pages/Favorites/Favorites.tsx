import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { apiRequest } from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import DownLoadApp from "../../components/atoms/molecules/downLoad-app/DownLoadApp";
import { Form, Formik } from "formik";
import { IoIosSearch } from "react-icons/io";
import BaseInput from "../../components/atoms/molecules/formik-fields/BaseInput";
import { TbFilter } from "react-icons/tb";
import { useAuth } from "../../context/AuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import FavoritesImg from "../../assets/Favorites.svg";
import { MdOutlineFavorite } from "react-icons/md";
import { GrFavorite } from "react-icons/gr";
import { toast } from "react-toastify";

const postFavorite = async (postData) => {
  try {
    const data = await apiRequest({
      url: "/api/student/store-favorite",
      method: "POST",
      data: postData,
    });
    return data?.data;
  } catch (errors) {
    toast.error(errors);
    console.log("🚀 ~ loginPost ~ error:", errors);
  }
};

const Favorites = () => {
  const [dropDown, setdropDown] = useState(false);
  const { token } = useAuth();

  const navigate = useNavigate();

  const fetchFavorites = async () => {
    try {
      const response = await apiRequest({
        url: "/api/student/favorite",
        method: "GET",
      });
      return response?.data || [];
    } catch (error) {
      console.error("Error fetching items:", error.message);
      return [];
    }
  };

  const { data, refetch } = useQuery({
    queryKey: ["favoritesData"],
    queryFn: fetchFavorites,
    suspense: true,
    enabled: !!token,
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ["Favorite"],
    mutationFn: (data: any) => postFavorite(data),
    onSuccess: (data) => {
      toast.success(data?.message);
      // toast.success(t("Saved to favorites successfully, enjoy it!"));
      refetch();
    },
  });

  const renderCardsInSmallScreen = (items) => (
    <div className="grid grid-cols-2 sm:grid-cols-2 justify-center gap-4 sm:gap-8 gap-y-12 mb-36 cursor-pointer">
      {items?.map((item, index) => (
        <div
          key={index}
          className="shadow-lg rounded-3xl overflow-hidden"
          onClick={() =>
            navigate("/englishLanguage/details", {
              state: item.package,
            })
          }
        >
          <div className="rounded-xl overflow-hidden h-44 sm:h-60">
            <img
              src={item.package.packageImage?.[0]?.image}
              alt="country"
              className="w-full h-full"
            />
          </div>
          <div className="px-3 sm:px-5 py-4 sm:py-8">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-xl font-medium mb-1 sm:mb-2">
                {item.package.name}
              </h2>
              <p className="text-[15px] sm:text-xl font-semibold sm:font-medium text-mainColor whitespace-nowrap">
                {item.package.g_price} <span>{item.package.unit}</span>
              </p>
            </div>
            <p className="text-[#AEAAAE] sm:text-lgg">
              {item.package.cityData.county_name}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-[80rem] md:px-4 mx-auto">
        <div className="sm:block hidden">
          <div
            id="englishSection"
            className="pt-0 mx-4 mb-20 sm:mb-28 sm:pt-20 md:mx-0"
          >
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-xl font-semibold whitespace-nowrap">
                {t("Favorites")}
              </h2>
            </div>

            <div>
              {token && data?.length ? (
                <div className="hidden grid-cols-2 gap-3 sm:grid md:grid-cols-3 lg:grid-cols-4">
                  {data?.map((packages, index) => (
                    <div
                      key={index}
                      className="text-center group cursor-pointer border border-[#707070] rounded-2xl  relative packege"
                      onClick={(e) => {
                        if (e.target.closest(".favorite-button")) return;
                        navigate("/englishLanguage/details", {
                          state: packages,
                        });
                      }}
                    >
                      {packages?.package.is_note === 1 && (
                        <p className="absolute bg-[#FFCC1A] px-4 pt-2.5 pb-2 text-xs rounded-full left-1/2 w-fit whitespace-nowrap -translate-x-1/2 -top-4 z-20">
                          {packages.package.note}
                        </p>
                      )}
                      <div className="h-[17.5vw] relative">
                        <div
                          className="absolute top-7 right-2.5 bg-mainColor rounded-xl p-1.5 z-50 favorite-button"
                          title={
                            token && packages?.package.is_favorite === 1
                              ? t("Remove from Favorites")
                              : t("Add to Favorites")
                          }
                          onClick={() => {
                            if (!token) {
                              navigate("/register");
                              return;
                            }
                            mutate({ package_id: packages?.package.id });
                          }}
                        >
                          {token && packages?.package.is_favorite === 1 ? (
                            <MdOutlineFavorite
                              size={25}
                              className="text-white"
                            />
                          ) : (
                            <GrFavorite size={25} className="text-white" />
                          )}
                        </div>
                        <div className="flex rounded-2xl overflow-hidden max-h-full relative">
                          <img
                            src={packages.package.packageImage[0].image}
                            className="rounded-t-2xl w-full h-[17.5vw] group-hover:h-[13vw] duration-300 object-cover rounded-b-2xl group-hover:rounded-b-none"
                          />
                        </div>
                      </div>
                      <div className="body-packege relative">
                        <p className="relative pt-4 text-[25px] text-black duration-300 ">
                          {packages.package.partner_name}
                        </p>
                        <p
                          className="max-w-full px-3.5 my-4 overflow-hidden text-black duration-300 text-ellipsis max-h-48 text-[15px]"
                          style={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 6,
                          }}
                        >
                          {packages.package.desc.length > 172
                            ? packages.package.desc.slice(0, 172) + "..."
                            : packages.package.desc}
                        </p>
                        <p className="pt-[1.3rem] pb-3 text-xl text-white bg-mainColor rounded-2xl">
                          {packages.package.g_price}{" "}
                          <span>{packages.package.unit}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <img src={FavoritesImg} alt="Favorites" />
                    <h2 className="mt-6 font-semibold text-xl">
                      {t("You don't have any favorite items yet.")}
                    </h2>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="sm:hidden block px-4">
          <div className="relative">
            <div className="absolute top-1/2 -translate-y-1/2 ">
              <div onClick={() => navigate(-1)}>
                <FaArrowRightLong
                  size={22}
                  className="cursor-pointer justify-self-start"
                />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-center py-6">
              {t("Favorites")}
            </h2>
          </div>

          <div>
            {data?.length ? (
              renderCardsInSmallScreen(data)
            ) : (
              <p className="font-medium text-2xl text-center">
                {t("No results found")}
              </p>
            )}
          </div>
        </div>
      </div>

      <div>
        <DownLoadApp />
      </div>
    </>
  );
};

export default Favorites;
