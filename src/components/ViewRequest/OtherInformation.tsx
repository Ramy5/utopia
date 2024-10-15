import { t } from "i18next";
import LoginBg from "../../assets/loginBg.jpg";
import Button from "../atoms/Button/Button";
import { IoChevronDown } from "react-icons/io5";

const OtherInformation = () => {
  const CourseData = [
    {
      name: "انجليزي عام ٢٠ درس في الاسبوع",
      type: "غرفة خاصة، حمام مشترك، افطار وعشاء",
      duration: "اسبوع",
      dates: "2025 05 - 2024",
      isConfirmed: true,
    },
    {
      name: "السكن العائلي ٢٠ درس في الاسبوع",
      type: "غرفة خاصة، حمام مشترك، افطار وعشاء",
      duration: "اسبوع",
      dates: "2025 05 - 2024",
      isConfirmed: false,
    },
    {
      name: "السكن العائلي ٢٠ درس في الاسبوع",
      type: "غرفة خاصة، حمام مشترك، افطار وعشاء",
      duration: "اسبوع",
      dates: "2025 05 - 2024",
      isConfirmed: false,
    },
  ];
  return (
    <div className="mb-20">
      <div className="flex items-center gap-x-3 mb-6">
        <h2 className="text-3xl">{t("Other")}</h2>
        <div className="w-7 h-7 rounded-full bg-mainColor flex items-center justify-center">
          <IoChevronDown size={18} className="text-white" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 lg:gap-x-20 gap-y-12 my-8">
        {CourseData?.map((item, index) => (
          <div
            key={index}
            className="bg-[#F7F7F7] rounded-3xl py-4 px-4 relative h-32"
          >
            <div className="flex justify-between items-center">
              <p className="text-xs">{t("Accommodation")}</p>
              <span
                className={`text-xs py-1.5 rounded-2xl ${
                  item.isConfirmed ? "bg-[#39FF0A] px-8" : "bg-[#D1CBCB] px-4"
                }`}
              >
                {item.isConfirmed ? t("Confirmed") : t("Under process")}
              </span>
            </div>
            <Button className="absolute w-[90%] left-1/2 -translate-x-1/2 -bottom-3 rounded-3xl py-2">
              {t("Download")}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherInformation;
