<script>
  import { onMount } from "svelte";
  import { httpRequest } from "../helpers/httpRequest";
  import {
    addAnItemInShoppingCart,
    getShoppingCartLocarStorage,
    removeItemFromShoppingCart,
  } from "../stores/shoppingCart";
  import { notifications } from "../componets/alertsUser/alert";
  import { navigate } from "svelte-routing";

  onMount(() => {
    itemsLocalStorageCart = getShoppingCartLocarStorage() || [];
    if (itemsLocalStorageCart.length > 0) {
      getProductsFromShoppingCart();
    }
  });

  let itemsLocalStorageCart = []; //aca me setea los productos del carrito en el local storage
  let productsInCart = []; //aca seto loa productos que matchean con los del carrito del local storage para tener los precios y otra informacion
  let isloading = false;
  let totalPriceProducts = 0;

  let purchaseProductDetail = {}; //aca guardo el detalle completo de la compra (productos, precios, detalles, etc)

  const setPurchaseDetail = (productsInCart) => {
    // crea un objeto con todos los detalles de la compra por fila de producto, agrega cantidad y calcula el precio parcial
    let productDetails = productsInCart.map(
      (product) => (
        (product.amount = setAmountProduct(product.id)),
        (product.totalPrice =
          setAmountProduct(product.id) * product.attributes.retailPrice),
        product
      )
    );
    return (purchaseProductDetail = { productDetails });
  };

  const calculateTotalPricePurchase = () => {
    const prices = purchaseProductDetail.productDetails.map(
      (product) => product.totalPrice
    );

    const totalPriceOfProducts = prices.reduce((a, b) => a + b, 0);

    purchaseProductDetail = {
      ...purchaseProductDetail,
      purchaseDetail: { totalPriceOfProducts },
    };
  };

  const getProductsFromShoppingCart = async () => {
    isloading = true;
    const producstIds = itemsLocalStorageCart.map((item) => item.idArticule);
    const filters = producstIds.map((id) => `filters[id][$in]=${id}`).join("&");

    try {
      const { data } = await httpRequest(`/products?${filters}`);

      productsInCart = data.data;
      setPurchaseDetail(data.data);
      calculateTotalPricePurchase();
    } catch (error) {
      console.error("Error al obtener información del carrito:", error);
      notifications.error("Error al obtener información del carrito");
    } finally {
      isloading = false;
    }
  };

  const setAmountProduct = (idproduct) => {
    const { amount, idArticule } = itemsLocalStorageCart.find(
      (item) => item.idArticule == idproduct
    );
    return amount;
  };
</script>

<h1 class="text-xl text-primary uppercase font-semibold text-center my-5">
  Mi carrito de compras
</h1>

<section class="flex justify-between px-20 py-5">
  {#if isloading}
    <div class="w-full flex justify-center">
      <span class="loading loading-spinner text-primary loading-lg"></span>
    </div>
  {/if}
  {#if !isloading && purchaseProductDetail.productDetails}
    <div class="card w-full flex m-2">
      <table class="table overflow-x-auto shadow">
        <!-- head -->
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Articulo</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {#each purchaseProductDetail.productDetails as { attributes, totalPrice, amount, id } (id)}
            <tr>
              <td>
                <span class="text-primary font-semibold"
                  >{attributes.productCode}</span
                >
              </td>
              <td>
                <div class="flex flex-col items-start">
                  <span class="text-neutral uppercase font-semibold"
                    >{attributes.productName}</span
                  >
                  <button class="btn btn-ghost text-primary btn-xs mt-1"
                    >Eliminar</button
                  >
                </div>
              </td>
              <td class="flex flex-col items-start">
                <div class="join">
                  <button class="btn btn-sm join-item">-</button>
                  <input
                    type="text"
                    class="input input-sm join-item w-16 text-center font-semibold"
                    value={amount}
                  />
                  <button
                    class="btn btn-sm join-item"
                    on:click={() => addAnItemInShoppingCart(id)}>+</button
                  >
                </div>
                <!-- <span>Cantidad: {amount}</span> -->

                <span class="opacity-80 text-sm"
                  >{attributes.stock} diponibles
                </span>
              </td>
              <td>
                <div class="flex flex-col">
                  <span class="text-neutral uppercase font-semibold text-lg"
                    >${totalPrice},00</span
                  >
                  <span class="opacity-80 text-sm">
                    ${attributes.retailPrice},00 c/u</span
                  >
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <div class="card m-2 bg-base-100 shadow box-border w-1/3">
      <div class="card-body">
        <h2 class="card-title">Resumen de compra:</h2>
        <div class="divider m-0 p-0"></div>
        <div class="flex justify-between">
          <span>Articulos({productsInCart.length})</span>
          <span class="font-semibold text-lg"
            >${purchaseProductDetail.purchaseDetail
              .totalPriceOfProducts},00</span
          >
        </div>
        <div class="flex justify-between">
          <span>Gastos extras:</span>
          <span class="">(envio) $1500,00</span>
        </div>
        <div class="divider m-0 p-0"></div>
        <div class="flex justify-between">
          <span>Total:</span>
          <span class="font-semibold text-lg">${totalPriceProducts},00</span>
        </div>
        <div class="card-actions">
          <button class="btn btn-primary w-full">Continuar compra</button>
        </div>
      </div>
      <div class="divider"></div>
      <button
        class="btn btn-primary btn-outline"
        on:click={removeItemFromShoppingCart}>borrar carrito</button
      >
    </div>
  {/if}
</section>
<section class="flex flex-col items-center">
  {#if !isloading && !purchaseProductDetail.productDetails}
    <h2 class="text-center font-semibold text-2xl">
      Tu carrito esta vacio <span class="material-symbols-outlined">
        sentiment_sad
      </span>
    </h2>
    <button
      class="btn btn-primary max-w-sm m-10"
      on:click={() => navigate("/Catalogo")}>Explorar productos</button
    >
  {/if}
</section>
