import { httpRequest } from "../../../helpers/httpRequest";

const getProductById = async (selectedEditArticule) => {
  try {
    const { data } = await httpRequest(
      `/products/${selectedEditArticule}?populate=*`,
      "GET"
    );
    return data;
  } catch (error) {
    console.error("error al obtener informacion deproducto :>> ");
  }
};

const getCategories = async () => {
  const { data } = await httpRequest("/categories", "get");
  return data.data;
};

const editProduct = async (productValuesToEdit, productId) => {
  try {
    return await httpRequest(`/products/${productId}`, 'PUT', { data: productValuesToEdit })
    // console.log('data :>> ', data, status);
    // return { data, status }
  } catch (error) {
    console.log('error al editar :>> ');
  }
}

export { getProductById, getCategories, editProduct }