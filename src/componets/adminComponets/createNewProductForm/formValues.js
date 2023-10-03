import * as yup from "yup";

const initialValues = {
  name: "",
  email: "",
}

const validationSchema = yup.object().shape({
  title: yup.string().oneOf(["Mr.", "Mrs.", "Mx."]).required(),
  name: yup.string().required(),
  email: yup.string().email().required(),
})

export { initialValues, validationSchema }