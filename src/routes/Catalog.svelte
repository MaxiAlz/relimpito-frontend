<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import CardProduct from "../componets/viewProducts/CardProduct.svelte";
  import { httpRequest } from "../config/helpers/httpRequest";

  let products = [];
  let isloading = false;

  onMount(() => {
    getArticules();
  });

  const getArticules = async () => {
    isloading = true;
    try {
      const { data } = await httpRequest("/products?populate=*", "GET");

      products = data?.data;
    } catch (error) {
      console.log("error :>> ", error);
    }
    isloading = false;
  };

  const viewProduct = (productId) => {
    navigate(`/Articulos/Ver-Producto/${productId}`);
  };
</script>

<div class="w-full flex">
  <section class="flex flex-row items-center relative m-4 lg:w-1/2">
    <span
      class="material-symbols-outlined opacity-70"
      style="position: absolute; left: 10px;"
    >
      search
    </span>
    <input
      type="search"
      name="search"
      autocomplete="off"
      placeholder="Buscar..."
      aria-autocomplete="list"
      class="input input-bordered w-full input-md pl-10"
    />
    <div>
      <select>
        <option selected disabled>Categorias</option>
        <option>Categoria 1</option>
        <option>Categoria 2</option>
        <option>Categoria 3</option>
      </select>
    </div>
  </section>
</div>

<section class="flex items-center justify-center flex-wrap">
  {#if isloading}
    <div class="flex flex-col gap-4 w-52">
      <div class="skeleton h-32 w-full"></div>
      <div class="skeleton h-4 w-28"></div>
      <div class="skeleton h-4 w-full"></div>
      <div class="skeleton h-4 w-full"></div>
    </div>
  {/if}
  {#each products as product (product.id)}
    <button on:click={() => viewProduct(product.id)}>
      <CardProduct dataProduct={product} />
    </button>
  {/each}
</section>
