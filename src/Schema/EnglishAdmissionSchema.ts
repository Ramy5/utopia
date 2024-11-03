import { t } from "i18next";
import * as Yup from "yup";

export const englishAdmissionValidationSchema = () =>
  Yup.object({
    firstName: Yup.string()
      .matches(/^[A-Za-z]+$/, t("no numbers allowed"))
      .required(t("required")),
    lastName: Yup.string()
      .matches(/^[A-Za-z]+$/, t("no numbers allowed"))
      .required(t("required")),
    birthDate: Yup.date()
      .required(t("required"))
      .test("is-18", t("must_be_at_least_18"), (value) => {
        if (!value) return false;
        const today = new Date();
        const birthDate = new Date(value);
        const age = today.getFullYear() - birthDate.getFullYear();
        const isOlderThan18 =
          age > 18 ||
          (age === 18 &&
            today >=
              new Date(birthDate.setFullYear(birthDate.getFullYear() + 18)));
        return isOlderThan18;
      }),

    gender: Yup.string().required(t("required")),
    nationality: Yup.string().required(t("required")),

    phoneNumber: Yup.string()
      .required(t("required"))
      .matches(/^\+?[0-9]{10,15}$/, t("invalid_phone_number")),

    email: Yup.string().email(t("invalid_email")).required(t("required")),

    englishLevel: Yup.string().required(t("required")),
    address: Yup.string().required(t("required")),
    city: Yup.string().required(t("required")),

    postalCode: Yup.string()
      .required(t("required"))
      .matches(/^[0-9]{5,6}$/, t("invalid_postal_code")),
    agreeToTerms: Yup.boolean().oneOf([true], t("must_accept_terms")),

    isSmoker: Yup.string()
      .required(t("required"))
      .oneOf(["yes", "no"], t("invalid_smoker_status")),

    petProblem: Yup.string().required(t("required")),

    relativeName: Yup.string().required(t("required")),

    relativeRelation: Yup.string().required(t("required")),

    relativePhone: Yup.string()
      .required(t("required"))
      .matches(/^\+?[0-9]{10,15}$/, t("invalid_relative_phone")),

    nationalID: Yup.string()
      .required(t("required"))
      .matches(/^[A-Za-z0-9]{10,15}$/, t("invalid_national_id")),

    absherPhoneNumber: Yup.string()
      .required(t("required"))
      .matches(/^\+?[0-9]{10,15}$/, t("invalid_absher_phone_number")),

    healthIssues: Yup.string().required(t("required")),
    healthIssueDetails: Yup.string().when("healthIssues", {
      is: (val) => val === "yes",
      then: (schema) => schema.required(t("Please provide details")),
      otherwise: (schema) => schema.nullable(),
    }),
  });
