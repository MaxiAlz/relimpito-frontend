import * as yup from "yup";
import { errorMsg } from "../../constants/defaultMessages";

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
  productName: yup.string().required(errorMsg),
  wholesalePrice: yup.string().required(errorMsg),
  retailPrice: yup.string().required(errorMsg),
  productCode: yup.string().required(errorMsg),
  stock: yup.string().required(errorMsg),
  productDescription: yup.string().required(errorMsg),
  categories: yup.array().required(errorMsg),
  isActive: yup.boolean(),
})

export { initialValues, validationSchema }