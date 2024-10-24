import { t } from "i18next";
import LoginBg from "../../assets/loginBg.jpg";
import Button from "../atoms/Button/Button";
import { IoChatbubbleOutline, IoChevronDown } from "react-icons/io5";
import cn from "../../utils/cn";
import { useNavigate } from "react-router-dom";
import { downloadImage, downloadPDF } from "../../hooks/Download";

const OtherInformation = ({ steps, others }) => {
  console.log("🚀 ~ OtherInformation ~ others:", others);
  const navigate = useNavigate();
  const CourseData = [
    {
      name: t("Visa"),
      isConfirmed: others?.visa,
    },
    {
      name: t("Travel insurance"),
      isConfirmed: others?.travel,
    },
    {
      name: t("Flight ticket"),
      isConfirmed: others?.ticket,
    },
  ];

  return (
    <div className="mb-20">
      <div className="sm:flex items-center gap-x-3 mb-6 hidden">
        <h2 className="text-3xl">{t("Other")}</h2>
        <div className="w-7 h-7 rounded-full bg-mainColor flex items-center justify-center">
          <IoChevronDown size={18} className="text-white" />
        </div>
      </div>

      {/* DESKTOP */}
      <div className="sm:grid grid-cols-2 md:grid-cols-3 gap-x-8 lg:gap-x-20 gap-y-12 my-8 hidden">
        {CourseData?.map((item, index) => (
          <div
            key={index}
            className="bg-[#F7F7F7] rounded-3xl py-4 px-4 relative h-32"
          >
            <div className="flex justify-between items-center">
              <p className="text-xs">{t("Accommodation")}</p>
              <span
                className={cn(
                  "text-xs py-1.5 rounded-2xl",
                  item.isConfirmed ? "bg-[#39FF0A] px-8" : "bg-[#D1CBCB] px-4"
                )}
              >
                {item.isConfirmed ? t("Confirmed") : t("Under process")}
              </span>
            </div>
            <Button
              action={() => {
                const fileExtension = item.isConfirmed
                  .split(".")
                  .pop()
                  .toLowerCase();
                if (
                  ["jpg", "jpeg", "png", "gif", "svg", "bmp"].includes(
                    fileExtension
                  )
                ) {
                  downloadImage(item.isConfirmed);
                } else {
                  downloadPDF(item.isConfirmed);
                }
              }}
              className={`absolute h-11 w-[90%]  left-1/2 -translate-x-1/2 -bottom-3 rounded-3xl py-2 ${
                item.isConfirmed
                  ? "cursor-pointer"
                  : "cursor-not-allowed disabled:bg-mainColor disabled:border-none disabled:text-white"
              } `}
              disabled
            >
              {t("Download")}
            </Button>
          </div>
        ))}
      </div>

      {steps === 3 && (
        <>
          {/* MOBILE */}
          <div className="my-8 sm:hidden block bg-[#F7F7F7] rounded-xl shadow-md p-4">
            {CourseData?.map((item, index) => (
              <div
                key={index}
                className="rounded-3xl py-4 px-4 relative border border-[#C9C5CA] my-5"
              >
                <div className="flex justify-between items-center">
                  <p className="text-xs">{t("Accommodation")}</p>
                  <span
                    className={cn(
                      "text-xs py-1.5 rounded-2xl",
                      item.isConfirmed
                        ? "bg-[#39FF0A] px-8"
                        : "bg-[#D1CBCB] px-4"
                    )}
                  >
                    {item.isConfirmed ? t("Confirmed") : t("Under process")}
                  </span>
                </div>
                <Button
                  action={() => {
                    const fileExtension = item.isConfirmed
                      .split(".")
                      .pop()
                      .toLowerCase();
                    if (
                      ["jpg", "jpeg", "png", "gif", "svg", "bmp"].includes(
                        fileExtension
                      )
                    ) {
                      downloadImage(item.isConfirmed);
                    } else {
                      downloadPDF(item.isConfirmed);
                    }
                  }}
                  className="w-full rounded-xl py-2 mt-4"
                >
                  {t("Download")}
                </Button>
              </div>
            ))}
          </div>

          <Button
            action={() => navigate("/chat")}
            className="text-base font-medium bg-[#1B0924] mt-5 sm:hidden block"
          >
            <div className="flex items-center gap-2">
              <IoChatbubbleOutline size={20} />
              <p>{t("Contact the institute")}</p>
            </div>
          </Button>
        </>
      )}
    </div>
  );
};

export default OtherInformation;
