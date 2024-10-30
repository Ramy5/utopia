import * as Yup from "yup";
import { t } from "i18next";

export const bePartnerValidationSchema = () =>
  Yup.object().shape({
    first_name: Yup.string()
      .required(t("First name is required"))
      .min(2, t("First name must be at least 2 characters")),
    last_name: Yup.string()
      .required(t("Last name is required"))
      .min(2, t("Last name must be at least 2 characters")),
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
      .matches(/^[0-9]{5,10}$/, t("Postal code must be 5-10 digits")),
    country: Yup.string().required(t("Country is required")),
    city: Yup.string().required(t("City is required")),
    job_title: Yup.string().required(t("Job title is required")),
    company_name: Yup.string().required(t("Company name is required")),
  });
