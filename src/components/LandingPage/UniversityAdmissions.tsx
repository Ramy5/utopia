import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { t } from "i18next";

const UniversityAdmissions = ({ data }) => {
  return (
    <div className="mb-20 sm:mb-28 mx-4 md:mx-0 block sm:hidden">
      <div className="flex items-center justify-between mb-12">
        <h2 className="font-semibold text-xl">{t("University admissions")}</h2>
        <p className="block md:hidden text-mainColor font-medium text-xl">
          {t("More")}
        </p>
      </div>
      <div className="flex items-center justify-between sm:hidden">
        <Swiper spaceBetween={20} slidesPerView={1.2}>
          {data?.universityPackages?.map((packages, index) => (
            <SwiperSlide key={index}>
              <div className="shadow-xl rounded-2xl">
                <div>
                  <img
                    src={packages.image}
                    className="w-full h-52 rounded-t-2xl rounded-b-2xl group-hover:rounded-b-none duration-700 object-cover"
                  />
                </div>
                <div className="flex items-center justify-between px-4 py-5">
                  <h2 className="font-semibold text-xl relative text-black group-hover:text-white duration-300">
                    {packages.name}
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
    </div>
  );
};

export default UniversityAdmissions;
