import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../utils/axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { t } from "i18next";
import Copy from "../assets/LandingPage/copy.png";
import { useEffect, useState } from "react";

const BankAccounts = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  console.log("🚀 ~ BankAccounts ~ selectedIndex:", selectedIndex);
  const [animate, setAnimate] = useState(false);

  const [copySuccess, setCopySuccess] = useState("");

  const fetchBankAccounts = async () => {
    try {
      const response = await apiRequest({
        url: "/api/student/banks-account",
        method: "GET",
      });

      return response?.data || [];
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };

  const { data = [] } = useQuery({
    queryKey: ["bank_accounts"],
    queryFn: fetchBankAccounts,
    suspense: true,
  });

  useEffect(() => {
    if (selectedIndex !== null) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 500);
      return () => clearTimeout(timer);
    }
  }, [selectedIndex]);

  const handleCopy = (props: string) => {
    navigator.clipboard
      .writeText(props)
      .then(() => {
        setCopySuccess("Copied to clipboard");
        setTimeout(() => {
          setCopySuccess(""); // Clear the message after 2 seconds
        }, 1500);
      })
      .catch((err) => {
        setCopySuccess("Failed to copy");
        console.error("Error copying text: ", err);
      });
  };

  return (
    <div className="py-3 px-4 relative block sm:hidden">
      <div className="relative">
        <div className="absolute top-1/2 -translate-y-1/2 ">
          <Link to={"/"}>
            <FaArrowRightLong
              size={22}
              className="mt-4 cursor-pointer justify-self-start"
            />
          </Link>
        </div>
        <h2 className="text-3xl font-medium text-center py-12">
          {t("bank accounts")}
        </h2>
      </div>
      <h2 className="font-semibold text-2xl mb-10">
        {t("you can now pay by bank transfer to any of the following banks:")}
      </h2>
      <Swiper spaceBetween={50} slidesPerView={4}>
        <div className="flex gap-8">
          {data?.map((brand, index) => (
            <SwiperSlide key={index}>
              <div
                className={`${
                  selectedIndex === index
                    ? "bg-[#FFB6BF]"
                    : "border-2 border-[#C9C5CA]"
                } cursor-pointer rounded-xl py-3 w-20 `}
                onClick={() => setSelectedIndex(index)}
              >
                <img
                  src={brand.image}
                  alt="brand"
                  className="w-14 h-14 m-auto"
                />
              </div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>

      <div
        className={`bg-[#E8DEFF] py-4 px-4 rounded-xl my-8 ${
          animate ? "animate_scale" : ""
        }`}
      >
        <h2 className="text-center mb-5 font-semibold text-2xl">
          {data?.[selectedIndex].bank_name}
        </h2>
        <h3 className="mb-5 font-semibold text-xl">
          {t("utopia travel and tourism")}
        </h3>
        <p className="font-medium text-xl mb-4">
          {t("account name:")}{" "}
          <span className="text-[#79767A] font-medium">
            {data?.[selectedIndex].bank_account_name}
          </span>
        </p>
        <p className="font-medium text-xl my-2">{t("account number")}</p>
        <div className="flex items-center justify-between pb-2">
          <p className="text-[#79767A] font-medium">
            {data?.[selectedIndex].account_number}
          </p>
          <div className="bg-white rounded-xl p-2">
            <img
              src={Copy}
              alt="copy"
              onClick={() =>
                // navigator.clipboard.writeText(
                //   data?.[selectedIndex].account_number
                // )
                handleCopy(data?.[selectedIndex].account_number)
              }
            />
          </div>
        </div>
        <p className="font-medium text-xl my-2">{t("IBAN number")}</p>
        <div className="flex items-center justify-between">
          <p className="text-[#79767A] font-medium">
            {data?.[selectedIndex].iban_number}
          </p>
          <div className="bg-white rounded-xl p-2">
            <img
              src={Copy}
              alt="copy"
              onClick={() => handleCopy(data?.[selectedIndex].iban_number)}
            />
          </div>
        </div>
      </div>

      <div
        className={`fixed bottom-5 left-1/2 -translate-x-1/2 text-center bg-[#333333e8] text-white rounded-[2rem] duration-300 text-xl font-medium ${
          copySuccess ? "opacity-100 py-3.5 w-56 " : "opacity-0"
        }`}
      >
        {copySuccess ? <p>{t(`${copySuccess}`)}</p> : ""}
      </div>
    </div>
  );
};

export default BankAccounts;
