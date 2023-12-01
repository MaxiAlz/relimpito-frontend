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

  export let urlRouting = "";
</script>

<AlertToast />
<main>
  <Router url={urlRouting}>
    <!-- este seria el navbar -->
    <!-- <Dashboard /> -->
    {#if window.location.pathname != "/Login"}
      <Drawer />
    {/if}
    <Route path="/Login" component={LoginAndRegisteForm} />
    <Route path="/" component={Home} />
    <Route path="/Articulos" component={Home} />

    <Route path="/Articulos/Ver-Producto/:idProduct" let:params>
      <ViewProductDetails routerParams={params} />
    </Route>

    <Route path="/admin" component={Administrator} />
    <Route path="/admin/:section/" let:params>
      <Administrator paramsRouter={params} />
      <!-- <AdminDashboard paramsRouter={params} /> -->
    </Route>
    <!-- <Route path="/admin/editar/:articule/" let:params>
      <EditArticule paramsRouter={params} />
    </Route> -->
    <Route path="*" component={ErrorPage} />
  </Router>
</main>

<style>
</style>
