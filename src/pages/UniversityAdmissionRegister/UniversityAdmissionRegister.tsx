import React from "react";
import { Footer, Navbar } from "../../components";
import DownLoadApp from "../../components/atoms/molecules/downLoad-app/DownLoadApp";
import UniversityAdmissionForm from "./UniversityAdmissionForm";

const UniversityAdmissionRegister = () => {
  return (
    <div>
      <div className="max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-[80rem] mx-auto">
        <Navbar hidden />
      </div>

      <div className="">
        <UniversityAdmissionForm />
      </div>
      <DownLoadApp />

      <Footer hidden />
    </div>
  );
};

export default UniversityAdmissionRegister;
