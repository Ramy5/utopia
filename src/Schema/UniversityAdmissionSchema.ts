import { t } from "i18next";
import * as Yup from "yup";

export const universityValidationSchema = () =>
  Yup.object({
    firstName: Yup.string()
      .required(t("required"))
      .min(
        2,
        t("First name must be at least 2 characters", {
          field: t("firstName"),
          min: 2,
        })
      ),

    lastName: Yup.string()
      .required(t("required"))
      .min(
        2,
        t("Last name must be at least 2 characters", {
          field: t("lastName"),
          min: 2,
        })
      ),

    birthDate: Yup.date()
      .required(t("required"))
      .max(new Date(), t("birth date in past"))
      .test("is-18", t("must be at least 18"), (value) => {
        if (!value) return false;
        const today = new Date();
        const birthDate = new Date(value);
        const age = today.getFullYear() - birthDate.getFullYear();
        return age >= 18;
      }),

    gender: Yup.string()
      .required(t("required"))
      .oneOf(["male", "female", "other"], t("invalid gender")),

    nationality: Yup.string()
      .required(t("required"))
      .max(50, t("max length", { field: t("nationality"), max: 50 })),

    phoneNumber: Yup.string()
      .required(t("required"))
      .matches(/^\+?[0-9]{10,15}$/, t("invalid phone number")),

    email: Yup.string()
      .email(t("invalid email"))
      .required(t("required"))
      .max(100, t("max length", { field: t("email"), max: 100 })),

    englishLevel: Yup.string().required(t("required")),

    address: Yup.string()
      .required(t("required"))
      .max(200, t("max length", { field: t("address"), max: 200 })),

    city: Yup.string()
      .required(t("required"))
      .max(50, t("max length", { field: t("city"), max: 50 })),

    postalCode: Yup.string()
      .required(t("required"))
      .matches(/^[0-9]{5,6}$/, t("invalid postal code")),

    agreeToTerms: Yup.boolean().oneOf([true], t("must accept terms")),
  });
