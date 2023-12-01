<script>
  let email = "";
  let password = "";

  function handleSubmitLogin() {
    console.log("Registrando usuario:", email, password);
  }
</script>

<form on:submit={handleSubmitLogin}>
  <div class="flex flex-col bg-white">
    <h2 class="text-primary text-lg font-semibold text-center mb-5">
      Iniciar Sesión
    </h2>
    <label class="label-text my-2 text-neutral" for="email"
      >Correo electrónico:</label
    >
    <input
      type="text"
      placeholder="ejemplo@hotmail.com"
      class="input input-bordered w-full"
      required
    />

    <label class="label-text my-2 text-neutral" for="password"
      >Contraseña:</label
    >
    <input
      type="password"
      placeholder="Escribir contraseña"
      class="input input-bordered w-full"
      required
    />

    <button class="btn btn-primary mt-5 w-full" type="submit"
      >Iniciar Sesión</button
    >
  </div>
</form>
