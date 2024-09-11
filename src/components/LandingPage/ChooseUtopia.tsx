import { t } from "i18next";
import React from "react";
import ChooseUtopia_1 from "../../assets/LandingPage/chooseUtopia_1.png";
import ChooseUtopia_2 from "../../assets/LandingPage/chooseUtopia_2.png";
import ChooseUtopia_3 from "../../assets/LandingPage/chooseUtopia_3.png";
import { apiRequest } from "../../utils/axios";
import { useQuery } from "@tanstack/react-query";

const ChooseUtopia = () => {
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

  return (
    <div className="mb-20 sm:mb-28 mx-4 md:mx-0 hidden sm:block">
      <div className="text-3xl font-medium mb-40">
        {t("Why choose Utopia?")}
      </div>
      <div className="flex justify-between items-center gap-5">
        {data?.map((item, index) => (
          <div
            key={index}
            className="relative bg-[#1B0924] px-6 lg:px-12 pb-10 rounded-3xl h-40"
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
            <p className="text-white h-full flex items-end w-full lg:w-3/4 m-auto text-center">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseUtopia;
