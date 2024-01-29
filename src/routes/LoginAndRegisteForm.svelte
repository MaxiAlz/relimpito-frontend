<script>
  import isotipo from "../assets/isotipo-Relimpito.png";
  import LoginForm from "../componets/userSession/LoginForm.svelte";
  import RegisterForm from "../componets/userSession/RegisterForm.svelte";

  let isRegistering = false;

  //TODO: ver que onda el videito este: https://www.youtube.com/watch?v=MDcLtyFGwjM&t=1377s
</script>

<main class="flex items-center justify-center heighMain bg-slate-100">
  <section class="py-2 px-5 flex flex-col shadow-2xl w-96 bg-white">
    <div class="flex items-center justify-center">
      <img src={isotipo} alt={isotipo} width="100" />
    </div>
    {#if isRegistering}
      <!-- <RegisterForm /> -->
      <div>Solicita tu cuenta</div>
    {:else}
      <LoginForm />
    {/if}

    <div class="divider"></div>
    <div>
      <span class="">
        {isRegistering ? "¿Ya tienes una cuenta? " : "¿No tienes una cuenta? "}
      </span>

      <button
        class="btn btn-link"
        on:click={() => (isRegistering = !isRegistering)}
      >
        {isRegistering ? "Iniciar sesion" : "Registrarse"}
      </button>
    </div>
  </section>
</main>

<style>
  .heighMain {
    height: 100vh;
  }
</style>
