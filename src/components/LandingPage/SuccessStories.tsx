import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Button from "../atoms/Button/Button";
import { t } from "i18next";
import { useRef, useState } from "react";
import { Pagination, Grid } from "swiper/modules";
import { apiRequest } from "../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import "swiper/css/grid";
import { useRTL } from "../../hooks/useRTL";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const SuccessStories = () => {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const swiperRef = useRef(null);
  const swiperMoveRef = useRef(null);
  const isRTL = useRTL();
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchSuccessStories = async () => {
    try {
      const response = await apiRequest({
        url: "/api/student/stories",
        method: "GET",
      });

      return response?.data || [];
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };

  const { data = [] } = useQuery({
    queryKey: ["success_stories"],
    queryFn: fetchSuccessStories,
    suspense: true,
  });

  const handleImageClick = (index) => {
    setSelectedStoryIndex(index);
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index, 800);
    }
  };

  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.activeIndex);
  };

  const handleNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handlePrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  return (
    <div className="bg-[#1B0924] px-8 pb-36 hidden sm:block">
      <h2 className="pt-20 mb-20 md:mb-36 text-6xl font-base text-white">
        {t("Success stories")}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-10 gap-8">
        <div className="col-span-5 lg:col-span-6">
          <Swiper
            spaceBetween={0}
            slidesPerView={3}
            breakpoints={{
              // 646: {
              //   slidesPerView: 1,
              // },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            grid={{
              rows: 2,
            }}
            modules={[Grid]}
            className="h-[350px] md:h-[450px] mySwiper mb-20 md:mb-0"
          >
            <div>
              {data?.map((story, index) => (
                <SwiperSlide key={index}>
                  <div className="cursor-pointer w-fit">
                    <div
                      className="relative rounded-full"
                      onClick={() => handleImageClick(index)}
                    >
                      <div
                        className={`absolute top-0 left-0 w-36 h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full duration-300 ${
                          index === selectedStoryIndex
                            ? "opacity-100"
                            : "bg-black opacity-55"
                        }`}
                      ></div>
                      <img
                        src={story.image}
                        className={`w-36 h-36 md:w-40 md:h-40 lg:w-48 lg:h-48  rounded-full group-hover:rounded-b-none duration-700 object-cover cursor-pointer `}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </div>
        <div className="relative col-span-5 lg:col-span-4">
          <div
            className={`absolute z-10 -top-[112px] md:-top-32  ${
              isRTL ? "-right-6 md:-right-14" : "-left-6 md:-left-14"
            }`}
          >
            <img
              src={data?.[selectedStoryIndex]?.image}
              className="object-cover transition-all duration-1000 ease-in-out rounded-full w-36 h-36 md:w-40 md:h-40 group-hover:rounded-b-none"
              loading="lazy"
            />
          </div>
          <div
            className={`absolute z-10 -top-10 flex ${
              isRTL ? "left-0" : "right-0"
            }`}
          >
            <IoIosArrowForward
              className={`text-white cursor-pointer ${isRTL ? "rotate-0" : "rotate-180"}`}
              size={26}
              onClick={handleNextSlide}
            />
            <IoIosArrowBack
              className={`text-white cursor-pointer ${isRTL ? "rotate-0" : "rotate-180"}`}
              size={26}
              onClick={handlePrevSlide}
            />
          </div>
          <Swiper
            spaceBetween={100}
            slidesPerView={1}
            className={`h-[400px]`}
            pagination={{
              clickable: true,
            }}
            // modules={[Pagination]}
            loop={true}
            speed={2500}
            ref={swiperRef}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => {
              // setSelectedStoryIndex(swiper.activeIndex);
              // handleSlideChange;
              const realIndex = swiper.realIndex;
              setSelectedStoryIndex(realIndex);
              if (handleSlideChange) handleSlideChange(realIndex);
            }}
          >
            {data?.map((storie, index) => (
              <SwiperSlide key={index}>
                <div className="shadow-xl rounded-2xl bg-[#FFB6BF] relative h-full z-0 pt-10 pb-6 px-8">
                  <div className="pb-5 pt-2 lg:pt-5">
                    <h2 className="relative mb-1 text-3xl font-normal text-black duration-300 group-hover:text-white">
                      {storie.name}
                    </h2>
                    <p className="text-[15px]">{storie.title}</p>
                    <h3
                      className="text-[15px] py-6 lg:py-14"
                      style={{ lineHeight: "35px" }}
                    >
                      <span
                        className="text-ellipsis max-h-48"
                        style={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 4,
                          overflow: "hidden",
                        }}
                        dangerouslySetInnerHTML={{ __html: storie?.desc }}
                      />
                    </h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;
