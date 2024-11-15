import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { apiRequest } from "../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import { IoLocationOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import DownLoadApp from "../../components/atoms/molecules/downLoad-app/DownLoadApp";
import ProgramTypePackages from "../../components/LandingPage/ProgramTypePackages";
import { Form, Formik } from "formik";
import { IoIosSearch } from "react-icons/io";
import BaseInput from "../../components/atoms/molecules/formik-fields/BaseInput";
import Button from "../../components/atoms/Button/Button";
import { TbFilter } from "react-icons/tb";

const EnglishLanguagePage = () => {
  const [cityOfEnglichPackage, setCityOfEnglichPackage] = useState("");
  const [nameOfEnglichPackage, setNameOfEnglichPackage] = useState("");
  const [dropDown, setdropDown] = useState(false);
  const [countryID, setCountryID] = useState(0);

  const navigate = useNavigate();
  const fetchEnglishLanguage = async () => {
    try {
      const data = await apiRequest({
        url: "/api/student/english-packages",
        method: "GET",
      });
      return data?.data;
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };

  const { data } = useQuery({
    queryKey: ["english_language_data"],
    queryFn: fetchEnglishLanguage,
    suspense: true,
  });

  console.log("🚀 ~ EnglishLanguagePage ~ data:", data);

  const fetchByNameOfEnglishPachages = async (name) => {
    try {
      const data = await apiRequest({
        url: `/api/student/name-filter?query=${name}&type=package&per_page=10000`,
        method: "GET",
      });
      return data?.data;
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };

  const { data: filterNameEnglishPachages } = useQuery({
    queryKey: ["filterName_english_packages", nameOfEnglichPackage],
    queryFn: () => fetchByNameOfEnglishPachages(nameOfEnglichPackage),
    suspense: true,
    enabled: !!nameOfEnglichPackage,
  });

  console.log(
    "🚀 ~ EnglishLanguagePage ~ filterNameEnglishPachages:",
    filterNameEnglishPachages
  );

  const fetchCountries = async () => {
    try {
      const data = await apiRequest({
        url: "/api/student/counties",
        method: "GET",
      });
      return data?.data;
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };

  const {
    data: countriesOption,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
    select: (data) => {
      return data?.map((program) => {
        return {
          id: program?.id,
          label: program?.name,
          value: program?.name,
        };
      });
    },
    suspense: true,
  });

  const fetchFilterCountries = async (id) => {
    try {
      const data = await apiRequest({
        url: `/api/student/county-filter/${id}?type=university`,
        method: "GET",
      });
      return data?.data;
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };

  const { data: countriesFilter } = useQuery({
    queryKey: ["countries_filter", countryID],
    queryFn: () => fetchFilterCountries(countryID),
    suspense: true,
    enabled: !!countryID,
  });

  const renderCardsInSmallScreen = (items) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 justify-center gap-4 sm:gap-8 gap-y-12 mb-36 cursor-pointer">
      {items?.map((item, index) => (
        <div
          key={index}
          className="shadow-lg rounded-3xl overflow-hidden"
          onClick={() =>
            navigate("/englishLanguage/details", {
              state: item,
            })
          }
        >
          <div className="rounded-3xl overflow-hidden h-60">
            <img
              src={item.packageImage?.[0]?.image}
              alt="country"
              className="w-full h-full"
            />
          </div>
          <div className="px-5 py-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium mb-2">{item.name}</h2>
              <p className="text-xl font-medium text-mainColor">
                {item.g_price} <span>{item.unit}</span>
              </p>
            </div>
            <p className="text-[#AEAAAE] text-lg">
              {item.cityData.county_name}
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
                {t("english language study packages")}
              </h2>
              <div className="hidden justify-end gap-1.5 sm:flex">
                <div className="w-48 md:w-1/2 lg:w-80">
                  <Formik initialValues={{ search: "" }} onSubmit={() => {}}>
                    {({ resetForm }) => (
                      <Form className="">
                        <div className="relative">
                          <IoIosSearch
                            size={32}
                            className="fill-[#BEC8CF] absolute z-10 top-1/2 -translate-y-1/2 start-4"
                          />
                          <BaseInput
                            id="search"
                            name="search"
                            type="text"
                            placeholder="search by city or institute name"
                            className="ps-12 pe-6"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                setNameOfEnglichPackage(e.target.value);
                                e.target.value = "";
                                resetForm();
                              }
                            }}
                          />
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
                <Button
                  className="rounded-3xl py-2.5 px-3 md:px-8 "
                  action={() => navigate("/designCourse")}
                >
                  {t("design your own course")}
                </Button>
              </div>
              <p className="block text-2xl font-medium sm:hidden text-mainColor">
                {t("More")}
              </p>
            </div>

            <div className="hidden grid-cols-2 gap-3 sm:grid md:grid-cols-3 lg:grid-cols-4">
              {data?.map((packages, index) => (
                <div
                  key={index}
                  className="text-center group cursor-pointer border border-[#707070] rounded-2xl  relative packege"
                  onClick={() =>
                    navigate("/englishLanguage/details", {
                      state: packages,
                    })
                  }
                >
                  {packages?.is_note === 1 && (
                    <p className="absolute bg-[#FFCC1A] px-4 pt-2.5 pb-2 text-xs rounded-full left-1/2 w-fit whitespace-nowrap -translate-x-1/2 -top-4 z-20">
                      {packages.note}
                    </p>
                  )}
                  <div className="h-[17.5vw]">
                    <div className="flex rounded-2xl overflow-hidden max-h-full">
                      <img
                        src={packages.packageImage[0].image}
                        className="rounded-t-2xl w-full h-[17.5vw] group-hover:h-[13vw] duration-300 object-cover rounded-b-2xl group-hover:rounded-b-none"
                      />
                    </div>
                  </div>
                  <div className="body-packege relative">
                    <p className="relative pt-4 text-[25px] text-black duration-300 ">
                      {packages.partner_name}
                    </p>
                    <p
                      className="max-w-full px-2.5 my-5 overflow-hidden text-black duration-300 text-ellipsis max-h-48 text-[15px]"
                      style={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 6,
                      }}
                    >
                      {packages.desc}
                    </p>
                    <p className="pt-[1.3rem] pb-3 text-xl text-white bg-mainColor rounded-2xl">
                      {packages.g_price} <span>{packages.unit}</span>
                    </p>
                  </div>
                </div>
              ))}
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
              {t("english language packages")}
            </h2>
          </div>
          <div>
            <Formik
              initialValues={{ country_id: "", research: "" }}
              onSubmit={() => {}}
            >
              {({ values, resetForm }) => {
                return (
                  <Form className="grid grid-cols-10 mb-12 mt-5 items-end">
                    <div className="relative col-span-8 me-2.5">
                      <div
                        className="bg-mainColor absolute bottom-0 left-0 z-10 py-[13.2px] rounded-2xl px-4"
                        onClick={() => {
                          setNameOfEnglichPackage(values.research);
                          resetForm();
                        }}
                      >
                        <IoIosSearch size={35} className="text-white" />
                      </div>
                      <BaseInput
                        id="research"
                        name="research"
                        placeholder={t("search by institute name")}
                        className="mt-2 py-[18px] rounded-2xl"
                      />
                    </div>
                    <div className="col-span-2 m-auto">
                      <div
                        className="border-2 border-mainColor rounded-2xl px-4 py-[8.5px] mt-2"
                        onClick={() => setdropDown(!dropDown)}
                      >
                        <TbFilter size={40} className="text-mainColor m-auto" />
                      </div>
                      {dropDown && (
                        <div
                          className={`shadow-lg bg-mainColor absolute mt-3 left-5 rounded-2xl animate_scale`}
                        >
                          {countriesOption?.map((item, index) => (
                            <div
                              key={index}
                              className="text-lg font-medium border-b border-[#ddd] py-5 px-20 text-white cursor-pointer"
                              onClick={() => {
                                setCountryID(item.id);

                                setdropDown(!dropDown);
                              }}
                            >
                              {item.value}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
          <div>
            {data?.length && countryID === 0 && nameOfEnglichPackage === "" ? (
              renderCardsInSmallScreen(data)
            ) : countriesFilter?.length &&
              countryID !== 0 &&
              nameOfEnglichPackage === "" ? (
              renderCardsInSmallScreen(countriesFilter)
            ) : filterNameEnglishPachages?.length &&
              nameOfEnglichPackage !== "" ? (
              renderCardsInSmallScreen(filterNameEnglishPachages)
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

export default EnglishLanguagePage;
