<script>
  import imgPortada from "../../../public/PORTADA FACEBOOK.png";
</script>

<div class="carousel w-full h-96">
  <div id="slide1" class="carousel-item relative w-full">
    <img src={imgPortada} class="w-full " alt="portada" />
    <div
      class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"
    >
      <a href="#slide4" class="btn btn-circle">❮</a>
      <a href="#slide2" class="btn btn-circle">❯</a>
    </div>
  </div>
  <div id="slide2" class="carousel-item relative w-full">
    <img src={imgPortada} class="w-full" alt="Portada 2" />
    <div
      class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"
    >
      <a href="#slide1" class="btn btn-circle">❮</a>
      <a href="#slide3" class="btn btn-circle">❯</a>
    </div>
  </div>
</div>
