<script>
  import { createEventDispatcher } from "svelte";

  export let message,
    time = 3000,
    open = false,
    alertType;

  const dispatch = createEventDispatcher();

  const closeAlert = () => {
    dispatch("closeAlert", {
      state: false,
    });
  };
  setTimeout(() => closeAlert(), time);
</script>

{#if open}
  <div class="toast toast-end z-50">
    {#if alertType === "success"}
      <div class="alert alert-success">
        <span class="material-symbols-outlined"> check_circle </span>
        <span>{message}</span>
        <button class="btn btn-circle btn-ghost btn-sm" on:click={closeAlert}
          >x</button
        >
      </div>
    {/if}
    {#if alertType == "error"}
      <div class="alert alert-error">
        <span class="material-symbols-outlined"> cancel </span>
        <span>{message}</span>
        <button class="btn btn-circle btn-ghost btn-sm" on:click={closeAlert}
          >x</button
        >
      </div>
    {/if}
    {#if alertType == "info"}
      <div class="alert alert-error">
        <span class="material-symbols-outlined"> info </span>
        <span>{message}</span>
        <button class="btn btn-circle btn-ghost btn-sm" on:click={closeAlert}
          >x</button
        >
      </div>
    {/if}
  </div>
{/if}
