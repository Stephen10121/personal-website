<script lang="ts">
  import Dashboard from "./Dashboard.svelte";
  import { useNavigate } from "svelte-navigator";
  import WebsiteSection from "./WebsiteSection.svelte";
  import StructurePage from "./StructurePage.svelte";
  export let redirect: "home" | "website" | "structure";
  const navigate = useNavigate();
  function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
      begin = dc.indexOf(prefix);
      if (begin != 0) return null;
    } else {
      begin += 2;
      var end = document.cookie.indexOf(";", begin);
      if (end == -1) {
        end = dc.length;
      }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
  }
  const cookie = getCookie("G_DASH");
  if (!cookie) {
    navigate("/login");
  }
</script>

{#if redirect === "home"}
  <Dashboard />
{:else if redirect === "website"}
  <WebsiteSection />
{:else if redirect === "structure"}
  <StructurePage />
{/if}
