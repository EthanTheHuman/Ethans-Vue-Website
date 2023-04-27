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
