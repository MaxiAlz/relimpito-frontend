<script>
  /*
  Este componente es el encargado de renderizar cada dashboard segun el rol del usuario
  */
  // import logoVerticalRelimpito from "../../assets/Logo-Relimpito-BLANCO.png";
  import UserProfileOptions from "../navigation/UserProfileOptions.svelte";
  import BudgeteShoppingCard from "../shoppingCart/BudgeteShoppingCard.svelte";
  import AdminDashboard from "./AdminDashboard.svelte";
</script>

<div class="drawer">
  <!-- <input id="my-drawer-3" type="checkbox" class="drawer-toggle" /> -->
  <div class="drawer-content flex flex-col">
    <!-- Navbar -->
    <div class="w-full navbar bg-primary">
      <div class="flex-none sm:hidden">
        <button class="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </button>
      </div>
      <!-- <img src={logoVerticalRelimpito} alt={logoVerticalRelimpito} /> -->

      <div class="flex-1 px-2 mx-2 text-secondary font-semibold">
        NAVBAR TITLE
      </div>

      <!-- OPCIONES USUARIO LOGEADO -->
      <!-- {#if user.role == "Admin"}
        <div>
          <div class="dropdown dropdown-end">
            <BudgeteShoppingCard />
          </div>
          <button class="btn btn-ghost btn-circle">
            <div class="indicator">
              <span class="material-symbols-outlined icon-color">
                notifications
              </span>
              <span class="badge badge-xs badge-secondary indicator-item" />
            </div>
          </button>
          <UserProfileOptions />
        </div>
      {/if} -->
    </div>

    <!-- <AdminDashboard /> -->
  </div>
  <div class="drawer-side">
    <label for="my-drawer-3" class="drawer-overlay" />
    <ul class="menu p-4 w-80 min-h-full bg-base-200">
      <!-- Sidebar content here -->
      <li>sidebar item1</li>
      <li>sidebar item2</li>
    </ul>
  </div>
</div>

<!-- <style>
  .icon-color {
    color: yellow;
    width: 2rem;
  }
</style> -->
