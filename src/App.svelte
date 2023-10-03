<script>
  import { Router, Link, Route } from "svelte-routing";
  import Administrator from "./routes/Administrator.svelte";
  import Home from "./routes/Home.svelte";
  import ErrorPage from "./routes/ErrorPage.svelte";
  import Drawer from "./componets/navigation/Drawer.svelte";
  import Dashboard from "./componets/dashboard/Dashboard.svelte";
  import AdminDashboard from "./componets/dashboard/AdminDashboard.svelte";

  export let urlRouting = "";
</script>

<main>
  <Router url={urlRouting}>
    <Drawer />
    <!-- este seria el navbar -->
    <!-- <Dashboard /> -->
    <Route path="/" component={Home} />
    <Route path="/admin" component={Administrator} />
    <Route path="/admin/:section" let:params>
      <AdminDashboard paramsRouter={params} />
    </Route>
    <Route path="*" component={ErrorPage} />
  </Router>
</main>

<style>
</style>
