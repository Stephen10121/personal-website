<script lang="ts">
  import { useNavigate } from "svelte-navigator";
  const navigate = useNavigate();
  document.cookie = "G_DASH=";
  navigate("/");
</script>
