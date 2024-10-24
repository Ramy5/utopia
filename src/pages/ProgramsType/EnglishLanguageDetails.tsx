import { t } from "i18next";
import React, { ChangeEvent, useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { useRTL } from "../../hooks/useRTL";
import { FaInstagram } from "react-icons/fa";
import BaseInput from "../../components/atoms/molecules/formik-fields/BaseInput";
import { Form, Formik } from "formik";
import Button from "../../components/atoms/Button/Button";
import DownLoadApp from "../../components/atoms/molecules/downLoad-app/DownLoadApp";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useAuth } from "../../context/AuthContext";

const EnglishLanguageDetails = () => {
  const [styledHtml, setStyledHtml] = useState("");
  const location = useLocation();
  const EnglishLanguageDetails = location.state;
  const [planId, setPlanId] = useState(null);
  const [amount, setAmount] = useState("");
  const { user } = useAuth();

  const handleSelectedPlanId = (id, amount) => {
    setPlanId(id);
    setAmount(amount);
  };


  useEffect(() => {
    const htmlWithStyles = EnglishLanguageDetails?.includes
      ?.replace("<ul", '<ul class="flex flex-wrap !list-none gap-4"')
      ?.replace(
        /<li>/g,
        '<li class="border border-[#707070] px-4 py-1 rounded-lg text-[15px]">'
      );

    setStyledHtml(htmlWithStyles);
  }, []);

  const isActive = [
    {
      label: "age group",
      value: EnglishLanguageDetails?.packageData.age_group,
    },
    {
      label: "family accommodation",
      value:
        EnglishLanguageDetails?.packageData.family_housing === "active"
          ? t("available")
          : t("unavailable"),
    },
    {
      label: "student accommodation",
      value:
        EnglishLanguageDetails?.packageData.student_housing === "active"
          ? t("available")
          : t("unavailable"),
    },
    {
      label: "general english",
      value:
        EnglishLanguageDetails?.packageData.general_english === "active"
          ? t("available")
          : t("unavailable"),
    },
    {
      label: "IELTS course",
      value:
        EnglishLanguageDetails?.packageData.ielts_course === "active"
          ? t("available")
          : t("unavailable"),
    },
  ];

  return (
    <div>
      <div className="max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-[80rem] md:px-4 px-4 m-auto">
        <div className="grid grid-cols-1 gap-2 my-16 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <div>
              <h2 className="my-5 text-2xl font-medium md:text-4xl md:font-normal md:my-0">
                {EnglishLanguageDetails?.name}
              </h2>
              <div className="hidden gap-1 my-6 md:flex">
                <div className="p-1 rounded-full bg-mainColor">
                  <IoLocationOutline
                    fill="white"
                    className="w-6 h-6 text-white"
                  />
                </div>
                <p className="bg-mainColor rounded-full px-5 py-0.5 text-white text-[15px]">
                  {EnglishLanguageDetails?.city_name}
                </p>
              </div>
              <p className="w-full md:w-4/5 lg:w-3/4">
                {EnglishLanguageDetails?.desc}
              </p>
            </div>
            <div className="mt-8 md:mt-20">
              <h2 className="block mb-3 text-2xl font-medium md:mb-0 md:hidden">
                {t("package includes")}
              </h2>
              <div className="hidden gap-1 mb-5 md:flex">
                <div className="p-1 rounded-full bg-mainColor">
                  <IoLocationOutline
                    fill="white"
                    className="w-6 h-6 text-white"
                  />
                </div>
                <p className="bg-mainColor rounded-full px-5 py-0.5 text-white text-[15px]">
                  {t("package includes")}
                </p>
              </div>
              <p className="mb-5">
                انجليزي عام 15 ساعة / الاسبوع - 20 درس/ الاسبوع
              </p>
              <p className="text-[15px] font-base">
                <span dangerouslySetInnerHTML={{ __html: styledHtml }} />
              </p>
            </div>
          </div>
          <div className="flex justify-center order-1 md:justify-end md:order-2">
            <div className="md:border border-[#707070] rounded-3xl w-full md:w-auto">
              <div className="relative overflow-hidden rounded-3xl h-60 md:h-full">
                <img
                  src={EnglishLanguageDetails?.cityData.image}
                  className="w-full h-full m-auto md:h-auto rounded-3xl"
                />
                <div className="absolute bottom-3 right-3 md:hidden">
                  <Link
                    to={EnglishLanguageDetails?.instagram}
                    className="flex items-center justify-center w-12 h-12 cursor-pointer bg-mainColor rounded-2xl"
                  >
                    <FaInstagram size={32} className="text-white" />
                  </Link>
                </div>
                <div className="items-center justify-between hidden gap-1 px-4 py-3 md:flex md:gap-4">
                  {isActive?.map((item, index) => (
                    <div
                      key={index}
                      className="border border-[#C9C5CA] md:border-none text-center px-2 py-3 md:px-0 rounded-2xl"
                    >
                      <h2 className="text-[15px]">{t(item.label)}</h2>
                      <p className="md:border border-[#707070] py-1 rounded-lg text-center mt-2 text-[15px] text-mainColor md:text-black">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="block mt-5 md:hidden">
                <Swiper slidesPerView={3} spaceBetween={8}>
                  <div>
                    {isActive?.map((item, index) => (
                      <SwiperSlide key={index}>
                        <div
                          key={index}
                          className="border border-[#C9C5CA] md:border-none text-center px-2 py-2 md:px-0 rounded-2xl"
                        >
                          <h2 className="text-[15px]">{t(item.label)}</h2>
                          <p className="md:border border-[#707070] py-1 rounded-lg text-center mt-1.5 text-[15px] text-mainColor md:text-black">
                            {item.value}
                          </p>
                        </div>
                      </SwiperSlide>
                    ))}
                  </div>
                </Swiper>
              </div>
            </div>
          </div>
        </div>

        <div className="grid items-end grid-cols-1 mt-8 mb-12 md:grid-cols-12 gap-x-3 gap-y-8 md:mt-24 md:mb-20">
          <div className="md:col-span-6">
            <h2 className="mb-4 text-2xl">
              {EnglishLanguageDetails?.cityData.name}
            </h2>
            <div className="h-64 overflow-hidden cursor-pointer rounded-3xl md:h-80 lg:h-96">
              <Link to={EnglishLanguageDetails?.cityData.url}>
                <img
                  src={EnglishLanguageDetails?.cityData.image}
                  alt="youtube"
                  className="hover:scale-[1.03] duration-300 w-full h-64 md:h-80 lg:h-full"
                />
              </Link>
            </div>
          </div>
          <div className="md:col-span-4">
            <h2 className="mb-4 text-2xl">
              {EnglishLanguageDetails?.cityData.name}
            </h2>
            <div className="h-64 overflow-hidden cursor-pointer rounded-3xl md:h-80 lg:h-96">
              <Link to={EnglishLanguageDetails?.partner_url}>
                <img
                  src={EnglishLanguageDetails?.partner_image}
                  alt="youtube"
                  className="hover:scale-[1.03] duration-300 w-full h-64 md:h-80 lg:h-full"
                />
              </Link>
            </div>
          </div>
          <div className="mr-auto md:col-span-2 md:mr-0 ">
            <Link
              to={EnglishLanguageDetails?.instagram}
              className="flex items-center justify-center w-20 h-20 rounded-full cursor-pointer bg-mainColor md:rounded-2xl"
            >
              <FaInstagram size={50} className="text-white" />
            </Link>
          </div>
        </div>

        <div className="mb-28">
          <h2 className="mb-8 text-2xl">{t("duration and price")}</h2>
          <Formik initialValues={{}} onSubmit={() => {}}>
            <Form>
              <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:w-4/5 lg:w-3/4 gap-y-5">
                {EnglishLanguageDetails?.packagePlans?.map((plan, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <input
                      id={plan?.id}
                      name={`packagePlan`}
                      type="radio"
                      className="p-2"
                      onChange={(e) =>
                        handleSelectedPlanId(e.target.id, plan.price)
                      }
                    />
                    <h2 className="border border-[#707070] px-5 py-1 rounded-lg text-center mt-2 text-[15px]">
                      {plan.duration === 1
                        ? `${t("mounth")}`
                        : `${plan.duration} ${t("mounths")}`}
                    </h2>
                    <p className="border border-[#707070] px-5 py-1 rounded-lg text-center mt-2 text-[15px]">
                      {plan.price} <span>{plan.unit}</span>
                    </p>
                  </div>
                ))}
              </div>
              <Link
                to={user ? "/EnglishAdmissionRegister" : "/login"}
                state={{
                  englishName: EnglishLanguageDetails?.name,
                  partnerId: EnglishLanguageDetails?.partner_id,
                  packageId: EnglishLanguageDetails?.category_id,
                  planId: planId,
                  amount: amount,
                  user_id: user?.id
                }}
              >
                <Button className="w-full mt-8 sm:w-fit">
                  {t("register now")}
                </Button>
              </Link>
            </Form>
          </Formik>
        </div>
      </div>

      <div>
        <DownLoadApp />
      </div>
    </div>
  );
};

export default EnglishLanguageDetails;
