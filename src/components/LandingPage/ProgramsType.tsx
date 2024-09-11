import Button from "../atoms/Button/Button";
import { t } from "i18next";

const ProgramsType = ({ data }) => {
  return (
    <div className="mb-20 sm:mb-28">
      <div className="hidden sm:block my-12 mx-4 md:mx-0">
        <div className="grid grid-cols-10 gap-5">
          {data?.categories?.map((categorie, index) => (
            <div
              key={index}
              className={`${index === 0 ? "col-span-4" : "col-span-3"}`}
            >
              <div>
                <img
                  src={categorie?.image}
                  alt="Book"
                  className="w-full h-60"
                />
              </div>
              <div
                className={`${
                  index === 0
                    ? "bg-mainColor"
                    : index === 1
                    ? "bg-[#FFB6BF]"
                    : "bg-[#FFCC1A]"
                } mt-6 rounded-3xl text-white px-4 lg:px-5 py-5 text-center`}
              >
                <h2 className="font-medium text-lg lg:text-xl">
                  {categorie?.name}
                </h2>
                {index === 0 && (
                  <>
                    <p className="mt-3 text-[15px] font-base">
                      <div
                        dangerouslySetInnerHTML={{ __html: categorie?.desc }}
                      />
                    </p>
                    <Button className="bg-white text-mainColor mt-5">
                      {t("learn more")}
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgramsType;
