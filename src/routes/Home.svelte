<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import { httpRequest } from "../helpers/httpRequest";
  import Loanding from "../componets/loader/Loanding.svelte";
  import CardProduct from "../componets/viewProducts/CardProduct.svelte";

  let products = [];
  let paginationParams;
  let isloading = false;

  onMount(() => {
    navigate("/Articulos");
    getArticules();
  });


  const getArticules = async () => {
    isloading = true;
    try {
      const { data } = await httpRequest("/products?populate=*", "GET");

      paginationParams = data?.meta?.pagination;
      products = data?.data;
    } catch (error) {
      console.log("error :>> ", error);
    }
    isloading = false;
  };

  const viewProduct = (productId, uidProduct) => {
    console.log("ver producto id: :>> ", productId, uidProduct);

    navigate(`/Articulos/Ver-Producto/${productId}`);
  };
</script>

{#if isloading}
  <Loanding />
{/if}

<h1>lista de Articulos</h1>
<section class="flex items-center justify-center flex-wrap">
  {#each products as product (product.id)}
    <button on:click={() => viewProduct(product.id, product.uidProduct)}>
      <CardProduct dataProduct={product} />
    </button>
  {/each}
</section>
