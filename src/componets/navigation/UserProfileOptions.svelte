<script>
  import { navigate } from "svelte-routing";
  import {
    logoutStoreUser,
    userDataRelimpito,
  } from "../../stores/sesionManager";

  // import { $userDataRelimpito, logoutStoreUser } from "../../stores/$userDataRelimpito.store";
  // import { push } from "svelte-spa-router";

  function truncateText(text) {
    const lastSpaceIndex = text.indexOf(" ");
    if (lastSpaceIndex != -1) {
      return `${text.slice(0, lastSpaceIndex)}`;
    }
    return text;
  }

  function logout() {
    logoutStoreUser();
    navigate("/");
  }
</script>

<div class="dropdown dropdown-end ml-3">
  <label for="" tabindex="-1" class="btn btn-secondary">
    <div class="containerProfile">
      <div class="avatar placeholder">
        <div class="bg-neutral-focus text-neutral-content rounded-full w-8">
          <span class="text-xs">
            {$userDataRelimpito
              ? `${$userDataRelimpito?.username.slice(0, 1).toUpperCase()}`
              : " "}
          </span>
        </div>
      </div>
      <span class="text-neutral ml-1 hidden sm:block">
        {truncateText(`${$userDataRelimpito?.username}`)}
      </span>
    </div>
  </label>
  <ul
    tabindex="-1"
    class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box flex w-52"
  >
    <span class="uppercase text-neutral m-2 font-bold"
      >{$userDataRelimpito?.username}</span
    >
    <div class="divider m-0" />
    <li class="pl-2 mb-2 text-neutral">
      <button>
        <span class="material-symbols-outlined"> person </span>
        Perfil
      </button>
    </li>
    <li class="pl-2 mt-2 mb-2 text-neutral">
      <button on:click={logout}>
        <span class="material-symbols-outlined"> close </span>
        Cerrar sesion
      </button>
    </li>
  </ul>
</div>

<style>
  .containerProfile {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  /* .profileOptionButton {
    border-radius: 2rem;
  } */
</style>
