<script>
  import isotipoRelimpito from "../../assets/ISOTIPO AMARILLO.png";
</script>

<section class="">
  <div class="bg-primary flex flex-col lg:flex-row">
    <div class="p-5">
      <h1
        class="text-secondary font-bold text-5xl uppercase tracking-in-expand"
      >
        Relimpito, <span class="text-white">ahora digital </span>y al alcance de
        todos
      </h1>
      <h3 class="text-white text-lg mt-5 tracking-in-contract">
        Somos una empresa familiar dedicada a la fabricacion y distribucion de
        articulos de limpieza para todo tipo de clientes.
      </h3>
      <div class="flex justify-center lg:justify-start tracking-in-expand-forward-top">
        <img src={isotipoRelimpito} alt="isoogo" class="imgLogoBanner" />
      </div>
    </div>

    <div
      class="m-2 p-5 flex flex-col justify-center bg-neutral bg-opacity-20 containerContact"
    >
      <div class="flex">
        <h4 class="font-bold text-accent text-lg">
          Deja tus datos para recibir más información:
        </h4>
      </div>

      <input
        type="text"
        placeholder="Tu nombre o empresa"
        class="input input-bordered mt-2 w-full"
      />

      <input
        type="text"
        placeholder="Tu email"
        class="input input-bordered mt-2"
      />
      <textarea
        class="textarea textarea-bordered mt-2"
        placeholder="Dejanos un mesaje"
      ></textarea>
      <button class="btn btn-secondary mt-2">Enviar</button>
      <p class=" text-accent my-2">
        Un asesor de ventas se pondrá en contacto contigo para brindarte
        información detallada sobre nuestros productos y servicios.
      </p>
    </div>
  </div>
</section>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 310"
  ><path
    fill="#529b03"
    fill-opacity="1"
    d="M0,192L80,170.7C160,149,320,107,480,96C640,85,800,107,960,112C1120,117,1280,107,1360,101.3L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
  ></path></svg
>

<style>
  .containerContact {
    border-radius: 1rem;
  }

  @media only screen and (min-width: 600px) {
    .imgLogoBanner {
      width: 25rem;
    }
  }

  /* Media query para teléfonos */
  @media only screen and (max-width: 599px) {
    .imgLogoBanner {
      width: 40rem;
    }
  }
  .tracking-in-expand {
    animation: tracking-in-expand 1s linear both;
  }
  @keyframes tracking-in-expand {
    0% {
      letter-spacing: -0.2em;
      opacity: 0;
    }
    40% {
      opacity: 0.6;
    }
    100% {
      opacity: 1;
    }
  }

  .tracking-in-contract {
    animation: tracking-in-contract 1s linear both;
  }
  @keyframes tracking-in-contract {
    0% {
      letter-spacing: 0.6em;
      opacity: 0;
    }
    40% {
      opacity: 0.6;
    }
    100% {
      letter-spacing: normal;
      opacity: 1;
    }
  }

  .tracking-in-expand-forward-top {
    animation: tracking-in-expand-forward-top 1.7s linear both;
  }
  @keyframes tracking-in-expand-forward-top {
    0% {
      letter-spacing: -0.2em;
      transform: translateZ(-700px) translateY(-100px);
      opacity: 0;
    }
    40% {
      opacity: 0.6;
    }
    100% {
      transform: translateZ(0) translateY(0);
      opacity: 1;
    }
  }
</style>
