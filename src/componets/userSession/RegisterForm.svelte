<script>
  import * as yup from "yup";
  import { createForm } from "svelte-forms-lib";
  import FormErrorMsg from "../formErrorMsg/FormErrorMsg.svelte";
  import { httpRequest } from "../../config/helpers/httpRequest";
  import { notifications } from "../alertsUser/alert";
  import { navigate } from "svelte-routing";
  import { requiredInput } from "../constants/defaultMessages";

  let showPassword = false;
  let secondPassword = "";
  $: passwordNotMatchText = "";
  let isLoading = false;

  const handleSubmiRegisterUser = async (userValues) => {
    isLoading = true;
    console.log("userValues :>> ", userValues);
    try {
      const reponseRegister = await httpRequest(
        "/auth/local/register",
        "POST",
        userValues
      );
      console.log("reponseRegister :>> ", reponseRegister);
      notifications.success("Usuario creado", 5000);
      navigate("Login");
    } catch (error) {
      console.error("Error al registrar usuario: :>> ", error);
      notifications.error("Error al crear suario", 5000);
    }
    isLoading = false;
  };

  const { form, errors, handleChange, handleSubmit } = createForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      username: yup.string().required(requiredInput),
      email: yup.string().email().required(requiredInput),
      password: yup.string().required(requiredInput),
    }),
    onSubmit: (userValues) => {
      handleSubmiRegisterUser(userValues);
    },
  });

  const isPAsswordMatched = (repitPassword) => {
    if (repitPassword.target.value === $form.password) {
      passwordNotMatchText = "";
    } else {
      passwordNotMatchText = "Las contraselas no son iguales";
    }
  };
</script>

<form on:submit={handleSubmit}>
  <div class="flex flex-col bg-white">
    <h2 class="text-primary text-lg font-semibold text-center mb-2">
      Crear una cuenta
    </h2>

    <label class="label-text my-1 text-neutral" for="email"
      >Correo electrónico:</label
    >
    <input
      type="text"
      name="email"
      placeholder="ejemplo@hotmail.com"
      class={`input input-bordered w-full  ${
        $errors.email ? "input-error" : ""
      }`}
      bind:value={$form.email}
      on:change={handleChange}
    />
    <FormErrorMsg error={$errors.email} />

    <label class="label-text my-1 text-neutral" for="email"
      >Nombre de usuario:</label
    >
    <input
      type="text"
      name="username"
      placeholder="Nombre"
      class={`input input-bordered w-full  ${
        $errors.username ? "input-error" : ""
      }`}
      bind:value={$form.username}
      on:change={handleChange}
    />
    <FormErrorMsg error={$errors.username} />

    <div class="flex justify-between items-center">
      <label class="label-text my-1 text-neutral" for="password"
        >Contraseña:</label
      >
      <button on:click|preventDefault={() => (showPassword = !showPassword)}>
        <span class="material-symbols-outlined">
          {showPassword ? "visibility" : "visibility_off"}
        </span>
      </button>
    </div>
    {#if showPassword}
      <input
        type="text"
        placeholder="Escribir contraseña"
        name="password"
        class={`input input-bordered w-full  ${
          $errors.password ? "input-error" : ""
        }`}
        bind:value={$form.password}
        on:change={handleChange}
      />
    {/if}
    {#if !showPassword}
      <input
        type="password"
        placeholder="Escribir contraseña"
        name="password"
        class={`input input-bordered w-full  ${
          $errors.password ? "input-error" : ""
        }`}
        bind:value={$form.password}
        on:change={handleChange}
      />
    {/if}

    <FormErrorMsg error={$errors.password} />

    <label class="label-text my-1 text-neutral" for="password"
      >Repetir contraseña:</label
    >
    {#if !showPassword}
      <input
        type="password"
        name="secondPassword"
        placeholder="Repetir contraseña"
        class={`input input-bordered w-full  ${
          passwordNotMatchText ? "input-error" : ""
        }`}
        bind:value={secondPassword}
        on:change={isPAsswordMatched}
      />
    {/if}
    {#if showPassword}
      <input
        type="text"
        name="secondPassword"
        placeholder="Repetir contraseña"
        class={`input input-bordered w-full  ${
          passwordNotMatchText ? "input-error" : ""
        }`}
        bind:value={secondPassword}
        on:change={isPAsswordMatched}
      />
    {/if}

    <FormErrorMsg error={passwordNotMatchText} />

    <button class="btn btn-primary mt-5 w-full" type="submit">
      {#if isLoading}
        <span class="loading loading-spinner loading-md"></span>
      {/if}
      {#if !isLoading}
        <span>Registrarse</span>
      {/if}
    </button>
  </div>
</form>

<!-- <script>
  import { createForm } from "svelte-forms-lib";
  import * as yup from "yup";

  const { form, errors, state, handleChange, handleSubmit } = createForm({
    initialValues: {
      name: "",
      email: ""
    },
    validationSchema: yup.object().shape({
      title: yup
        .string()
        .oneOf(["Mr.", "Mrs.", "Mx."])
        .required(),
      name: yup.string().required(),
      email: yup
        .string()
        .email()
        .required()
    }),
    onSubmit: values => {
      alert(JSON.stringify(values));
    }
  });
</script>

<form on:submit={handleSubmit}>
  <label for="title">title</label>
  <select
    id="title"
    name="title"
    on:change={handleChange}
    bind:value={$form.title}>
    <option />
    <option>Mr.</option>
    <option>Mrs.</option>
    <option>Mx.</option>
  </select>
  {#if $errors.title}
    <small>{$errors.title}</small>
  {/if}

  <label for="name">name</label>
  <input
    id="name"
    name="name"
    on:change={handleChange}
    on:blur={handleChange}
    bind:value={$form.name}
  />
  {#if $errors.name}
    <small>{$errors.name}</small>
  {/if}

  <label for="email">email</label>
  <input
    id="email"
    name="email"
    on:change={handleChange}
    on:blur={handleChange}
    bind:value={$form.email}
  />
  {#if $errors.email}
    <small>{$errors.email}</small>
  {/if}

  <button type="submit">submit</button>
</form> -->
