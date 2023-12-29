<script>
  import { onMount } from "svelte";
  import { getShoppingCartLocarStorage } from "../../stores/shoppingCart";
  import { navigate } from "svelte-routing";

  let itemsShoopingCart = 0;

  onMount(() => {
    itemsShoopingCart = getShoppingCartLocarStorage().length;
  });
</script>

<button
  class="btn btn-secondary btn-circle flex flex-row w-full p-3"
  on:click={() => navigate("/Mi-Carrito")}
>
  <div>
    <label form="carrito-de-compra" for="carrito-de-compras">
      <div class="indicator">
        <span class="material-symbols-outlined text-black">
          shopping_cart
        </span>
        <span class="badge badge-primary badge-sm indicator-item"
          >{itemsShoopingCart}</span
        >
      </div>

      <input type="checkbox" id="carrito-de-compra" style="display: none;" />
    </label>
  </div>
  <div>
    <span class="font-semibold text-black">Mi carrito</span>
  </div>
</button>

<!-- <div
  class="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
>
  <div class="card-body">
    <span class="font-bold text-lg text-neutral">8 Items</span>
    <span class="text-info">Subtotal: $999</span>
    <div class="card-actions">
      <button
        class="btn btn-primary btn-block"
        on:click={() => navigate("/Mi-Carrito")}>Ver mi carrito</button
      >
    </div>
  </div>
</div> -->

<style>
  /* .icon-color {
    color: yellow;
    width: 2rem;
  } */
</style>
