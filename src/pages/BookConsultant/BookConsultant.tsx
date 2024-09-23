import { t } from "i18next";
import PhoneIcon from "../../assets/phoneIcon.svg";
import { Form, Formik } from "formik";
import BaseInput from "../../components/atoms/molecules/formik-fields/BaseInput";
import Button from "../../components/atoms/Button/Button";
import googlePlay from "../../assets/googlePlay.png";
import appStore from "../../assets/appStore.png";

const BookConsultant = () => {
  const initialVAlues = {
    name: "",
    phoneNumber: "",
  };

  return (
    <Formik initialValues={initialVAlues} onSubmit={(values) => {}}>
      {/* DESKTOP */}
      <div className="bookConsultantBg">
        <div className="">
          <div className="flex items-center justify-between w-full px-12 pb-20 mt-20 bg-white ">
            <div>
              <h2 className="hidden mb-12 text-6xl md:block">
                {t("book consultant")}
              </h2>
              <div className="flex items-center justify-center ">
                <div className="relative p-8 py-12 rounded-lg shadow-xl bg-mainColor">
                  <h2 className="mb-4 text-lg text-white ">
                    {t("consultant")}
                  </h2>

                  <Form className="flex flex-col space-y-4">
                    <div
                      style={{ gridTemplateColumns: "100px 1fr" }}
                      className="grid gap-4"
                    >
                      <Button className="px-2 text-xs border cursor-auto hover:scale-100">
                        {t("name")}
                      </Button>
                      <BaseInput
                        id="name"
                        name="name"
                        type="text"
                        className="w-[536px] p-3 text-right bg-white rounded-lg"
                      />
                    </div>
                    <div
                      style={{ gridTemplateColumns: "100px 1fr" }}
                      className="grid gap-4"
                    >
                      <Button className="px-2 text-xs border cursor-auto hover:scale-100">
                        {t("phone number")}
                      </Button>
                      <BaseInput
                        id="phoneNumber"
                        name="phoneNumber"
                        type="text"
                        className="w-[536px] p-3 text-right bg-white rounded-lg"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-1/3 py-3 mx-auto mt-6 text-white  bg-[#1B0924] hover:bg-[#1B0924]/80"
                    >
                      إرسال
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
            <img className="w-[350px] h-[350px]" src={PhoneIcon} alt="phone" />
          </div>

          <div className="flex items-center py-28">
            <div>
              <h2 className="text-white">{t("download the app now")}</h2>
              <div className="flex items-center gap-4">
                <img className="w-44 " src={googlePlay} alt="google play" />
                <img className="w-44 " src={appStore} alt="app store" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Formik>
  );
};

export default BookConsultant;
