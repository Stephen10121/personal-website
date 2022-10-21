<script lang="ts">
  export let status: "online" | "offline";
  export let url: string;
</script>

<button class="website">
  <div class="name-info">
    <h4><slot /></h4>
    <p>{url}</p>
  </div>
  <div class="status">
    <div
      class="light"
      style="background-color:{status === 'online' ? '#adff2f' : '#666666'}"
    />
    <p>{status === "online" ? "Online" : "Offline"}</p>
  </div>
</button>

<style>
  .website {
    cursor: pointer;
    width: 100%;
    height: 70px;
    border: 2px solid #c2c2c2;
    border-radius: 10px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    padding: 0 10px;
    gap: 5px;
    background: none;
    transition: border-width 0.05s linear;
  }

  .website:hover {
    border-width: 3px;
  }

  .name-info {
    display: flex;
    gap: 5px;
  }
  .name-info h4 {
    font-family: "Roboto", sans-serif;
  }

  .name-info p {
    font-family: "Poppins", sans-serif;
    font-size: 0.75rem;
  }

  .status {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .status p {
    font-family: "Poppins", sans-serif;
  }

  .light {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
</style>
