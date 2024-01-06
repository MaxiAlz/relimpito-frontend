<script>
  import { createForm } from "svelte-forms-lib";
  import * as yup from "yup";
  import FormErrorMsg from "../../formErrorMsg/FormErrorMsg.svelte";
  import {
    emailErrorMsg,
    requiredInput,
  } from "../../constants/defaultMessages";
  import { httpRequest } from "../../../helpers/httpRequest";
  import { notifications } from "../../alertsUser/alert";
  import Loanding from "../../loader/Loanding.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  
  let isLoading = false;
  const defaultPassword = "usuarioRelimpito";
  const role = {
    connect: [
      {
        id: 4,
      },
    ],
  };

  const { form, errors, handleChange, handleSubmit } = createForm({
    initialValues: {
      name: "",
      email: "",
      lastName: "",
      role,
      username: "",
      password: defaultPassword,
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(requiredInput),
      lastName: yup.string().required(requiredInput),
      email: yup.string().email(emailErrorMsg).required(requiredInput),
      role: yup.object().required(requiredInput),
      username: yup.string().required(requiredInput),
      password: yup.string().required(requiredInput),
    }),
    onSubmit: (newUserValues) => {
      handleSubmitCreateNewuser(newUserValues);
    },
  });

  const handleSubmitCreateNewuser = async (newUserValues) => {
    const { name, username, lastName } = newUserValues;

    const lowercaseUserValues = {
      name: name.toLowerCase(),
      username: username.toLowerCase(),
      lastName: lastName.toLowerCase(),
      role: newUserValues.role,
      email: newUserValues.email.toLowerCase(),
      password: newUserValues.password,
    };

    isLoading = true;
    try {
      const { data, status } = await httpRequest(
        "/users",
        "POST",
        lowercaseUserValues
      );
      console.log("data :>> ", data);
      if (status === 201 && data) {
        notifications.success("Usuario creado");
        dispatch("userCreaded")
      }
    } catch {
      notifications.warning(
        `Recomendacion: Verificar que el nombre de usuario o email no existan `,
        1000
      );
    } finally {
      isLoading = false;
    }
  };
</script>

{#if isLoading}
  <Loanding />
{:else}
  <form on:submit={handleSubmit}>
    <div class="columns-2">
      <div>
        <label class="label" for="code">
          <span class="label-text text-primary font-semibold">Nombre:</span>
        </label>
        <input
          name="name"
          type="text"
          placeholder="Nombre"
          id="name"
          class="input input-bordered input-primary"
          on:change={handleChange}
          bind:value={$form.name}
        />
        <FormErrorMsg error={$errors.name} />
      </div>
      <div>
        <label class="label" for="stock">
          <span class="label-text text-primary font-semibold">Apellido:</span>
        </label>
        <input
          name="lastName"
          type="text"
          placeholder="Apellido"
          id="lastName"
          class="input input-bordered input-primary"
          on:change={handleChange}
          bind:value={$form.lastName}
        />
        <FormErrorMsg error={$errors.lastName} />
      </div>
    </div>
    <div>
      <label class="label" for="email">
        <span class="label-text text-primary font-semibold">Email:</span>
      </label>
      <input
        type="email"
        placeholder="Email nuevo usuario"
        id="email"
        class="input input-bordered input-primary w-full"
        name="email"
        on:change={handleChange}
        bind:value={$form.email}
      />
      <FormErrorMsg error={$errors.email} />
    </div>
    <div>
      <label class="label" for="username">
        <span class="label-text text-primary font-semibold"
          >Nombre de usuario:</span
        >
      </label>
      <input
        type="text"
        placeholder="Nombre de usuario"
        id="username"
        class="input input-bordered input-primary w-full"
        name="username"
        on:change={handleChange}
        bind:value={$form.username}
      />
      <FormErrorMsg error={$errors.username} />
    </div>
    <div>
      <div class="flex items-center">
        <label class="label" for="email">
          <span class="label-text text-primary font-semibold">Contraseña:</span>
        </label>
        <div
          class="tooltip text-primary cursor-pointer tooltip-right"
          data-tip="Todos los usuario se crearan con la siguiente contraseña, la  cual se pedira que cambien tras ingresar al sistema la primera vez."
        >
          <span class="material-symbols-outlined"> info </span>
        </div>
      </div>
      <input
        type="text"
        name="password"
        id="password"
        class="input input-bordered input-primary w-full"
        value={defaultPassword}
        disabled
      />
    </div>

    <div class="divider m-0 p-0" />
    <div class="flex justify-end">
      <button class="btn btn-primary ml-3" type="submit">Crear usuario</button>
    </div>
  </form>
{/if}
