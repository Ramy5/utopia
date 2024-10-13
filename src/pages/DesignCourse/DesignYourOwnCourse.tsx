import { t } from "i18next";
import React, { useState } from "react";
import { apiRequest } from "../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import { IoLocationOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import DownLoadApp from "../../components/atoms/molecules/downLoad-app/DownLoadApp";
import { Form, Formik } from "formik";
import { IoIosSearch } from "react-icons/io";
import BaseInput from "../../components/atoms/molecules/formik-fields/BaseInput";
import Button from "../../components/atoms/Button/Button";
import BaseSelect from "../../components/atoms/molecules/formik-fields/BaseSelect";
import { TbFilter } from "react-icons/tb";
import selectStyle from "../../hooks/selectStyle";

const DesignYourOwnCourse = () => {
  const [dropDown, setdropDown] = useState(false);
  const [countryID, setCountryID] = useState(0);
  const [cityName, setCityName] = useState("");
  const navigate = useNavigate();
  const fetchDesignYourOwnCourse = async () => {
    try {
      const data = await apiRequest({
        url: "/api/student/cities",
        method: "GET",
      });
      return data?.data;
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };

  const { data } = useQuery({
    queryKey: ["design_your_own_course"],
    queryFn: fetchDesignYourOwnCourse,
    suspense: true,
  });
  console.log("🚀 ~ DesignYourOwnCourse ~ data:", data);

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
          label: program?.name || `${t("select country")}`,
          value: program?.name || `${t("select country")}`,
        };
      });
    },
    suspense: true,
  });

  const fetchFilterCountries = async (id) => {
    try {
      const data = await apiRequest({
        url: `/api/student/filter-city-by-county/${id}`,
        method: "GET",
      });
      return data?.data;
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };

  const { data: countriesFilter } = useQuery({
    queryKey: ["filter-city-by-count", countryID],
    queryFn: () => fetchFilterCountries(countryID),
    suspense: true,
    enabled: !!countryID,
  });

  const fetchFilterByCity = async (name) => {
    try {
      const data = await apiRequest({
        url: `/api/student/filter-city-name?query=${name}&per_page=10000`,
        method: "GET",
      });
      return data?.data;
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };

  const { data: cityNameFilter } = useQuery({
    queryKey: ["university_name_filter", cityName],
    queryFn: () => fetchFilterByCity(cityName),
    suspense: true,
    enabled: !!cityName,
  });

  console.log("🚀 ~ DesignYourOwnCourse ~ countriesFilter:", countriesFilter);
  console.log("🚀 ~ DesignYourOwnCourse ~ cityNameFilter:", cityNameFilter);

  const renderCards = (items) => (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {items?.map((item, index) => (
        <div
          key={index}
          className="cursor-pointer group"
          onClick={() =>
            navigate("/designCourse/details", {
              state: { city_id: item.id, city_name: item.name },
            })
          }
        >
          <div className="h-48 rounded-2xl overflow-hidden">
            <img
              src={item.image}
              alt="summer programs"
              className="w-full h-full group-hover:scale-[1.03] duration-300"
            />
          </div>
          <div className="flex gap-1 mt-5 mb-12">
            <div className="bg-[#EAEAEA] rounded-full p-1">
              <IoLocationOutline className="w-6 h-6" />
            </div>
            <p className="bg-[#EAEAEA] rounded-full px-8 py-0.5">{item.name}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCardsInSmallScreen = (items) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 justify-center gap-4 sm:gap-8 gap-y-12 mb-24 cursor-pointer">
      {items?.map((item, index) => (
        <div
          key={index}
          className="shadow-lg rounded-3xl overflow-hidden"
          onClick={() =>
            navigate("/designCourse/details", {
              state: { city_id: item.id, city_name: item.name },
            })
          }
        >
          <div className="rounded-3xl overflow-hidden h-60">
            <img src={item.image} alt="country" className="w-full h-full" />
          </div>
          <div className="flex items-center gap-2 px-5 py-4">
            <div className="bg-mainColor rounded-xl p-1 w-fit">
              <IoLocationOutline className="text-white w-6 h-6" />
            </div>
            <p className="text-[#AEAAAE] text-lg">{item.name}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className="max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-[80rem] md:px-4 mx-auto">
        <div className="my-16 sm:block hidden px-4 md:px-0">
          <h2 className="text-5xl mb-12">{t("design your own course")}</h2>

          <div className="flex items-center justify-between mb-12">
            <h2 className="text-lg lg:text-xl font-semibold">
              {data?.[0]?.county_name}
            </h2>
            <Formik initialValues={{ search: "" }} onSubmit={() => {}}>
              {({ resetForm }) => (
                <Form className="hidden sm:flex gap-2 md:gap-4 items-end justify-end">
                  <div className="w-48 md:w-56 lg:w-64">
                    <BaseSelect
                      id="country_id"
                      name="country_id"
                      placeholder={t("select country")}
                      label={t("select country")}
                      onChange={(option) => {
                        setCountryID(option.id);
                      }}
                      options={countriesOption}
                      isLoading={isLoading || isFetching}
                      className="pt-1.5 w-48 md:w-56 lg:w-64 text-black"
                    />
                  </div>

                  <div className="relative ">
                    <IoIosSearch
                      size={30}
                      className="mb-3 fill-[#707070] absolute top-1/2 -translate-x-1/2 z-10 mt-1"
                    />
                    <BaseInput
                      id="research"
                      name="research"
                      placeholder={t("search by city or institute name")}
                      label={t("search by city or institute name")}
                      className="py-[13px] w-48 md:w-56 lg:w-64 mt-2 ps-12 rounded-2xl"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setCityName(e.target.value);
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

          {data?.length && countryID === 0 && cityName === "" ? (
            renderCards(data)
          ) : countriesFilter?.length && countryID !== 0 && cityName === "" ? (
            renderCards(countriesFilter)
          ) : cityNameFilter?.length && cityName !== "" ? (
            renderCards(cityNameFilter)
          ) : (
            <p className="font-medium text-2xl text-center">
              {t("No results found")}
            </p>
          )}
        </div>

        <div className="sm:hidden block px-4">
          <div className="relative">
            <div className="absolute top-1/2 -translate-y-1/2 ">
              <Link to={"/"}>
                <FaArrowRightLong
                  size={22}
                  className="mt-4 cursor-pointer justify-self-start"
                />
              </Link>
            </div>
            <h2 className="text-2xl font-medium text-center py-6">
              {t("design your own course")}
            </h2>
          </div>
          <div>
            <Formik
              initialValues={{ country_id: "", research: "" }}
              onSubmit={() => {}}
            >
              {({ values, resetForm }) => {
                return (
                  <Form className="grid grid-cols-10 mb-4 mt-5 items-end">
                    <div className="relative col-span-8 me-2.5">
                      <div
                        className="bg-mainColor absolute bottom-0 left-0 z-10 py-[13.2px] rounded-2xl px-4"
                        onClick={() => {
                          setCityName(values.research);
                          resetForm();
                        }}
                      >
                        <IoIosSearch size={35} className="text-white" />
                      </div>
                      <BaseInput
                        id="research"
                        name="research"
                        placeholder={t("search by city name")}
                        className="mt-2 py-[18px] rounded-2xl"
                      />
                    </div>
                    <div className="col-span-2 m-auto">
                      <div
                        className="border-2 border-mainColor rounded-2xl px-3.5 py-[8.5px] mt-2"
                        onClick={() => setdropDown(!dropDown)}
                      >
                        <TbFilter
                          size={34}
                          className="text-mainColor m-auto h-10"
                        />
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
                                // refetch()
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
          <div className="flex items-center gap-2 py-4 mb-2">
            <div className="bg-mainColor rounded-xl p-1 w-fit">
              <IoLocationOutline className="text-white w-6 h-6" />
            </div>
            <p className="text-black text-lg">{data?.[0]?.county_name}</p>
          </div>
          <div>
            {data?.length && countryID === 0 && cityName === "" ? (
              renderCardsInSmallScreen(data)
            ) : countriesFilter?.length &&
              countryID !== 0 &&
              cityName === "" ? (
              renderCardsInSmallScreen(countriesFilter)
            ) : cityNameFilter?.length && cityName !== "" ? (
              renderCardsInSmallScreen(cityNameFilter)
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

export default DesignYourOwnCourse;
