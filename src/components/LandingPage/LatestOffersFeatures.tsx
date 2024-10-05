import { t } from "i18next";
import LatestOffersFeatures_1 from "../../assets/LandingPage/LatestOffersFeatures_1.png";
import LatestOffersFeatures_2 from "../../assets/LandingPage/LatestOffersFeatures_2.png";
import LatestOffersFeatures_3 from "../../assets/LandingPage/LatestOffersFeatures_3.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const LatestOffersFeatures = ({ data }) => {
  return (
    <div className="mb-14 pt-20 sm:pt-0 mx-4 md:mx-0">
      <h2 className="font-medium sm:font-normal text-xl sm:text-5xl mb-5 sm:mb-16">
        {t("latest offers and features")}
      </h2>
      <div className="hidden sm:grid grid-cols-6 gap-3">
        <div className="col-span-1">
          <img
            src={LatestOffersFeatures_1}
            alt="Offers"
            className="h-[450px] w-full"
          />
        </div>
        <div className="col-span-1">
          <img
            src={LatestOffersFeatures_2}
            alt="Offers"
            className="h-[450px] w-full"
          />
        </div>
        <div className="col-span-4">
          <img
            src={LatestOffersFeatures_3}
            alt="Offers"
            className="h-[450px] w-full"
          />
        </div>
      </div>
      <div className="block sm:hidden">
        <Swiper spaceBetween={12} slidesPerView={1.3}>
          {data?.offers?.map((offer, index) => (
            <SwiperSlide key={index}>
              <div className="rounded-2xl overflow-hidden">
                <img src={offer.image} alt="offers" className="w-full h-60" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default LatestOffersFeatures;
