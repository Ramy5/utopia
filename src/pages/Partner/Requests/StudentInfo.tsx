import React, { useState } from "react";
import Button from "../../../components/atoms/Button/Button";
import PersonalImage from "../../../assets/jnc6or4k_400x400.png";
import { useNavigate, useNavigation } from "react-router-dom";
import { IoIosArrowBack, IoMdArrowDropdownCircle } from "react-icons/io";
import cn from "../../../utils/cn";

const renderDataItem = (label, value) => {
  console.log("🚀 ~ renderDataItem ~ label:", label);
  return (
    <div className="">
      <h3 className="mb-2 text-sm">{label}</h3>
      <p className="text-mainColor">{value}</p>
    </div>
  );
};

const StudentInfo = () => {
  const navigate = useNavigate();
  const [showStudentInfo, setShowStudentInfo] = useState(true);

  const personalData = {
    name: "عبدالعزيز اليحيا",
    student_number: "240001",
    gender: "ذكر",
    birth_date: "20 May 2005",
    nationality: "سعودي",
    passport_number: "Z197564",
    passport_expiration: "المملكة العربية السعودية",
    country_passport: "المملكة العربية السعودية",
    english_level: "متوسط",
    address: "طريق الملك فهد، 7689",
    postal_code: "25525",
    city: "جده",
    email: "Azizmio78@gmail.com",
    mobile_number: "+966550880636",
    relative_mobile: "+966550880636",
  };

  return (
    <div className="mb-20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-6">
          <h2 className="text-3xl">{"Student Info"}</h2>
          <IoMdArrowDropdownCircle
            onClick={() => setShowStudentInfo((prev) => !prev)}
            className={cn(
              "text-3xl cursor-pointer transition-all duration-300 text-mainColor",
              {
                "-rotate-90": !showStudentInfo,
              }
            )}
          />
        </div>
        <Button
          action={() => navigate(-1)}
          className="flex gap-2 text-base rounded-2xl"
        >
          <IoIosArrowBack className="text-xl" />
          <span>Back</span>
        </Button>
      </div>
      {showStudentInfo && (
        <div className="bg-[#F7F7F7] rounded-2xl py-16 px-4">
          <div>
            <h2 className="mb-20 text-3xl ms-14">{personalData.name}</h2>

            <div className="grid grid-cols-12">
              <div className="col-span-4 md:col-span-3 lg:col-span-2">
                <img
                  src={PersonalImage}
                  alt="Personal"
                  className="w-32 h-32 mx-auto -mt-8 overflow-hidden rounded-full"
                />
              </div>

              <div className="grid grid-cols-2 col-span-8 md:col-span-9 lg:col-span-10 md:grid-cols-3 lg:grid-cols-4 gap-y-8">
                {renderDataItem("Student number", personalData.student_number)}
                {renderDataItem("Gender", personalData.gender)}
                {renderDataItem("Date of birth", personalData.birth_date)}
                {renderDataItem("Nationality", personalData.nationality)}
                {renderDataItem(
                  "Passport number",
                  personalData.passport_number
                )}
                {renderDataItem(
                  "Passport expiration date",
                  personalData.passport_expiration
                )}
                {renderDataItem(
                  "Country of passport",
                  personalData.country_passport
                )}
                {renderDataItem(
                  "English language proficiency level",
                  personalData.english_level
                )}
                {renderDataItem("Address", personalData.address)}
                {renderDataItem("Postal code", personalData.postal_code)}
                {renderDataItem("City", personalData.city)}
                {renderDataItem("Email", personalData.email)}
                {renderDataItem("Mobile number", personalData.mobile_number)}
                {renderDataItem(
                  "Relative's mobile number",
                  personalData.relative_mobile
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentInfo;
