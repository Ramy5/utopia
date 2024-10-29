import * as Yup from "yup";

export const bePartnerValidationSchema = Yup.object().shape({
  first_name: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  last_name: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  mobile_number: Yup.string()
    .required("Mobile number is required")
    .matches(/^\+?[0-9]{7,15}$/, "Mobile number must be a valid phone number"),
  Email: Yup.string()
    .required("Email is required")
    .email("Email must be a valid email"),
  address: Yup.string().required("Address is required"),
  postal_code: Yup.string()
    .required("Postal code is required")
    .matches(/^[0-9]{5,10}$/, "Postal code must be 5-10 digits"),
  country: Yup.string().required("Country is required"),
  city: Yup.string().required("City is required"),
  job_title: Yup.string().required("Job title is required"),
  company_name: Yup.string().required("Company name is required"),
});
