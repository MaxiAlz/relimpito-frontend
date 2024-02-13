<script>
  import { onMount } from "svelte";
  import { httpRequest } from "../config/helpers/httpRequest";
  import {
    addAnItemInShoppingCart,
    addSomeProductInCart,
    getShoppingCartLocarStorage,
    removeAnItemInShoppingCart,
    removeItemFromShoppingCart,
  } from "../stores/shoppingCart";
  import { notifications } from "../componets/alertsUser/alert";
  import { navigate } from "svelte-routing";
  import OrderDetail from "../componets/shoppingCart/OrderDetail.svelte";

  onMount(() => {
    isFirstloading = true;
    console.log("primera vez :>> ");
    itemsLocalStorageCart = getShoppingCartLocarStorage() || [];
    if (itemsLocalStorageCart.length > 0) {
      isUpdating = true;
      getProductsFromShoppingCart();
    }
    isFirstloading = false;
  });

  let itemsLocalStorageCart = []; //aca me setea los productos del carrito en el local storage
  let productsInCart = []; //aca seteo productos que matchean con los del carrito del local storage para tener los precios y otra informacion
  let isFirstloading = false;
  let isUpdating = false;
  let totalPriceProducts = 0;
  let purchaseProductDetail = {}; //aca guardo el detalle completo de la compra (productos, precios, detalles, etc)
  let amountMessageError = {};

  let buySteps = [];
  let currentStep = 0;

  const setPurchaseDetail = (productsInCart) => {
    // crea un objeto con todos los detalles de la compra por fila de producto, agrega cantidad y calcula el precio parcial
    let productDetails = productsInCart.map(
      (product) => (
        (product.amount = getAmountProductInDetail(product.id)),
        (product.totalPrice =
          getAmountProductInDetail(product.id) *
          product.attributes.wholesalePrice),
        product
      )
    );
    return (purchaseProductDetail = { productDetails });
  };

  // Caclula el total unicamente de los productos
  const calculateTotalPriceOfProducts = () => {
    const prices = purchaseProductDetail.productDetails.map(
      (product) => product.totalPrice
    );

    const totalPriceOfProducts = prices.reduce((a, b) => a + b, 0);

    purchaseProductDetail = {
      ...purchaseProductDetail,
      purchaseDetail: { totalPriceOfProducts },
    };

    calculateTotalPriceOfPurchase();
  };

  $: console.log("purchaseProductDetail :>> ", purchaseProductDetail);

  const calculateTotalPriceOfPurchase = () => {
    //logica para calcular todos los recargos que puedan haber y colocarlos en purchaseProductDetail y luego retornar total
    const total = purchaseProductDetail.purchaseDetail.totalPriceOfProducts;

    return (purchaseProductDetail.purchaseDetail.total = total);
  };

  const getProductsFromShoppingCart = async () => {
    // isUpdating = true;
    const producstIds = itemsLocalStorageCart.map((item) => item.idArticule);
    const filters = producstIds.map((id) => `filters[id][$in]=${id}`).join("&");

    try {
      const { data } = await httpRequest(`/products?${filters}`);

      productsInCart = data.data;
      setPurchaseDetail(data.data);
      calculateTotalPriceOfProducts();
    } catch (error) {
      console.error("Error al obtener información del carrito:", error);
      notifications.error("Error al obtener información del carrito");
    } finally {
      isUpdating = false;
    }
  };

  const updateIncreaseAnAmountProduct = async (id) => {
    addAnItemInShoppingCart(id);
    itemsLocalStorageCart = getShoppingCartLocarStorage() || [];
    if (itemsLocalStorageCart.length > 0) {
      isUpdating = true;
      await getProductsFromShoppingCart();
    }
  };

  const updateRemoveAnAmountProduct = async (id) => {
    removeAnItemInShoppingCart(id);
    itemsLocalStorageCart = getShoppingCartLocarStorage() || [];
    if (itemsLocalStorageCart.length > 0) {
      isUpdating = true;
      await getProductsFromShoppingCart();
    }
  };

  const getAmountProductInDetail = (idproduct) => {
    const { amount } = itemsLocalStorageCart.find(
      (item) => item.idArticule == idproduct
    );
    return amount;
  };

  const setAmountProductByManopla = async (idProduct, event, stock) => {
    const newAmont = parseInt(event.target.value);
    validateAmountEntries(idProduct, newAmont, stock);

    if (newAmont <= stock && newAmont > 0) {
      addSomeProductInCart(idProduct, newAmont);
      itemsLocalStorageCart = getShoppingCartLocarStorage() || [];
      amountMessageError.msg = "";
      if (itemsLocalStorageCart.length > 0) {
        isUpdating = true;
        await getProductsFromShoppingCart();
      }
    }
  };

  const userPressEnter = (idProduct, event, stock) => {
    if (event.key === "Enter") {
      setAmountProductByManopla(idProduct, event, stock);
    }
  };

  const validateAmountEntries = (idProduct, newAmont, stock) => {
    if (newAmont > stock) {
      amountMessageError.msg =
        "La cantidad no puede ser mayor a el stock actual";
      amountMessageError.id = idProduct;
    }
    if (!newAmont) {
      amountMessageError.msg = "Este campo no puede quedar vacio";
      amountMessageError.id = idProduct;
    }
    if (!Number.isInteger(newAmont)) {
      amountMessageError.msg = "Este campo debe ser un numero entero";
      amountMessageError.id = idProduct;
    }
  };
</script>

<h1
  class="text-xl text-primary uppercase font-semibold text-center items-center justify-center flex my-5"
>
  <span class="material-symbols-outlined"> shopping_cart </span>
  Mi carrito de compras
</h1>

<section class="flex justify-between px-20 py-5">
  {#if isFirstloading}
    <div class="w-full flex justify-center">
      <span class="loading loading-spinner text-primary loading-lg"></span>
    </div>
  {/if}
  {#if !isFirstloading && purchaseProductDetail.productDetails}
    {#if currentStep === 0}
      <div class="card w-full flex m-2">
        <table class="table overflow-x-auto shadow">
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
                    <button
                      on:click={() => navigate(`/Articulos/Ver-Producto/${id}`)}
                    >
                      <span
                        class="text-neutral uppercase font-semibold hover:text-primary"
                        >{attributes.productName}</span
                      >
                    </button>
                    <button class="btn btn-ghost text-primary btn-xs mt-1"
                      >Eliminar</button
                    >
                  </div>
                </td>
                <td class="flex flex-col items-start">
                  <div class="join">
                    <button
                      class="btn btn-sm join-item"
                      disabled={amount <= 0}
                      on:click={() => updateRemoveAnAmountProduct(id)}>-</button
                    >
                    <input
                      type="text"
                      class="input input-sm join-item w-16 text-center font-semibold"
                      on:blur={(e) =>
                        setAmountProductByManopla(id, e, attributes.stock)}
                      on:keydown={(e) =>
                        userPressEnter(id, e, attributes.stock)}
                      value={amount}
                    />
                    <button
                      class="btn btn-sm join-item"
                      disabled={amount >= attributes.stock}
                      on:click={() => updateIncreaseAnAmountProduct(id)}
                      >+</button
                    >
                  </div>

                  <div
                    class={amountMessageError.id === id &&
                    amountMessageError.msg
                      ? "tooltip tooltip-open tooltip-bottom tooltip-error"
                      : null}
                    data-tip={amountMessageError.msg}
                  >
                    <span
                      class={amountMessageError.id === id &&
                      amountMessageError.msg
                        ? "text-sm text-center text-error font-semibold"
                        : "opacity-80 text-sm text-center"}
                      >{attributes.stock} disponibles
                    </span>
                  </div>
                </td>
                <td>
                  {#if isUpdating}
                    <div class="w-full flex justify-center">
                      <span
                        class="loading loading-spinner text-primary loading-lg"
                      ></span>
                    </div>
                  {/if}
                  {#if !isUpdating}
                    <div class="flex flex-col">
                      <span class="text-neutral uppercase font-semibold text-lg"
                        >${totalPrice},00</span
                      >
                      <span class="opacity-80 text-sm">
                        ${attributes.wholesalePrice},00 c/u</span
                      >
                    </div>
                  {/if}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>

        <button
          class="btn btn-primary btn-outline m-2 w-1/3"
          on:click={() => navigate("/Catalogo")}>Ver catalogo completo</button
        >
      </div>
    {/if}

    {#if currentStep === 1}
      <OrderDetail />
    {/if}

    <!-- Card Resumen de compra -->
    <div class="card m-2 bg-base-100 shadow box-border w-1/3">
      <div class="card-body">
        <h2 class="card-title">Resumen de compra:</h2>
        <div class="divider m-0 p-0"></div>
        {#if !isUpdating}
          <div class="flex justify-between">
            <span>Articulos({productsInCart.length})</span>
            <span class="font-semibold text-lg"
              >${purchaseProductDetail.purchaseDetail
                .totalPriceOfProducts},00</span
            >
          </div>
          <div class="flex justify-between">
            <span>Gastos extras:</span>
            <span class=""><!-- (envio) $1500,00 -->-</span>
          </div>
          <div class="divider m-0 p-0"></div>
          <div class="flex justify-between">
            <span>Total: </span>
            <span class="font-semibold text-lg"
              >${purchaseProductDetail.purchaseDetail.total},00</span
            >
          </div>
        {/if}
        {#if isUpdating}
          <div class="w-full flex justify-center">
            <span class="loading loading-spinner text-primary loading-lg"
            ></span>
          </div>
        {/if}
        <div class="card-actions">
          <button
            class="btn btn-primary w-full"
            disabled={amountMessageError.msg}
            on:click={() => (currentStep += 1)}>Continuar compra</button
          >
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
  {#if !isFirstloading && !itemsLocalStorageCart.length}
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
