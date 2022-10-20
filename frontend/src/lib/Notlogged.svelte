<script lang="ts">
  import { useNavigate } from "svelte-navigator";
  import Notification from "./Notification.svelte";
  import io from "socket.io-client";

  const socket = io("http://192.168.0.24:3000");

  socket.on("auth", (data) => {
    console.log(data);
  });

  type Notification = {
    show: boolean;
    status: "alert" | "success" | "default";
    message: string;
  };

  const navigate = useNavigate();
  let notification: Notification = {
    show: false,
    status: "success",
    message: "",
  };

  function getLeft(main: DOMRect) {
    return Math.floor(Math.random() * (main.width - 100));
  }

  function getTop(main: DOMRect) {
    return Math.floor(Math.random() * (main.height - 100));
  }

  function moveBox(event: any) {
    const sec = document.querySelector("#sec").getBoundingClientRect();
    const main = document.querySelector("#main").getBoundingClientRect();
    let gotTop = getTop(main);
    let gotLeft = getLeft(main);
    while (
      gotTop > sec.y - 100 &&
      gotTop < sec.y + sec.height &&
      gotLeft > sec.x - 100 &&
      gotLeft < sec.x + sec.width
    ) {
      gotTop = getTop(main);
      gotLeft = getLeft(main);
    }
    event.target.style.top = `${gotTop}px`;
    event.target.style.left = `${gotLeft}px`;
  }

  const popupCenter = ({ postServer, key, title, w, h, where }) => {
    // Fixes dual-screen position                             Most browsers      Firefox
    const dualScreenLeft =
      window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop =
      window.screenTop !== undefined ? window.screenTop : window.screenY;
    const url = `${where}auth?website=${postServer}&key=${key}`;
    const width = window.innerWidth
      ? window.innerWidth
      : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : screen.width;
    const height = window.innerHeight
      ? window.innerHeight
      : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft;
    const top = (height - h) / 2 / systemZoom + dualScreenTop;
    const newWindow = window.open(
      url,
      title,
      `
      scrollbars=yes,
      width=${w / systemZoom}, 
      height=${h / systemZoom}, 
      top=${top}, 
      left=${left}
      `
    );

    if (window.focus) newWindow.focus();
  };

  const loginIt = (key: string) => {
    popupCenter({
      postServer: `http://97.120.84.53:3000/auth`,
      key,
      title: "Authenticate",
      w: 520,
      h: 570,
      where: "https://auth.gruzservices.com/",
    });
  };
</script>

{#if notification.show}
  <Notification
    type={notification.status}
    on:close={() => {
      notification.show = false;
    }}>{notification.message}</Notification
  >
{/if}
<main id="main">
  <div
    class="box"
    style="top:20%;left:20%;"
    on:mouseover={moveBox}
    on:focus={moveBox}
  >
    <div class="actual" />
  </div>
  <div
    class="box"
    style="top:80%;left:80%;"
    on:mouseover={moveBox}
    on:focus={moveBox}
  >
    <div class="actual" />
  </div>
  <div class="sec-cover">
    <div id="sec">
      <h1>Dashboard</h1>
      <button id="sauth-login" on:click={() => loginIt(socket.id)}
        >Login with Gruzservices <span
          ><img
            src="https://auth.gruzservices.com/lock2.svg"
            alt="Lock"
          /></span
        ></button
      >
    </div>
  </div>
</main>

<style>
  @font-face {
    font-family: "George-Italic";
    src: url(https://auth.gruzservices.com/fonts/Louis-George-Cafe-Italic.ttf);
  }
  main {
    width: 100vw;
    height: 100vh;
    --green-light: #d8f3dc;
    --green-light-2: #b7e4c7;
    --green-light-3: #95d5b2;
    --green-light-4: #74c69d;
    --green: #52b788;
    --green-2: #40916c;
    --green-3: #2d6a4f;
    --green-4: #1b4332;
    --green-5-5: #102e24;
    --green-5: #081c15;
    background-color: var(--green-5);
    background: linear-gradient(
      180deg,
      var(--green-5-5) 0%,
      var(--green-5) 70%,
      var(--green-5) 100%
    );
    position: relative;
  }
  .box {
    --box-move: 0.25s;
    width: 100px;
    height: 100px;
    position: absolute;
    transition: top var(--box-move) ease-in-out,
      left var(--box-move) ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .box .actual {
    width: 50px;
    height: 50px;
    background-color: var(--green-2);
    border-radius: 50%;
  }
  .sec-cover {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
  }
  #sec {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    box-shadow: black 1.95px 1.95px 2.6px;
    border-radius: 10px;
    padding: 50px;
    gap: 20px;
    background-color: var(--green-4);
  }

  button {
    border: none;
    background-color: var(--border-color);
    border-left: 2px solid rgba(0, 0, 0, 0);
    transition: border-color 0.25s linear, background-color 0.25s linear;
    cursor: pointer;
    font-family: "Roboto", sans-serif;
  }

  button:hover {
    background-color: var(--green-light-4);
  }

  h1 {
    font-size: 3rem;
    color: var(--green-light);
    font-family: "Poppins", sans-serif;
  }
  #sauth-login {
    width: 220px;
    font-size: 0.9rem;
    font-family: "George-Italic", sans-serif;
    border-radius: 100vw;
    border: none;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    height: 50px;
    cursor: pointer;
    transition: box-shadow 0.25s linear;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #sauth-login span {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #sauth-login:hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 8px 8px;
  }
</style>
