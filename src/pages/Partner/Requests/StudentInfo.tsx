import React, { useState } from "react";
import Button from "../../../components/atoms/Button/Button";
import PersonalImage from "../../../assets/user11.png";
import { useNavigate, useNavigation } from "react-router-dom";
import { IoIosArrowBack, IoMdArrowDropdownCircle } from "react-icons/io";
import cn from "../../../utils/cn";
import { IoChatbubbleOutline } from "react-icons/io5";

const renderDataItem = (label, value) => {
  console.log("🚀 ~ renderDataItem ~ label:", label);
  return (
    <div className="">
      <h3 className="mb-2 text-sm">{label}</h3>
      <p className="text-mainColor">{value}</p>
    </div>
  );
};

const renderDataItemMobile = (label, value) => {
  console.log("🚀 ~ renderDataItem ~ label:", label);
  return (
    <div className="flex items-center sm:block">
      <h3 className="flex items-center mb-0 text-sm sm:mb-2">
        {label} <span className="block mx-1 sm:hidden">:</span>
      </h3>
      <p className="text-[#79767A] text-sm ">{value}</p>
    </div>
  );
};

const StudentInfo = ({ step }: { step?: number }) => {
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
    <div className="px-4 mb-10">
      <div className="items-center justify-between hidden mb-6 md:flex">
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
        <div className="bg-[#F7F7F7] rounded-2xl shadow-md sm:shadow-none py-8 sm:py-16 px-4 md:block hidden">
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

      {step === 1 && (
        <div className="md:hidden">
          <div className="md:bg-[#F7F7F7] rounded-2xl shadow-md sm:shadow-none py-8 sm:py-16 px-4  mb-6">
            <div className="">
              <div className="">
                <div className="flex items-center gap-x-4 sm:gap-x-8">
                  <div>
                    <img
                      src={PersonalImage}
                      alt="Personal"
                      className="h-full w-44 rounded-xl"
                    />
                  </div>
                  <div className="w-full">
                    <div className="flex items-center justify-between sm:block">
                      <h2 className="text-xl sm:text-2xl">
                        {personalData.name}
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-y-1.5 sm:gap-y-8 mt-2 sm:mt-12">
                      {renderDataItemMobile(
                        "Student number",
                        personalData.student_number
                      )}
                      {renderDataItemMobile("Gender", personalData.gender)}
                      {renderDataItemMobile(
                        "Date of birth",
                        personalData.birth_date
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      {renderDataItemMobile(
                        "Passport number",
                        personalData.passport_number
                      )}
                    </div>
                    <div>
                      {renderDataItemMobile(
                        "Nationality",
                        personalData.nationality
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    {renderDataItemMobile(
                      "Passport expiration date",
                      personalData.passport_expiration
                    )}
                  </div>

                  <div className="mb-4">
                    {renderDataItemMobile(
                      "Country of passport",
                      personalData.country_passport
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>{renderDataItemMobile("City", personalData.city)}</div>
                    <div>
                      {renderDataItemMobile(
                        "English language proficiency level",
                        personalData.english_level
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    {renderDataItemMobile(
                      "Postal code",
                      personalData.postal_code
                    )}
                  </div>
                  <div className="mb-4">
                    {renderDataItemMobile("Address", personalData.address)}
                  </div>

                  <div className="mb-4">
                    {renderDataItemMobile("Email", personalData.email)}
                  </div>
                  <div className="mb-4">
                    {renderDataItemMobile(
                      "Mobile number",
                      personalData.mobile_number
                    )}
                  </div>
                  <div className="mb-4">
                    {renderDataItemMobile(
                      "Relative's mobile number",
                      personalData.relative_mobile
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex">
            <Button className="bg-[#1B0924] flex gap-2 text-base text-white px-3 font-medium rounded-xl">
              <IoChatbubbleOutline />
              <span>Contact Student</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentInfo;
