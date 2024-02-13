<script>
  import { onMount } from "svelte";
  import { httpRequest } from "../../config/helpers/httpRequest";
  import SelectUserAdressForOrders from "../users/SelectUserAdressForOrders.svelte";

  let isLoading = false;
  let adresses = [];
  let selectedAdress = {};
  let { street, number, postalCode, city, location } = selectedAdress;
  // onMount(() => {
  //   getUSerAdress;
  // });
  $: console.log("adresses :>> ", adresses);
  $: console.log("selectedAdress :>> ", selectedAdress);

  const getUSerAdress = async () => {
    isLoading = true;
    try {
      const { data } = await httpRequest(`/users/me?populate=adresses`, "GET");
      // console.log("getUSerAdress :>> ", data.adresses);
      adresses = data.adresses;
      selectedAdress = data.adresses[0];
    } catch (error) {
      console.error("Error al obtener productos :>> ", error);
    }
    isLoading = false;
  };
</script>

<div class="card w-full flex m-2">
  <!-- Detalles del envio -->

  <h1>Elegí la forma de entrega</h1>
  <SelectUserAdressForOrders />
</div>
