import { t } from "i18next";
import { apiRequest } from "../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

interface ChooseUtopia_TP {
  isFootered?: boolean;
}

const ChooseUtopia: React.FC<ChooseUtopia_TP> = ({ isFootered }) => {
  const navigate = useNavigate()
  const fetchChooseUtopia = async () => {
    try {
      const data = await apiRequest({
        url: "/api/student/why-choose-utopia",
        method: "GET",
      });
      return data?.data;
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };

  const { data } = useQuery({
    queryKey: ["choose_utopia"],
    queryFn: fetchChooseUtopia,
    suspense: true,
  });
  console.log("🚀 ~ data:", data);

  return (
    <div
      className={`${
        isFootered ? "block my-8" : "hidden sm:block"
      }  mx-4 mb-20 sm:mb-28 md:mx-0 `}
    >
      <div className="relative">
        <div className="absolute top-1/2 -translate-y-1/2 ">
          {isFootered && (
            <div onClick={() => navigate(-1)}>
              <FaArrowRightLong
                size={22}
                className="cursor-pointer justify-self-start"
              />
            </div>
          )}
        </div>
        <h2
          className={`${
            !isFootered ? "mb-52" : "text-center"
          } text-xl font-semibold sm:font-normal sm:text-6xl`}
        >
          {t("Why choose Utopia?")}
        </h2>
      </div>
      <div
        className={`${
          isFootered ? "flex-col gap-20 mt-32" : "flex-row gap-2 md:gap-4 lg:gap-5"
        } flex items-center justify-between`}
      >
        {data?.map((item, index) => (
          <div
            key={index}
            className={`relative bg-[#1B0924] px-4 lg:px-8 pb-8 rounded-3xl ${
              isFootered ? "h-40 mb-8" : "h-40 lg:h-44"
            } `}
          >
            <div
              className={`rounded-full absolute -top-[4.5rem] md:-top-[7.3rem] lg:-top-32 left-1/2 -translate-x-1/2 ${isFootered ? "w-[8.5rem]  h-[8.5rem]" :"w-[8rem]  h-[8rem]"}  md:w-44 md:h-44 lg:w-48 lg:h-48`}
            >
              <img
                src={item.image}
                alt="choose"
                className="w-full h-full"
                loading="lazy"
              />
            </div>
            <p className={`flex items-end h-full m-auto text-center text-base md:text-xl lg:text-xl text-white ${isFootered ? "w-3/4" :"w-full"}` }>
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseUtopia;
