import { t } from "i18next";
import PersonalImage from "../../assets/jnc6or4k_400x400.png";
import Button from "../atoms/Button/Button";
import cn from "../../utils/cn";

const PersonalInformation = ({ steps }: any) => {
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

  const renderDataItem = (label, value) => {
    return (
      <div className="">
        <h3 className="mb-2 text-sm">{t(label)}</h3>
        <p className="text-mainColor">{value}</p>
      </div>
    );
  };

  const renderDataItemMobile = (label, value) => {
    console.log("🚀 ~ renderDataItem ~ label:", label);
    return (
      <div className="flex sm:block items-center">
        <h3 className="text-sm mb-0 sm:mb-2 flex items-center">
          {t(label)} <span className="sm:hidden block mx-1">:</span>
        </h3>
        <p className="text-[#79767A] text-sm ">{value}</p>
      </div>
    );
  };

  return (
    <div className="mb-20">
      <div className="sm:flex items-center justify-between mb-6 hidden">
        <h2 className="text-3xl">{t("Personal information")}</h2>
        <Button className="bg-[#FFB6BF] text-base  rounded-2xl">
          {t("Placement test")}
        </Button>
      </div>

      <div className="bg-[#F7F7F7] rounded-2xl shadow-md sm:shadow-none py-8 sm:py-16 px-4 sm:block hidden">
        <div className="">
          <h2 className="text-3xl mb-20 ms-14">{personalData.name}</h2>

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
              {renderDataItem("Passport number", personalData.passport_number)}
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
      {steps === 1 && (
        <div className="bg-[#F7F7F7] rounded-2xl shadow-md sm:shadow-none py-8 sm:py-16 px-4 sm:hidden block mb-24">
          <div className="">
            <div className="">
              {/* <div className="">
              <img
                src={PersonalImage}
                alt="Personal"
                className="w-32 h-32 rounded-full overflow-hidden mx-auto -mt-8"
              />
            </div> */}

              <div className="flex items-center gap-x-4 sm:gap-x-8">
                <div>
                  <img
                    src={PersonalImage}
                    alt="Personal"
                    className="rounded-xl h-full"
                  />
                </div>
                <div className="w-full">
                  <div className="flex sm:block justify-between items-center">
                    <h2 className="text-xl sm:text-2xl">{personalData.name}</h2>
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
                <div className="flex items-end justify-end">
                  <Button className="bg-[#FFB6BF] text-black text-sm px-3 font-medium rounded-xl">
                    {t("Placement test")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInformation;
