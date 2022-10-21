<script lang="ts">
  import Dashboard from "./Dashboard.svelte";
  import { useNavigate } from "svelte-navigator";
  import WebsiteSection from "./WebsiteSection.svelte";
  import StructurePage from "./StructurePage.svelte";
  import WebsitePage from "./WebsitePage.svelte";
  import { POST_SERVER } from "../ip";
  export let afterLoginRedirect: string;
  export let redirect: "home" | "website" | "structure" | "specificWebsite";
  export let id: null | string;
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
  function redirectTo() {
    if (afterLoginRedirect) {
      navigate(`/login?redirect=${afterLoginRedirect}`);
    } else {
      navigate("/login");
    }
    return;
  }
  async function checkLogin() {
    const cookie = getCookie("G_DASH");
    if (!cookie) {
      redirectTo();
      return;
    }
    const backendValidate = await fetch(`${POST_SERVER}/validate`, {
      headers: { Authentication: `Bearer ${cookie}` },
    });
    if (!backendValidate) {
      redirectTo();
      return;
    }
    const backendValidateJSON = await backendValidate.json();
    if (backendValidateJSON.error) {
      redirectTo();
      return;
    }
  }

  checkLogin();
</script>

{#if redirect === "home"}
  <Dashboard />
{:else if redirect === "website"}
  <WebsiteSection />
{:else if redirect === "structure"}
  <StructurePage />
{:else if redirect === "specificWebsite"}
  <WebsitePage {id} />
{/if}
