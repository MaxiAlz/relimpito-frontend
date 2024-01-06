<script>
  import { beforeUpdate, createEventDispatcher, onMount } from "svelte";
  import * as yup from "yup";
  import { createForm } from "svelte-forms-lib";
  import {
    editProduct,
    getCategories,
    getProductById,
  } from "./editArticuleRequest";
  import Loanding from "../../loader/Loanding.svelte";
  import FormErrorMsg from "../../formErrorMsg/FormErrorMsg.svelte";
  import { initialValues, validationSchema } from "./editArticulesConstants";
  import { notifications } from "../../alertsUser/alert";
  import ImagenPreview from "../../imagenPreview/ImagenPreview.svelte";
  import { httpFormDataRequest } from "../../../helpers/httpRequest";

  const dispatch = createEventDispatcher();
  export let selectedEditArticule;
  let isLoading = false;
  let fileImages = [];
  let available = true,
    selectedTagsCategory = [],
    // aca voy guardando el id de las categorias para enviar al back
    selectedCategoriesIds = [],
    // array de ids para enviar al bakend
    selectedItem = {},
    // categoria disponibles
    categoriesOptions = [],
    productData = {};

  onMount(async () => {
    isLoading = true;
    try {
      productData = await getProductById(selectedEditArticule);
      categoriesOptions = await getCategories();

      $form.productName = productData.data.attributes.productName;
      selectedTagsCategory = productData.data.attributes.categories.data;
      selectedCategoriesIds = [
        ...selectedTagsCategory.map((category) => ({ id: category.id })),
      ];

      $form.imgesProduct = productData.data.attributes.imgesProduct;
      $form.isActive = productData.data.attributes.isActive;
      $form.productCode = productData.data.attributes.productCode;
      $form.productDescription = productData.data.attributes.productDescription;
      $form.retailPrice = productData.data.attributes.retailPrice;
      $form.wholesalePrice = productData.data.attributes.wholesalePrice;
      $form.stock = productData.data.attributes.stock;
    } catch (error) {
      console.error("error :>> ", error);
    }
    isLoading = false;
  });

  const addCategoryTag = () => {
    if (!!!selectedTagsCategory.find(({ id }) => id === selectedItem.id)) {
      selectedTagsCategory = [...selectedTagsCategory, selectedItem];
      selectedCategoriesIds = [
        ...selectedCategoriesIds,
        { id: selectedItem.id },
      ];
      $form.categories = selectedCategoriesIds;
    }
    return;
  };

  const deleteCategoryTag = (tag) => {
    const result = selectedTagsCategory.find(({ id }) => id === tag.id);
    if (result) {
      selectedTagsCategory = selectedTagsCategory.filter(
        ({ id }) => id !== tag.id
      );
      selectedCategoriesIds = selectedCategoriesIds.filter(
        ({ id }) => id !== tag.id
      );
      $form.categories = selectedCategoriesIds;
    } else return;
  };

  const { form, errors, handleChange, handleSubmit } = createForm({
    initialValues: { ...initialValues, categories: selectedTagsCategory },
    validationSchema,
    onSubmit: async (productValuesToEdit) => {
      handleSubmitEditProduct(productValuesToEdit);
    },
  });

  const handleSubmitImages = async (
    refProductId,
    refProductColection,
    fieldReference
  ) => {
    isLoading = true;
    notifications.info("Subiendo imagenes...");
    try {
      const formData = new FormData();
      fileImages.forEach((image) => {
        formData.append(`files`, image, image.name);
      });
      formData.append("refId", `${refProductId}`);
      formData.append("ref", refProductColection);
      formData.append("field", fieldReference);

      await httpFormDataRequest("/upload", "POST", formData);
      notifications.success("Imagenes actualizadas", 3000);
    } catch (error) {
      notifications.error("Error al actualizar imagenes", 3000);
      console.error("Error al cargar imagenes :>> ", error);
    }
  };

  const handleSubmitEditProduct = async (productValuesToEdit) => {
    isLoading = true;
    try {
      const { status, statusText, data } = await editProduct(
        productValuesToEdit,
        selectedEditArticule
      );
      notifications.success("¡ Detalle de producto actualizado! ");
      if (
        statusText === "OK" &&
        status === 200 &&
        data.data.id &&
        fileImages.length > 0
      ) {
        await handleSubmitImages(
          data.data.id,
          "api::product.product",
          "productPhoto"
        );
      }
    } catch (error) {
      notifications.error("Error al editar producto");
      console.error("Error al editar porducto :>> ", error);
    }
    dispatch("productEdited");
    isLoading = false;
  };

  const handlefileImages = (e) => {
    fileImages = e.detail;
  };
</script>

{#if isLoading}
  <Loanding />
{/if}
<main class="w-full">
  {#if productData.data}
    <ImagenPreview
      on:fileImages={handlefileImages}
      productPhotos={productData.data?.attributes?.productPhoto.data}
    />
    <form on:submit={handleSubmit}>
      <section class="my-3">
        <div>
          <label class="label" for="articuleName">
            <span class="label-text text-primary font-semibold">Titulo:</span>
          </label>
          <input
            type="text"
            placeholder="Titulo del nuevo articulo"
            id="articuleName"
            class="input input-bordered input-primary w-full"
            name="productName"
            on:change={handleChange}
            bind:value={$form.productName}
          />
          <FormErrorMsg error={$errors.productName} />
        </div>
        <label class="label" for="price">
          <span class="label-text text-primary font-semibold">Precio:</span>
        </label>
        <div class="columns-2">
          <div>
            <input
              name="wholesalePrice"
              type="text"
              placeholder="Precio x Mayor"
              id="price"
              class="input input-bordered input-primary"
              on:change={handleChange}
              bind:value={$form.wholesalePrice}
            />
            <FormErrorMsg error={$errors.wholesalePrice} />
          </div>
          <div>
            <input
              id="price"
              name="retailPrice"
              type="text"
              placeholder="Precio x Menor"
              class="input input-bordered input-primary"
              on:change={handleChange}
              bind:value={$form.retailPrice}
            />
            <FormErrorMsg error={$errors.retailPrice} />
          </div>
        </div>

        <div class="columns-2">
          <div>
            <label class="label" for="code">
              <span class="label-text text-primary font-semibold">Codigo:</span>
            </label>
            <input
              name="productCode"
              type="text"
              placeholder="1256"
              id="code"
              class="input input-bordered input-primary"
              on:change={handleChange}
              bind:value={$form.productCode}
            />
            <FormErrorMsg error={$errors.productCode} />
          </div>
          <div>
            <label class="label" for="stock">
              <span class="label-text text-primary font-semibold"
                >Stock disponible:</span
              >
            </label>
            <input
              name="stock"
              type="text"
              placeholder="stock disponible"
              id="price"
              class="input input-bordered input-primary"
              on:change={handleChange}
              bind:value={$form.stock}
            />
            <FormErrorMsg error={$errors.stock} />
          </div>
        </div>
        <div>
          <label class="label" for="description">
            <span class="label-text text-primary font-semibold"
              >Descripcion:</span
            >
          </label>
          <textarea
            name="productDescription"
            id="description"
            class="textarea textarea-primary w-full h-32"
            placeholder="Descripcion"
            on:change={handleChange}
            bind:value={$form.productDescription}
          />
          <FormErrorMsg error={$errors.productDescription} />
        </div>
        <div class="columns-2 flex flex-col">
          <div>
            <label
              for="category"
              class="label label-text text-primary font-semibold"
              >Agregar categorias</label
            >
            <select
              class="select select-primary w-full"
              placeholder="seleccionar una opcion"
              name="categories"
              bind:value={selectedItem}
              on:change={addCategoryTag}
            >
              {#each categoriesOptions as category}
                <option value={category}>{category.attributes.name}</option>
              {/each}
            </select>
            <FormErrorMsg
              error={$form.categories && selectedCategoriesIds.length < 1
                ? "ingrese al menos una categoria"
                : null}
            />
          </div>
          <div class="mt-3">
            {#each selectedTagsCategory as tagCategory}
              <div class="badge badge-ghost gap-2 m-1">
                {tagCategory.attributes.name}
                <button on:click={() => deleteCategoryTag(tagCategory)}
                  >x</button
                >
              </div>
            {/each}
          </div>
        </div>
        <div class="columns-2">
          <label class="cursor-pointer label">
            <span class="label-text"
              >{available ? "Disponible" : "No disponible"}</span
            >
            <input
              name="isActive"
              type="checkbox"
              class="toggle toggle-primary"
              checked={available}
              bind:value={$form.isActive}
              on:change={() => (available = !available)}
            />
          </label>
        </div>
      </section>
      <div class="divider m-0 p-0" />
      <div class="flex justify-end">
        <button class="btn btn-primary ml-3" type="submit"
          >Editar producto</button
        >
      </div>
    </form>
  {/if}
</main>

<!-- <style>
  .card-add-images {
    background-color: rgb(205, 205, 205);
    width: 25rem;
    height: 15rem;
    border-radius: 15px;
  }
</style> -->
