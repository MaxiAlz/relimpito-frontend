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
  class="btn btn-ghost btn-circle flex flex-row w-full p-3"
  on:click={() => navigate("/Mi-Carrito")}
>
  <div>
    <label form="carrito-de-compra" for="carrito-de-compras">
      <div class="indicator">
        <span class="material-symbols-outlined"> shopping_cart </span>
        <span class="badge badge-secondary badge-sm indicator-item"
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
