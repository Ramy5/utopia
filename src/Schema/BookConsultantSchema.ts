import * as Yup from "yup";

export const bookConsultantValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^\+?[0-9]{7,15}$/, "Phone number must be a valid format"),
});
