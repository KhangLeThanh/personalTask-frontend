import * as Yup from "yup";

const userProfileSchema = Yup.object().shape({
  age: Yup.number()
    .min(1, "Age must be at least 1")
    .required("Age is required"),
  bio: Yup.string(),
  location: Yup.string(),
});
export default userProfileSchema;
