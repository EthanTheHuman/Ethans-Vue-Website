<script setup>
import { ref, computed, reactive } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import Navbar from './components/NavBar.vue'
import TheWelcome from './components/TheWelcome.vue'
import MultiverseCharacter from './components/MultiverseCharacter.vue'
import Frens from './components/Frens.vue'
import GameBacklog from './components/GameBacklog/GameBacklog.vue'

const routes = {
  '/': TheWelcome,
  '/multiverse': MultiverseCharacter,
  '/Multiverse': MultiverseCharacter,
  '/frens': Frens,
  '/Frens': Frens,
  '/gamebacklog': GameBacklog,
  '/GameBacklog': GameBacklog,
  '/backlog': GameBacklog,
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
  color: white;
  overflow-x: hidden;
}

/* Essentials */

.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden; /* Prevent any scrolling on the main page */
}

.header {
  flex: 0 0 auto; /* Don't grow or shrink, size based on content */
}

.content {
  flex: 1; /* Take up remaining space */
  overflow: hidden;
}

.content-body {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden; /* Prevent overflow in content area */
}

.footer {
  flex: 0 0 auto; /* Don't grow or shrink, size based on content */
}

/* Aesthetics */

.header,
.footer {
  background: dodgerblue;
}
</style>

<style>
  :root {
    --main-color: orange;
  }
</style>
