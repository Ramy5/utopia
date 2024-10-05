import { Link, useNavigate } from "react-router-dom";
import Button from "../atoms/Button/Button";
import { t } from "i18next";
import { Fragment, useState } from "react";

const ProgramsType = ({ data }) => {
  console.log("🚀 ~ ProgramsType ~ data:", data);
  const [indexCategory, setIndexCategory] = useState(1);
  const navigate = useNavigate();
  return (
    <div className="mb-20 sm:mb-28">
      <div className="hidden sm:block my-12 mx-4 md:mx-0">
        <div className="grid grid-cols-10 gap-3">
          {data?.categories?.map((categorie, index) => (
            <div
              key={index}
              className={`${index === 0 ? "col-span-4" : "col-span-3"}`}
            >
              <div>
                <img
                  src={categorie?.image}
                  alt="Book"
                  className="w-full h-64"
                />
              </div>
              <div
                className={`${
                  index === 0
                    ? "bg-mainColor"
                    : index === 1
                    ? "bg-[#FFB6BF]"
                    : "bg-[#FFCC1A]"
                } mt-4 rounded-2xl text-white px-4 lg:px-5 py-4 text-center cursor-pointer h-60 flex flex-col justify-between items-center`}
                onClick={() => setIndexCategory(categorie.id)}
              >
                <h2 className="font-medium text-lg lg:text-xl">
                  {categorie?.name}
                </h2>
                <div className="duration-500 ease-in-out">
                  <p className="mt-3 text-[15px] font-base line-clamp-4">
                    <span
                      dangerouslySetInnerHTML={{ __html: categorie?.desc }}
                    />
                  </p>
                </div>
                <Button
                  className="bg-white text-mainColor mt-5 w-fit"
                  action={() => {
                    const categoryType =
                      categorie.id === 1
                        ? "/programsSummer"
                        : categorie.id === 2
                        ? "/universityAdmissions"
                        : "/englishLanguage";
                    navigate(categoryType, { state: categorie });
                  }}
                >
                  {t("learn more")}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgramsType;
