<script setup>
</script>

<template>
  <div class="pagebody">
    <img src="https://images.squarespace-cdn.com/content/v1/5d8979ba31fedf1660dce626/1614467353576-S3JXOXAHTB3NITJ9TI7V/image-asset.gif" class="firecutin">
    <div class="content">
      <h1>Welcome to Ethan's WIP website</h1>
      <p>
        This is still a work in progress as we remake the entire website from scratch using Vue 3! Make sure to check back to see how the website is progressing.
      </p>
      <div class="mainMenuSelect">
        <h1>PERSONAL</h1>
        <a>ABOUT ME</a><br/>
        <a>PROJECT HISTORY</a><br/>
        <a>ART GALLERY</a><br/>
        <h1>SOCIAL</h1>
        <a>LINKEDIN</a><br/>
        <a href="https://ethanthehuman.itch.io">ITCH.IO</a><br/>
      </div>
      <h2>In the mean time, check out some of my games from itch.io</h2>
      <iframe frameborder="0" src="https://itch.io/embed/515223?bg_color=2f3c49&amp;fg_color=d7d7e5&amp;link_color=a559f9&amp;border_color=4c4b5c" width="552" height="167"><a href="https://netherpetal.itch.io/last-rites">Last Rites by Netherpetal, EthanTheHuman, AwkwardWhale, James Bennett</a></iframe>
      <iframe frameborder="0" src="https://itch.io/embed/1149820?linkback=true&amp;bg_color=EFB66F&amp;fg_color=68401f&amp;link_color=97F851&amp;border_color=875933" width="552" height="167"><a href="https://ethanthehuman.itch.io/rolling-stars">Rolling Stars by EthanTheHuman</a></iframe>
      <iframe frameborder="0" src="https://itch.io/embed/461325?linkback=true&amp;fg_color=000000&amp;link_color=999da9" width="552" height="167"><a href="https://ethanthehuman.itch.io/ricochet">Ricochet by EthanTheHuman, GenghisGhan</a></iframe>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  color:white;
  margin: 0;
}
.pagebody {
  display: flex;
  flex-wrap: nowrap;
  min-width: 100vw;
}
.content {
  max-width: 800px;
  height: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  font-size: 1.2rem;
  line-height: 1.6;
  color: var(--color-text);
  flex: 1;
  text-align: center;
}
.mainMenuSelect {
  text-align: left;
  display: block;
  margin-right: auto;
  margin-top: 20px;
  padding: 10px;
}
.mainMenuSelect h1 {
  font-size: 1.3rem;
  color: dodgerblue;
  margin-left: -5px;
}
.mainMenuSelect a {
  font-size: 1.4rem;
}
.mainMenuSelect a:hover {
  background-color: rgb(255, 255, 255);
  font-size: 1.5rem;
  color: black;
}

.firecutin {
  min-height: 100vh;
  max-width: 300px;
  width: 15%;
  background-color: whitesmoke;
  object-fit: cover;
  border-left: solid white 3px;
  border-right: solid white 3px;
  margin-left: 10%;
  margin-right: 5%;
  display: flex;
}
</style>
