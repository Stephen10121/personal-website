<script>
  import { Router, Route, useParams } from "svelte-navigator";
  // @ts-ignore
  import CheckLog from "./lib/CheckLog.svelte";
  import Logout from "./lib/Logout.svelte";
  import NotLogged from "./lib/Notlogged.svelte";
  import WebsitePage from "./lib/WebsitePage.svelte";
  // import Logout from "./lib/Logout.svelte";
</script>

<Router>
  <Route path="login" primary={false}>
    <NotLogged />
  </Route>

  <Route path="/" primary={false}>
    <CheckLog redirect="home" id={null} afterLoginRedirect={null} />
  </Route>

  <Route path="websites/*" primary={false}>
    <Route path="/">
      <CheckLog redirect="website" id={null} afterLoginRedirect="/websites" />
    </Route>
    <Route path=":id" let:params>
      <CheckLog
        redirect="specificWebsite"
        id={params.id}
        afterLoginRedirect={`/websites/${params.id}`}
      />
    </Route>
  </Route>

  <Route path="structure" primary={false}>
    <CheckLog redirect="structure" id={null} afterLoginRedirect="/structure" />
  </Route>

  <Route path="logout" primary={false}>
    <Logout />
  </Route>
</Router>
