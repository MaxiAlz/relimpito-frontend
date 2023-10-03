<script>
  import { onMount } from "svelte";
  import { httpRequest } from "../../../helpers/httpRequest";
  import Loanding from "../../loader/Loanding.svelte";
  import CreateNewProductForm from "../../adminComponets/createNewProductForm/CreateNewProductForm.svelte";
  import Modal from "../../modal/Modal.svelte";

  let isLoading = false;
  let products = [];
  let paginationParams;
  let isEditing = false;

  let isModalCreateProductOpen = false;

  $: console.log("paginationParams :>> ", paginationParams);
  onMount(() => getProducts());

  const getProducts = async () => {
    isLoading = true;
    const { data } = await httpRequest("/products", "get");
    paginationParams = data?.meta?.pagination;
    products = data?.data;
    isLoading = false;
  };
</script>

{#if isModalCreateProductOpen}
  <Modal
    open={isModalCreateProductOpen}
    title={isEditing ? "Editar Articulos" : "Crear nuevo articulo"}
    on:close={() => (isModalCreateProductOpen = false)}
  >
    <CreateNewProductForm />
  </Modal>
{/if}

<main class="w-full">
  <aside class="flex justify-between items-center">
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
          {isEditing ? "edit" : "add_circle"}</span
        >
        {isEditing ? "Editar Articulos" : "Crear nuevo articulo"}</button
      >
    </div>
  </aside>
  <div class="divider m-0 p-0" />
  <article class="overflow-x-auto usersTable px-20">
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
          <th>stock</th>
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
          {#each products as product}
            <tr>
              <td>
                <input type="checkbox" checked={false} class="checkbox" />
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
                  on:click={() => console.log("click :>> ")}
                  ><span class="material-symbols-outlined"> settings </span>
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
          <th>stock</th>
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
  </article>
</main>
