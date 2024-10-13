import { Form, Formik } from "formik";
import { t } from "i18next";
import BaseInput from "../components/atoms/molecules/formik-fields/BaseInput";
import Phone from "../assets/bookConsultation/phone.png";

const BookConsultationPage = () => {
  return (
    <div className="max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-[80rem] md:px-4 mx-auto">
      <div className="my-12 mx-4 md:mx-0">
        <h2>{t("book consultation")}</h2>
        <div className="my-8 flex justify-between">
          <div className="bg-mainColor rounded-xl">
            <p>{t("consultation")}</p>
            <Formik initialValues={{name:"", }} onSubmit={() => {}}>
              <Form>
                <div className="flex gap-2">
                  <label
                    htmlFor="name"
                    className="rounded-2xl border-2 border-[#BEC8CF] px-8.5 cursor-pointer text-white py-2 font-medium text-sm"
                  >
                    {t("name")}
                  </label>
                  <BaseInput
                    id="name"
                    name="name"
                    placeholder="name"
                    className="border-none bg-white rounded-2xl"
                  />
                </div>
                <div className="flex gap-2">
                  <label
                    htmlFor="mobile_number"
                    className="rounded-2xl border-2 border-[#BEC8CF] px-5 cursor-pointer text-white py-2 font-medium text-sm"
                  >
                    {t("mobile number")}
                  </label>
                  <BaseInput
                    id="mobile_number"
                    name="mobile_number"
                    placeholder="mobile number"
                    className="border-none bg-white rounded-2xl"
                  />
                </div>
              </Form>
            </Formik>
          </div>
          <div>
            <img src={Phone} alt="phone" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookConsultationPage;
