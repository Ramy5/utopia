import { apiRequest } from "../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Brands = () => {
  const fetchBrands = async () => {
    try {
      const response = await apiRequest({
        url: "/api/student/partner-images",
        method: "GET",
      });

      return response?.data || [];
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };

  const { data = [] } = useQuery({
    queryKey: ["partner-images"],
    queryFn: fetchBrands,
    suspense: true,
  });

  return (
    <div className="hidden sm:block">
      <Swiper
        slidesPerView={8}
        spaceBetween={60}
        loop={true}
        centeredSlides={true}
        autoplay={{
          delay: 0,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        speed={2000}
      >
        <div>
          {data?.map((brand, index) => (
            <SwiperSlide key={index}>
              <div className="py-12 cursor-pointer">
                <img
                  src={brand.image}
                  alt="brand"
                  className="w-20 h-20"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
          {data?.map((brand, index) => (
            <SwiperSlide key={index}>
              <div className="py-12 cursor-pointer">
                <img
                  src={brand.image}
                  alt="brand"
                  className="w-20 h-20"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
          {data?.map((brand, index) => (
            <SwiperSlide key={index}>
              <div className="py-12 cursor-pointer">
                <img
                  src={brand.image}
                  alt="brand"
                  className="w-20 h-20"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
};

export default Brands;
