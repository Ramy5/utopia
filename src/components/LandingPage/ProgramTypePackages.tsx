import { t } from "i18next";
import BaseInput from "../atoms/molecules/formik-fields/BaseInput";
import { Form, Formik } from "formik";
import { IoIosSearch } from "react-icons/io";
import Button from "../atoms/Button/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const ProgramTypePackages = ({ data }) => {
  return (
    <div className="mb-20 sm:mb-28 sm:pt-20 pt-0 mx-4 md:mx-0">
      <div className="flex items-center justify-between mb-12">
        <h2 className="font-semibold text-xl">
          {t("english language study packages")}
        </h2>
        <div className="hidden md:grid grid-cols-5 gap-3">
          <div className="col-span-3 max-w-full">
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
          <Button className="rounded-3xl py-2.5 col-span-2">
            {t("design your own course")}
          </Button>
        </div>
        <p className="block md:hidden text-mainColor font-medium text-2xl">
          {t("More")}
        </p>
      </div>
      <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {data?.englishPackages?.map((packages, index) => (
          <div
            key={index}
            className="text-center group cursor-pointer border border-[#707070] rounded-2xl overflow-hidden"
          >
            <div>
              <img
                src={packages.packageImage[0].image}
                className="w-full h-60 rounded-t-2xl rounded-b-2xl group-hover:rounded-b-none duration-700 object-cover"
              />
            </div>
            <div className="relative">
              <div className="absolute w-full h-full bg-mainColor translate-y-[82%] group-hover:translate-y-0 rounded-t-2xl group-hover:rounded-t-none duration-300 -z-10"></div>

              <h2 className="pt-4 text-2xl font-medium relative text-black group-hover:text-white duration-300">
                {packages.partner_name}
              </h2>
              <p
                className="overflow-hidden text-ellipsis max-w-full max-h-48 my-4 px-3 text-black group-hover:text-white duration-300"
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 8,
                }}
              >
                {packages.desc}
              </p>
              <h3 className=" text-white font-medium text-2xl rounded-2xl py-3">
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
                    className="w-full h-60 rounded-t-2xl rounded-b-2xl group-hover:rounded-b-none duration-700 object-cover"
                  />
                </div>
                <div className="flex items-center justify-between px-4 py-5">
                  <h2 className="font-semibold text-xl relative text-black group-hover:text-white duration-300">
                    {packages.partner_name}
                  </h2>
                  <h3 className="text-mainColor font-medium text-xl rounded-2xl py-3">
                    {packages.g_price} <span>{packages.unit}</span>
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="mt-7 block sm:hidden ">
        <Button className="rounded-3xl py-4 text-2xl col-span-2 w-full">
          {t("design your own course")}
        </Button>
      </div>
    </div>
  );
};

export default ProgramTypePackages;
