import { t } from "i18next";
import React from "react";
import ChooseUtopia_1 from "../../assets/LandingPage/chooseUtopia_1.png";
import ChooseUtopia_2 from "../../assets/LandingPage/chooseUtopia_2.png";
import ChooseUtopia_3 from "../../assets/LandingPage/chooseUtopia_3.png";

const ChooseUtopia = ({ data, isInFooter }) => {
  const chooseUtopiaData = [
    {
      image: ChooseUtopia_1,
      title: "تقدر تقدم بنفسك وقبولك يوصلك في أسرع وقت",
    },
    {
      image: ChooseUtopia_2,
      title: "متابعة كاملة للطالب من بداية الكورس لنهايته",
    },
    { image: ChooseUtopia_3, title: "خطة دراسية خاصة لكل طالب بناء علي هدفه" },
  ];
  return (
    <div className="hidden mx-4 mb-20 sm:mb-28 md:mx-0 sm:block">
      <div className="mb-40 text-3xl font-medium">
        {t("Why choose Utopia?")}
      </div>
      <div className="flex items-center justify-between gap-5">
        {chooseUtopiaData?.map((item, index) => (
          <div
            key={index}
            className="relative bg-[#1B0924] px-6 lg:px-12 pb-10 rounded-3xl h-44"
          >
            <div
              className={`${
                index === 0
                  ? "bg-mainColor"
                  : index === 1
                  ? "bg-[#FFB6BF]"
                  : "bg-[#FFCC1A]"
              } rounded-full p-6 lg:p-8 absolute -top-16 md:-top-20 lg:-top-24 left-1/2 -translate-x-1/2`}
            >
              <img
                src={item.image}
                alt="choose"
                className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20"
              />
            </div>
            <p className="flex items-end w-full h-full m-auto text-center text-white lg:w-3/4">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseUtopia;