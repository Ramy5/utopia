import { t } from "i18next";
import BaseInput from "../atoms/molecules/formik-fields/BaseInput";
import { Form, Formik } from "formik";
import { IoIosSearch } from "react-icons/io";
import Button from "../atoms/Button/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useNavigate } from "react-router-dom";

const ProgramTypePackages = ({ data }) => {
  const navigate = useNavigate()
  return (
    <div
      id="englishSection"
      className="pt-0 mx-4 mb-20 sm:mb-28 sm:pt-20 md:mx-0"
    >
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-xl font-semibold">
          {t("english language study packages")}
        </h2>
        <div className="hidden grid-cols-5 gap-3 md:grid">
          <div className="max-w-full col-span-3">
            <Formik initialValues={{ search: "" }} onSubmit={() => {}}>
              <Form>
                <div className="relative w-full">
                  <IoIosSearch
                    size={32}
                    className="fill-[#BEC8CF] absolute z-10 top-1/2 -translate-y-1/2 start-4"
                  />
                  <BaseInput
                    id="search"
                    name="search"
                    type="text"
                    placeholder="search by city or institute name"
                    className="px-12"
                  />
                </div>
              </Form>
            </Formik>
          </div>
          <Button className="rounded-3xl py-2.5 col-span-2" action={() => navigate("/designCourse")}>
            {t("design your own course")}
          </Button>
        </div>
        <p className="block text-xl font-medium md:hidden text-mainColor">
          {t("More")}
        </p>
      </div>
      <div className="hidden grid-cols-2 gap-5 sm:grid md:grid-cols-3 lg:grid-cols-4">
        {data?.englishPackages?.map((packages, index) => (
          <div
            key={index}
            className="text-center group cursor-pointer border border-[#707070] rounded-2xl overflow-hidden"
          >
            <div>
              <img
                src={packages.packageImage[0].image}
                className="object-cover w-full duration-700 h-60 rounded-t-2xl rounded-b-2xl group-hover:rounded-b-none"
              />
            </div>
            <div className="relative">
              <div className="absolute w-full h-full bg-mainColor translate-y-[82%] group-hover:translate-y-0 rounded-t-2xl group-hover:rounded-t-none duration-300 -z-10"></div>

              <h2 className="relative pt-4 text-2xl font-medium text-black duration-300 group-hover:text-white">
                {packages.partner_name}
              </h2>
              <p
                className="max-w-full px-3 my-4 overflow-hidden text-black duration-300 text-ellipsis max-h-48 group-hover:text-white"
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 8,
                }}
              >
                {packages.desc}
              </p>
              <h3 className="py-3 text-2xl font-medium text-white  rounded-2xl">
                {packages.g_price} <span>{packages.unit}</span>
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between sm:hidden">
        <Swiper spaceBetween={20} slidesPerView={1.2}>
          {data?.englishPackages?.map((packages, index) => (
            <SwiperSlide key={index}>
              <div className="shadow-xl rounded-2xl">
                <div>
                  <img
                    src={packages.packageImage[0].image}
                    className="object-cover w-full duration-700 h-56 rounded-t-2xl rounded-b-2xl group-hover:rounded-b-none"
                  />
                </div>
                <div className="flex items-center justify-between px-4 py-5">
                  <h2 className="relative text-xl font-semibold text-black duration-300 group-hover:text-white">
                    {packages.partner_name}
                  </h2>
                  <h3 className="py-3 text-xl font-medium text-mainColor rounded-2xl">
                    {packages.g_price} <span>{packages.unit}</span>
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="block mt-7 sm:hidden ">
        <Button className="w-full col-span-2 py-4 text-2xl rounded-2xl" action={() => navigate("/designCourse")}>
          {t("design your own course")}
        </Button>
      </div>
    </div>
  );
};

export default ProgramTypePackages;
