<footer
  class="footer p-10 bg-base-200 text-base-content flex flex-col lg:flex-row lg:justify-around"
>
  <div class="flex flex-col">
    <header class="footer-title">Relimpito</header>
    <button class="">Hazte cliente</button>
    <button class="">Nosotros</button>
    <button class="">Contacto</button>
    <button class="">Sucursales</button>

    <div class="grid grid-flow-col gap-4 my-5">
      <a href="asd"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="fill-current"
          ><path
            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
          ></path></svg
        ></a
      >
      <a href="asd"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="fill-current"
          ><path
            d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
          ></path></svg
        ></a
      >
      <a href="asd"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="fill-current"
          ><path
            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
          ></path></svg
        ></a
      >
    </div>
  </div>

  <div class="flex flex-col">
    <div class="flex flex-col lg:flex-row">
      <h4 class="footer-title mr-2">ubicacion:</h4>
      <p class="text-neutral opacity-75">
        Eulalia Arez de vildoza, San Isidro , Catamarca Argentina
      </p>
    </div>
    <iframe
      class="box-border mapa-ubicacion"
      title="ubication"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.8360590774487!2d-65.72445002446386!3d-28.454357975762537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94242f73b1a4e09d%3A0x59dd54e4f32569f7!2sRelimpito%20Valle%20Viejo!5e0!3m2!1ses!2sar!4v1703018554062!5m2!1ses!2sar"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</footer>

<div class="footer footer-center p-4 bg-base-300 text-base-content">
  <aside class="flex flex-col lg:flex-row">
    <p>Copyright © 2024 - Relimpito SH</p>
    <span class="cosito md">|</span>
    <div class="flex">
      <span class="mr-2">Desarrollado por:</span>
      <a
        href="https://www.instagram.com/aborigenes.digitalfactory/"
        target="_blank"
        class="link"
      >
        Aborigenes - Digital Factory</a
      >
    </div>
  </aside>
</div>

<style>
  @media only screen and (width <= 768px) {
    .mapa-ubicacion {
      width: 20rem;
      height: 13rem;
    }
    .cosito {
      display: none;
    }
  }
  @media only screen and (width >= 768px) {
    .mapa-ubicacion {
      width: 40rem;
      height: 20rem;
    }
  }
</style>
