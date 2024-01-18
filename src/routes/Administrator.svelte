<script>
  import { onMount } from "svelte";

  import { navigate } from "svelte-routing";
  import { dashboardItems } from "../componets/adminComponets/adminItemsDashboard/dashboardItemsRender";

  export let paramsRouter;

  let selectedItem = {};

  onMount(() => {
    selectedItem = dashboardItems[0];
    navigate(`/admin/${selectedItem.value}`);
  });

  const selectedTab = (tab) => {
    selectedItem = tab;
    navigate(`/admin/${selectedItem.value}`);
  };

  $: {
    // Asigna paramsRouter a selectedItem cada vez que paramsRouter cambia
    selectedItem =
      dashboardItems.find((item) => item.value === paramsRouter?.section) ||
      dashboardItems[0];
  }
</script>

<main class="flex">
  <div class=" bg-gray-100 shadow-inner heightDashboard p-5 w-52">
    {#each dashboardItems as item}
      <ul class="my-5 w-full flex">
        <button
          class={`btn  btn-sm ${
            item.id == selectedItem.id ? "btn-primary" : "btn-ghost"
          } `}
          on:click={() => selectedTab(item)}
        >
          <span class="material-symbols-outlined">
            {item.icon}
          </span>
          {item.value}
        </button>
      </ul>
    {/each}
  </div>

  {#if paramsRouter?.section == selectedItem?.value}
    <svelte:component this={selectedItem?.component} />
  {/if}
</main>

<style>
  .heightDashboard {
    height: 91.9vh;
  }
</style>
