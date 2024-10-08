import React from "react";
import Button from "../../components/atoms/Button/Button";
import { Link } from "react-router-dom";
import { t } from "i18next";
import DownLoadAppSecondImg from "../../components/atoms/molecules/downLoad-app/DownLoadAppSecondImg";

const AddRequest = () => {
  return (
    <>
      <div className="max-w-full mt-24 sm:max-w-5xl md:max-w-6xl lg:max-w-[90rem] md:px-4 mx-auto">
        <div className="flex justify-center w-full translate-y-16">
          <div className="flex flex-wrap justify-center gap-16">
            <Link to={"/universityAdmissions"}>
              <Button className="bg-[#1B0924] h-36 w-80 rounded-2xl text-2xl">
                {t("University admissions")}
              </Button>
            </Link>
            <Link to={"/englishLanguage"}>
              <Button className="bg-[#1B0924] h-36 w-80 rounded-2xl text-2xl">
                {t("english")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <DownLoadAppSecondImg />
    </>
  );
};

export default AddRequest;
