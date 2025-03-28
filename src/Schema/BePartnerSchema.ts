import * as Yup from "yup";
import { t } from "i18next";

export const bePartnerValidationSchema = () =>
  Yup.object().shape({
    first_name: Yup.string()
      .required(t("First name is required"))
      .min(2, t("First name must be at least 2 characters"))
      .matches(/^[\p{L}]+$/u, t("must only contain letters")),
    last_name: Yup.string()
      .required(t("Last name is required"))
      .min(2, t("Last name must be at least 2 characters"))
      .matches(/^[\p{L}]+$/u, t("must only contain letters")),
    mobile_number: Yup.string()
      .required(t("Mobile number is required"))
      .matches(
        /^\+?[0-9]{7,15}$/,
        t("Mobile number must be a valid phone number")
      ),
    Email: Yup.string()
      .required(t("Email is required"))
      .email(t("Email must be a valid email")),
    address: Yup.string().required(t("Address is required")),
    postal_code: Yup.string()
    .required(t("Postal code is required"))
    .matches(/^[a-zA-Z0-9\s\-]{5,10}$/, t("Postal code must be between 5 and 10 letters and digits")), 
    country: Yup.string().required(t("Country is required")),
    city: Yup.string().required(t("City is required")),
    job_title: Yup.string().required(t("Job title is required")),
    company_name: Yup.string().required(t("Company name is required")),
  });
