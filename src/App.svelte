<script>
  import { Router, Link, Route } from "svelte-routing";
  import Administrator from "./routes/Administrator.svelte";
  import Home from "./routes/Home.svelte";
  import ErrorPage from "./routes/ErrorPage.svelte";
  import Drawer from "./componets/navigation/Drawer.svelte";
  import Dashboard from "./componets/dashboard/Dashboard.svelte";
  import AdminDashboard from "./componets/dashboard/AdminDashboard.svelte";
  import AlertToast from "./componets/alertsUser/AlertToast.svelte";
  import ViewProductDetails from "./routes/ViewProductDetails.svelte";
  import LoginAndRegisteForm from "./routes/LoginAndRegisteForm.svelte";
  import { userDataRelimpito } from "./stores/sesionManager";
  import ArticulosTab from "./componets/adminComponets/adminItemsDashboard/ArticulosTab.svelte";
  import Footer from "./componets/landingPage/Footer.svelte";

  export let urlRouting = "";
  let pathUrl = window.location.pathname;

  console.log("userdata :>> ", $userDataRelimpito);
</script>

<AlertToast />
<main>
  <Router url={urlRouting}>
    <!-- este seria el navbar -->
    <!-- <Dashboard /> -->
    {#if pathUrl != "/Login"}
      <Drawer />
    {/if}
    <Route path="/" component={Home} />
    <Route path="/Login" component={LoginAndRegisteForm} />

    <Route path="/Articulos/Ver-Producto/:idProduct" let:params>
      <ViewProductDetails routerParams={params} />
    </Route>
    <!-- admin routes -->
    <Route path="/admin/Articulos" component={ArticulosTab} />
    <Route path="/admin" component={Administrator} />
    <Route path="/admin/:section/" let:params>
      <Administrator paramsRouter={params} />
      <!-- <AdminDashboard paramsRouter={params} /> -->
    </Route>
    <!-- <Route path="/admin/editar/:articule/" let:params>
      <EditArticule paramsRouter={params} />
    </Route> -->
    <Route path="*" component={ErrorPage} />
    <Footer />
  </Router>
</main>

<style>
</style>
