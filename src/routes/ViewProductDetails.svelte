<script>
  import { onMount } from "svelte";
  import { httpRequest } from "../helpers/httpRequest";
  import { notifications } from "../componets/alertsUser/alert";
  import CarrouselProductImage from "../componets/imagenPreview/CarrouselProductImage.svelte";
  import { addAnItemInShoppingCart } from "../stores/shoppingCart";

  export let routerParams;
  let productData;
  let imagesUrl = [];
  let isloading = false;
  let indexPhoto = 1;

  onMount(() => {
    getArticuleById();
  });

  const getArticuleById = async () => {
    isloading = true;
    try {
      const { data, status } = await httpRequest(
        `/products/${routerParams.idProduct}?populate=*`,
        "GET"
      );
      productData = data.data;
      imagesUrl = productData.attributes.productPhoto.data;
    } catch (error) {
      console.error("Error al ver producto :>> ", error);
      notifications.error("Error al ver producto");
    } finally {
      isloading = false;
    }
  };

  const addItemToPourchase = () => {
    addAnItemInShoppingCart(parseInt(routerParams.idProduct));
    notifications.success("Se agregó un producto al carrito");
  };

  // categories?populate=products&filters[name][$eqi]=plasticos

  // const getArticulesByCategory = async () => {
  //   try {
  //     const { data, status } = await httpRequest(
  //       `/products?filters[categories][$eq]="categoriaTest`,
  //       "GET"
  //     );
  //     console.log("rs[id][$in][31] :>> ", data);
  //   } catch (error) {}
  // };
  // getArticulesByCategory();

  /**
   * /api/restaurants?filters[categories][$eq]="categoriaTest"
   *
   */

  // $: console.log("productData :>> ", productData);

  const setIndex = (e) => {
    indexPhoto = e.detail.currentIndex + 1;
  };
</script>

{#if isloading && productData}
  <div class="flex flex-col gap-4 w-52">
    <div class="flex gap-4 items-center">
      <div class="skeleton w-16 h-16 rounded-full shrink-0" />
      <div class="flex flex-col gap-4">
        <div class="skeleton h-4 w-20" />
        <div class="skeleton h-4 w-28" />
      </div>
    </div>
    <div class="skeleton h-32 w-full" />
  </div>
{/if}
{#if !isloading}
  <div class="card lg:card-side bg-base-100 shadow-2xl sm:w-full p-5">
    {#if imagesUrl.length > 0}
      <CarrouselProductImage {imagesUrl} on:currentIndex={setIndex} />
    {/if}
    <!-- <span class="text-primary font-semibold ml-5 flex">
        {indexPhoto} / {imagesUrl.length}
      </span> -->

    <article class="card-body w-96 sm:w-full">
      <div class="flex justify-between items-center">
        <h2 class="card-title uppercase">
          {productData?.attributes?.productName}
        </h2>
        <button class="btn btn-circle btn-outline btn-primary btn-sm">
          <span class="material-symbols-outlined text-primary"> favorite </span>
        </button>
      </div>

      <div class="items-center flex">
        <span class="text-3xl text-primary font-semibold"
          >$ {productData?.attributes?.retailPrice},00</span
        >
        {#if productData?.attributes?.stock > 0}
          <div class="flex flex-col ml-5">
            <span class="badge badge-secondary text-neutral font-semibold">
              Stock disponible: {productData?.attributes?.stock}
            </span>
            <span class="label-text text-sm opacity-70 m-1"
              >Caja: {productData?.attributes?.closedBox} Unidades</span
            >
          </div>
        {:else}
          <span
            class="badge badge-secondary text-neutral font-semibold p-2 ml-5"
          >
            Sin stock
          </span>
        {/if}
      </div>
      <div class="flex">
        <span class="label-text text-sm opacity-70 uppercase"
          >Codigo: {productData?.attributes?.productCode}</span
        >
      </div>
      {#if productData?.attributes?.categories?.data.length > 0}
        <span class="text-primary font-semibold mt-2">Categorias:</span>
        <div class="card-actions justify-start">
          {#each productData?.attributes?.categories?.data as category}
            <div class="badge badge-outline">{category.attributes.name}</div>
          {/each}
        </div>
      {/if}
      <div class="divider m-0 p-0" />
      <div
        class=" flex md:flex-col max-sm:flex-col-reverse sm:flex-col-reverse sm:w-full max-sm:w-full"
      >
        <div class="flex flex-col">
          <span class="text-primary font-semibold">Descripcion:</span>
          <p class="pr-10 mt-2">
            {productData?.attributes?.productDescription}
          </p>
        </div>
        <div class="card-actions my-5 md:justify-end">
          <button
            class="btn btn-primary btn-outline max-sm:w-full"
            on:click={addItemToPourchase}
            ><span class="material-symbols-outlined">
              shopping_cart
            </span>Agregar al Carrito</button
          >
          <button class="btn btn-primary max-sm:w-full">Comprar</button>
        </div>
      </div>
    </article>
  </div>
{/if}
