import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Button from "../atoms/Button/Button";
import { t } from "i18next";
import { useRef, useState } from "react";
import { Pagination } from "swiper/modules";
import { apiRequest } from "../../utils/axios";
import { useQuery } from "@tanstack/react-query";

const SuccessStories = () => {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const swiperRef = useRef(null);

  const fetchSuccessStories = async () => {
    try {
      const response = await apiRequest({
        url: "/api/student/stories",
        method: "GET",
      });
      console.log("🚀 ~ fetchSuccessStories ~ response:", response);

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
  console.log("🚀 ~ SuccessStories ~ data:", data);

  const handleImageClick = (index) => {
    setSelectedStoryIndex(index);
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index, 800);
    }
  };

  return (
    <div className="bg-[#1B0924] px-8 pb-36">
      <h2 className="text-3xl font-semibold text-white py-20">
        {t("success stories")}
      </h2>
      <div className="grid grid-cols-10 gap-8">
        <div className="col-span-6">
          <Swiper spaceBetween={50} slidesPerView={1}>
            <SwiperSlide>
              <div className="grid grid-cols-3 gap-y-8">
                {data?.map((story, index) => (
                  <div key={index} className="cursor-pointer">
                    <div
                      className="relative w-44 h-44 rounded-full"
                      onClick={() => handleImageClick(index)}
                    >
                      <div
                        className={`absolute top-0 left-0 w-44 h-44 rounded-full duration-300 ${
                          index === selectedStoryIndex
                            ? "opacity-100"
                            : "bg-black opacity-55"
                        }`}
                      ></div>
                      <img
                        src={story.image}
                        className={`w-44 h-44 rounded-full group-hover:rounded-b-none duration-700 object-cover cursor-pointer `}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="relative col-span-4">
          <div className="absolute -top-36 -right-20 z-10">
            <img
              src={data?.[selectedStoryIndex]?.image}
              className="w-44 h-44 rounded-full group-hover:rounded-b-none object-cover transition-all duration-1000 ease-in-out"
            />
          </div>
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            className="h-full"
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            speed={800}
            ref={swiperRef}
            onSlideChange={(swiper) =>
              setSelectedStoryIndex(swiper.activeIndex)
            }
          >
            {data?.map((storie, index) => (
              <SwiperSlide key={index}>
                <div className="shadow-xl rounded-2xl bg-[#FFB6BF] relative h-full z-0 py-10 px-8">
                  <div className="px-4 py-5">
                    <h2 className="font-normal text-3xl relative text-black group-hover:text-white duration-300 mb-1">
                      {storie.name}
                    </h2>
                    <p className="text-[15px]">{storie.title}</p>
                    <h3 className="text-[15px] py-12">
                      <span
                        dangerouslySetInnerHTML={{ __html: storie?.desc }}
                      />
                    </h3>
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
    </div>
  );
};

export default SuccessStories;
