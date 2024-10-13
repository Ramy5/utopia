import { t } from "i18next";
import { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import Button from "../../components/atoms/Button/Button";
import DownLoadApp from "../../components/atoms/molecules/downLoad-app/DownLoadApp";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { apiRequest } from "../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import { IoIosSearch, IoMdCheckmark } from "react-icons/io";
import BaseSelect from "../../components/atoms/molecules/formik-fields/BaseSelect";
import { FaArrowRightLong } from "react-icons/fa6";
import { RiArrowLeftSLine } from "react-icons/ri";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import selectStyle from "../../hooks/selectStyle";
// import { Pagination } from "swiper";

const UniversityAdmissionsDetails = () => {
  const [styledHtml, setStyledHtml] = useState("");
  const location = useLocation();
  const isUniversityID = location.state;
  const navigate = useNavigate();

  const fetchUniversityDetails = async (id) => {
    try {
      const data = await apiRequest({
        url: `/api/student/university-packages/${id}`,
        method: "GET",
      });
      return data?.data;
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };

  const { data: universityData, isFetching: universityIsFeatching } = useQuery({
    queryKey: ["university-details", isUniversityID],
    queryFn: () => fetchUniversityDetails(isUniversityID),
    suspense: true,
  });

  console.log(
    "🚀 ~ UniversityAdmissionsDetails ~ universityData:",
    universityData
  );

  const includes =
    '<ul style="list-style-type:disc;"><li>hhhhh</li><li>hhhhh</li><li>hhhhh</li><li>hhhhh</li><li>jjjj</li></ul>';

  useEffect(() => {
    const htmlWithStyles = includes
      ?.replace("<ul", '<ul class="flex flex-wrap !list-none gap-4"')
      ?.replace(
        /<li>/g,
        '<li class="border border-[#707070] px-4 py-1 rounded-lg text-[15px]">'
      );

    setStyledHtml(htmlWithStyles);
  }, []);

  return (
    <div>
      <div className="max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-[80rem] md:px-4 px-4 m-auto">
        <div className="relative block sm:hidden">
          <div className="absolute -translate-y-1/2 top-1/2 ">
            <Link to={"/"}>
              <FaArrowRightLong
                size={22}
                className="mt-4 cursor-pointer justify-self-start"
              />
            </Link>
          </div>
          <h2 className="py-6 text-3xl font-medium text-center">
            {universityData.name}
          </h2>
        </div>

        <div className="w-full my-6 md:my-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:gap-20">
            <div className="order-2 md:order-1">
              <div>
                <h2 className="hidden mb-3 text-2xl font-medium md:mb-4 md:block">
                  {universityData?.name}
                </h2>
                <h2 className="block mb-3 text-2xl font-medium md:mb-4 md:hidden">
                  {t("brief about the university")}
                </h2>
                <p className="w-full ">{universityData?.desc}</p>
                <div className="block my-6 sm:hidden">
                  <h2 className="mb-4 text-2xl font-medium">
                    {t("certified in:")}
                  </h2>
                  <p className="text-[15px] font-base">
                    <span dangerouslySetInnerHTML={{ __html: styledHtml }} />
                  </p>
                </div>
              </div>
              <div className="hidden gap-20 mt-8 md:mt-12 md:flex">
                <div className="flex gap-1 mb-5">
                  <div className="p-1 rounded-full bg-mainColor">
                    <IoLocationOutline
                      fill="white"
                      className="w-6 h-6 text-white"
                    />
                  </div>
                  <p className="bg-mainColor rounded-full px-5 py-0.5 text-white text-[15px]">
                    {universityData?.city}
                  </p>
                </div>
                <div className="flex gap-1 mb-5">
                  <div className="p-1 rounded-full bg-mainColor">
                    <IoMdCheckmark
                      fill="white"
                      className="w-6 h-6 text-white"
                    />
                  </div>
                  <p className="bg-mainColor rounded-full px-5 py-0.5 text-white text-[15px]">
                    {t("certified")}
                  </p>
                </div>
              </div>
              <div className="hidden my-6 sm:block">
                <h2 className="mb-4 text-2xl font-medium">
                  {t("certified in:")}
                </h2>
                <p className="text-[15px] font-base">
                  <span dangerouslySetInnerHTML={{ __html: styledHtml }} />
                </p>
              </div>
            </div>
            <div className="flex justify-center order-1 md:justify-end md:order-2">
              <div className="md:border border-[#707070] rounded-3xl w-full">
                <div className="rounded-3xl  overflow-hidden h-72 md:h-[500px] relative">
                  <Swiper slidesPerView={1} spaceBetween={8}>
                    <div>
                      {universityData?.images?.map((item, index) => (
                        <SwiperSlide key={index}>
                          <div className="h-72 md:h-[500px]">
                            <img
                              src={item?.image}
                              className="w-full h-full m-auto"
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </div>
                  </Swiper>
                </div>
                <div className="flex gap-20 mt-12 md:mt-12 md:hidden">
                  <div className="flex gap-1 mb-5">
                    <div className="p-1 rounded-full bg-mainColor">
                      <IoLocationOutline
                        fill="white"
                        className="w-6 h-6 text-white"
                      />
                    </div>
                    <p className="bg-mainColor rounded-full px-5 py-0.5 text-white text-[15px]">
                      {universityData?.city}
                    </p>
                  </div>
                  <div className="flex gap-1 mb-5">
                    <div className="p-1 rounded-full bg-mainColor">
                      <IoMdCheckmark
                        fill="white"
                        className="w-6 h-6 text-white"
                      />
                    </div>
                    <p className="bg-mainColor rounded-full px-5 py-0.5 text-white text-[15px]">
                      {t("certified")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Button
          className="block w-full py-4 sm:hidden rounded-2xl mb-28"
          action={() =>
            navigate("/listSpecializations", {
              state: {
                id: universityData?.id,
                universityName: universityData.name,
              },
            })
          }
        >
          {t("explore the list of specializations")}
        </Button>
      </div>

      <div className="bg-[#1B0924] px-8 pb-32 hidden sm:block">
        <h2 className="pt-20 mb-4 text-6xl text-white">
          {t("list of majors")}
        </h2>
        <p className="text-lg font-medium text-white">
          {t("list of majors that you can study at the university")}
        </p>
        <div>
          <Formik
            initialValues={{ country_id: "", research: "" }}
            onSubmit={() => {}}
          >
            <Form className="grid grid-cols-10 gap-16 my-10 md:gap-24">
              <div className="col-span-4 my-5 md:col-span-3">
                <BaseSelect
                  id="country_id"
                  name="country_id"
                  placeholder={t("everyone")}
                  label={t("sort by specialization")}
                  labelStyle="text-white"
                  className="pt-2"
                  selectStyle={selectStyle}
                />
              </div>
              <div className="flex items-end w-full col-span-6 gap-2 my-5 md:col-span-5">
                <IoIosSearch size={45} className="mb-3 text-white" />
                <BaseSelect
                  id="country_id"
                  name="country_id"
                  placeholder={t("everyone")}
                  label={t("sort by academic degree")}
                  labelStyle="text-white"
                  className="pt-2 w-60"
                  selectStyle={selectStyle}
                />
              </div>
            </Form>
          </Formik>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 md:gap-12 lg:gap-32">
          {universityData?.specializations.map((item, index) => (
            <div
              key={index}
              className="relative bg-[#FFB6BF] rounded-2xl h-44 lg:h-48 flex flex-col justify-center items-center cursor-pointer group"
              onClick={() =>
                navigate("/specializations", {
                  state: { id: item.id, universityName: item.name },
                })
              }
            >
              <div className="absolute flex items-center justify-center w-8 h-8 text-white duration-300 rounded-full bg-mainColor -left-3 top-12 lg:top-14 group-hover:rotate-180">
                <RiArrowLeftSLine size={28} className="text-white" />
              </div>
              <h2 className="text-[20px] lg:text-2xl font-medium mb-3">
                {item.name}
              </h2>
              <p className="">{item.title}</p>
            </div>
          ))}
        </div>

        <Button
          bordered
          className="mt-16 text-white bg-transparent border-white rounded-full"
        >
          {t("show more")}
        </Button>
      </div>

      <div>
        <DownLoadApp />
      </div>
    </div>
  );
};

export default UniversityAdmissionsDetails;
