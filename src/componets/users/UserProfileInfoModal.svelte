<script>
  import * as yup from "yup";
  import { onMount } from "svelte";
  import { httpRequest } from "../../config/helpers/httpRequest";
  import Modal from "../modal/Modal.svelte";
  import FormErrorMsg from "../formErrorMsg/FormErrorMsg.svelte";
  import { createForm } from "svelte-forms-lib";
  import { emailErrorMsg, requiredInput } from "../constants/defaultMessages";
  import Loanding from "../loader/Loanding.svelte";

  export let isModalProfineInfoOpen, title;
  let isLoading = false;
  let profileUserData = {};
  let editProfile = true;

  onMount(() => getUserData());

  const getUserData = async () => {
    isLoading = true;
    try {
      const { data } = await httpRequest("/users/me?populate=*", "GET");
      profileUserData = data;
      setDataInForm(data);
    } catch (error) {
      console.error("error :>> ", error);
    }
    isLoading = false;
  };

  const setDataInForm = (data) => {
    $form.name = data.name;
    $form.lastName = data.lastName;
    $form.username = data.username;
    $form.email = data.email;
    $form.phoneNumber = data.phoneNumber;
    console.log("userData :>> ", data);
  };
  // $: console.log("userData :>> ", profileUserData);

  const { form, errors, handleChange, handleSubmit } = createForm({
    initialValues: {
      name: profileUserData.name,
      email: profileUserData.email,
      lastName: profileUserData.lastName,
      phoneNumber: profileUserData.profileUserData,
      username: profileUserData.username,
      // password: defaultPassword,
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
      // handleSubmitCreateNewuser(newUserValues);
      console.log("newUserValues :>> ", newUserValues);
    },
  });
</script>

<Modal
  on:close={() => (isModalProfineInfoOpen = false)}
  open={isModalProfineInfoOpen}
  {title}
>
  {#await profileUserData}
    <Loanding />
  {:then}
    <section>
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
            disabled={editProfile}
            class="input input-bordered input-primary"
            on:change={handleChange}
            bind:value={$form.name}
          />
          <!-- <FormErrorMsg error={$errors.name} /> -->
        </div>
        <div>
          <label class="label" for="stock">
            <span class="label-text text-primary font-semibold">Apellido:</span>
          </label>
          <input
            name="lastName"
            disabled={editProfile}
            type="text"
            placeholder="Apellido"
            id="lastName"
            class="input input-bordered input-primary"
            on:change={handleChange}
            bind:value={$form.lastName}
          />
          <!-- <FormErrorMsg error={$errors.lastName} /> -->
        </div>
      </div>
      <div class="columns-2">
        <div>
          <label class="label" for="username">
            <span class="label-text text-primary font-semibold"
              >Nombre de usuario:</span
            >
          </label>
          <input
            type="text"
            disabled={editProfile}
            placeholder="Nombre de usuario"
            id="username"
            class="input input-bordered input-primary w-full"
            name="username"
            on:change={handleChange}
            bind:value={$form.username}
          />
          <!-- <FormErrorMsg error={$errors.username} /> -->
        </div>

        <div>
          <label class="label" for="phoneNumber">
            <span class="label-text text-primary font-semibold">Telefono:</span>
          </label>
          <input
            type="text"
            disabled={editProfile}
            placeholder="Telefono"
            name="phoneNumber"
            id="phoneNumber"
            class="input input-bordered input-primary w-full"
            on:change={handleChange}
            bind:value={$form.phoneNumber}
          />
          <!-- <FormErrorMsg error={$errors.username} /> -->
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
          disabled
          on:change={handleChange}
          bind:value={$form.email}
        />
        <!-- <FormErrorMsg error={$errors.email} /> -->
      </div>

      <div class="divider m-0 p-0" />
      <div class="flex justify-end">
        {#if editProfile}
          <button
            class="btn btn-primary ml-3 btn-outline"
            type="submit"
            on:click={() => (editProfile = false)}>Habilitar edicion</button
          >
        {/if}
        {#if !editProfile}
          <!-- content here -->
          <button class="btn btn-primary ml-3" type="submit"
            >Editar usuario</button
          >
        {/if}
      </div>
    </section>
  {/await}
  <!-- {#if !isLoading && profileUserData} -->
  <!-- {/if} -->
  <!-- {#if isLoading}
    <Loanding />
  {/if} -->
</Modal>
