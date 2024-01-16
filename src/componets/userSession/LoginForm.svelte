<script>
  import * as yup from "yup";
  import { navigate } from "svelte-routing";
  import { httpRequest } from "../../helpers/httpRequest";
  import { notifications } from "../alertsUser/alert";
  import { createForm } from "svelte-forms-lib";
  import { requiredInput } from "../constants/defaultMessages";
  import FormErrorMsg from "../formErrorMsg/FormErrorMsg.svelte";
  import {
    getStorageTokenUser,
    loginStoreUser,
    storeUserToken,
  } from "../../stores/sesionManager";
  import { onMount } from "svelte";

  let isLoading = false;
  let viewPassword = false;

  onMount(() => isUSerLoged());

  const isUSerLoged = () => {
    if (getStorageTokenUser()) {
      alert("usted ya tiene una sesion iniciada");
      navigate("/");
    }
  };

  const handleSubmitLoginUser = async (userValues) => {
    isLoading = true;
    try {
      const { data, status } = await httpRequest(
        "/auth/local",
        "POST",
        userValues
      );
      if (status == 200 && data.user.username) {
        storeUserToken(data.jwt);
        const userData = await getUserData();
        loginStoreUser(userData);
      }
      notifications.success("¡bienvenido!", 5000);
      navigate("/");
    } catch (error) {
      console.error("Error al registrar usuario: :>> ", error);
      notifications.error("Error al ingresar", 5000);
    }
    isLoading = false;
  };

  const getUserData = async () => {
    isLoading = true;
    try {
      const { data } = await httpRequest("/users/me?populate=*", "GET");

      if (data.username) {
        console.log("data :>> ", data);
        let userData = {
          name: data.name,
          lastName: data.lastName,
          username: data.username,
          role: data.role?.name,
        };
        return userData;
      }
    } catch (error) {
      console.error("error :>> ", error);
    }
    isLoading = false;
  };

  const { form, errors, handleChange, handleSubmit } = createForm({
    initialValues: {
      identifier: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      identifier: yup.string().required(requiredInput),
      password: yup.string().required(requiredInput),
    }),
    onSubmit: (userValues) => {
      handleSubmitLoginUser(userValues);
    },
  });

  const handleChangeVisibility = (e) => {
    viewPassword = !viewPassword;
    e.preventDefault();
  };
</script>

<form on:submit={handleSubmit}>
  <div class="flex flex-col bg-white">
    <h2 class="text-primary text-lg font-semibold text-center mb-5">
      Iniciar Sesión
    </h2>

    <label class="label-text my-2 text-neutral" for="email"
      >Correo o nombre de usuario:</label
    >

    <input
      type="text"
      id="identifier"
      placeholder="ejemplo@hotmail.com"
      class="input input-bordered w-full"
      bind:value={$form.identifier}
      on:change={handleChange}
    />
    <FormErrorMsg error={$errors.identifier} />

    <div class="flex justify-between items-center">
      <label class="label-text my-2 text-neutral" for="password"
        >Contraseña:</label
      >
      <button class="btn btn-ghost btn-sm" on:click={handleChangeVisibility}>
        <span class="material-symbols-outlined">
          {viewPassword ? "visibility_off" : "visibility"}
        </span>
      </button>
    </div>
    {#if !viewPassword}
      <input
        type="password"
        id="password"
        placeholder="Escribir contraseña"
        class="input input-bordered w-full"
        bind:value={$form.password}
        on:change={handleChange}
      />
    {/if}
    {#if viewPassword}
      <input
        type="text"
        id="password"
        placeholder="Escribir contraseña"
        class="input input-bordered w-full"
        bind:value={$form.password}
        on:change={handleChange}
      />
    {/if}
    <FormErrorMsg error={$errors.password} />
    <button class="btn btn-primary mt-5 w-full" type="submit">
      {#if isLoading}
        <span class="loading loading-spinner loading-md"></span>
      {/if}
      {#if !isLoading}
        <span>Iniciar Sesión</span>
      {/if}
    </button>
  </div>
</form>
