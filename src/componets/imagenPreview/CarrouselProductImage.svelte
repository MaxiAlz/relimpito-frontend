<script>
  import { createEventDispatcher, onMount } from "svelte";

  export let imagesUrl;

  let currentIndex = 0;
  let selectedImage;

  const dispatch = createEventDispatcher();

  onMount(() => {
    setUrlImages();
  });

  $: {
    dispatch("currentIndex", {});
  }

  const setUrlImages = async () => {
    selectedImage = imagesUrl[0]?.attributes?.url;
  };

  const beforeProtoPreview = () => {
    if (currentIndex > 0) {
      currentIndex = (currentIndex - 1) % imagesUrl.length;
      selectedImage = imagesUrl[currentIndex].attributes.url;
    }
  };
  const nextPhotoPreview = () => {
    currentIndex = (currentIndex + 1) % imagesUrl.length;
    selectedImage = imagesUrl[currentIndex].attributes.url;
  };
</script>

<div class="carousel previewImages">
  {#each imagesUrl as photo}
    <div id="slide" class="carousel-item relative w-full">
      <img alt={photo.attributes.name} src={selectedImage} class="w-full" />
      <div
        class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"
      >
        <button
          class="btn btn-circle"
          on:click={beforeProtoPreview}
          disabled={currentIndex === 0}>❮</button
        >
        <button
          class="btn btn-circle"
          on:click={nextPhotoPreview}
          disabled={currentIndex === imagesUrl.length - 1}>❯</button
        >
      </div>
    </div>
  {/each}
</div>

<style>
  @media screen and (min-width: 1024px) {
    .previewImages {
      max-width: 40rem;
      max-height: 40rem;
      display: flex;
    }
  }
  @media screen and (max-width: 640px) {
    .previewImages {
      max-width: 40rem;
      max-height: 40rem;
      display: flex;
    }
  }
  @media screen and (max-width: 320px) {
    .previewImages {
      max-width: 35rem;
      max-height: 35rem;
      display: flex;
    }
  }
</style>
