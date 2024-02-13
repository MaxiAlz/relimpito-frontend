<script>
  import { onMount } from "svelte";
  import { httpRequest } from "../../config/helpers/httpRequest";
  import Modal from "../modal/Modal.svelte";
  import { notifications } from "../alertsUser/alert";

  let isLoading = false;
  let adresses = [];
  let selectedAdress = {};
  let deliveryType = "homeDelivery";
  let openModalShowAdresses = false;

  onMount(() => {
    getUSerAdress();
  });

  const getUSerAdress = async () => {
    isLoading = true;
    try {
      const { data } = await httpRequest(`/users/me?populate=adresses`, "GET");
      // console.log("getUSerAdress :>> ", data.adresses);
      adresses = data.adresses;
      selectedAdress = data.adresses[0];
    } catch (error) {
      console.error("Error al obtener direcciones :>> ", error);
      notifications.error("Error al cargar direcciones");
    }
    isLoading = false;
  };

  const handleDeliveryTypeChange = (event) => {
    const checkboxName = event.target.name;
    if (checkboxName === "homeDelivery") {
      deliveryType = "homeDelivery";
    } else if (checkboxName === "sucursal") {
      deliveryType = "sucursal";
    }
  };

  const handleChangeAdress = (event) => {
    const adress = event.target;
    console.log("adress :>> ", adress);
    // if (checkboxName === "homeDelivery") {
    //   deliveryType = "homeDelivery";
    // } else if (checkboxName === "sucursal") {
    //   deliveryType = "sucursal";
    // }
  };
</script>

{#if !openModalShowAdresses}
  <section>
    <div class="card bg-base-100 shadow-xl m-1 p-0">
      <div class="card-body">
        <div class="form-control">
          <label class="flex items-center">
            <input
              type="checkbox"
              checked={deliveryType === "homeDelivery"}
              name="homeDelivery"
              id="homeDelivery"
              class="checkbox checkbox-primary checkbox-sm"
              on:change={handleDeliveryTypeChange}
            />
            <div class="flex flex-col mx-2">
              <h2 class="card-title">Enviar a domicilio:</h2>
              <p>
                {selectedAdress.street}
                {selectedAdress.number} - {selectedAdress.city}, {selectedAdress.location}
                - CP: {selectedAdress.postalCode}
              </p>
              <p class="opacity-75">
                Referencia: {selectedAdress.clarification}
              </p>
            </div>
          </label>

          <div class="divider m-0 p-0"></div>
          <div class="card-actions justify-start">
            <button
              class="btn btn-primary btn-ghost"
              on:click={() => (openModalShowAdresses = true)}
              >Elegir otro domicilio</button
            >
          </div>
        </div>
      </div>
    </div>
    <div class="card bg-base-100 shadow-xl m-1 p-0">
      <div class="card-body">
        <div class="form-control">
          <label class="flex items-center">
            <input
              type="checkbox"
              checked={deliveryType === "sucursal"}
              name="sucursal"
              id="sucursal"
              class="checkbox checkbox-primary checkbox-sm"
              on:change={handleDeliveryTypeChange}
            />
            <div class="flex flex-col mx-2">
              <h2 class="card-title">Retiro personalmente en sucursal</h2>
              <p>
                Eulalia Arez de Vildoza S/N, San isidro - Valle viejo -
                Catamarca
              </p>
            </div>
          </label>
        </div>
      </div>
    </div>
  </section>
{/if}

{#if openModalShowAdresses}
  <section>
    {#each adresses as userAdress}
      <div class="card bg-base-100 shadow-xl m-1 p-0">
        <div class="card-body">
          <div class="form-control">
            <label class="flex items-center">
              <input
                type="checkbox"
                checked={selectedAdress.street === userAdress.street}
                name="homeDelivery"
                id="homeDelivery"
                class="checkbox checkbox-primary checkbox-sm"
                on:change={() => handleChangeAdress(userAdress)}
              />
              <div class="flex flex-col mx-2">
                <h2 class="card-title">
                  {userAdress.street}
                  {userAdress.number}
                </h2>
                <p>
                  {userAdress.city}, {userAdress.location}
                  - CP: {userAdress.postalCode}
                </p>
                <p>{userAdress.responsable} - {userAdress.responsablePhone}</p>
                <p class="opacity-75">
                  Referencia: {userAdress.clarification}
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>
    {/each}

    <div class="divider m-0 p-0"></div>
    <div class="card-actions justify-start">
      <button
        class="btn btn-primary"
        on:click={() => (openModalShowAdresses = true)}>Continuar</button
      >
      <button
        class="btn btn-primary btn-outline"
        on:click={() => (openModalShowAdresses = false)}>Agregar nuevo</button
      >
    </div>
  </section>
{/if}
<!-- <Modal
  open={openModalShowAdresses}
  title="Mis direcciones"
  on:close={() => (openModalShowAdresses = false)}
>
  {#each adresses as userAdress}
    <div class="card bg-base-100 shadow-xl m-1 p-0">
      <div class="card-body">
        <div class="form-control">
          <label class="flex items-center">
            <input
              type="checkbox"
              checked={deliveryType === "homeDelivery"}
              name="homeDelivery"
              id="homeDelivery"
              class="checkbox checkbox-primary checkbox-sm"
              on:change={handleDeliveryTypeChange}
            />
            <div class="flex flex-col mx-2">
              <h2 class="card-title">
                {userAdress.street}
                {userAdress.number}
              </h2>
              <p>
                {userAdress.city}, {userAdress.location}
                - CP: {userAdress.postalCode}
              </p>
              <p class="opacity-75">
                Referencia: {userAdress.clarification}
              </p>
            </div>
          </label>
        </div>
      </div>
    </div>
  {/each}
  <div class="divider m-0 p-0"></div>
  <div class="card-actions justify-end">
    <button
      class="btn btn-primary btn-ghost"
      on:click={() => (openModalShowAdresses = true)}
      >Elegir otro domicilio</button
    >
  </div>
</Modal> -->
