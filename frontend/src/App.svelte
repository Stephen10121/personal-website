<script>
  import { Router, Route } from "svelte-navigator";
  // @ts-ignore
  import CheckLog from "./lib/CheckLog.svelte";
  import Logout from "./lib/Logout.svelte";
  import NotLogged from "./lib/Notlogged.svelte";
  // import Logout from "./lib/Logout.svelte";
</script>

<Router>
  <Route path="/login" primary={false}>
    <NotLogged />
  </Route>

  <Route path="/" primary={false}>
    <CheckLog redirect="home" />
  </Route>

  <Route path="/websites" primary={false}>
    <CheckLog redirect="website" />
  </Route>

  <Route path="/structure" primary={false}>
    <CheckLog redirect="structure" />
  </Route>

  <Route path="/logout" primary={false}>
    <Logout />
  </Route>
</Router>
