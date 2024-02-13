<script>
  import { onMount } from "svelte";
  import PorchaseOptions from "../PourcheserComponents/PorchaseOptions.svelte";

  let ventas = []; // Aquí guardarás tus ventas
  let activeTab = 0;

  onMount(() => {
    // Aquí podrías cargar tus ventas desde algún origen de datos
    ventas = [
      {
        titulo: "Venta 1",
        contenido: "Contenido de la venta 1",
        total: 100000.5,
      },
      {
        titulo: "Venta 2",
        contenido: "Contenido de la venta 2",
        total: 28300.5,
      },
      // Agrega más ventas según necesites
    ];
  });

  function handleChangeTab(index) {
    activeTab = index;
  }
</script>

<main class="w-full">
  <section class="pt-5 pl-5">
    <h1 class="text-primary font-bold text-xl uppercase">Facturador</h1>
    <p class="label-text">Ingrese un artículo para realizar una venta:</p>
  </section>

  <div class="divider m-0 p-0"></div>

  <section class="px-5 shadow-xl box-border">
    <div role="tablist" class="tabs tabs-lifted">
      {#each ventas as venta, index}
        <button
          class="btn btn-sm btn-outline btn-primary mx-1 {index === activeTab
            ? 'btn-active'
            : ''}"
          aria-label="Tab {index + 1}"
          on:click={() => handleChangeTab(index)}
        >
          {venta.titulo}
        </button>
        {#if index !== ventas.length - 1}
          <div class="divider"></div>
        {/if}
      {/each}
    </div>

    {#if ventas.length > 0}
      <div
        role="tabpanel"
        class="tab-content bg-base-100 border-base-300 rounded-box p-6"
      >
        <PorchaseOptions totalPrice={ventas[activeTab].total} />

        {ventas[activeTab].contenido}
      </div>
    {/if}
  </section>
</main>
