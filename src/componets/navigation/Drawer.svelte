<script>
  import { Link } from "svelte-routing";
  import logoVerticalRelimpito from "../../assets/Logo-Relimpito-BLANCO.png";
  import UserProfileOptions from "./UserProfileOptions.svelte";
  import BudgeteShoppingCard from "../shoppingCart/BudgeteShoppingCard.svelte";
  import { userDataRelimpito } from "../../stores/sesionManager";
</script>

<div class="drawer">
  <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content flex flex-col">
    <!-- Navbar -->
    <div class="w-full navbar bg-primary">
      <div class="flex-none lg:hidden">
        <label for="my-drawer-3" class="btn btn-square btn-ghost">
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
        </label>
      </div>

      <div class="flex-1 px-2 mx-2 text-secondary font-semibold">
        <img
          src={logoVerticalRelimpito}
          alt={logoVerticalRelimpito}
          width="200"
        />
      </div>

      <!-- OPCIONES USUARIO LOGEADO -->
      {#if $userDataRelimpito?.name}
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
      {/if}

      <!-- USUARIO NO LOGEADO -->
      {#if !$userDataRelimpito?.name}
        <div class="flex-none hidden lg:block font-normal text-white">
          <ul class="menu menu-horizontal">
            <!-- Navbar menu content here -->
            <Link to="/Articulos"
              ><button class="btn btn-ghost btn-sm"> Articulos </button></Link
            >
            <Link to="/Contacto"
              ><button class="btn btn-ghost btn-sm"> Contacto </button></Link
            >
            <Link to="/Nosotros"
              ><button class="btn btn-ghost btn-sm"> Nosotros </button></Link
            >

            <!-- <Link to="/Login">
              <button class="btn btn-secondary btn-sm ml-2"
                ><span class="material-symbols-outlined"> person </span>
                Ingresar
              </button></Link
            > -->
          </ul>
        </div>
      {/if}
    </div>

    <!-- Page content here -->
  </div>
  <div class="drawer-side">
    <label for="my-drawer-3" class="drawer-overlay" />
    <ul class="menu p-4 w-80 min-h-full bg-base-200">
      <!-- Sidebar content here -->
      <li>sidebar item1</li>
      <li>sidebar item2</li>
      <!-- <li><a>Sidebar Item 2</a></li> -->
    </ul>
  </div>
</div>

<style>
  .icon-color {
    color: yellow;
    width: 2rem;
  }
</style>
