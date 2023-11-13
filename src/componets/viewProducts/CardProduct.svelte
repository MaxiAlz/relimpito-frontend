<script>
  export let dataProduct;

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }
</script>

<div
  class="card h-96 bg-base-100 shadow-xl bordered border-primary m-2 hover:shadow-primary-content"
>
  <figure class="w-96 h-96 p-2">
    {#if dataProduct.attributes.productPhoto.data}
      <img
        src={dataProduct.attributes.productPhoto?.data[0].attributes.url}
        width="500rem"
        alt={dataProduct.attributes.productPhoto?.data[0].attributes.name}
      />
    {/if}
  </figure>
  <div class="card-body text-left cardWidth">
    <h2 class="card-title uppercase">
      {dataProduct.attributes.productName}
      <div class="badge badge-secondary">Nuevo</div>
    </h2>
    <div class="w-80">
      <p class="text-left">
        {truncateText(dataProduct.attributes.productDescription, 85)}
      </p>
    </div>
    <h4 class="text-primary font-semibold text-2xl">
      $ {dataProduct.attributes.retailPrice},00
    </h4>
    <div class="card-actions justify-end">
      {#each dataProduct.attributes.categories.data as category}
        <div class="badge badge-outline">{category.attributes.name}</div>
      {/each}
    </div>
  </div>
</div>

<style>
  .cardWidth {
    max-width: 50rem;
  }
</style>
