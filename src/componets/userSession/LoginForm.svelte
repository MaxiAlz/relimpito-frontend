<script>
  import * as yup from "yup";
  import { navigate } from "svelte-routing";
  import { httpRequest } from "../../helpers/httpRequest";
  import { notifications } from "../alertsUser/alert";
  import { createForm } from "svelte-forms-lib";
  import { errorMsg } from "../constants/defaultMessages";
  import FormErrorMsg from "../formErrorMsg/FormErrorMsg.svelte";
  import { loginStoreUser, storeUserToken } from "../../stores/sesionManager";

  let isLoading = false;

  const handleSubmitLoginUser = async (userValues) => {
    isLoading = true;
    console.log("userValues :>> ", userValues);
    try {
      const { data, status } = await httpRequest(
        "/auth/local",
        "POST",
        userValues
      );
      console.log("objedatact :>> ", data);
      if (status == 200) {
        storeUserToken(data.jwt);
        loginStoreUser(data.user);
      }
      notifications.success("¡bienvenido!", 5000);
      // navigate("/");
    } catch (error) {
      console.error("Error al registrar usuario: :>> ", error);
      notifications.error("Error al ingresar", 5000);
    }
    isLoading = false;
  };

  const { form, errors, handleChange, handleSubmit } = createForm({
    initialValues: {
      identifier: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      identifier: yup.string().required(errorMsg),
      password: yup.string().required(errorMsg),
    }),
    onSubmit: (userValues) => {
      handleSubmitLoginUser(userValues);
      // console.log("userValues :>> ", userValues);
    },
  });
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
      placeholder="ejemplo@hotmail.com"
      class="input input-bordered w-full"
      bind:value={$form.identifier}
      on:change={handleChange}
    />
    <FormErrorMsg error={$errors.identifier} />

    <label class="label-text my-2 text-neutral" for="password"
      >Contraseña:</label
    >
    <input
      type="password"
      placeholder="Escribir contraseña"
      class="input input-bordered w-full"
      bind:value={$form.password}
      on:change={handleChange}
    />
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
