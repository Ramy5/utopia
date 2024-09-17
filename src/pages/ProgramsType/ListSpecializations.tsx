import { useQuery } from "@tanstack/react-query";
import React from "react";
import { apiRequest } from "../../utils/axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiArrowLeftSLine } from "react-icons/ri";
import { t } from "i18next";
import { FaArrowRightLong } from "react-icons/fa6";
import { Form, Formik } from "formik";
import BaseSelect from "../../components/atoms/molecules/formik-fields/BaseSelect";
import { IoIosSearch } from "react-icons/io";

const ListSpecializations = () => {
  const location = useLocation();
  const listSpecializationsID = location.state;
  const navigate = useNavigate();

  const fetchListSpecializations = async (id) => {
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

  const { data: listSpecializations } = useQuery({
    queryKey: ["list_specializations", listSpecializationsID],
    queryFn: () => fetchListSpecializations(listSpecializationsID),
    suspense: true,
  });

  console.log(
    "🚀 ~ ListSpecializations ~ listSpecializations:",
    listSpecializations
  );
  return (
    <div className="max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-[90rem] md:px-4 px-4 m-auto md:hidden block">
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
          {t("list of specializations")}
        </h2>
      </div>
      <p className="font-medium my-4">{t("find out the list of majors you can study at the university")}</p>
      <div>
        <Formik
          initialValues={{ country_id: "", research: "" }}
          onSubmit={() => {}}
        >
          <Form className="grid grid-cols-2 gap-2 items-center my-6">
            <div>
              <BaseSelect
                id="country_id"
                name="country_id"
                placeholder={t("everyone")}
                label={t("sort by specialization")}
                labelStyle="text-[15px] font-medium"
                className="pt-2"
              />
            </div>
            <div>
              <BaseSelect
                id="country_id"
                name="country_id"
                placeholder={t("everyone")}
                label={t("sort by academic degree")}
                labelStyle="text-[15px] font-medium"
                className="pt-2"
              />
            </div>
          </Form>
        </Formik>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8">
        {listSpecializations?.specializations.map((item, index) => (
          <div
            key={index}
            className="relative bg-[#FFB6BF] rounded-2xl h-[155px] cursor-pointer group text-center flex flex-col justify-center pb-2"
            onClick={() => navigate("/specializations", { state: item.id })}
          >
            <div className="bg-mainColor text-white absolute left-1/2 -translate-x-1/2 -bottom-3 flex justify-center items-center rounded-xl px-4 py-1">
              <RiArrowLeftSLine
                size={28}
                className="text-white rotate-180 group-hover:rotate-90 duration-300"
              />
              <p className="font-medium">{t("explore")}</p>
            </div>
            <h2 className="text-xl font-medium mb-3">{item.name}</h2>
            <p className="">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListSpecializations;