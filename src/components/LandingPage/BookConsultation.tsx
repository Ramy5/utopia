import PhoneHeader from "../../assets/LandingPage/phone_header.svg";
import SummerPrograms from "../../assets/LandingPage/SummerPrograms.svg";
import EnglishLanguage from "../../assets/LandingPage/englishLanguage.svg";
import UniversityAdmissions from "../../assets/LandingPage/UniversityAdmissions.svg";
import Button from "../atoms/Button/Button";
import { t } from "i18next";
import {
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const BookConsultation = ({ data }) => {
  console.log("🚀 ~ BookConsultation ~ data:", data);
  const BookContent = [
    {
      title: "حجوزات الطيران",
      desc: "يمكنك حجز تذاكر الطيران عن طريق الإتصال على الرقم الموحد",
    },
    {
      title: "وجهاتنا",
      desc: "استكشف أجمل الوجهات معنا لتحضى بأفضل الأوقات",
    },
    {
      title: "خصم للحجز والدفع عن طريق بطاقة الراجحي",
      desc: "",
    },
  ];

  const BookCards = [
    { image: SummerPrograms, bg: "hsla(258, 100%, 94%, 1)" },
    { image: UniversityAdmissions, bg: "hsla(47, 100%, 55%, 1)" },
    { image: EnglishLanguage, bg: "hsla(353, 100%, 86%, 1)" },
  ];

  return (
    <div className="mb-24 sm:mb-28">
      <div className="hidden mx-4 my-12 sm:block md:mx-0">
        <div className="grid grid-cols-11 gap-3">
          {data?.offers?.map((offer, index) => (
            <div
              key={index}
              className={`${index === 2 ? "col-span-5" : "col-span-3"}`}
            >
              <div>
                <img
                  src={offer?.image}
                  alt="Book"
                  className={`${index === 2 ? "h-full" : "max-h-56 w-full"}`}
                />
              </div>
              <div className="mt-6">
                <h2
                  className={`${
                    index === 2
                      ? "text-2xl lg:text-4xl w-full lg:w-2/3"
                      : "font-bold text-base"
                  }`}
                >
                  {BookContent[index]?.title}
                </h2>
                <p className="mt-2 w-full lg:w-2/3 text-[15px] lg:text-base">
                  {BookContent[index]?.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="grid items-center grid-cols-11 my-6">
          <div className="col-span-6">
            <p className="text-lg">
              {t("contact us")} | <span>920022618</span>
            </p>
            <div className="flex gap-4 mt-3">
              <a
                href="https://www.tiktok.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTiktok
                  size={20}
                  className="fill-[#D1CBCB] hover:fill-mainColor duration-300"
                />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram
                  size={22}
                  className="fill-[#D1CBCB] hover:fill-mainColor duration-300"
                />
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin
                  size={22}
                  className="fill-[#D1CBCB] hover:fill-mainColor duration-300"
                />
              </a>
              <a
                href="https://web.whatsapp.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp
                  size={22}
                  className="fill-[#D1CBCB] hover:fill-mainColor duration-300"
                />
              </a>
              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter
                  size={22}
                  className="fill-[#D1CBCB] hover:fill-mainColor duration-300"
                />
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube
                  size={24}
                  className="fill-[#D1CBCB] hover:fill-mainColor duration-300"
                />
              </a>
            </div>
          </div>
          <Link to={"/bookConsultant"} className="col-span-5">
            <Button className="mt-4">{t("book consultation")}</Button>
          </Link>
        </div>
      </div>

      <div className="relative block sm:hidden">
        <img src={PhoneHeader} alt="Landing" className="w-full" />
        <div className="absolute w-full px-5 mt-4 -translate-y-1/2 top-full">
          <div className="grid w-full grid-cols-3 gap-4 ">
            {data?.categories?.map((categorie, index) => (
              <div key={index} className="!cursor-pointer">
                <Link
                  to={`${
                    categorie.id === 1
                      ? "/programsSummer"
                      : categorie.id === 2
                      ? "/universityAdmissions"
                      : "/englishLanguage"
                  } `}
                  
                >
                  <div
                    className="px-2 py-4 rounded-2xl"
                    style={{ backgroundColor: BookCards[index]?.bg }}
                  >
                    <div className="text-center">
                      <img
                        src={BookCards[index]?.image}
                        alt="Landing"
                        className="w-20 h-20 m-auto"
                      />
                      <h2 className="mt-3 font-medium">{categorie.name}</h2>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <Button className="mt-8">
            <Link to={"/bookConsultant"}>{t("book consultation")}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookConsultation;
