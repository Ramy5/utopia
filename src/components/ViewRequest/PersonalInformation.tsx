import { t } from "i18next";
import PersonalImage from "../../assets/jnc6or4k_400x400.png";
import Button from "../atoms/Button/Button";

const PersonalInformation = () => {
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
    console.log("🚀 ~ renderDataItem ~ label:", label);
    return (
      <div className="">
        <h3 className="text-sm mb-2">{t(label)}</h3>
        <p className="text-mainColor">{value}</p>
      </div>
    );
  };

  return (
    <div className="mb-20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl">{t("Personal information")}</h2>
        <Button className="bg-[#FFB6BF] text-base  rounded-2xl">{t("Placement test")}</Button>
      </div>

      <div className="bg-[#F7F7F7] rounded-2xl py-16 px-4">
        <div>
          <h2 className="text-3xl mb-20 ms-14">{personalData.name}</h2>
          <div className="grid grid-cols-12">
            <div className="col-span-4 md:col-span-3 lg:col-span-2">
              <img
                src={PersonalImage}
                alt="Personal"
                className="w-32 h-32 rounded-full overflow-hidden mx-auto -mt-8"
              />
            </div>

            <div className="col-span-8 md:col-span-9 lg:col-span-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8">
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
    </div>
  );
};

export default PersonalInformation;
