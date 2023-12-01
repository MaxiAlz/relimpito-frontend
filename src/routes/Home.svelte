<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import { httpRequest } from "../helpers/httpRequest";
  import CardProduct from "../componets/viewProducts/CardProduct.svelte";
  import CarrouselHome from "../componets/imagenPreview/CarrouselHome.svelte";

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
    navigate(`/Articulos/Ver-Producto/${productId}`);
  };
</script>

<CarrouselHome />
<h1 class="text-primary font-semibold text-2xl text-center uppercase">
  lista de Articulos
</h1>
<!-- Card de Articulos -->
<section class="flex items-center justify-center flex-wrap">
  {#if isloading}
    <span class="loading loading-spinner loading-lg text-primary" />
  {/if}
  {#each products as product (product.id)}
    <button on:click={() => viewProduct(product.id, product.uidProduct)}>
      <CardProduct dataProduct={product} />
    </button>
  {/each}
</section>
