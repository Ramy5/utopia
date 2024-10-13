import { t } from "i18next";
import React, { useState } from "react";
import { apiRequest } from "../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import DownLoadApp from "../../components/atoms/molecules/downLoad-app/DownLoadApp";
import { Form, Formik } from "formik";
import BaseSelect from "../../components/atoms/molecules/formik-fields/BaseSelect";
import BaseInput from "../../components/atoms/molecules/formik-fields/BaseInput";
import { IoIosSearch } from "react-icons/io";
import Button from "../../components/atoms/Button/Button";
import { TbFilter } from "react-icons/tb";
import DefaultSelectStyle from "../../hooks/DefaultSelectStyle";
import selectStyle from "../../hooks/selectStyle";
import { IoSearchOutline } from "react-icons/io5";

const UniversityAdmissionPage = () => {
  const navigate = useNavigate();
  const [countryID, setCountryID] = useState(0);
  const [universityName, setUniversityName] = useState("");
  const [dropDown, setdropDown] = useState(false);

  const fetchUniversityPackages = async () => {
    try {
      const data = await apiRequest({
        url: `/api/student/university-packages`,
        method: "GET",
      });
      return data?.data;
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };

  const { data: universityData } = useQuery({
    queryKey: ["university-packages"],
    queryFn: fetchUniversityPackages,
    suspense: true,
  });

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

  const fetchFilterByUniversityName = async (name) => {
    try {
      const data = await apiRequest({
        url: `/api/student/name-filter?query=${name}&type=university&per_page=10000`,
        method: "GET",
      });
      return data?.data;
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };

  const { data: universityNameFilter } = useQuery({
    queryKey: ["university_name_filter", universityName],
    queryFn: () => fetchFilterByUniversityName(universityName),
    suspense: true,
    enabled: !!universityName,
  });

  const renderCards = (items) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
      {items?.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-4 group cursor-pointer"
          onClick={() =>
            navigate("/universityAdmissions/details", {
              state: item.id,
            })
          }
        >
          <div className="w-28 h-28 rounded-full overflow-hidden">
            <img
              src={item.image}
              alt="item"
              className="group-hover:scale-105 duration-300"
            />
          </div>
          <div>
            <h2 className="text-xl font-medium mb-2">{item.name}</h2>
            <p>{item.city}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCardsInSmallScreen = (items) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 justify-center gap-4 sm:gap-8 gap-y-12 mb-36">
      {items?.map((item, index) => (
        <div
          key={index}
          className="shadow-lg rounded-3xl overflow-hidden"
          onClick={() =>
            navigate("/universityAdmissions/details", {
              state: item.id,
            })
          }
        >
          <div className="rounded-3xl overflow-hidden h-60">
            <img src={item.image} alt="country" className="w-full h-full" />
          </div>
          <div className="px-5 py-8">
            <h2 className="text-xl font-medium mb-2">{item.name}</h2>
            <p className="text-[#AEAAAE] text-lg">{item.city}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className="max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-[80rem] px-4 mx-auto">
        <div className="mt-16  sm:block hidden px-4 md:px-0">
          <h2 className="text-6xl mb-5">{t("University admissions")}</h2>
          <p className="text-xl font-medium">{t("list of universities")}</p>
          <div>
            <Formik
              initialValues={{ country_id: "", research: "" }}
              onSubmit={() => {}}
            >
              {({ values, resetForm }) => (
              <Form className="grid grid-cols-10 gap-12 md:gap-28 my-12">
                <div className="col-span-4 md:col-span-3">
                  <BaseSelect
                    id="country_id"
                    name="country_id"
                    placeholder={t("everyone")}
                    label={t("sort by country")}
                    onChange={(option) => {
                      setCountryID(option.id);
                    }}
                    options={countriesOption}
                    isLoading={isLoading || isFetching}
                    className="pt-2"
                    selectStyle={selectStyle}
                  />
                </div>
                <div className="flex items-end gap-2 col-span-6 md:col-span-5 w-full">
                  <IoSearchOutline  size={45} className="text-[#c8ced3]" />
                  <BaseInput
                    id="research"
                    name="research"
                    placeholder={t("research")}
                    label={t("search for university name")}
                    className="py-[1.15rem] md:w-72 mt-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setUniversityName(e.target.value);
                        e.target.value = "";
                        resetForm()
                      }
                    }}
                  />
                </div>
              </Form>
              )}
            </Formik>
          </div>

          {universityData?.length &&
          countryID === 0 &&
          universityName === "" ? (
            renderCards(universityData)
          ) : countriesFilter?.length &&
            countryID !== 0 &&
            universityName === "" ? (
            renderCards(countriesFilter)
          ) : universityNameFilter?.length && universityName !== "" ? (
            renderCards(universityNameFilter)
          ) : (
            <p className="font-medium text-2xl text-center">
              {t("No results found")}
            </p>
          )}

          <Button
            bordered
            className="rounded-full mt-20 mb-12 border-2 border-[#BEC8CF] text-[#BEC8CF] text-lg px-6 py-3.5"
          >
            {t("show more")}
          </Button>
        </div>

        <div className="md:hidden block px-4">
          <div className="relative">
            <div className="absolute top-1/2 -translate-y-1/2 ">
              <Link to={"/"}>
                <FaArrowRightLong
                  size={22}
                  className="mt-4 cursor-pointer justify-self-start"
                />
              </Link>
            </div>
            <h2 className="text-3xl font-medium text-center py-6">
              {t("University admissions")}
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
                          setUniversityName(values.research);
                          resetForm();
                        }}
                      >
                        <IoIosSearch size={35} className="text-white" />
                      </div>
                      <BaseInput
                        id="research"
                        name="research"
                        placeholder={t("search by university name")}
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
            {universityData?.length &&
            countryID === 0 &&
            universityName === "" ? (
              renderCardsInSmallScreen(universityData)
            ) : countriesFilter?.length &&
              countryID !== 0 &&
              universityName === "" ? (
              renderCardsInSmallScreen(countriesFilter)
            ) : universityNameFilter?.length && universityName !== "" ? (
              renderCardsInSmallScreen(universityNameFilter)
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

export default UniversityAdmissionPage;
