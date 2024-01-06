import * as yup from "yup";
import { requiredInput } from "../../constants/defaultMessages";

const initialValues = {
  imgesProduct: [],
  productName: "",
  wholesalePrice: "",
  retailPrice: "",
  productCode: "",
  stock: "",
  productDescription: "",
  isActive: true,
}
const validationSchema = yup.object().shape({
  imgesProduct: yup.array().length(5, "solo puede subir hasta 5 imagenes"),
  productName: yup.string().required(requiredInput),
  wholesalePrice: yup.string().required(requiredInput),
  retailPrice: yup.string().required(requiredInput),
  productCode: yup.string().required(requiredInput),
  stock: yup.string().required(requiredInput),
  productDescription: yup.string().required(requiredInput),
  categories: yup.array().required(requiredInput),
  isActive: yup.boolean(),
})

export { initialValues, validationSchema }