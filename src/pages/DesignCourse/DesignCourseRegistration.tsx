import React from "react";
import DesignCourseForm from "./DesignCourseForm";

const DesignCourseRegistration = () => {
  return (
    <div className="max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-[90rem] md:px-4 px-4 m-auto">
      <div className="block sm:hidden mt-16">
        <DesignCourseForm />
      </div>
    </div>
  );
};

export default DesignCourseRegistration;
