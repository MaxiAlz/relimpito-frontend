<script>
  import { onMount } from "svelte";
  import { httpRequest } from "../../../helpers/httpRequest";
  import { createForm, ErrorMessage } from "svelte-forms-lib";
  import * as yup from "yup";
  import FormErrorMsg from "../../formErrorMsg/FormErrorMsg.svelte";

  let available = true;
  let selectedTags = [];
  let selectedCategories = [];
  let selectedItem = {};
  let isLoading = false;
  let categoriesOptions = [];

  const errorMsg = "Este campo es requerido*";

  // $: console.log("selectedCategories :>> ", selectedCategories);
  // $: console.log("$form.state :>> ", $state);

  onMount(() => {
    getCategories();
  });

  const getCategories = async () => {
    const { data } = await httpRequest("/categories", "get");
    categoriesOptions = data.data;
  };

  const createNewProduct = async (newProductValues) => {
    isLoading = true;
    const { data } = await httpRequest("/products", "post", {
      data: newProductValues,
    });
    console.log("data :>> ", data);
    isLoading = false;
  };

  const addCategoryTag = () => {
    if (!!!selectedTags.find(({ id }) => id === selectedItem.id)) {
      selectedTags = [...selectedTags, selectedItem];
      selectedCategories = [...selectedCategories, { id: selectedItem.id }];
      $form.categories = selectedCategories;
    }
    return;
  };

  const deleteCategoryTag = (tag) => {
    const result = selectedTags.find(({ id }) => id === tag.id);
    if (result) {
      selectedTags = selectedTags.filter(({ id }) => id !== tag.id);
      selectedCategories = selectedCategories.filter(({ id }) => id !== tag.id);
      $form.categories = selectedCategories;
    } else return;
  };

  const { form, errors, state, handleChange, handleSubmit } = createForm({
    initialValues: {
      imgesProduct: [],
      productName: "",
      wholesalePrice: 0,
      retailPrice: "",
      productCode: "",
      stock: 0,
      productDescription: "",
      categories: selectedTags,
      isActive: true,
    },
    validationSchema: yup.object().shape({
      imgesProduct: yup.array() /* .required() */,
      productName: yup.string().required(errorMsg),
      wholesalePrice: yup.string().required(errorMsg),
      retailPrice: yup.string().required(errorMsg),
      productCode: yup.string().required(errorMsg),
      stock: yup.string().required(errorMsg),
      productDescription: yup.string().required(errorMsg),
      categories: yup.array().required(errorMsg),
      isActive: yup.boolean(),
    }),
    onSubmit: (newProductValues) => {
      console.log("values :>> ", newProductValues);
      createNewProduct(newProductValues);
    },
  });
</script>

<form on:submit={handleSubmit}>
  <section class="flex flex-col items-center">
    <div>
      <span class="text-primary"
        >Fotos · 0/5 - Puedes agregar un máximo de 5 fotos.</span
      >
    </div>
    <div>
      <button>
        <div class="card-add-images">
          <input
            type="file"
            name="imgesProduct"
            on:change={handleChange}
            bind:value={$form.imgesProduct}
          />
          cargar archivos
        </div>
      </button>
    </div>
  </section>
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
        <span class="label-text text-primary font-semibold">Descripcion:</span>
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
          error={$form.categories && selectedCategories.length < 1
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
    <button class="btn btn-primary ml-3" type="submit">Crear producto</button>
  </div>
</form>

<style>
  .card-add-images {
    background-color: rgb(205, 205, 205);
    width: 25rem;
    height: 15rem;
    border-radius: 15px;
  }
</style>
