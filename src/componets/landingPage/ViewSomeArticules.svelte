<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import { httpRequest } from "../../config/helpers/httpRequest";
  import CardProduct from "../viewProducts/CardProduct.svelte";
  import hardcoreProducts from "../../DB_Local/products.json";

  let products = [];
  let isloading = false;

  onMount(() => {
    getArticules();
  });

  const getArticules = async () => {
    isloading = true;
    try {
      const { data } = await httpRequest(
        "/products?populate=*&pagination[pageSize]=12",
        "GET"
      );

      products = data?.data;
    } catch (error) {
      console.error("error :>> ", error);
    }
    isloading = false;
  };

  const viewProduct = (productId) => {
    navigate(`/Articulos/Ver-Producto/${productId}`);
  };
</script>

<h1 class="text-primary font-semibold text-2xl text-center uppercase m-10">
  lista de Articulos
</h1>

<section class="flex items-center justify-center flex-wrap">
  {#if isloading}
    <span class="loading loading-spinner loading-lg text-primary" />
  {/if}
  {#if !isloading && !products.length && !hardcoreProducts}
    <h2 class="p-5 text-center">
      No se pudo obtener la lista de articulos, pruebe mas tarde.
    </h2>
  {/if}

  {#if products.length > 0}
    {#each products as product (product.id)}
      <button on:click={() => viewProduct(product.id)}>
        <CardProduct dataProduct={product} />
      </button>
    {/each}
  {/if}

  {#if !products.length && !isloading}
    {#each hardcoreProducts.data as product (product.id)}
      <button on:click={() => viewProduct(product.id)}>
        <CardProduct dataProduct={product} />
      </button>
    {/each}
  {/if}

  <div class="flex items-center justify-center w-full m-5">
    <button class="btn btn-secondary" on:click={() => navigate("/Catalogo")}
      >Ver mas productos</button
    >
  </div>
</section>
