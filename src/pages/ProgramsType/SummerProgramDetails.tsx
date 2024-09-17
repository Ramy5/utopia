import { t } from "i18next";
import React, { useEffect, useState } from "react";
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

const SummerProgramsDetails = () => {
  const [styledHtml, setStyledHtml] = useState("");
  console.log("🚀 ~ ProgramDetails ~ styledHtml:", styledHtml);
  const location = useLocation();
  const programDetails = location.state;
  const isRTL = useRTL();
  console.log("🚀 ~ ProgramDetails ~ programDetails:", programDetails);

  useEffect(() => {
    const htmlWithStyles = programDetails?.includes
      ?.replace("<ul", '<ul class="flex flex-wrap !list-none gap-4"')
      ?.replace(
        /<li>/g,
        '<li class="border border-[#707070] px-4 py-1 rounded-lg text-[15px]">'
      );

    setStyledHtml(htmlWithStyles);
  }, []);

  const isActive = [
    { label: "age group", value: programDetails?.packageData.age_group },
    {
      label: "family accommodation",
      value:
        programDetails?.packageData.family_housing === "active"
          ? t("available")
          : t("unavailable"),
    },
    {
      label: "student accommodation",
      value:
        programDetails?.packageData.student_housing === "active"
          ? t("available")
          : t("unavailable"),
    },
    {
      label: "general english",
      value:
        programDetails?.packageData.general_english === "active"
          ? t("available")
          : t("unavailable"),
    },
    {
      label: "IELTS course",
      value:
        programDetails?.packageData.ielts_course === "active"
          ? t("available")
          : t("unavailable"),
    },
  ];

  return (
    <div>
      <div className="max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-[90rem] md:px-4 px-4 m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 my-16">
          <div className="order-2 md:order-1">
            <div>
              <h2 className="text-2xl md:text-5xl font-medium md:font-normal mb-5 md:mb-0">
                {programDetails?.name}
              </h2>
              <div className="hidden md:flex gap-1 my-6">
                <div className="bg-mainColor rounded-full p-1">
                  <IoLocationOutline
                    fill="white"
                    className="text-white w-6 h-6"
                  />
                </div>
                <p className="bg-mainColor rounded-full px-5 py-0.5 text-white text-[15px]">
                  {programDetails?.city_name}
                </p>
              </div>
              <p className="w-full md:w-4/5 lg:w-3/4">{programDetails?.desc}</p>
            </div>
            <div className="mt-8 md:mt-20">
              <h2 className="text-2xl font-medium mb-3 md:mb-0 md:hidden block">
                {t("package includes")}
              </h2>
              <div className="hidden md:flex gap-1 mb-5">
                <div className="bg-mainColor rounded-full p-1">
                  <IoLocationOutline
                    fill="white"
                    className="text-white w-6 h-6"
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
          <div className="flex justify-center md:justify-end order-1 md:order-2">
            <div className="md:border border-[#707070] rounded-3xl w-full md:w-auto">
              <div className="rounded-3xl overflow-hidden h-60 md:h-full relative">
                <img
                  src={programDetails?.cityData.image}
                  className="w-full h-full md:h-auto m-auto rounded-3xl"
                />
                <div className="absolute bottom-3 right-3 md:hidden">
                  <Link
                    to={programDetails?.instagram}
                    className="bg-mainColor w-12 h-12 rounded-2xl flex justify-center items-center cursor-pointer"
                  >
                    <FaInstagram size={32} className="text-white" />
                  </Link>
                </div>
                <div className="hidden md:flex justify-between items-center gap-1 md:gap-4 px-4 py-3">
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
              <div className="mt-5 block md:hidden">
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

        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-3 gap-y-8 items-end mt-8 md:mt-24 mb-12 md:mb-20">
          <div className="md:col-span-6">
            <h2 className="text-2xl mb-4">{programDetails?.cityData.name}</h2>
            <div className="md:h-96 rounded-3xl overflow-hidden cursor-pointer h-52">
              <Link to={programDetails?.cityData.url}>
                <img
                  src={programDetails?.cityData.image}
                  alt="youtube"
                  className="hover:scale-[1.03] duration-300 w-full h-full"
                />
              </Link>
            </div>
          </div>
          <div className="md:col-span-4">
            <h2 className="text-2xl mb-4">{programDetails?.cityData.name}</h2>
            <div className="h-52 md:h-96 rounded-3xl overflow-hidden cursor-pointer">
              <Link to={programDetails?.partner_url}>
                <img
                  src={programDetails?.partner_image}
                  alt="youtube"
                  className="hover:scale-[1.03] duration-300 w-full h-full"
                />
              </Link>
            </div>
          </div>
          <div className="md:col-span-2 mr-auto md:mr-0 ">
            <Link
              to={programDetails?.instagram}
              className="bg-mainColor w-20 h-20 rounded-full md:rounded-2xl flex justify-center items-center cursor-pointer"
            >
              <FaInstagram size={50} className="text-white" />
            </Link>
          </div>
        </div>

        <div className="mb-28">
          <h2 className="text-2xl mb-8">{t("duration and price")}</h2>
          <Formik initialValues={{}} onSubmit={() => {}}>
            <Form>
              <div className="grid grid-cols-1 sm:grid-cols-2 w-3/4 gap-y-5">
                {programDetails?.packagePlans?.map((plan, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <BaseInput id="mounth" name="mounth" type="radio" />
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
              <Button className="mt-8 w-full sm:w-fit">
                {t("register now")}
              </Button>
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

export default SummerProgramsDetails;

{
  /* <ul className="flex flex-wrap gap-4 w-3/4">
<li className="border border-[#707070] px-4 py-1 rounded-lg text-[15px]">
  رسوم التأشيرة.
</li>
<li className="border border-[#707070] px-4 py-0.5 rounded-lg">
  رسوم التأشيرة.
</li>
<li className="border border-[#707070] px-4 py-0.5 rounded-lg">
  رسوم التأشيرة.
</li>
<li className="border border-[#707070] px-4 py-0.5 rounded-lg">
  الإقامة مع عائلة في غرفة مستقلة
</li>
<li className="border border-[#707070] px-4 py-0.5 rounded-lg">
  رسوم التأشيرة.
</li>
<li className="border border-[#707070] px-4 py-0.5 rounded-lg">
  شهادة معتمدةفي نهاية الكورس.
</li>
<li className="border border-[#707070] px-4 py-0.5 rounded-lg">
  شامل وجبات الفطور والعشاء وجميع الوجبات خلال الويكند.
</li>
<li className="border border-[#707070] px-4 py-0.5 rounded-lg">
  استخدام الكمبويتر والانترنت مجا نًا داخل المعهد.
</li>
</ul> */
}
