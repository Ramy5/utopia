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
    // suspense: true,
  });
  console.log("🚀 ~ data:", data);

  return (
    <div
      className={`${
        isFootered ? "block my-8" : "hidden sm:block"
      }  mx-4 mb-20 sm:mb-28 md:mx-0 `}
    >
      <div className="flex justify-between">
        {isFootered && (
          <Link to={"/"}>
            <FaArrowRightLong className="mt-4 cursor-pointer justify-self-start" />
          </Link>
        )}

        <div
          className={`${
            !isFootered ? "mb-40" : "mb-20 text-center"
          }  text-3xl font-medium`}
        >
          {t("Why choose Utopia?")}
        </div>
      </div>
      <div
        className={`${
          isFootered ? "flex-col gap-20" : "flex-row gap-5"
        } flex items-center justify-between`}
      >
        {data?.map((item, index) => (
          <div
            key={index}
            className={`relative bg-[#1B0924] px-6 lg:px-12 pb-10 rounded-3xl ${
              isFootered ? "h-[8rem]" : "h-40"
            } `}
          >
            <div
              className={`rounded-full absolute -top-12 md:-top-20 lg:-top-[5.5rem] left-1/2 -translate-x-1/2`}
            >
              <img
                src={item.image}
                alt="choose"
                className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32"
              />
            </div>
            <p className="flex items-end w-full h-full m-auto text-center text-white lg:w-3/4">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseUtopia;
