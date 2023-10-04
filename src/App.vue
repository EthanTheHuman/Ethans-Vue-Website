<script setup>
import { ref, computed, reactive } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import Navbar from './components/NavBar.vue'
import TheWelcome from './components/TheWelcome.vue'
import MultiverseCharacter from './components/MultiverseCharacter.vue'

const routes = {
  '/': TheWelcome,
  '/multiverse': MultiverseCharacter,
  '/Multiverse': MultiverseCharacter
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>

<template>
  <div class="container">
    <header class="header">
      <Navbar />
    </header>
    <section class="content">
      <div class="content-body">
        <component :is="currentView" />
      </div>
    </section>
    <footer class="footer">
      <p>This is the footer.</p>
    </footer>
  </div>
</template>


<style scoped>
/* Reset */

html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}


/* Essentials */

.container {
  display: table;
}

.content {
  display: table-row;
  height: 100%;
}

.content-body {
  display: table-cell;
}


/* Aesthetics */

.container {
  width: 100%;
  height: 100%;
  color: black;
  height: 100vh;
  width: 100vw;
}

.header,
.footer {
  background: dodgerblue;
}

.content-body {
  overflow: hidden;
}
</style>

<style>
  :root {
    --main-color: orange;
  }
</style>
