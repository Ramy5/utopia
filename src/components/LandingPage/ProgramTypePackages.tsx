import { t } from "i18next";
import BaseInput from "../atoms/molecules/formik-fields/BaseInput";
import { Form, Formik } from "formik";
import { IoIosSearch } from "react-icons/io";
import Button from "../atoms/Button/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useNavigate } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";

const ProgramTypePackages = ({ data }) => {
  console.log("🚀 ~ ProgramTypePackages ~ data:", data);
  const navigate = useNavigate();
  return (
    <div
      id="englishSection"
      className="pt-0 mx-4 mb-20 sm:mb-28 sm:pt-20 md:mx-0"
    >
      <div className="flex items-center justify-between mb-5 sm:mb-12">
        <h2 className="text-xl font-medium sm:font-normal sm:text-[23px]">
          {t("english language study packages")}
        </h2>
        <div className="hidden grid-cols-6 gap-1 md:gap-3 sm:grid">
          <div className="max-w-full col-span-3">
            <Formik initialValues={{ search: "" }} onSubmit={() => {}}>
              <Form>
                <div className="relative w-full">
                  <IoSearchOutline
                    size={23}
                    className="fill-[#212529] absolute z-10 top-1/2 -translate-y-1/2 start-3"
                  />
                  <BaseInput
                    id="search"
                    name="search"
                    type="text"
                    placeholder="search by city or institute name"
                    className="ps-11 border border-[#D1CBCB] placeholder:text-[#212529] py-4 rounded-full placeholder:text-[15px]"
                  />
                </div>
              </Form>
            </Formik>
          </div>
          <Button
            className="py-2.5 lg:px-10 sm:px-2 rounded-full text-xl col-span-3 font-normal hover:bg-mainYellow duration-500"
            action={() => navigate("/designCourse")}
          >
            {t("design your own course")}
          </Button>
        </div>
        <p
          className="block text-base underline font-medium sm:hidden text-mainColor cursor-pointer"
          onClick={() => navigate("/englishLanguage")}
        >
          {t("More")}
        </p>
      </div>
      <div className="hidden grid-cols-2 gap-3 sm:grid md:grid-cols-3 lg:grid-cols-4">
        {data?.englishPackages?.map((packages, index) => (
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
                  className="rounded-t-2xl w-full h-[17.5vw] group-hover:h-[13vw] duration-300 rounded-b-2xl group-hover:rounded-b-none"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="body-packege relative">
              <p className="relative pt-4 text-[25px] text-black duration-300 ">
                {packages.partner_name}
              </p>
              <p
                className="max-w-full px-3.5 my-4 overflow-hidden text-black duration-300 text-ellipsis max-h-48 text-[15px]"
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 5,
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

      <Button
        action={() => navigate("/englishLanguage")}
        className="sm:flex font-normal hidden bg-transparent m-auto text-black hover:text-mainColor duration-300 mt-8"
      >
        <div>
          <p className="text-xl mb-1">{t("more")}</p>
          <BsChevronDown size={28} className="m-auto" />
        </div>
      </Button>

      <div className="flex items-center justify-between sm:hidden cursor-pointer">
        <Swiper spaceBetween={15} slidesPerView={1.5}>
          {data?.englishPackages?.map((packages, index) => (
            <SwiperSlide key={index}>
              <div
                className="shadow-xl rounded-2xl"
                onClick={() =>
                  navigate("/englishLanguage/details", {
                    state: packages,
                  })
                }
              >
                <div>
                  <img
                    src={packages.packageImage[0].image}
                    className="object-cover w-full duration-700 h-52 rounded-t-2xl rounded-b-2xl group-hover:rounded-b-none"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center justify-between px-4 py-5">
                  <h2 className="relative text-base font-semibold text-black duration-300 group-hover:text-white">
                    {packages.partner_name}
                  </h2>
                  <h3 className="py-3 text-base font-semibold text-mainColor rounded-2xl whitespace-nowrap">
                    {packages.g_price} <span>{packages.unit}</span>
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="block mt-7 sm:hidden ">
        <Button
          className="w-full col-span-2 py-3.5 text-lg rounded-xl"
          action={() => navigate("/designCourse")}
        >
          {t("design your own course")}
        </Button>
      </div>
    </div>
  );
};

export default ProgramTypePackages;
