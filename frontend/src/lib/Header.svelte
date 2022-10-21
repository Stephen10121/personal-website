<script lang="ts">
  import { Link } from "svelte-navigator";
  export let endpoint: "website" | "home" | "structure";
</script>

<header>
  <h1>Dev Dashboard</h1>
  <nav>
    <ul>
      {#if endpoint !== "home"}
        <li><Link to="/"><p>Home</p></Link></li>
      {/if}
      {#if endpoint !== "website"}
        <li><Link to="/websites"><p>Websites</p></Link></li>
      {/if}
      {#if endpoint !== "structure"}
        <li><Link to="/structure"><p>Structure</p></Link></li>
      {/if}
      <li class="logout"><Link to="/logout"><p>Logout</p></Link></li>
    </ul>
  </nav>
</header>

<style>
  header {
    width: 100vw;
    height: 70px;
    background-color: #f3f3f3;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
  }
  header h1 {
    font-family: "Poppins", sans-serif;
    font-size: 2rem;
    font-weight: bold;
  }

  header nav ul {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  header nav ul li {
    display: inline;
    font-size: 1.25rem;
    font-family: "Roboto", sans-serif;
    border-bottom: 1px solid black;
    transition: padding 0.05s linear;
  }

  header nav ul li:not(.logout):hover {
    padding: 5px 0;
  }

  header nav ul li p {
    color: black;
  }

  .logout {
    background-color: #dfdfdf;
    padding: 10px;
    border-radius: 5px;
    border-bottom: none;
    transition: background-color 0.25s linear;
  }

  .logout:hover {
    background-color: #cfcfcf;
  }

  @media (max-width: 600px) {
    header {
      justify-content: center;
    }
    header h1 {
      display: none;
    }
  }
</style>
