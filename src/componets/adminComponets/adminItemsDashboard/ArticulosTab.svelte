<script>
  import { onMount } from "svelte";
  import { httpRequest } from "../../../helpers/httpRequest";
  import Loanding from "../../loader/Loanding.svelte";
  import CreateNewProductForm from "../createNewProductForm/CreateNewProductForm.svelte";
  import Modal from "../../modal/Modal.svelte";
  import AlertToast from "../../alertsUser/AlertToast.svelte";
  import EditMultipleProducts from "../EditArticule/EditMultipleProducts.svelte";
  import EditArticule from "../EditArticule/EditArticule.svelte";

  let isLoading = false;
  let products = [];
  let paginationParams;
  let selectedMultipleArticulesToEdit = [],
    alertParams = {};

  let isModalCreateProductOpen = false;
  let isModalEditProdutOpen = false;
  let selectedEditArticule;

  onMount(() => getProducts());

  const getProducts = async () => {
    isLoading = true;
    try {
      const { data } = await httpRequest("/products", "get");
      paginationParams = data?.meta?.pagination;
      products = data?.data;
    } catch (error) {
      console.error("Error al obtener productos :>> ", error);
    }
    isLoading = false;
  };

  const productModificated = () => {
    isModalCreateProductOpen = false;
    isModalEditProdutOpen = false;
    getProducts();
  };

  const handleSelectArticules = (productId, articuleName) => {
    const result = selectedMultipleArticulesToEdit.find(
      (productInList) => productInList.id === productId
    );
    if (result) {
      selectedMultipleArticulesToEdit = selectedMultipleArticulesToEdit.filter(
        (productInList) => productInList.id !== productId
      );
    }
    if (!result) {
      selectedMultipleArticulesToEdit = [
        ...selectedMultipleArticulesToEdit,
        { id: productId, name: articuleName },
      ];
      // articulestoEdit = [...articulestoEdit, { name: articuleName }];
    }
  };

  const handleEditProduct = (productId) => {
    isModalEditProdutOpen = true;
    selectedEditArticule = productId;
  };

  const productEdited = () => {
    isModalEditProdutOpen = false;
    getProducts();
  };
</script>

<!-- modal crear nuevo producto -->
{#if isModalCreateProductOpen}
  <Modal
    open={isModalCreateProductOpen}
    title={selectedMultipleArticulesToEdit.length > 0
      ? "Editar Articulos"
      : "Crear nuevo articulo"}
    on:close={() => (isModalCreateProductOpen = false)}
  >
    {#if selectedMultipleArticulesToEdit.length > 0}
      <EditMultipleProducts
        selectedArticulesToEdit={selectedMultipleArticulesToEdit}
      />
    {:else}
      <CreateNewProductForm on:productCreated={productModificated} />
    {/if}
  </Modal>
{/if}

{#if isModalEditProdutOpen}
  <Modal
    open={isModalEditProdutOpen}
    title="Editar articulo"
    on:close={() => {
      (isModalEditProdutOpen = false), (selectedEditArticule = null);
    }}
  >
    <EditArticule on:productEdited={productEdited} {selectedEditArticule} />
  </Modal>
{/if}

<main class="w-full">
  <section class="flex justify-between items-center headerTable">
    <div
      class=" container form-control w-full max-w-xs m-4 flex justify-center"
    >
      <label class="label" for="search-user">
        <span class="label-text text-primary font-bold">Buscar Articulo</span>
      </label>
      <input
        type="text"
        placeholder="Mario del valle"
        class="input input-bordered w-full max-w-xs shadow border-slate-500 focus:border-primary-focus"
      />
    </div>

    <div>
      <button
        class="btn btn-primary mt-5 mr-5 shadow"
        on:click={() => (isModalCreateProductOpen = true)}
      >
        <span class="material-symbols-outlined">
          {selectedMultipleArticulesToEdit.length > 0
            ? "edit"
            : "add_circle"}</span
        >
        {selectedMultipleArticulesToEdit.length > 0
          ? "Editar Articulos"
          : "Crear nuevo articulo"}</button
      >
    </div>
  </section>
  <div class="divider m-0 p-0" />
  <section class="overflow-x-auto articulesTable px-20">
    <table class="table">
      <!-- head -->
      <thead class="text-primary uppercase">
        <tr>
          <th><input type="checkbox" checked={false} class="checkbox" /></th>
          <th>Codigo</th>
          <th>Articulo</th>
          <th>$ Por Mayor</th>
          <th>$ Por Menor</th>
          <th>stock</th>
          <th>acciones</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {#if isLoading}
          <div class=" flex text-center m-5">
            <h2 class="text-primary-focus font-bold">Cargando</h2>
            <span class="loading loading-dots loading-md" />
          </div>
        {/if}
        {#if !isLoading && products.length === 0}
          <div class="text-center m-5">
            <h3 class="text-primary-focus font-bold">
              No hay productos disponibles.
            </h3>
          </div>
        {:else}
          {#each products as product (product.id)}
            <tr>
              <td>
                <input
                  type="checkbox"
                  checked={false}
                  on:change={() =>
                    handleSelectArticules(
                      product.id,
                      product?.attributes?.productName
                    )}
                  class="checkbox"
                />
              </td>
              <td>
                <span class="font-semibold"
                  >{product.attributes.productCode}</span
                >
              </td>
              <td>
                <span>{product.attributes.productName}</span>
              </td>
              <td>
                <span>${product.attributes.wholesalePrice}</span>
              </td>
              <td>
                <span>${product.attributes.retailPrice}</span>
              </td>
              <td>
                <span>{product.attributes.stock}u</span>
              </td>
              <td class="">
                <button
                  class="btn btn-primary btn-sm btn-outline tooltip"
                  data-tip="Editar"
                  on:click={() => {
                    handleEditProduct(product.id);
                  }}
                  ><span class="material-symbols-outlined"> settings </span>
                </button>
                <button
                  class="btn btn-primary btn-sm btn-outline tooltip"
                  data-tip="ocultar"
                  on:click={() => console.log("click :>> ")}
                  ><span class="material-symbols-outlined">
                    visibility_off
                  </span>
                </button>
              </td>
            </tr>
          {/each}
        {/if}
      </tbody>
      <!-- foot -->
      <tfoot>
        <tr class="text-primary">
          <th />
          <th>Codigo</th>
          <th>Articulo</th>
          <th>$ Por Mayor</th>
          <th>$ Por Menor</th>
          <th>stock</th>
          <th>acciones</th>
          <th />
        </tr>
      </tfoot>
    </table>

    <div class="divider m-0" />
    <div class="flex justify-center w-full">
      <!-- {#if paginationOptions.totalPages > 1} -->
      <div class="join">
        <button class="join-item btn btn-xs"> {"<<anterior"}</button>
        <button class="join-item btn btn-xs"> {paginationParams?.page}</button>
        <button class="btn btn-xs"> de</button>
        <button class="join-item btn btn-xs">
          {paginationParams?.pageCount}</button
        >
        <button class="join-item btn btn-xs"> {"siguiente>>"}</button>
      </div>
      <!-- {/if} -->
    </div>
    <div class="divider m-0" />
  </section>
</main>

<style>
  .headerTable {
    height: 12vh;
  }
  .articulesTable {
    height: 77vh;
  }
</style>
