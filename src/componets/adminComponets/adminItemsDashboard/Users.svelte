<script>
  import { onMount } from "svelte";
  import { httpRequest } from "../../../config/helpers/httpRequest";
  import { userDataRelimpito } from "../../../stores/sesionManager";
  import Modal from "../../modal/Modal.svelte";
  import CreateNewUSerForm from "../usersManager/CreateNewUSerForm.svelte";

  let isLoading = false;
  let users = [];
  let isModalCreateNewUser = false;

  onMount(() => {
    getusers();
  });

  const getusers = async () => {
    isLoading = true;
    try {
      const { data } = await httpRequest(
        `/users?populate=role&filters[username][$ne]=${$userDataRelimpito.username}`,
        "GET"
      );
      users = data;
    } catch (error) {
      console.error("Error al obtener productos :>> ", error);
    }
    isLoading = false;
  };

  const userCreated = () => {
    isModalCreateNewUser = false;
    getusers();
  };
</script>

<main class="w-full">
  <section class="flex justify-between items-center headerTable">
    <div
      class=" container form-control w-full max-w-xs m-4 flex justify-center"
    >
      <label class="label" for="search-user">
        <span class="label-text text-primary font-bold uppercase"
          >Buscar usuario</span
        >
      </label>
      <input
        type="text"
        placeholder="Mario del valle"
        class="input input-bordered w-full max-w-xs shadow border-slate-500 focus:border-primary-focus"
      />
    </div>

    <div>
      <button
        class="btn btn-primary mt-5 mr-5 shadow"
        on:click={() => (isModalCreateNewUser = true)}
      >
        <span class="material-symbols-outlined"> person_add </span>
        Crear nuevo cliente
      </button>
    </div>
  </section>
  <div class="divider m-0 p-0" />
  <section class="overflow-x-auto articulesTable px-20">
    <table class="table">
      <!-- head -->
      <thead class="text-primary uppercase">
        <tr>
          <!-- <th><input type="checkbox" checked={false} class="checkbox" /></th> -->
          <th>Nombre de usuario</th>
          <th>Detalle</th>
          <th>Estado</th>
          <th>Opciones</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {#if isLoading}
          <div class=" flex text-center m-5">
            <h2 class="text-primary-focus font-bold">Cargando</h2>
            <span class="loading loading-dots loading-md" />
          </div>
        {/if}
        {#if !isLoading && users.length === 0}
          <div class="text-center m-5">
            <h3 class="text-primary-focus font-bold">
              No hay productos disponibles.
            </h3>
          </div>
        {:else}
          {#each users as { username, name, lastName, confirmed, email, id } (id)}
            <tr>
              <td>
                <span class="text-primary">{username}</span><br />
                <span class="">{name}, lastName</span>
              </td>
              <td>
                <span class="font-semibold">{email}</span>
              </td>
              <td>
                <span class="font-semibold">{confirmed}</span>
              </td>

              <td class="">
                <button
                  class="btn btn-primary btn-sm btn-outline tooltip"
                  data-tip="Editar"
                  ><span class="material-symbols-outlined"> settings </span>
                </button>
                <button
                  class="btn btn-primary btn-sm btn-outline tooltip"
                  data-tip="ocultar"
                  on:click={() => console.log("click :>> ")}
                  ><span class="material-symbols-outlined">
                    visibility_off
                  </span>
                </button>
              </td>
            </tr>
          {/each}
        {/if}
      </tbody>
      <!-- foot -->
      <tfoot>
        <tr class="text-primary uppercase">
          <!-- <th><input type="checkbox" checked={false} class="checkbox" /></th> -->
          <th>Nombre de usuario</th>
          <th>Detalle</th>
          <th>Estado</th>
          <th>Opciones</th>
          <th />
        </tr>
      </tfoot>
    </table>

    <div class="divider m-0" />
    <div class="flex justify-center w-full">
      <!-- {#if paginationOptions.totalPages > 1} -->
      <!-- <div class="join">
        <button class="join-item btn btn-xs"> {"<<anterior"}</button>
        <button class="join-item btn btn-xs"> {paginationParams?.page}</button>
        <button class="btn btn-xs"> de</button>
        <button class="join-item btn btn-xs">
          {paginationParams?.pageCount}</button
        >
        <button class="join-item btn btn-xs"> {"siguiente>>"}</button>
      </div> -->
      <!-- {/if} -->
    </div>
    <div class="divider m-0" />
  </section>
</main>

<Modal
  open={isModalCreateNewUser}
  on:close={() => (isModalCreateNewUser = false)}
  title="Crear nuevo cliente"
>
  <CreateNewUSerForm on:userCreaded={userCreated} />
</Modal>
