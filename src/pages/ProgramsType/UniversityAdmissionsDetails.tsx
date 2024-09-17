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
      <div className="max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-[90rem] md:px-4 px-4 m-auto">
        <div className="relative block md:hidden">
          <div className="absolute top-1/2 -translate-y-1/2 ">
            <Link to={"/"}>
              <FaArrowRightLong
                size={22}
                className="mt-4 cursor-pointer justify-self-start"
              />
            </Link>
          </div>
          <h2 className="text-3xl font-medium text-center py-6">
            {universityData.name}
          </h2>
        </div>

        <div className="my-6 md:my-20 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20">
            <div className="order-2 md:order-1">
              <div>
                <h2 className="text-2xl font-medium mb-3 md:mb-4 hidden md:block">
                  {universityData?.name}
                </h2>
                <h2 className="text-2xl font-medium mb-3 md:mb-4 block md:hidden">
                  {t("brief about the university")}
                </h2>
                <p className="w-full ">{universityData?.desc}</p>
                <div className="my-6 md:hidden block">
                  <h2 className="font-medium text-2xl mb-4">
                    {t("certified in:")}
                  </h2>
                  <p className="text-[15px] font-base">
                    <span dangerouslySetInnerHTML={{ __html: styledHtml }} />
                  </p>
                </div>
              </div>
              <div className="mt-8 md:mt-12 gap-20 hidden md:flex">
                <div className="flex gap-1 mb-5">
                  <div className="bg-mainColor rounded-full p-1">
                    <IoLocationOutline
                      fill="white"
                      className="text-white w-6 h-6"
                    />
                  </div>
                  <p className="bg-mainColor rounded-full px-5 py-0.5 text-white text-[15px]">
                    {universityData?.city}
                  </p>
                </div>
                <div className="flex gap-1 mb-5">
                  <div className="bg-mainColor rounded-full p-1">
                    <IoMdCheckmark
                      fill="white"
                      className="text-white w-6 h-6"
                    />
                  </div>
                  <p className="bg-mainColor rounded-full px-5 py-0.5 text-white text-[15px]">
                    {t("certified")}
                  </p>
                </div>
              </div>
              <div className="my-6 md:block hidden">
                <h2 className="font-medium text-2xl mb-4">
                  {t("certified in:")}
                </h2>
                <p className="text-[15px] font-base">
                  <span dangerouslySetInnerHTML={{ __html: styledHtml }} />
                </p>
              </div>
            </div>
            <div className="flex justify-center md:justify-end order-1 md:order-2">
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
                <div className="mt-12 md:mt-12 gap-20 flex md:hidden">
                  <div className="flex gap-1 mb-5">
                    <div className="bg-mainColor rounded-full p-1">
                      <IoLocationOutline
                        fill="white"
                        className="text-white w-6 h-6"
                      />
                    </div>
                    <p className="bg-mainColor rounded-full px-5 py-0.5 text-white text-[15px]">
                      {universityData?.city}
                    </p>
                  </div>
                  <div className="flex gap-1 mb-5">
                    <div className="bg-mainColor rounded-full p-1">
                      <IoMdCheckmark
                        fill="white"
                        className="text-white w-6 h-6"
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
          className="md:hidden block w-full py-4 rounded-2xl mb-28"
          action={() =>
            navigate("/listSpecializations", { state: universityData?.id })
          }
        >
          {t("explore the list of specializations")}
        </Button>
      </div>

      <div className="bg-[#1B0924] px-8 pb-32 hidden md:block">
        <h2 className="pt-20 mb-4 text-6xl text-white">
          {t("list of majors")}
        </h2>
        <p className="text-white text-lg font-medium">
          {t("list of majors that you can study at the university")}
        </p>
        <div>
          <Formik
            initialValues={{ country_id: "", research: "" }}
            onSubmit={() => {}}
          >
            <Form className="grid grid-cols-10 gap-28 my-10">
              <div className="my-5 col-span-2">
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
              <div className="my-5 flex items-end gap-2 col-span-4 w-full">
                <IoIosSearch size={45} className="mb-3 text-white" />
                <BaseSelect
                  id="country_id"
                  name="country_id"
                  placeholder={t("everyone")}
                  label={t("sort by academic degree")}
                  labelStyle="text-white"
                  className="pt-2"
                  selectStyle={selectStyle}
                />
              </div>
            </Form>
          </Formik>
        </div>

        <div className="grid grid-cols-3 gap-32">
          {universityData?.specializations.map((item, index) => (
            <div
              key={index}
              className="relative bg-[#FFB6BF] rounded-2xl h-48 flex flex-col justify-center items-center cursor-pointer group"
              onClick={() => navigate("/specializations", { state: item.id })}
            >
              <div className="bg-mainColor text-white absolute -left-3 top-14 flex justify-center items-center rounded-full w-8 h-8 group-hover:rotate-180 duration-300">
                <RiArrowLeftSLine size={28} className="text-white" />
              </div>
              <h2 className="text-2xl font-medium mb-3">{item.name}</h2>
              <p className="">{item.title}</p>
            </div>
          ))}
        </div>

        <Button
          bordered
          className="rounded-full bg-transparent border-white text-white mt-16"
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