<script>
  export let totalPrice;
</script>

<section class="flex items-center justify-between">
  <div class="flex m-2">
    <h2 class="text-2xl font-semibold opacity-60">Total:</h2>
    <span class="text-2xl font-semibold pl-2"> $ {totalPrice}</span>
  </div>

  <div class=" flex">
    <div class="flex items-center m-4">
      <input
        class="checkbox checkbox-primary checkbox-xs"
        type="checkbox"
        name="worsale_price"
        id="worsale_price"
      />
      <h4 class="pl-1">Venta por mayor</h4>
    </div>
    <div class="flex items-center m-4">
      <input
        class="checkbox checkbox-primary checkbox-xs"
        type="checkbox"
        name="worsale_price"
        id="worsale_price"
      />
      <h4 class="pl-1">Facturar esta venta</h4>
    </div>
  </div>
</section>
