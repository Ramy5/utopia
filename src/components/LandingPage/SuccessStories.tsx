import SuccessStories_1 from "../../assets/LandingPage/SuccessStories_1.png";
import SuccessStories_2 from "../../assets/LandingPage/SuccessStories_2.png";
import SuccessStories_3 from "../../assets/LandingPage/SuccessStories_3.png";
import SuccessStories_4 from "../../assets/LandingPage/SuccessStories_4.png";
import SuccessStories_5 from "../../assets/LandingPage/SuccessStories_5.png";
import SuccessStories_6 from "../../assets/LandingPage/SuccessStories_6.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Button from "../atoms/Button/Button";
import { t } from "i18next";

const SuccessStories = () => {
  const SuccessStoriesData = [
    {
      name: "نارين احمد الحربي",
      city: "نيويورك-امريكا-معهدبراد",
      image: SuccessStories_1,
      desc: "يتيح لك المسافر حجز فنادق بأفضل الأسعار ويوفر لك أماكن إقامة متنوعة ما بين الرخيصة إلى الفاخرة والتي تلبي جميع احتياجاتك. قارن بين الأسعار واختر من بين أكثر من مليون فندق حول العالم.",
    },
    {
      name: "نارين احمد الحربي",
      city: "نيويورك-امريكا-معهدبراد",
      image: SuccessStories_2,
      desc: "يتيح لك المسافر حجز فنادق بأفضل الأسعار ويوفر لك أماكن إقامة متنوعة ما بين الرخيصة إلى الفاخرة والتي تلبي جميع احتياجاتك. قارن بين الأسعار واختر من بين أكثر من مليون فندق حول العالم.",
    },
    {
      name: "نارين احمد الحربي",
      city: "نيويورك-امريكا-معهدبراد",
      image: SuccessStories_3,
      desc: "يتيح لك المسافر حجز فنادق بأفضل الأسعار ويوفر لك أماكن إقامة متنوعة ما بين الرخيصة إلى الفاخرة والتي تلبي جميع احتياجاتك. قارن بين الأسعار واختر من بين أكثر من مليون فندق حول العالم.",
    },
    {
      name: "نارين احمد الحربي",
      city: "نيويورك-امريكا-معهدبراد",
      image: SuccessStories_4,
      desc: "يتيح لك المسافر حجز فنادق بأفضل الأسعار ويوفر لك أماكن إقامة متنوعة ما بين الرخيصة إلى الفاخرة والتي تلبي جميع احتياجاتك. قارن بين الأسعار واختر من بين أكثر من مليون فندق حول العالم.",
    },
    {
      name: "نارين احمد الحربي",
      city: "نيويورك-امريكا-معهدبراد",
      image: SuccessStories_5,
      desc: "يتيح لك المسافر حجز فنادق بأفضل الأسعار ويوفر لك أماكن إقامة متنوعة ما بين الرخيصة إلى الفاخرة والتي تلبي جميع احتياجاتك. قارن بين الأسعار واختر من بين أكثر من مليون فندق حول العالم.",
    },
    {
      name: "نارين احمد الحربي",
      city: "نيويورك-امريكا-معهدبراد",
      image: SuccessStories_6,
      desc: "يتيح لك المسافر حجز فنادق بأفضل الأسعار ويوفر لك أماكن إقامة متنوعة ما بين الرخيصة إلى الفاخرة والتي تلبي جميع احتياجاتك. قارن بين الأسعار واختر من بين أكثر من مليون فندق حول العالم.",
    },
  ];
  return (
    <div className="flex justify-between gap-8 bg-[#1B0924] px-8 py-36 ">
      <div className="grid grid-cols-3 gap-8 w-1/2">
        {SuccessStoriesData?.map((storie, index) => (
          <div key={index}>
            <img src={storie.image} alt="storie" className="w-44 h-44" />
          </div>
        ))}
      </div>
      <div className="w-1/2">
        <Swiper spaceBetween={50} slidesPerView={1} className="h-full">
          {SuccessStoriesData?.map((storie, index) => (
            <SwiperSlide key={index}>
              <div className="shadow-xl rounded-2xl bg-[#FFB6BF] relative h-full z-0">
                <div className="absolute -top-36 -right-20 z-10">
                  <img
                    src={SuccessStoriesData[0].image}
                    className="w-44 h-44 rounded-t-2xl rounded-b-2xl group-hover:rounded-b-none duration-700 object-cover"
                  />
                </div>
                <div className="px-4 py-5">
                  <h2 className="font-semibold text-xl relative text-black group-hover:text-white duration-300">
                    {storie.name}
                  </h2>
                  <p className="text-[15px]">{storie.city}</p>
                  <h3 className="text-[15px] py-3">{storie.desc}</h3>
                  <Button className="bg-white text-black">
                    {t("learn more")}
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SuccessStories;
