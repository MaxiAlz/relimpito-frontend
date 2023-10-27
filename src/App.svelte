<script>
  import { Router, Link, Route } from "svelte-routing";
  import Administrator from "./routes/Administrator.svelte";
  import Home from "./routes/Home.svelte";
  import ErrorPage from "./routes/ErrorPage.svelte";
  import Drawer from "./componets/navigation/Drawer.svelte";
  import Dashboard from "./componets/dashboard/Dashboard.svelte";
  import AdminDashboard from "./componets/dashboard/AdminDashboard.svelte";
  import EditArticule from "./componets/adminComponets/EditArticule/EditArticule.svelte";
  import AlertToast from "./componets/alertsUser/AlertToast.svelte";

  export let urlRouting = "";
</script>

<AlertToast />
<main>
  <Router url={urlRouting}>
    <Drawer />
    <!-- este seria el navbar -->
    <!-- <Dashboard /> -->
    <Route path="/" component={Home} />
    <Route path="/admin" component={/* AdminDashboard */ Administrator} />
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
