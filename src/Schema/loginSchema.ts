// validationSchemas.js
import { t } from "i18next";
import * as Yup from "yup";

export const getStudentValidationSchema = () =>
  Yup.object({
    phone: Yup.string()
      .required(t("phone number is required"))
      .matches(/^\d+$/, t("phone number must contain only numbers"))
      .min(10, t("phone number must be at least 10 digits"))
      .max(15, t("phone number cannot exceed 15 digits")),
    studentPassword: Yup.string()
      .required(t("password is required"))
      .min(8, t("password must be at least 8 characters")),
  });

export const getPartnerValidationSchema = () =>
  Yup.object({
    email: Yup.string()
      .email(t("invalid email"))
      .required(t("email is required")),
    password: Yup.string()
      .required(t("password is required"))
      .min(8, t("password must be at least 8 characters")),
  });
