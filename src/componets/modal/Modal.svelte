<script>
  /**
   * @component  Modal
   * @param open variable que maneja el estado si el modal esta abierto o cerrado (boolean)
   * @param title : titulo del componente
   * @param  slot : contenido del componente (ej: Formulario)
  */

  export let open, title;
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  const closeModal = () => {
    dispatch("close", {
      state: false,
    });
  };
</script>

<input type="checkbox" class="modal-toggle" checked={open} />
<div class="modal">
  <div class="modal-box m-0 p-0">
    <div class="box bg-white p-4">
      <div>
        <button
          on:click={closeModal}
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >✕</button
        >
        <h3 class="text-primary font-bold text-lg text-left">{title}</h3>
      </div>
      <div class="divider divide-primary m-0 p-0" />

      <slot />
    </div>
  </div>
</div>
