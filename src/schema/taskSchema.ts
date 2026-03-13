import * as Yup from "yup";

const taskSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  status: Yup.string().required("Status is required"),
});
export default taskSchema;
