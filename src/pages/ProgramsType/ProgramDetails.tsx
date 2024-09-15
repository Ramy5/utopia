import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { useRTL } from "../../hooks/useRTL";

const ProgramDetails = () => {
  const [styledHtml, setStyledHtml] = useState("");
  console.log("🚀 ~ ProgramDetails ~ styledHtml:", styledHtml);
  const location = useLocation();
  const programDetails = location.state;
  const isRTL = useRTL();
  console.log("🚀 ~ ProgramDetails ~ programDetails:", programDetails);

  useEffect(() => {
    const htmlWithStyles = programDetails?.includes
      .replace("<ul", '<ul class="flex flex-wrap !list-none gap-4"')
      .replace(
        /<li>/g,
        '<li class="border border-[#707070] px-4 py-0.5 rounded-lg">'
      );

    setStyledHtml(htmlWithStyles);
  }, []);

  return (
    <div className="max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-[90rem] md:px-4 mx-auto">
      <div className="my-12">
        <div className="grid grid-cols-2 gap-20">
          <div>
            <div>
              <h2 className="text-2xl font-medium">{programDetails?.name}</h2>
              <div className="flex gap-1 my-4">
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
              <p className="w-3/4">
                معهد كابلان هو احد المعاهد العريقة والمتميزة، معتمد من المجلس
                الثقافي البريطاني أما مدينة ليفربول فهي مدينة تتميز بجوها البارد
                وتقع بالقرب من مانشستر…
              </p>
            </div>
            <div className="mt-10">
              <div className="flex gap-1 my-4">
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
              <ul className="flex flex-wrap gap-4 w-3/4">
                <li className="border border-[#707070] px-4 py-0.5 rounded-lg">
                  رسوم التأشيرة.
                </li>
                <li className="border border-[#707070] px-4 py-0.5 rounded-lg">
                  رسوم التأشيرة.
                </li>
                <li className="border border-[#707070] px-4 py-0.5 rounded-lg">
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
                  شامل وجبات الفطور والعشاء وجميع الوجبات خلال الويكند.
                </li>
                <li className="border border-[#707070] px-4 py-0.5 rounded-lg">
                  استخدام الكمبويتر والانترنت مجا نًا داخل المعهد.
                </li>
              </ul>
              {/* <p className="text-[15px] font-base">
                <span dangerouslySetInnerHTML={{ __html: styledHtml }} />
              </p> */}
            </div>
          </div>
          <div className="flex justify-end">
            <div className="border border-[#707070] rounded-3xl">
              <div className="rounded-3xl  overflow-hidden">
                <img src={programDetails?.cityData.image} />
              </div>
              <div className="flex justify-between items-center gap-4 px-4 py-6">
                <div>
                  <h2 className="text-[15px]">{t("age group")}</h2>
                  <p className="border border-[#707070] px-5 py-1 rounded-lg text-center mt-2 text-[15px] ">
                    {programDetails?.packageData.age_group}
                  </p>
                </div>
                <div>
                  <h2 className="text-[15px]">{t("family accommodation")}</h2>
                  <p className="border border-[#707070] px-5 py-1 rounded-lg text-center mt-2 text-[15px]">
                    {" "}
                    {programDetails?.packageData.family_housing === "active"
                      ? `${t("available")}`
                      : `${t("unavailable")}`}
                  </p>
                </div>
                <div>
                  <h2 className="text-[15px]">{t("student accommodation")}</h2>
                  <p className="border border-[#707070] px-5 py-1 rounded-lg text-center mt-2 text-[15px]">
                    {" "}
                    {programDetails?.packageData.student_housing === "active"
                      ? `${t("available")}`
                      : `${t("unavailable")}`}
                  </p>
                </div>
                <div>
                  <h2 className="text-[15px]">{t("general english")}</h2>
                  <p className="border border-[#707070] px-5 py-1 rounded-lg text-center mt-2 text-[15px]">
                    {" "}
                    {programDetails?.packageData.general_english === "active"
                      ? `${t("available")}`
                      : `${t("unavailable")}`}
                  </p>
                </div>
                <div>
                  <h2 className="text-[15px]">{t("IELTS course")}</h2>
                  <p className="border border-[#707070] px-5 py-1 rounded-lg text-center mt-2 text-[15px]">
                    {" "}
                    {programDetails?.packageData.ielts_course === "active"
                      ? `${t("available")}`
                      : `${t("unavailable")}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetails;
