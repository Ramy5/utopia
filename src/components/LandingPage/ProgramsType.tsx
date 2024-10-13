import { Link, useNavigate } from "react-router-dom";
import Button from "../atoms/Button/Button";
import { t } from "i18next";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { HiOutlineChevronRight } from "react-icons/hi";

const ProgramsType = ({ data }) => {
  console.log("🚀 ~ ProgramsType ~ data:", data);
  const [indexCategory, setIndexCategory] = useState(1);
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef(null); // Reference to the Swiper instance

  const handleNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext(); // Move to the next slide
    }
  };
  return (
    <div className="mb-20 sm:mb-28">
      <div className="hidden sm:block my-12 mx-4 md:mx-0">
        <Swiper
          spaceBetween={20}
          slidesPerView={3}
          speed={1000}
          onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          <div className="grid grid-cols-10 gap-3">
            {data?.categories?.map((categorie, index) => (
              <SwiperSlide
                key={index}
                className={`${index === 0 ? "col-span-4" : "col-span-3"}`}
              >
                <div
                  key={index}
                  // className={`${index === 0 ? "col-span-4" : "col-span-3"}`}
                >
                  <div>
                    <img
                      src={categorie?.image}
                      alt="Book"
                      className="w-full h-64 lg:h-[19rem]"
                    />
                  </div>
                  <div
                    className={`${
                      index === 0
                        ? "bg-mainColor"
                        : index === 1
                        ? "bg-[#FFB6BF]"
                        : "bg-[#FFCC1A]"
                    } mt-4 rounded-2xl text-white px-4 lg:px-5 py-4 text-center cursor-pointer h-56 flex flex-col justify-between items-center`}
                    onClick={() => setIndexCategory(categorie.id)}
                  >
                    <h2 className="text-lg lg:text-xl">
                      {categorie?.name}
                    </h2>
                    <div className="duration-500 ease-in-out">
                      <p className="mt-3 text-sm font-base line-clamp-4">
                        <span
                          dangerouslySetInnerHTML={{ __html: categorie?.desc }}
                        />
                      </p>
                    </div>
                    <Button
                      className="bg-white text-black text-xl px-3.5 rounded-3xl font-normal mt-5 w-fit"
                      action={() => {
                        const categoryType =
                          categorie.id === 1
                            ? "/programsSummer"
                            : categorie.id === 2
                            ? "/universityAdmissions"
                            : "/englishLanguage";
                        navigate(categoryType, { state: categorie });
                      }}
                    >
                      {t("learn more")}
                    </Button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
        <div className="flex items-center justify-center gap-x-2 mt-4">
          <HiOutlineChevronRight size={20} className="cursor-pointer" onClick={handleNextSlide} />
          <div className="text-[15px]">
            <span>{currentIndex + 1}</span> / <span>{data?.categories?.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramsType;
