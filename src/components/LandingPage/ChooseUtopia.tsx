import { t } from "i18next";
import { apiRequest } from "../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface ChooseUtopia_TP {
  isFootered?: boolean;
}

const ChooseUtopia: React.FC<ChooseUtopia_TP> = ({ isFootered }) => {
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
            <Link to={"/"}>
              <FaArrowRightLong
                size={22}
                className="mt-4 cursor-pointer justify-self-start"
              />
            </Link>
          )}
        </div>
        <h2
          className={`${
            !isFootered ? "mb-52" : "text-center"
          } text-2xl font-medium sm:font-normal sm:text-6xl`}
        >
          {t("Why choose Utopia?")}
        </h2>
      </div>
      <div
        className={`${
          isFootered ? "flex-col gap-20 mt-32" : "flex-row gap-5"
        } flex items-center justify-between`}
      >
        {data?.map((item, index) => (
          <div
            key={index}
            className={`relative bg-[#1B0924] px-6 lg:px-8 pb-8 rounded-3xl ${
              isFootered ? "h-[8rem]" : "h-40"
            } `}
          >
            <div
              className={`rounded-full absolute -top-[4.5rem] md:-top-24 lg:-top-28 left-1/2 -translate-x-1/2`}
            >
              <img
                src={item.image}
                alt="choose"
                className="w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40"
              />
            </div>
            <p className="flex items-end w-full h-full m-auto text-center text-base lg:text-lg text-white lg:w-3/4">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseUtopia;
