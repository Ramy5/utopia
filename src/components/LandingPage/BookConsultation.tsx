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
  const BookCards = [
    { image: SummerPrograms, bg: "hsla(258, 100%, 94%, 1)" },
    { image: UniversityAdmissions, bg: "hsla(47, 100%, 55%, 1)" },
    { image: EnglishLanguage, bg: "hsla(353, 100%, 86%, 1)" },
  ];

  return (
    <div className="mb-24 sm:mb-28">
      <div className="hidden mx-4 my-12 sm:block md:mx-0">
        <div className="grid grid-cols-11 gap-2 lg:gap-4">
          {data?.sliders?.map((slider, index) => (
            <div
              key={index}
              className={`${index === 2 ? "col-span-5" : "col-span-3"}`}
            >
              <div>
                <img
                  src={slider?.image}
                  alt="Book"
                  className={`${
                    index === 2
                      ? "h-[430px] w-full rounded-[1.85rem]"
                      : "h-[275px] w-full rounded-[1.85rem]"
                  } `}
                />
              </div>
              <div className="mt-6">
                <h2
                  className={`${
                    index === 2
                      ? "text-2xl lg:text-4xl font-normal w-full lg:w-2/3 !leading-[3.5rem]"
                      : "font-semibold text-sm"
                  }`}
                >
                  {slider?.title}
                </h2>
                <p className="mt-2 w-full text-[15px] lg:text-sm">
                  {slider?.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="grid items-center grid-cols-11 my-6">
          <div className="col-span-6">
            <p className="text-lg">
              {t("Contact us")} | <span>{data?.links?.[0]?.phone}</span>
            </p>
            <div className="flex gap-4 mt-3">
              {data?.links?.[0]?.tiktok && (
                <a
                  href={data?.links?.[0]?.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTiktok
                    size={20}
                    className="fill-[#D1CBCB] hover:fill-mainColor duration-300"
                  />
                </a>
              )}
              {data?.links?.[0]?.instagram && (
                <a
                  href={data?.links?.[0]?.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram
                    size={22}
                    className="fill-[#D1CBCB] hover:fill-mainColor duration-300"
                  />
                </a>
              )}
              {data?.links?.[0]?.linkedIn && (
                <a
                  href={data?.links?.[0]?.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin
                    size={22}
                    className="fill-[#D1CBCB] hover:fill-mainColor duration-300"
                  />
                </a>
              )}
              {data?.links?.[0]?.tiktok && (
                <a
                  href={data?.links?.[0]?.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp
                    size={22}
                    className="fill-[#D1CBCB] hover:fill-mainColor duration-300"
                  />
                </a>
              )}
              {data?.links?.[0]?.twitter && (
                <a
                  href={data?.links?.[0]?.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaXTwitter
                    size={22}
                    className="fill-[#D1CBCB] hover:fill-mainColor duration-300"
                  />
                </a>
              )}
              {data?.links?.[0]?.youTube && (
                <a
                  href={data?.links?.[0]?.youTube}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaYoutube
                    size={24}
                    className="fill-[#D1CBCB] hover:fill-mainColor duration-300"
                  />
                </a>
              )}
            </div>
          </div>
          <Link to={"/bookConsultant"} className="col-span-5">
            <Button className="mt-4 py-2 rounded-3xl font-normal text-xl hover:bg-mainYellow duration-500">
              {t("Book consultation")}
            </Button>
          </Link>
        </div>
      </div>

      <div className="relative block sm:hidden">
        <img src={PhoneHeader} alt="Landing" className="w-full" />
        <div className="absolute w-full px-4 mt-4 -translate-y-1/2 top-full">
          <div className="grid w-full grid-cols-3 gap-3 ">
            {data?.categories?.map((categorie, index) => (
              <div key={index} className="!cursor-pointer">
                {/* <Link
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
                        loading="lazy"
                      />
                      <h2 className="mt-3 font-medium">{categorie.name}</h2>
                    </div>
                  </div>
                </Link> */}
                {categorie.id === 2 ? (
                  <div
                    className="px-2 py-4 rounded-2xl "
                    style={{
                      backgroundColor: BookCards[index]?.bg,
                      cursor: "default",
                    }}
                  >
                    <div className="text-center cursor-not-allowed">
                      <img
                        src={BookCards[index]?.image}
                        alt="Landing"
                        className="w-20 h-20 m-auto"
                      />
                      <h2 className="mt-3 font-medium">{categorie.name}</h2>
                    </div>
                  </div>
                ) : (
                  <Link
                    to={`${
                      categorie.id === 1
                        ? "/programsSummer"
                        : "/englishLanguage"
                    }`}
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
                )}
              </div>
            ))}
          </div>
          <Button className="mt-8">
            <Link to={"/bookConsultant"}>{t("Book consultation")}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookConsultation;
