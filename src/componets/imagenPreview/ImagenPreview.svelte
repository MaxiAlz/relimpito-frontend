<script>
  import { createEventDispatcher } from "svelte";
  /**
   * @argument refProductId id del producto en referencia en donde se quiere insertar las imagenes. ex=> 1
   * @argument refProductColection coleccion del producto (se encuentra en el controlador de la coleccion) ex=> api::product.product
   * @argument fieldReference nombre del campo de las imagenes en el esquema del producto ex=> productPhotos
   *
   */

  const dispatch = createEventDispatcher();

  let urlImagesPreview = [];
  let fileImages = [];
  let selectedImage = null;
  let limitImages = 2;

  $: dispatch("fileImages", fileImages);

  function handleImageUpload(event) {
    const file = event.target.files[0];
    const imageURL = URL.createObjectURL(file);
    fileImages = [...fileImages, file];
    urlImagesPreview = [...urlImagesPreview, imageURL];
  }

  function removeImage() {
    urlImagesPreview = urlImagesPreview.slice(0, -1);
    fileImages = fileImages.slice(0, -1);
    selectedImage = null;
  }

  function triggerImageUpload() {
    const inputElement = document.getElementById("imageUpload");
    if (inputElement) {
      inputElement.click();
    }
  }

  // const handleSubmitImages = async (
  //   refProductId,
  //   refProductColection,
  //   fieldReference
  // ) => {
  //   try {
  //     const formData = new FormData();
  //     fileImages.forEach((image) => {
  //       formData.append(`files`, image, image.name);
  //     });
  //     formData.append("refId", "2" /* refProductId */);
  //     formData.append("ref", "api::product.product" /* refProductColection */);
  //     formData.append("field", "productPhoto" /* fieldReference */);

  //     const response = await httpFormDataRequest("/upload", "POST", formData);
  //     console.log("responseImage :>> ", response);
  //     console.log("formData :>> ", formData.values);
  //   } catch (error) {
  //     console.log("Error al cargar imagenes :>> ", error);
  //   }
  // };
</script>

<input
  type="file"
  id="imageUpload"
  accept="image/*"
  on:change={handleImageUpload}
  class="hidden"
/>
<articule class="p-2 imagen-preview m-2">
  <div class="text-center mb-2 p-0">
    <span class="text-primary text-center"
      >Imagenes seleccionadas <strong
        >{urlImagesPreview.length} / {limitImages}</strong
      ></span
    >
  </div>
  <section class="flex justify-center items-center">
    {#if !urlImagesPreview.length}
      <label
        for="imageUpload"
        class="border border-primary items-center card-add-images cursor-pointer"
      >
        <div class="flex items-center flex-col mt-10">
          <span class="text-primary font-semibold text-3xl"
            >Cargar imágenes</span
          >
          <span class="material-symbols-outlined text-primary text-4xl">
            image
          </span>
        </div>
      </label>
    {/if}
  </section>
  {#if urlImagesPreview.length > 0}
    <section class="flex justify-center items-center imagenPreview">
      <button
        disabled={!(urlImagesPreview.length <= limitImages - 1)}
        on:click={() => triggerImageUpload()}
        class=" w-80 shadow"
      >
        <div
          class="tooltip"
          data-tip={urlImagesPreview.length <= limitImages - 1
            ? "Click para cargar imagen"
            : "Llego al maximo de imagenes"}
        >
          <img
            src={selectedImage || urlImagesPreview[urlImagesPreview.length - 1]}
            alt="preview de la imagen"
            class="w-80 hover:opacity-60"
          />
        </div>
      </button>
    </section>
    <section>
      <div class="flex justify-center items-center">
        {#each urlImagesPreview as image, index}
          <div class="hover:opacity-80 cursor-pointer m-2 shadow">
            <button on:click={() => (selectedImage = image)}>
              <img src={image} alt={`image ${index}`} class="w-10" />
            </button>
          </div>
        {/each}
        {#if urlImagesPreview.length > 0}
          <div class="tooltip" data-tip="Eliminar ultimo">
            <button
              class="w-10 m-2 shadow flex items-center justify-center"
              on:click={removeImage}
            >
              <span class="material-symbols-outlined p-2"> delete </span>
            </button>
          </div>
        {/if}
      </div>
    </section>
  {/if}
</articule>

<style>
  .card-add-images {
    background-color: rgb(205, 205, 205);
    width: 25rem;
    height: 15rem;
    border-radius: 15px;
  }
</style>
