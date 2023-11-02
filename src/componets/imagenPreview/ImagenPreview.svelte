<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { httpRequest } from "../../helpers/httpRequest";
  import { notifications } from "../alertsUser/alert";
  import Loanding from "../loader/Loanding.svelte";
  /**
   * @argument refProductId id del producto en referencia en donde se quiere insertar las imagenes. ex=> 1
   * @argument refProductColection coleccion del producto (se encuentra en el controlador de la coleccion) ex=> api::product.product
   * @argument fieldReference nombre del campo de las imagenes en el esquema del producto ex=> productPhotos
   *
   */

  const dispatch = createEventDispatcher();

  export let productPhotos;

  let urlImagesPreview = []; //url local de las imagens a medida que se van subiendo
  let fileImages = []; //aray de tipo file por cada imagen que se sube
  let selectedImage = null; //imagen seleccionada en el preview
  let limitImages = 2; //limite de imagenes para cargar
  let isLoading = false;

  $: console.log("productPhotos :>> ", productPhotos);

  
  if (productPhotos) {
    urlImagesPreview = productPhotos.map((product) => product.attributes.url);
    selectedImage = urlImagesPreview[0];
  }

  $: dispatch("fileImages", fileImages);

  const isPhotoExistInDataBase = (ulrPhotoRemoved) => {
    if (productPhotos) {
      const result = productPhotos.find(
        (img) => img.attributes.url === ulrPhotoRemoved
      );
      if (result && confirm("Borrar imagen?")) {
        deleteImageFromDataBase(result.id);
      }
    } else return;
  };

  const deleteImageFromDataBase = async (idPhoto) => {
    isLoading = true;
    try {
      const httpResponse = await httpRequest(
        `/upload/files/${idPhoto}`,
        "DELETE"
      );
      notifications.info("La imagen fue borrada");
    } catch (error) {
      console.log("error al borrar imgagen :>> ", error);
      notifications.error("No se pudo borrar la imagen");
    }
    isLoading = false;
  };

  function handleImageUpload(event) {
    const file = event.target.files[0];
    const imageURL = URL.createObjectURL(file);
    fileImages = [...fileImages, file];
    urlImagesPreview = [...urlImagesPreview, imageURL];
    selectedImage = urlImagesPreview[urlImagesPreview.length - 1];
  }

  function removeImage() {
    isPhotoExistInDataBase(urlImagesPreview[urlImagesPreview.length - 1]);
    selectedImage = urlImagesPreview.slice(0, -1);
    urlImagesPreview = urlImagesPreview.slice(0, -1);
    fileImages = fileImages.slice(0, -1);
  }

  function triggerImageUpload() {
    const inputElement = document.getElementById("imageUpload");
    if (inputElement) {
      inputElement.click();
    }
  }

</script>

{#if isLoading}
  <Loanding />
{/if}
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
            src={selectedImage || urlImagesPreview[urlImagesPreview[0]]}
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
