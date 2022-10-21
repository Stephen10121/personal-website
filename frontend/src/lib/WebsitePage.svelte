<script>
  import { Link } from "svelte-navigator";
  import Header from "./Header.svelte";

  export let id;
</script>

<Header endpoint="website" />
<h1>website page {id}</h1>
<Link to="/websites">Back</Link>
