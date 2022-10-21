<script>
  import Header from "./Header.svelte";
  import WebsiteTile from "./WebsiteTile.svelte";
</script>

<Header endpoint="website" />
<div class="websites">
  <WebsiteTile
    status="online"
    url="https://files.gruzservices.com"
    id="adkl3n22kj">File Site</WebsiteTile
  >
  <WebsiteTile
    status="offline"
    url="https://auth.gruzservices.com"
    id="wlkn3ndlk2">Auth Site</WebsiteTile
  >
  <button class="website">
    <img src="/add.png" alt="Add icon" />
    <p>Add a site</p>
  </button>
</div>

<style>
  .websites {
    display: grid;
    padding: 10px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 10px;
  }

  .website {
    cursor: pointer;
    width: 100%;
    height: 70px;
    border: 2px solid #c2c2c2;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    background: none;
    transition: border-width 0.05s linear;
    font-family: "Roboto", sans-serif;
  }

  .website img {
    width: 60px;
  }

  .website:hover {
    border-width: 3px;
  }
</style>
