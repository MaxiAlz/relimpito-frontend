<script>
  import { Router, Link, Route } from "svelte-routing";
  import Administrator from "./routes/Administrator.svelte";
  import Home from "./routes/Home.svelte";
  import ErrorPage from "./routes/ErrorPage.svelte";
  import ViewProductDetails from "./routes/ViewProductDetails.svelte";
  import LoginAndRegisteForm from "./routes/LoginAndRegisteForm.svelte";

  import Drawer from "./componets/navigation/Drawer.svelte";
  import Dashboard from "./componets/dashboard/Dashboard.svelte";
  import AdminDashboard from "./componets/dashboard/AdminDashboard.svelte";
  import AlertToast from "./componets/alertsUser/AlertToast.svelte";
  import ArticulosTab from "./componets/adminComponets/adminItemsDashboard/ArticulosTab.svelte";
  import Footer from "./componets/landingPage/Footer.svelte";
  import { userDataRelimpito } from "./stores/sesionManager";
  import Catalog from "./routes/Catalog.svelte";
  import ViewMyShoppingCart from "./routes/ViewMyShoppingCart.svelte";

  export let urlRouting = "";
  let pathUrl = window.location.pathname;

  $: console.log("userDataRelimpito :>> ", $userDataRelimpito);

  console.log(
    '!pathUrl.startsWith("/admin") :>> ',
    !pathUrl.startsWith("/admin")
  );
</script>

<AlertToast />
<main>
  <Router url={urlRouting}>
    <!-- este seria el navbar -->
    <!-- <Dashboard /> -->
    <!-- {#if pathUrl != "/Login"}
      <Drawer />
    {/if} -->
    {#if location}
      {#if location.pathname !== "/Login"}
        <Drawer />
      {/if}
    {/if}
    <Route path="/" component={Home} />

    <Route path="/Login" component={LoginAndRegisteForm} />

    <Route path="/Catalogo" component={Catalog} />

    <Route path="/Articulos/Ver-Producto/:idProduct" let:params>
      <ViewProductDetails routerParams={params} />
    </Route>

    <Route path="/Mi-Carrito" component={ViewMyShoppingCart} />

    {#if $userDataRelimpito?.role === "admin"}
      <Route path="/admin" component={Administrator} />
      <Route path="/admin/Articulos" component={ArticulosTab} />
      <Route path="/admin/:section/" let:params>
        <Administrator paramsRouter={params} />
      </Route>
    {/if}

    <Route path="*" component={ErrorPage} />

    <!-- {#if pathUrl != "/Login" && !pathUrl.startsWith("/admin")}
      <Footer />
    {/if} -->

    {#if location}
      {#if location.pathname !== "/Login" && !pathUrl.startsWith("/admin")}
        <Footer />
      {/if}
    {/if}
  </Router>
</main>

<style>
</style>
