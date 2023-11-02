<script>
  export let selectedArticulesToEdit;
</script>

<section class="">
  <div class="">
    <span class="text-neutral font-semibold"
      >Se editaran los siguientes articulos:</span
    >
    {#each selectedArticulesToEdit as { name, id } (id)}
      <div class="badge badge-ghost m-1">{name}</div>
    {/each}
  </div>
  <div class="divider divide-primary-focus m-0 p-0" />
  <div class="">
    <label for="changePrices">Modificar Precios</label>
    <input type="text" value="" placeholder="modificar precios" />
  </div>
</section>
