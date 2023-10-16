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
  import { errorMsg } from "../../constants/defaultMessages";
  import FormErrorMsg from "../../formErrorMsg/FormErrorMsg.svelte";
  import { initialValues, validationSchema } from "./editArticulesConstants";

  const dispatch = createEventDispatcher();
  export let selectedEditArticule;
  let isLoading = false;
  let available = true,
    selectedTags = [],
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
      selectedTags = productData.data.attributes.categories.data;
      selectedCategoriesIds = [
        ...selectedTags.map((category) => ({ id: category.id })),
      ];

      $form.imgesProduct = productData.data.attributes.imgesProduct;
      $form.isActive = productData.data.attributes.isActive;
      $form.productCode = productData.data.attributes.productCode;
      $form.productDescription = productData.data.attributes.productDescription;
      $form.retailPrice = productData.data.attributes.retailPrice;
      $form.wholesalePrice = productData.data.attributes.wholesalePrice;
      $form.stock = productData.data.attributes.stock;
    } catch (error) {
      console.log("error :>> ", error);
    }
    isLoading = false;
  });

  const addCategoryTag = () => {
    if (!!!selectedTags.find(({ id }) => id === selectedItem.id)) {
      selectedTags = [...selectedTags, selectedItem];
      selectedCategoriesIds = [
        ...selectedCategoriesIds,
        { id: selectedItem.id },
      ];
      $form.categories = selectedCategoriesIds;
    }
    return;
  };

  const deleteCategoryTag = (tag) => {
    const result = selectedTags.find(({ id }) => id === tag.id);
    if (result) {
      selectedTags = selectedTags.filter(({ id }) => id !== tag.id);
      selectedCategoriesIds = selectedCategoriesIds.filter(
        ({ id }) => id !== tag.id
      );
      $form.categories = selectedCategoriesIds;
    } else return;
  };

  // categories: selectedTags,

  const { form, errors, handleChange, handleSubmit } = createForm({
    initialValues: { ...initialValues, categories: selectedTags },
    validationSchema,
    onSubmit: async (productValuesToEdit) => {
      handleSubmitEditProduct(productValuesToEdit);
    },
  });

  const handleSubmitEditProduct = async (productValuesToEdit) => {
    const response = await editProduct(
      productValuesToEdit,
      selectedEditArticule
    );
    if (response.status === 200) {
      dispatch("editProductResponse", {
        status: response.status,
        statusText: response.statusText,
        msg: "Producto Editado",
        alertType: "success",
      });
    }

    if (response.status != 200) {
      dispatch("editProductResponse", {
        status: response.status,
        statusText: response.statusText,
        msg: "Producto Editado",
        alertType: "success",
      });
    }
  };
</script>

<main class="min-h-16">
  {#if isLoading}
    <Loanding />
  {/if}
  {#if productData.data}
    <form on:submit={handleSubmit}>
      <!-- <section class="flex flex-col items-center">
        <div>
          <span class="text-primary"
            >{`Fotos · ${$form.imgesProduct.length}/5 - Puedes agregar un máximo de 5 fotos.`}</span
          >
        </div>
        <div>
          <button type="button">
            <div class="card-add-images">
              <input
                type="file"
                multiple
                name="imgesProduct"
                on:change={handleChange}
                bind:value={$form.imgesProduct}
              />
              cargar archivos
            </div>
          </button>
          <FormErrorMsg error={$errors.imgesProduct} />
        </div>
      </section> -->
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
        <!-- #################################################################### -->
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
            {#each selectedTags as tag}
              <div class="badge badge-ghost gap-2 m-1">
                {tag.attributes.name}
                <button on:click={() => deleteCategoryTag(tag)}>x</button>
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
          >Crear producto</button
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
